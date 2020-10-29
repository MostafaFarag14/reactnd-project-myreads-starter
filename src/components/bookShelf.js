import React, { Component } from 'react'
import BookShelfBooks from './bookShelfBooks'
export default function BookShelf({ shelf, books }) {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{shelf}</h2>
      <BookShelfBooks books={books} />
    </div>
  )
}
