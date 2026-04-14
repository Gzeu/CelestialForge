# 🌌 CelestialForge

> Advanced MultiversX gaming platform with React frontend, FastAPI backend, all containerized with Docker.

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![MultiversX](https://img.shields.io/badge/MultiversX-Mainnet-blue)](https://multiversx.com)
[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.104-009688)](https://fastapi.tiangolo.com)

## Overview

CelestialForge is a blockchain gaming platform built on MultiversX where players can mint, upgrade, and trade cosmic NFT items using on-chain forging mechanics. Items range from common Iron Meteors to legendary Nebula Swords, each with unique power stats and rarity tiers.

## Architecture

```
CelestialForge/
├── frontend/          # Next.js 14 + TypeScript + TailwindCSS
│   └── src/app/
│       └── page.tsx   # Main forge UI with xPortal wallet integration
├── backend/           # FastAPI (Python)
│   ├── main.py        # API routes: /forge, /items, /stats
│   └── requirements.txt
├── docker-compose.yml # Full stack: frontend + backend + Redis
└── README.md
```

## Features

- **xPortal Wallet Connect** - MultiversX wallet integration
- **NFT Forge Mechanics** - On-chain item forging with randomized outcomes
- **4 Rarity Tiers** - Common / Rare / Epic / Legendary
- **FastAPI Backend** - REST API with Pydantic models and CORS
- **Docker Compose** - One command to run everything
- **Redis Cache** - Session and leaderboard caching

## Quick Start

### With Docker (recommended)

```bash
git clone https://github.com/Gzeu/CelestialForge.git
cd CelestialForge
docker-compose up --build
```

Open http://localhost:3000

### Manual Setup

**Backend:**
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Health check |
| GET | `/items` | List all forge items |
| GET | `/items/{id}` | Get specific item |
| POST | `/forge` | Forge an item (requires wallet) |
| GET | `/stats` | Platform statistics |

### Forge Request
```json
{
  "wallet_address": "erd1...",
  "item_id": "nebula-sword",
  "materials": ["star-dust", "cosmic-ore"]
}
```

## Roadmap

- [ ] Real MultiversX smart contract integration
- [ ] NFT marketplace with EGLD payments
- [ ] PvP arena battles
- [ ] Guild system
- [ ] Leaderboard with Redis
- [ ] Mobile responsive UI improvements

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 14, TypeScript, TailwindCSS, Framer Motion |
| Backend | FastAPI, Python 3.11, Pydantic v2 |
| Blockchain | MultiversX SDK Core, SDK DApp |
| Cache | Redis 7 |
| Container | Docker, Docker Compose |

## License

MIT License - see [LICENSE](LICENSE) for details.

---
Built by [@Gzeu](https://github.com/Gzeu) | Blockchain Dev · MultiversX · GameFi
