import { Product } from "../../models/product.model.js";

export const ProductController = {
  // CREATE
  async create(req, res) {
    try {
      const id = await Product.create(req.body);
      res.status(201).json({ message: "Product created successfully", id });
    } catch (error) {
      console.error("Error creating product:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // READ ALL
  async getAll(req, res) {
    try {
      const products = await Product.findAll();
      res.json(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // READ ONE
  async getById(req, res) {
    try {
      const product = await Product.findById(req.params.id);
      if (!product)
        return res.status(404).json({ message: "Product not found" });
      res.json(product);
    } catch (error) {
      console.error("Error fetching product:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // UPDATE
  async update(req, res) {
    try {
      const affected = await Product.update(req.params.id, req.body);
      if (affected === 0)
        return res.status(404).json({ message: "Product not found" });
      res.json({ message: "Product updated successfully" });
    } catch (error) {
      console.error("Error updating product:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // DELETE
  async delete(req, res) {
    try {
      const affected = await Product.delete(req.params.id);
      if (affected === 0)
        return res.status(404).json({ message: "Product not found" });
      res.json({ message: "Product deleted successfully" });
    } catch (error) {
      console.error("Error deleting product:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};
