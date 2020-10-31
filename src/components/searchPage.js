import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'
import SearchBookResults from './searchBookResults'

const searchTerms = ['Android', 'Art', 'Artificial Intelligence', 'Astronomy', 'Austen', 'Baseball', 'Basketball', 'Bhagat', 'Biography', 'Brief', 'Business', 'Camus', 'Cervantes', 'Christie', 'Classics', 'Comics', 'Cook', 'Cricket', 'Cycling', 'Desai', 'Design', 'Development', 'Digital Marketing', 'Drama', 'Drawing', 'Dumas', 'Education', 'Everything', 'Fantasy', 'Film', 'Finance', 'First', 'Fitness', 'Football', 'Future', 'Games', 'Gandhi', 'Homer', 'Horror', 'Hugo', 'Ibsen', 'Journey', 'Kafka', 'King', 'Lahiri', 'Larsson', 'Learn', 'Literary Fiction', 'Make', 'Manage', 'Marquez', 'Money', 'Mystery', 'Negotiate', 'Painting', 'Philosophy', 'Photography', 'Poetry', 'Production', 'Programming', 'React', 'Redux', 'River', 'Robotics', 'Rowling', 'Satire', 'Science Fiction', 'Shakespeare', 'Singh', 'Swimming', 'Tale', 'Thrun', 'Time', 'Tolstoy', 'Travel', 'Ultimate', 'Virtual Reality', 'Web Development', 'iOS']

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
                ({ result: books.filter(book => book.hasOwnProperty('imageLinks')) }))
            }
            else {
              this.setState(prevState => ({ result: [] }))
            }
          })
          .catch( error => console.log(error))
      }
      else {
        this.setState(prevState => ({ result: [] }))
      }
    })
  }


  render() {
    const suggestions = this.state.query ?
      searchTerms.filter(term => term.startsWith(this.state.query[0].toUpperCase() + this.state.query.substr(1))) : []
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
            <input type="search" placeholder="Search by title or author"
              value={this.state.query} onChange={this.updateQuery}
              list='suggestions' autoComplete='startWith' />
            {
              this.state.query &&
              <datalist id="suggestions">
                {suggestions.map((term, index) => <option key={index} value={term} />)}
              </datalist>
            }
          </div>
        </div>
        <SearchBookResults booksInShelves={this.props.booksInShelves}
          searchResult={this.state.result}
          moveBook={this.props.moveBook}
        />
      </div>
    )
  }
}
