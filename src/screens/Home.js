import "../App.css";
import React, { useEffect, useState } from "react";
import * as BooksAPI from "../BooksAPI.js";
import { Shelf } from "../components/Shelf";
import { Link } from "react-router-dom";

export const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [books, setBooks] = useState([]);
  const [currentlyReading, setCurrentlyReading] = useState([]);
  const [wantToRead, setWantToRead] = useState([]);
  const [read, setRead] = useState([]);

  useEffect(() => {
    BooksAPI.getAll().then((fetchedBooks) => {
      setBooks(fetchedBooks);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    setCurrentlyReading(books.filter((book) => book.shelf === "currentlyReading"));
    setWantToRead(books.filter((book) => book.shelf === "wantToRead"));
    setRead(books.filter((book) => book.shelf === "read"));
  }, [books]);

  const updateBook = (updatedBook, shelf) => {
    BooksAPI.update(updatedBook, shelf).then(() => {
      if (shelf === "none") {
        setBooks(books.filter((book) => book.id !== updatedBook.id));
        return;
      }

      updatedBook.shelf = shelf;
      let filteredBooks = books.filter((book) => book.id !== updatedBook.id);
      setBooks([...filteredBooks, updatedBook]);
    });
  };

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <Shelf
            books={currentlyReading}
            isLoading={isLoading}
            category="Currently Reading"
            onUpdateBook={updateBook}/>
          <Shelf books={wantToRead} isLoading={isLoading} category="Want to Read" onUpdateBook={updateBook}/>
          <Shelf books={read} isLoading={isLoading} category="Read" onUpdateBook={updateBook}/>
        </div>
      </div>
      <Link to={"/search"} className="open-search">
        Add a book
      </Link>
    </div>
  );
}
