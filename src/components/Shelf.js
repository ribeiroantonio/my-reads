import React from "react";
import { Book } from "./Book";

export const Shelf = ({books, isLoading, category, onUpdateBook}) => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{category}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
        { isLoading && (<span>Loading...</span>)}
        { books.map((book) => (
          <li key={book.id}>
            <Book
              book={book}
              onUpdateBook={onUpdateBook}
            />
          </li>
        ))}
        </ol>
      </div>
    </div>
  )
}