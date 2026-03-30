# Backend - Киноагрегатор

FastAPI сервер для агрегатора фильмов с интеграцией TMDb API.

## Установка и запуск

1. **Установите Python 3.8+** (если еще не установлен)

2. **Создайте виртуальное окружение:**
```bash
python -m venv venv
```

3. **Активируйте виртуальное окружение:**
```bash
# Windows
venv\Scripts\activate

# Linux/Mac
source venv/bin/activate
```

4. **Установите зависимости:**
```bash
pip install -r requirements.txt
```

5. **Получите API ключ TMDb:**
   - Зарегистрируйтесь на [themoviedb.org](https://www.themoviedb.org/)
   - Перейдите в настройки API и получите ключ
   - Создайте файл `.env` и добавьте ваш ключ:
   ```
   TMDB_API_KEY=your_actual_api_key_here
   TMDB_BASE_URL=https://api.themoviedb.org/3
   ```

6. **Запустите сервер:**
```bash
uvicorn main:app --reload
```

Сервер будет доступен по адресу: http://localhost:8000

## API Эндпоинты

### Основные эндпоинты:
- `GET /` - информация о API
- `GET /api/movies/popular` - популярные фильмы
- `GET /api/movies/search?query={title}` - поиск фильмов
- `GET /api/movies/{movie_id}` - детальная информация о фильме
- `GET /api/genres` - список жанров

### Примеры запросов:

**Получить популярные фильмы:**
```bash
curl http://localhost:8000/api/movies/popular
```

**Поиск фильмов:**
```bash
curl "http://localhost:8000/api/movies/search?query=terminator"
```

**Детальная информация о фильме:**
```bash
curl http://localhost:8000/api/movies/550
```

## Структура проекта

```
backend/
├── main.py              # Основной файл приложения FastAPI
├── requirements.txt     # Зависимости Python
├── .env                # Переменные окружения (API ключи)
└── README.md           # Этот файл
```

## Технологии

- **FastAPI** - современный веб-фреймворк
- **httpx** - асинхронный HTTP клиент
- **pydantic** - валидация данных
- **python-dotenv** - управление переменными окружения
