import random

import requests
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi_restful.tasks import repeat_every

from app.models.feed import ImageReaction
from app.utils.websocket_utils import ConnectionManager, create_feed_image

app = FastAPI()

feeds = []
random_images = []
lexica_art_api = 'https://lexica.art/api/v1/search?q='

artists = ['Aydan Sabia', 'Odalric Mufaddal', 'Cathleen Marise', 'Tara Purushottam', 'Remigiusz Ruslan',
           'Rhodopis Cephalus', 'Dùbhghlas Ivaylo', 'Elias Kincső' 'Niko Lycus']


@app.on_event("startup")
@repeat_every(seconds=10)
async def startup_event():
    if len(random_images) == 0:
        query = f'{lexica_art_api}something {random.randint(0, 100_000)}'
        random_images.extend(requests.get(query).json()['images'])
        print(random_images[0])

    if not feeds:
        # create the all feeds and set up the connection manager for each feed
        for i in range(4):
            random_image = random_images.pop()
            image = create_feed_image(
                0, random_image['src'], random_image['prompt'], artist=artists[0], n_artists=len(artists))
            feed = ConnectionManager(image, feed_id=i)
            feeds.append(feed)

            # move artist to end
            artists.append(artists[0])
            artists.pop()

    # broadcast the new feed image to all feeds
    for feed in feeds:
        random_image = random_images.pop()
        image = create_feed_image(
            feed.current_feed_image.id + 1,
            random_image['src'], random_image['prompt'],
            artist=artists[0],
            n_artists=len(artists)
        )
        artists.append(artists[0])
        artists.pop()
        await feed.broadcast(image)


@app.websocket("/ws/{client_id}/{feed_id}")
async def websocket_endpoint(websocket: WebSocket, client_id: str, feed_id: int):
    if feed_id in range(feeds.__len__()):
        feed = feeds[feed_id]
        await feed.connect(websocket)

        try:
            await feed.broadcast(feed.current_feed_image)
            while True:
                # receive image reaction
                reaction_data = await websocket.receive_json()
                reaction_data = ImageReaction(**reaction_data)

                # update feed image reactions
                image = feed.current_feed_image

                # continue if the image is not current
                if reaction_data.image_id == image.id:
                    if reaction_data.emoji in [reaction.emoji for reaction in image.reactions]:
                        for reaction in image.reactions:
                            if reaction.emoji == reaction_data.emoji:
                                reaction.count += 1
                    else:
                        image.reactions.append(reaction_data)

                await feed.broadcast(image)
        except WebSocketDisconnect:
            feed.disconnect(websocket)
