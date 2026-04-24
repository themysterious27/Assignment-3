import React, { useEffect, useState } from "react";

function Favorites() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("fav")) || [];

    Promise.all(
      favs.map((id) =>
        fetch(`https://www.googleapis.com/books/v1/volumes/${id}`)
          .then((res) => res.json())
      )
    ).then((data) => setBooks(data));
  }, []);

  return (
    <div className="container">
      <h2>Favorites</h2>

      {books.map((book) => (
        <div key={book.id} className="book-card">
          <h3>{book.volumeInfo.title}</h3>
        </div>
      ))}
    </div>
  );
}

export default Favorites;