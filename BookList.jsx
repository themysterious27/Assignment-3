import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function BookList() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("india");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${search}`)
      .then((res) => res.json())
      .then((data) => {
        setBooks(data.items || []);
        setLoading(false);
      });
  }, [search]);

  return (
    <div className="container">
      <h2>Book List</h2>

      <input
        type="text"
        placeholder="Search book..."
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading ? (
        <p>Loading...</p>
      ) : (
        books.map((book) => (
          <div key={book.id} className="book-card">
            <h3>{book.volumeInfo.title}</h3>

            {book.volumeInfo.imageLinks && (
              <img
                src={book.volumeInfo.imageLinks.thumbnail}
                alt=""
              />
            )}

            <Link to={`/books/${book.id}`}>
              <button>View</button>
            </Link>
          </div>
        ))
      )}
    </div>
  );
}

export default BookList;