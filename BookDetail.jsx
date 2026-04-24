import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function BookDetail() {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    fetch(`https://www.googleapis.com/books/v1/volumes/${id}`)
      .then((res) => res.json())
      .then((data) => setBook(data));
  }, [id]);

  if (!book) return <p>Loading...</p>;

  const info = book.volumeInfo;

  const addFavorite = () => {
    let favs = JSON.parse(localStorage.getItem("fav")) || [];
    if (!favs.includes(id)) {
      favs.push(id);
      localStorage.setItem("fav", JSON.stringify(favs));
    }
    alert("Added to favorites");
  };

  return (
    <div className="container">
      <h2>{info.title}</h2>

      <p><b>Author:</b> {info.authors?.join(", ")}</p>

      <p>{info.description}</p>

      {info.imageLinks && (
        <img src={info.imageLinks.thumbnail} alt="" />
      )}

      <br />

      <button onClick={addFavorite}>Add to Favorites</button>
    </div>
  );
}

export default BookDetail;