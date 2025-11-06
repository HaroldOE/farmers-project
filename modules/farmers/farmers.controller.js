import { Farmer } from "../../models/farmers.model.js";

// Create a new farmer
export const createFarmer = async (req, res) => {
  try {
    const { name, location, phone, crops, rating } = req.body;
    const id = await Farmer.create({ name, location, phone, crops, rating });
    res.status(201).json({ message: "Farmer created", id });
  } catch (error) {
    console.error("Error creating farmer:", error);
    res.status(500).json({ message: "Error creating farmer", error });
  }
};

// Get all farmers
export const getAllFarmers = async (req, res) => {
  try {
    const farmers = await Farmer.findAll();
    res.status(200).json(farmers);
  } catch (error) {
    console.error("Error fetching farmers:", error);
    res.status(500).json({ message: "Error fetching farmers", error });
  }
};

// Get a single farmer by ID
export const getFarmerById = async (req, res) => {
  try {
    const { id } = req.params;
    const farmer = await Farmer.findById(id);
    if (farmer) {
      res.status(200).json(farmer);
    } else {
      res.status(404).json({ message: "Farmer not found" });
    }
  } catch (error) {
    console.error("Error fetching farmer by ID:", error);
    res.status(500).json({ message: "Error fetching farmer by ID", error });
  }
};

// Update a farmer
export const updateFarmer = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, location, phone, crops, rating } = req.body;
    const affectedRows = await Farmer.update(id, {
      name,
      location,
      phone,
      crops,
      rating,
    });
    if (affectedRows > 0) {
      res.status(200).json({ message: "Farmer updated" });
    } else {
      res.status(404).json({ message: "Farmer not found" });
    }
  } catch (error) {
    console.error("Error updating farmer:", error);
    res.status(500).json({ message: "Error updating farmer", error });
  }
};

// Delete a farmer
export const deleteFarmer = async (req, res) => {
  try {
    const { id } = req.params;
    const affectedRows = await Farmer.delete(id);
    if (affectedRows > 0) {
      res.status(200).json({ message: "Farmer deleted" });
    } else {
      res.status(404).json({ message: "Farmer not found" });
    }
  } catch (error) {
    console.error("Error deleting farmer:", error);
    res.status(500).json({ message: "Error deleting farmer", error });
  }
};
