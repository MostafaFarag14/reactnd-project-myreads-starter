import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'
import Book from './book'

export default class SearchPage extends Component {
  state = {
    query: '',
    result: []
  }
  updateQuery = e => {
    const value = e.target.value;
    this.setState(prevState => ({ query: value }), () => {
      if (this.state.query !== '') {
        BooksAPI.search(this.state.query)
          .then(books => {
            if (Array.isArray(books)) {
              this.setState(prevState =>
                ({ result: books.filter(book => book.hasOwnProperty('authors') && book.hasOwnProperty('imageLinks')) }))
            }
          })
          .catch(error => console.log(error))
      }
      else {
        this.setState(prevState => ({ result: [] }))
      }
    })
  }


  render() {
    const { moveBook } = this.props
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to='/'>Close</Link>
          <div className="search-books-input-wrapper">
            {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
            <input type="text" placeholder="Search by title or author"
              value={this.state.query} onChange={this.updateQuery} />

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.result.map((foundBook, index) => {
              const BookOnShelf = this.props.booksInShelves.filter(book => book.id === foundBook.id)
              return (<Book key={index}
                book={{ ...foundBook, shelf: BookOnShelf.length !== 0 ? BookOnShelf[0].shelf : 'none' }}
                moveBook={moveBook} />)
            })}
          </ol>
        </div>
      </div>
    )
  }
}
