import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import BookShelf from './bookShelf'

const shelves = [
  {
    name: 'Currently Reading',
    id: 'currentlyReading'
  },
  {
    name: 'Want To Read',
    id: 'wantToRead'
  },
  {
    name: 'Read',
    id: 'read'
  }
]
export default class MainPage extends Component {

  filterByShelf = shelf => {
    return this.props.booksInShelves.filter(book => book.shelf === shelf)
  }
  render() {

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {shelves.map((shelf, index) => (
              <BookShelf key={index} shelf={shelf.name} books={this.filterByShelf(shelf.id)} moveBook={this.props.moveBook} />
            ))}
          </div>
        </div>
        <div className="open-search">
          <Link className='open-search-button' to='/search'>Add a book</Link>
        </div>
      </div>
    )
  }
}
