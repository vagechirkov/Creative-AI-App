from typing import List

from pydantic import BaseModel


class ImageReaction(BaseModel):
    emoji: str
    count: int


class FeedImage(BaseModel):
    id: int
    url: str
    alt_text: str
    reactions: List[ImageReaction]
    active_users: int = 0
