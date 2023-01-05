import requests
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi_restful.tasks import repeat_every

from app.models.feed import ImageReaction
from app.utils.websocket_utils import ConnectionManager, create_feed_image

app = FastAPI()

feeds = []
random_images = []
lexica_art_api = 'https://lexica.art/api/v1/search?q='


@app.on_event("startup")
@repeat_every(seconds=10)
async def startup_event():
    if len(random_images) == 1:
        random_images.extend(requests.get(f"{lexica_art_api}{random_images[0]['src']}").json()['images'])
    elif len(random_images) == 0:
        random_images.extend(requests.get(f'{lexica_art_api}something').json()['images'])

    if not feeds:
        # create the all feeds and set up the connection manager for each feed
        for i in range(1, 4):
            random_image = random_images.pop()
            image = create_feed_image(0, random_image['src'], random_image['prompt'])
            feed = ConnectionManager(image, feed_id=i)
            feeds.append(feed)

    # broadcast the new feed image to all feeds
    for feed in feeds:
        random_image = random_images.pop()
        image = create_feed_image(feed.current_feed_image.id + 1, random_image['src'], random_image['prompt'])
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
