from datetime import datetime
from typing import Dict

from pydantic import BaseModel


class FeedImage(BaseModel):
    id: int
    created_at: datetime
    title: str
    url: str
    emoji: Dict[str, int]
