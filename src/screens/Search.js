import "../App.css";
import React, { useEffect, useState, useRef } from "react";
import * as BooksAPI from "../BooksAPI.js";
import { Link } from "react-router-dom";
import { Book } from "../components/Book";
import debounce from "lodash.debounce";

export const Search = () => {
  const [query, setQuery] = useState("");
  const [searchedBooks, setSearchedBooks] = useState([]);
  const [filteredSearchedBooks, setFilteredSearchedBooks] = useState([]);
  const [bookShelves, setBookShelves] = useState(new Map());

  useEffect(() => {
    BooksAPI.getAll().then((fetchedBooks) => {
      let map = new Map();
      fetchedBooks.map((book) => map.set(book.id, book));
      setBookShelves(map);
    });
  }, []);

  const debouncedQuery = useRef(debounce(nextValue => search(nextValue), 500)).current;

  const search = (value) => {
    if (value) {
      BooksAPI.search(value).then((data) => {
        if (data.error) {
          console.log("Search error");
        } else {
          setSearchedBooks(data);
        }
      });
    } else {
      setSearchedBooks([]);
    }
  };

  const handleOnChange = e => {
    const { value: nextValue } = e.target;
    setQuery(nextValue);

    debouncedQuery(nextValue);
  }

  useEffect(() => {
    const map = searchedBooks.map((book) => {
      return bookShelves.has(book.id) ? bookShelves.get(book.id) : book;
    });
    setFilteredSearchedBooks(map);
  }, [searchedBooks]);

  const rearrangeShelf = (book, shelf) => {
    const newBooks = searchedBooks.map((b) => {
      if (b.id === book.id) {
        book.shelf = shelf;
        return book;
      }
      return b;
    });
    setSearchedBooks(newBooks);

    BooksAPI.update(book, shelf);
  };

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link to={"/"} className="close-search">
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title, author, or ISBN"
            value={query}
            onChange={handleOnChange}
          />
        </div>
      </div>
      <div className="search-books-results">
        {searchedBooks.length > 0 && (
          <ol className="books-grid">
            {filteredSearchedBooks.map((book) => (
              <li key={book.id}>
                <Book
                  book={book}
                  onUpdateBook={rearrangeShelf}
                  showNoneOption={false}
                />
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
}
