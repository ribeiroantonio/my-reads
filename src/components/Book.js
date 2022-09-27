import React from "react";

export const Book = ({book, onUpdateBook, showNoneOption = true}) => {
  return (
    <div className="book">
      <div className="book-top">
        <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${book.imageLinks ? book.imageLinks.thumbnail: ""})`
            }}
        ></div>
        <div className="book-shelf-changer">
          <select
            value={book.shelf !== undefined ? book.shelf : "none"}
            onChange={(e) => {onUpdateBook(book, e.target.value)}} >
            <option value="none" disabled>
                Move to...
            </option>
            <option value="currentlyReading">
                Currently Reading
            </option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            { showNoneOption && (<option value="none">None</option>)}
          </select>
        </div>
      </div>
      <div className="book-title">{book.title}</div>
      <div className="book-authors">{book.authors !== undefined ? book.authors.join(",") : ""}</div>
    </div>
  )
}
