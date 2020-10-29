import React from 'react'
import Book from './book'

export default function BookShelfBooks({ books }) {
  return (
    <div className="bookshelf-books">
      <ol className="books-grid">
        {books.map(book => (<Book book={book} />))}
      </ol>
    </div>
  )
}
