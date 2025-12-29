const mongoose = require("mongoose");
const Book = require("./models/Book");

mongoose.connect("mongodb://localhost:27017/bookshelf");

const books = [
    { title: "1984", author: "George Orwell", genre: "Dystopian", year: 1949 },
    { title: "The Hobbit", author: "J.R.R. Tolkien", genre: "Fantasy", year: 1937 },
    { title: "To Kill a Mockingbird", author: "Harper Lee", genre: "Drama", year: 1960 },
    { title: "Pride and Prejudice", author: "Jane Austen", genre: "Romance", year: 1813 }
];

async function seed() {
    await Book.deleteMany();
    await Book.insertMany(books);
    console.log("Books seeded");
    process.exit();
}

seed();
