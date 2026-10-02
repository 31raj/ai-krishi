# AI Krishi Mitra

AI Krishi Mitra is a full-stack agriculture assistance platform built for farmers and agribusiness users. It combines weather insights, irrigation guidance, farm dashboard information, and an AI-powered assistant to help with daily farming decisions.

## Features

- Smart farm dashboard
- Weather forecast based on location
- Irrigation recommendations
- Crop health and disease detection workflow
- AI assistant for agricultural queries
- Farm plan and management view
- Mobile-friendly responsive interface

## Tech Stack

- Frontend: React + Vite + Tailwind CSS
- Backend: Node.js + Express
- AI integration: OpenAI API (optional)
- Weather data: Open-Meteo API

## Project Structure

```bash
ai-krishi-mitra/
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── services/
│   ├── .env.example
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── src/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.cjs
├── README.md
├── package.json
└── package-lock.json
```

## Prerequisites

Before running the app, make sure you have:

- Node.js 18+
- npm
- Git

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/31raj/ai-krishi.git
cd ai-krishi
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

### 3. Install frontend dependencies

```bash
cd ../frontend
npm install
```

## Environment Configuration

Create a `.env` file inside `backend/` based on `.env.example`:

```bash
cd backend
cp .env.example .env
```

Then update the values:

```env
PORT=5001
OPENAI_API_KEY=your_openai_api_key
OPENAI_MODEL=gpt-4.1-mini
```

Notes:
- `OPENAI_API_KEY` is optional for offline assistant mode.
- If you do not add a valid key, the AI assistant will fall back to built-in offline guidance.

## Running the App

### Start the backend

```bash
cd backend
npm run dev
```

The backend will run on:

```text
http://127.0.0.1:5001
```

### Start the frontend

Open a new terminal and run:

```bash
cd frontend
npm run dev -- --host 0.0.0.0
```

The frontend will run on:

```text
http://localhost:5173
```

If you are on the same Wi-Fi network, you can also access it using your machine's local IP, for example:

```text
http://192.168.1.10:5173
```

## API Endpoints

### Weather

```http
GET /api/weather?location=Ranchi, Jharkhand
GET /api/weather?location=Ranchi, Jharkhand&latitude=23.37&longitude=85.325
```

### Assistant

```http
POST /api/assistant
```

### Irrigation

```http
POST /api/irrigation
```

## Default Usage

- Open the frontend in the browser.
- Use the dashboard to view farm status and recommendations.
- Check current weather and 7-day forecast by location.
- Ask the AI assistant for irrigation, crop health, and field guidance.
- Upload crop images for disease detection workflows when available.

## Notes

- This project is designed for local development and demo use.
- For production deployment, secure environment variables, add validation, and use a proper database and auth layer.
- Replace placeholder values and API keys before production deployment.

## License

This project is available for educational and personal use.

## Author

Raj Mahato
