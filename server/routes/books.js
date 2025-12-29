const express = require("express");
const router = express.Router();
const Book = require("../models/Book");

// GET all books from MongoDB
router.get("/", async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

// ADD a book (logged-in users only)
router.post("/", async (req, res) => {
  if (!req.session.userId) return res.sendStatus(401);

  const book = await Book.create({
    ...req.body,
    createdBy: req.session.userId
  });

  console.log(new Date().toISOString(), req.session.userId);
  res.json(book);
});

// UPDATE a book (only owner)
router.put("/:id", async (req, res) => {
  const updated = await Book.findOneAndUpdate(
    { _id: req.params.id, createdBy: req.session.userId },
    req.body,
    { new: true }
  );
  res.json(updated);
});

// DELETE a book (only owner)
router.delete("/:id", async (req, res) => {
  await Book.findOneAndDelete({
    _id: req.params.id,
    createdBy: req.session.userId
  });
  res.sendStatus(204);
});

module.exports = router;
