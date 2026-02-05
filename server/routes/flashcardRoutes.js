import express from "express";
import { body } from "express-validator";
import {
  addFlashcard,
  getFlashcards,
  getFlashcardById,
  updateFlashcard,
  deleteFlashcard,
} from "../controllers/flashcardController.js";

const router = express.Router();

// Define validation rules
const addFlashcardRules = [
  body("term")
    .notEmpty()
    .trim()
    .escape()
    .withMessage("Term cannot be empty."),
  body("definition")
    .notEmpty()
    .trim()
    .escape()
    .withMessage("Definition cannot be empty."),
  body("topic").optional().trim().escape(),
];

router.post("/", addFlashcardRules, addFlashcard); // CREATE
router.get("/", getFlashcards); // READ (All)
router.get("/:id", getFlashcardById); // READ (One)
router.patch("/:id", updateFlashcard); // UPDATE
router.delete("/:id", deleteFlashcard); // DELETE

export default router;

