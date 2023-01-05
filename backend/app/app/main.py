from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi_restful.tasks import repeat_every

from app.models.feed import ImageReaction
from app.utils.websocket_utils import ConnectionManager, create_feed_image

app = FastAPI()


urls = [
    'https://lexica-serve-encoded-images2.sharif.workers.dev/md/3761c6dd-a10f-4a76-bec5-27d508698840',
    'https://lexica-serve-encoded-images2.sharif.workers.dev/full_jpg/16b67559-5c64-4520-83a9-201dc87259da',
    'https://lexica-serve-encoded-images2.sharif.workers.dev/md/5fd57d99-24dd-4c59-b93f-022aedba7638',
    'https://lexica-serve-encoded-images2.sharif.workers.dev/full_jpg/4eacb26e-062f-4499-a082-524cd1c2ea5a',
    'https://lexica-serve-encoded-images2.sharif.workers.dev/full_jpg/c5ed451d-4351-4047-abf3-fc190c9bf4e5',
    'https://lexica-serve-encoded-images2.sharif.workers.dev/full_jpg/d2e6f8f0-d191-44f2-b1cb-e4fed429ae66',
    'https://lexica-serve-encoded-images2.sharif.workers.dev/full_jpg/3fd1799f-0139-419e-889c-59f22faa2e16',
    'https://lexica-serve-encoded-images2.sharif.workers.dev/full_jpg/cfd33cc3-778f-4c11-9546-a36bbdf71a6c',
    'https://lexica-serve-encoded-images2.sharif.workers.dev/full_jpg/0fe9b428-033b-44c3-a97c-dec8e3d42a8c'
]

feeds = []


@app.on_event("startup")
def startup_event():
    # create the all feeds and set up the connection manager for each feed
    for i in range(1, 4):
        feed = ConnectionManager(create_feed_image(i, urls[i - 1]), feed_id=i)
        feeds.append(feed)


@repeat_every(seconds=15)
async def broadcast_all_feeds():
    # broadcast the new feed image to all feeds
    for feed in feeds:
        image = create_feed_image(feed.current_feed_image.id + 1, urls[feed.current_feed_image.id])
        await feed.broadcast(image)


@app.websocket("/ws/{client_id}/{feed_id}")
async def websocket_endpoint(websocket: WebSocket, client_id: str, feed_id: int):
    if feed_id in range(feeds.__len__()):
        feed = feeds[feed_id]
        await feed.connect(websocket)

        try:
            while True:
                # receive image reaction
                reaction_data = await websocket.receive_json()
                reaction_data = ImageReaction(**reaction_data)

                # update feed image reactions
                image = feed.current_feed_image
                if reaction_data.emoji in [reaction.emoji for reaction in image.reactions]:
                    for reaction in image.reactions:
                        if reaction.emoji == reaction_data.emoji:
                            reaction.count += 1
                else:
                    image.reactions.append(reaction_data)

                await feed.broadcast(image)
        except WebSocketDisconnect:
            feed.disconnect(websocket)



