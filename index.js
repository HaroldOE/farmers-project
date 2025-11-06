import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import createConnection from "./models/db.js";

// Import tables
import { createMarketPriceTable } from "./models/market_price.model.js";

// Import end points
import marketPriceRouter from "./modules/market_price/market_price.route.js";

// Import product routes
import productrouter from "./modules/products/product.route.js";

await createConnection();
await createMarketPriceTable();

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// endpoints
app.use("/api/market-price", marketPriceRouter);
app.use("/api/products", productrouter);
const PORT = process.env.PORT;
app.get("/api/test", (req, res) => {
  return res.status(200).json({ message: "everywhere good" });
});

app.listen(PORT, () => {
  console.log(`server is listening on http://localhost:${PORT}`);
});
