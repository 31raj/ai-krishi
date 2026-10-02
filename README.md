# AI Krishi Mitra

A full-stack agriculture assistance system with a React frontend and Node.js backend.

## Structure

- `frontend/` - React SPA with pages for dashboard, disease detection, weather, irrigation, assistant, and farm plan.
- `backend/` - Express API with AI, weather, and irrigation service endpoints.

## Setup

### Backend

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Notes

- Update API URLs in `frontend/src/services/*` if the backend runs on a different host or port.
- Replace `.env` values in `backend/` with real API keys and configuration.

### AI assistant setup

The assistant works in a basic advisory mode without configuration. For live AI responses, add this to `backend/.env` and restart the backend:

```env
OPENAI_API_KEY=your_api_key
OPENAI_MODEL=gpt-4.1-mini
```
