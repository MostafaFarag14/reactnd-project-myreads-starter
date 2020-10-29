import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import BookShelf from './bookShelf'


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
            {['currentlyReading', 'wantToRead', 'read'].map(shelf => (
              <BookShelf shelf={shelf} books={this.filterByShelf(shelf)} />
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
