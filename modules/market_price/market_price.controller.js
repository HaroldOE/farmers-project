import { MarketPrice } from "../../models/market_price.model.js";

// CREATE
export const createMarketPrice = async (req, res) => {
  try {
    const { crop_type, market, price, date } = req.body;

    if (!crop_type || !market || !price || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const id = await MarketPrice.create({ crop_type, market, price, date });
    res.status(201).json({
      message: "Market price created successfully",
      id,
    });
  } catch (error) {
    console.error("Error creating market price:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// READ ALL
export const getAllMarketPrices = async (req, res) => {
  try {
    const prices = await MarketPrice.findAll();
    res.status(200).json(prices);
  } catch (error) {
    console.error("Error fetching market prices:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// READ ONE
export const getMarketPriceById = async (req, res) => {
  try {
    const { id } = req.params;
    const price = await MarketPrice.findById(id);

    if (!price) {
      return res.status(404).json({ message: "Market price not found" });
    }

    res.status(200).json(price);
  } catch (error) {
    console.error("Error fetching market price:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// UPDATE
export const updateMarketPrice = async (req, res) => {
  try {
    const { id } = req.params;
    const { crop_type, market, price, date } = req.body;

    const affectedRows = await MarketPrice.update(id, {
      crop_type,
      market,
      price,
      date,
    });

    if (affectedRows === 0) {
      return res.status(404).json({ message: "Market price not found" });
    }

    res.status(200).json({ message: "Market price updated successfully" });
  } catch (error) {
    console.error("Error updating market price:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE
export const deleteMarketPrice = async (req, res) => {
  try {
    const { id } = req.params;
    const affectedRows = await MarketPrice.delete(id);

    if (affectedRows === 0) {
      return res.status(404).json({ message: "Market price not found" });
    }

    res.status(200).json({ message: "Market price deleted successfully" });
  } catch (error) {
    console.error("Error deleting market price:", error);
    res.status(500).json({ message: "Server error" });
  }
};
