import express from "express";
import mongoose from "mongoose";
import Item from "../models/Item.js";

const router = express.Router();

// GET /api/items - get all items
router.get("/", async (_req, res) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: "Could not fetch items", error: error.message });
  }
});

// POST /api/items - create an item
router.post("/", async (req, res) => {
  try {
    const { name, category, price } = req.body;
    if (!name?.trim() || !category?.trim() || price === "" || price === undefined) {
      return res.status(400).json({ message: "Name, category and price are required" });
    }

    const numericPrice = Number(price);
    if (!Number.isFinite(numericPrice) || numericPrice < 0) {
      return res.status(400).json({ message: "Price must be a valid non-negative number" });
    }

    const item = await Item.create({
      name: name.trim(),
      category: category.trim(),
      price: numericPrice
    });
    res.status(201).json(item);
  } catch (error) {
    res.status(400).json({ message: "Could not create item", error: error.message });
  }
});

// PUT /api/items/:id - update an item
router.put("/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid item ID" });
    }

    const { name, category, price } = req.body;
    const numericPrice = Number(price);
    if (!name?.trim() || !category?.trim() || price === "" ||
        !Number.isFinite(numericPrice) || numericPrice < 0) {
      return res.status(400).json({ message: "Valid name, category and price are required" });
    }

    const item = await Item.findByIdAndUpdate(
      req.params.id,
      { name: name.trim(), category: category.trim(), price: numericPrice },
      { new: true, runValidators: true }
    );

    if (!item) return res.status(404).json({ message: "Item not found" });
    res.json(item);
  } catch (error) {
    res.status(400).json({ message: "Could not update item", error: error.message });
  }
});

// DELETE /api/items/:id - delete an item
router.delete("/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid item ID" });
    }

    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Could not delete item", error: error.message });
  }
});

export default router;
