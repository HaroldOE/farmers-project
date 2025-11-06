import express from "express";
import { ProductController } from "../controllers/productController.js";

const productrouter = express.Router();

// CRUD Endpoints
productrouter.post("/", ProductController.create);      // Create Product
productrouter.get("/", ProductController.getAll);       // Get All Products
productrouter.get("/:id", ProductController.getById);   // Get One Product
productrouter.put("/:id", ProductController.update);    // Update Product
productrouter.delete("/:id", ProductController.delete); // Delete Product

export default productrouter;
