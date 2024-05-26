from fastapi import APIRouter

from repository import NewsRepository
from schemas import NewsScheme

router = APIRouter(
    prefix="/news",
    tags=["News"]
)


@router.get("/get")
async def get_posts():
    return await NewsRepository.get_news()

@router.post("/create")
async def create_post(post_data: NewsScheme):
    post_response = await NewsRepository.post_news(post_data)
    return post_response

