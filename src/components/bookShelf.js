import React from 'react'
import Book from './book'
export default function BookShelf({ shelf, books, moveBook }) {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{shelf}</h2>
      {/* <BookShelfBooks books={books} moveBook={moveBook}/> */}
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map((book, index) => (<Book key={index} book={book} moveBook={moveBook} />))}
        </ol>
      </div>
    </div>
  )
}
