import express from "express";
import {
  createMarketPrice,
  getAllMarketPrices,
  getMarketPriceById,
  updateMarketPrice,
  deleteMarketPrice,
} from "./market_price.controller.js";

const marketPriceRouter = express.Router();

marketPriceRouter.post("/", createMarketPrice); // Create
marketPriceRouter.get("/", getAllMarketPrices); // Read all
marketPriceRouter.get("/:id", getMarketPriceById); // Read one
marketPriceRouter.put("/:id", updateMarketPrice); // Update
marketPriceRouter.delete("/:id", deleteMarketPrice); // Delete

export default marketPriceRouter;

//http://localhost:3000/api/market-price/