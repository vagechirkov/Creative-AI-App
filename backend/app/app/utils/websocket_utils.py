from typing import List

from fastapi import WebSocket

from app.models.feed import FeedImage, ImageReaction


class ConnectionManager:
    def __init__(self, image: FeedImage, feed_id: int):
        self.feed_id = feed_id
        self.active_connections: List[WebSocket] = []
        self.current_feed_image: FeedImage = image

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

        # send the current feed image to the new connection
        if self.current_feed_image:
            await websocket.send_json(self.current_feed_image.dict())

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def broadcast(self, message: FeedImage or str):
        if isinstance(message, str):
            for connection in self.active_connections:
                await connection.send_json({'prompt': message})
        else:
            message.active_users = len(self.active_connections)
            self.current_feed_image = message
            for connection in self.active_connections:
                await connection.send_json(message.dict())


def create_feed_image(image_id: int, url: str, alt_text: str, artist: str, n_artists: int) -> FeedImage:
    return FeedImage(
        id=image_id,
        url=url,
        reactions=[
            ImageReaction(emoji='👍', count=0),
            ImageReaction(emoji='🤯', count=0),
            ImageReaction(emoji='😮', count=0),
            ImageReaction(emoji='😱', count=0),
        ],
        alt_text=alt_text,
        active_users=0,
        artist=artist,
        n_artists=n_artists
    )
