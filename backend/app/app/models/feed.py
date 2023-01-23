from typing import List, Optional

from pydantic import BaseModel


class ImageReaction(BaseModel):
    emoji: str
    count: int
    image_id: Optional[int]


class FeedImage(BaseModel):
    id: int
    url: str
    alt_text: str
    reactions: List[ImageReaction]
    active_users: int = 0
    artist: Optional[str]
    n_artists: Optional[int]
