from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi import HTTPException
import httpx
import os
from dotenv import load_dotenv
from pydantic import BaseModel
from typing import List, Optional

load_dotenv()

app = FastAPI(title="Movie Aggregator API", version="1.0.0")

# Настройка CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Конфигурация TMDb API
TMDB_API_KEY = os.getenv("TMDB_API_KEY")
TMDB_BASE_URL = os.getenv("TMDB_BASE_URL", "https://api.themoviedb.org/3")

# Модели данных
class Movie(BaseModel):
    id: int
    title: str
    overview: str
    poster_path: Optional[str] = None
    backdrop_path: Optional[str] = None
    release_date: Optional[str] = None
    vote_average: float
    vote_count: int
    genre_ids: List[int] = []

class MovieDetails(Movie):
    runtime: Optional[int] = None
    genres: List[dict] = []
    production_companies: List[dict] = []
    production_countries: List[dict] = []
    spoken_languages: List[dict] = []

class TMDBResponse(BaseModel):
    results: List[Movie]
    page: int
    total_pages: int
    total_results: int

# Вспомогательные функции
async def fetch_from_tmdb(endpoint: str, params: dict = None):
    """Запрос к TMDb API"""
    if not TMDB_API_KEY:
        raise HTTPException(status_code=500, detail="TMDb API key not configured")
    
    params = params or {}
    params["api_key"] = TMDB_API_KEY
    params["language"] = "ru-RU"
    
    async with httpx.AsyncClient() as client:
        response = await client.get(f"{TMDB_BASE_URL}{endpoint}", params=params)
        if response.status_code != 200:
            raise HTTPException(status_code=response.status_code, detail="Failed to fetch data from TMDb")
        return response.json()

# Эндпоинты
@app.get("/")
async def root():
    return {"message": "Movie Aggregator API", "version": "1.0.0"}

@app.get("/api/movies/popular", response_model=TMDBResponse)
async def get_popular_movies(page: int = 1):
    """Получить популярные фильмы"""
    try:
        data = await fetch_from_tmdb("/movie/popular", {"page": page})
        return TMDBResponse(**data)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/movies/search", response_model=TMDBResponse)
async def search_movies(query: str, page: int = 1):
    """Поиск фильмов по названию"""
    if not query:
        raise HTTPException(status_code=400, detail="Query parameter is required")
    
    try:
        data = await fetch_from_tmdb("/search/movie", {"query": query, "page": page})
        return TMDBResponse(**data)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/movies/{movie_id}", response_model=MovieDetails)
async def get_movie_details(movie_id: int):
    """Получить детальную информацию о фильме"""
    try:
        data = await fetch_from_tmdb(f"/movie/{movie_id}")
        return MovieDetails(**data)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/genres")
async def get_genres():
    """Получить список жанров"""
    try:
        data = await fetch_from_tmdb("/genre/movie/list")
        return data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
