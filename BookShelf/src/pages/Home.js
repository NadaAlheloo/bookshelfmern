import { useEffect, useState } from "react";

export default function Home() {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({
    title: "",
    author: "",
    genre: "",
    year: ""
  });
  const [editId, setEditId] = useState(null);

  // LOAD books from MongoDB (not mock data)
  const loadBooks = async () => {
    const res = await fetch("http://localhost:5000/api/books", {
      credentials: "include"
    });
    const data = await res.json();
    setBooks(data);
  };

  useEffect(() => {
    loadBooks();
  }, []);

  // ADD or UPDATE book
  const submit = async e => {
    e.preventDefault();

    await fetch(
      "http://localhost:5000/api/books" + (editId ? "/" + editId : ""),
      {
        method: editId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form)
      }
    );

    setForm({ title: "", author: "", genre: "", year: "" });
    setEditId(null);
    loadBooks();
  };

  // DELETE book
  const deleteBook = async id => {
    await fetch("http://localhost:5000/api/books/" + id, {
      method: "DELETE",
      credentials: "include"
    });
    loadBooks();
  };

  return (
    <div>
      <h2>{editId ? "Edit Book" : "Add Book"}</h2>

      <form onSubmit={submit}>
        <input
          placeholder="Title"
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
        />
        <input
          placeholder="Author"
          value={form.author}
          onChange={e => setForm({ ...form, author: e.target.value })}
        />
        <input
          placeholder="Genre"
          value={form.genre}
          onChange={e => setForm({ ...form, genre: e.target.value })}
        />
        <input
          placeholder="Year"
          value={form.year}
          onChange={e => setForm({ ...form, year: e.target.value })}
        />
        <button>{editId ? "Update" : "Add"}</button>
      </form>

      <h2>Books</h2>
      {books.map(book => (
        <div key={book._id}>
          <b>{book.title}</b> – {book.author}
          <button onClick={() => {
            setEditId(book._id);
            setForm(book);
          }}>
            Edit
          </button>
          <button onClick={() => deleteBook(book._id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
