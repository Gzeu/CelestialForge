from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List
import uvicorn
import hashlib
import time
import random

app = FastAPI(
    title="CelestialForge API",
    description="Backend for the CelestialForge MultiversX gaming platform",
    version="0.1.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://celestialforge.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Models ---
class ForgeRequest(BaseModel):
    wallet_address: str
    item_id: str
    materials: List[str]

class ForgeResult(BaseModel):
    success: bool
    tx_hash: Optional[str]
    nft_id: Optional[str]
    rarity: str
    power: int
    message: str

class Item(BaseModel):
    id: str
    name: str
    rarity: str
    power: int
    description: str

# --- Mock Data ---
ITEMS = [
    {"id": "nebula-sword", "name": "Nebula Sword", "rarity": "legendary", "power": 9500, "description": "Forged from collapsed star matter"},
    {"id": "star-shield", "name": "Star Shield", "rarity": "epic", "power": 7200, "description": "Harvested from a supernova remnant"},
    {"id": "cosmic-orb", "name": "Cosmic Orb", "rarity": "rare", "power": 4500, "description": "Contains compressed cosmic energy"},
    {"id": "iron-meteor", "name": "Iron Meteor", "rarity": "common", "power": 1200, "description": "Raw meteoric iron from deep space"},
]

# --- Routes ---
@app.get("/")
async def root():
    return {"name": "CelestialForge API", "version": "0.1.0", "status": "online"}

@app.get("/items", response_model=List[Item])
async def get_items():
    return ITEMS

@app.get("/items/{item_id}", response_model=Item)
async def get_item(item_id: str):
    item = next((i for i in ITEMS if i["id"] == item_id), None)
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    return item

@app.post("/forge", response_model=ForgeResult)
async def forge_item(request: ForgeRequest):
    if not request.wallet_address.startswith("erd1"):
        raise HTTPException(status_code=400, detail="Invalid MultiversX wallet address")
    
    item = next((i for i in ITEMS if i["id"] == request.item_id), None)
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    
    # Simulate forging with randomized outcome
    success_rate = 0.85
    success = random.random() < success_rate
    
    if success:
        tx_hash = hashlib.sha256(f"{request.wallet_address}{request.item_id}{time.time()}".encode()).hexdigest()
        nft_id = f"CELESTIAL-{tx_hash[:8].upper()}"
        power_boost = random.randint(-100, 500)
        return ForgeResult(
            success=True,
            tx_hash=tx_hash,
            nft_id=nft_id,
            rarity=item["rarity"],
            power=item["power"] + power_boost,
            message=f"Successfully forged {item['name']}! NFT minted as {nft_id}"
        )
    else:
        return ForgeResult(
            success=False,
            tx_hash=None,
            nft_id=None,
            rarity=item["rarity"],
            power=0,
            message="Forge failed! Materials consumed but item was not created. Try again."
        )

@app.get("/stats")
async def get_stats():
    return {
        "total_forged": 1247,
        "active_crafters": 843,
        "total_volume_egld": 12400,
        "network": "MultiversX Mainnet"
    }

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
