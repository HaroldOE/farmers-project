import express from "express";
import {
  createFarmer,
  deleteFarmer,
  getAllFarmers,
  getFarmerById,
  updateFarmer,
} from "./farmers.controller.js";

const farmersRouter = express.Router();

// Create a new farmer
farmersRouter.post("/", createFarmer);

// Get all farmers
farmersRouter.get("/", getAllFarmers);

// Get a single farmer by ID
farmersRouter.get("/:id", getFarmerById);

// Update a farmer by ID
farmersRouter.put("/:id", updateFarmer);

// Delete a farmer by ID
farmersRouter.delete("/:id", deleteFarmer);

export default farmersRouter;
