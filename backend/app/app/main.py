from typing import List

from fastapi import FastAPI, WebSocket, WebSocketDisconnect

from app.models.feed import FeedImage, ImageReaction

from fastapi_restful.tasks import repeat_every

app = FastAPI()

last_three_images: List[FeedImage] = []

urls = [
    'https://lexica-serve-encoded-images2.sharif.workers.dev/md/3761c6dd-a10f-4a76-bec5-27d508698840',
]


class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

        # send the current feed image to the new connection
        if last_three_images:
            await websocket.send_json(last_three_images[-1].json())

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def broadcast(self, message: FeedImage):
        for connection in self.active_connections:
            await connection.send_json(message.json())


manager = ConnectionManager()


@app.on_event("startup")
@repeat_every(seconds=15)
async def broadcast_feed():
    # move the last url to the first position
    urls.insert(0, urls.pop())

    # create a new feed image
    feed_image = FeedImage(
        id=last_three_images[-1].id + 1 if last_three_images else 1,
        url=urls[0],
        reactions=[]
    )
    # remove the last image
    if last_three_images:
        last_three_images.pop(0)

    # add the new image
    last_three_images.append(feed_image)

    await manager.broadcast(feed_image)


@app.websocket("/ws/{client_id}")
async def websocket_endpoint(websocket: WebSocket, client_id: str):
    await manager.connect(websocket)

    try:
        while True:
            # receive image reaction
            reaction_data = await websocket.receive_json()
            reaction_data = ImageReaction(**reaction_data)

            # update feed image reactions
            image = last_three_images[-1]
            if reaction_data.emoji in [reaction.emoji for reaction in image.reactions]:
                for reaction in image.reactions:
                    if reaction.emoji == reaction_data.emoji:
                        reaction.count += 1
            else:
                image.reactions.append(reaction_data)

            await manager.broadcast(image)
    except WebSocketDisconnect:
        manager.disconnect(websocket)
