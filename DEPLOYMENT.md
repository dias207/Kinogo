# 🚀 Развертывание Kinogo

## 🌐 Варианты развертывания

### 1. Vercel + Railway (Рекомендуется)

#### Frontend на Vercel:
1. Зайдите на [vercel.com](https://vercel.com)
2. Подключите ваш GitHub аккаунт
3. Импортируйте репозиторий `dias207/Kinogo`
4. Выберите папку `frontend`
5. Настройте переменные окружения (если нужно)
6. Разверните!

#### Backend на Railway:
1. Зайдите на [railway.app](https://railway.app)
2. Подключите GitHub репозиторий
3. Выберите папку `backend`
4. Добавьте переменные окружения:
   - `TMDB_API_KEY`: ваш API ключ TMDb
   - `TMDB_BASE_URL`: https://api.themoviedb.org/3
5. Разверните!

### 2. GitHub Pages (Только frontend)

1. Перейдите в репозиторий: Settings → Pages
2. Source: Deploy from a branch
3. Branch: main, folder: /docs
4. Сохраните

**Результат:** https://dias207.github.io/Kinogo/

### 3. Docker (Полное приложение)

#### Локально:
```bash
# Создайте .env файл с API ключом
echo "TMDB_API_KEY=your_api_key_here" > .env

# Запустите Docker Compose
docker-compose up -d
```

#### На сервере:
```bash
# Клонируйте репозиторий
git clone https://github.com/dias207/Kinogo.git
cd Kinogo

# Настройте .env
cp .env.example .env
# Добавьте ваш API ключ в .env

# Запустите
docker-compose up -d
```

### 4. Heroku

#### Backend:
```bash
# Установите Heroku CLI
heroku create your-app-name
heroku config:set TMDB_API_KEY=your_api_key
git subtree push --prefix backend heroku main
```

#### Frontend:
```bash
# Сборка и деплой
cd frontend
npm run build
# Загрузите build папку на любой статический хостинг
```

## 🔧 Настройка переменных окружения

### Обязательные переменные:
- `TMDB_API_KEY`: API ключ от TMDb
- `TMDB_BASE_URL`: https://api.themoviedb.org/3

### Как получить API ключ:
1. Зарегистрируйтесь на [themoviedb.org](https://www.themoviedb.org/)
2. Перейдите в Settings → API
3. Создайте новый API ключ
4. Используйте ключ в переменных окружения

## 📱 Доступные URL после развертывания

### Vercel + Railway:
- Frontend: https://your-app.vercel.app
- Backend: https://your-app-production.up.railway.app
- API Docs: https://your-app-production.up.railway.app/docs

### GitHub Pages:
- Demo: https://dias207.github.io/Kinogo/

### Docker:
- Local: http://localhost
- API: http://localhost/api

## ⚡ Быстрый старт с Vercel + Railway

### 1. Frontend на Vercel:
```bash
# Установите Vercel CLI
npm i -g vercel

# Из папки frontend
cd frontend
vercel --prod
```

### 2. Backend на Railway:
```bash
# Установите Railway CLI
npm install -g @railway/cli

# Вход в Railway
railway login

# Создание проекта
railway new

# Настройка переменных
railway variables set TMDB_API_KEY=your_api_key
railway variables set TMDB_BASE_URL=https://api.themoviedb.org/3

# Деплой
railway up
```

## 🔗 Обновление frontend URL

После развертывания backend обновите URL в `frontend/src/services/api.js`:

```javascript
const API_BASE_URL = 'https://your-backend-url.railway.app';
```

## 📊 Мониторинг

### Vercel Analytics:
- Автоматически включен
- Статистика посещений
- Производительность

### Railway Logs:
```bash
railway logs
```

## 🔄 CI/CD

Автоматический деплой настроен через GitHub Actions:
- Push в main → автоматический деплой
- Pull Request → preview деплой

## 💰 Стоимость

- **Vercel:** Бесплатно для личных проектов
- **Railway:** $5/месяц после бесплатного периода
- **GitHub Pages:** Бесплатно
- **Heroku:** Бесплатный tier с ограничениями
- **Docker хостинг:** Зависит от провайдера

## 🆘 Поддержка

Если возникнут проблемы:
1. Проверьте логи развертывания
2. Убедитесь что API ключ правильный
3. Проверьте переменные окружения
4. Смотрите документацию платформ
