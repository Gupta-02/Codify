import Flashcard from "../models/Flashcard.js";
import { validationResult } from "express-validator";
import mongoose from "mongoose";

// Helper to check for valid MongoDB ObjectId
const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

// CREATE a new flashcard
export const addFlashcard = async (req, res) => {
  // Check for validation errors from the router
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { term, definition, topic } = req.body;
    const flashcard = await Flashcard.create({ term, definition, topic });
    return res.status(201).json(flashcard);
  } catch (error) {
    console.error("Error adding flashcard:", error);
    return res.status(500).json({
      message: "Failed to add flashcard",
      error: error.message,
    });
  }
};

// READ all flashcards
export const getFlashcards = async (req, res) => {
  try {
    const flashcards = await Flashcard.find().sort({ createdAt: -1 });
    return res.status(200).json(flashcards);
  } catch (error) {
    console.error("Error fetching flashcards:", error);
    return res.status(500).json({
      message: "Failed to fetch flashcards",
      error: error.message,
    });
  }
};

// READ a single flashcard by ID
export const getFlashcardById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidId(id)) {
      return res.status(400).json({ message: "Invalid flashcard ID" });
    }

    const flashcard = await Flashcard.findById(id);
    if (!flashcard) {
      return res.status(404).json({ message: "Flashcard not found" });
    }
    return res.status(200).json(flashcard);
  } catch (error) {
    console.error("Error fetching flashcard by ID:", error);
    return res.status(500).json({
      message: "Failed to fetch flashcard",
      error: error.message,
    });
  }
};

// UPDATE a flashcard by ID
export const updateFlashcard = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidId(id)) {
      return res.status(400).json({ message: "Invalid flashcard ID" });
    }

    const updatedFlashcard = await Flashcard.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true } // {new: true} returns the updated doc
    );

    if (!updatedFlashcard) {
      return res.status(404).json({ message: "Flashcard not found" });
    }
    return res.status(200).json(updatedFlashcard);
  } catch (error) {
    console.error("Error updating flashcard:", error);
    return res.status(500).json({
      message: "Failed to update flashcard",
      error: error.message,
    });
  }
};

// DELETE a flashcard by ID
export const deleteFlashcard = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidId(id)) {
      return res.status(400).json({ message: "Invalid flashcard ID" });
    }

    const deletedFlashcard = await Flashcard.findByIdAndDelete(id);

    if (!deletedFlashcard) {
      return res.status(404).json({ message: "Flashcard not found" });
    }
    return res.status(200).json({ message: "Flashcard deleted successfully" });
  } catch (error) {
    console.error("Error deleting flashcard:", error);
    return res.status(500).json({
      message: "Failed to delete flashcard",
      error: error.message,
    });
  }
};

