import React from 'react'
import Book from './book'
export default function SearchBookResults({booksInShelves, searchResult, moveBook}) {
  return (
    <div className="search-books-results">
      <ol className="books-grid">
        {searchResult.map((foundBook, index) => {
          const BookOnShelf = booksInShelves.filter(book => book.id === foundBook.id)
          return (<Book key={index}
            book={{
              ...foundBook, shelf: BookOnShelf.length !== 0 ? BookOnShelf[0].shelf : 'none',
              authors: foundBook.hasOwnProperty('authors') ? foundBook.authors : []
            }}
            moveBook={moveBook} />)
        })}
      </ol>
    </div>
  )
}
