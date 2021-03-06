import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'

import SearchPage from './components/searchPage'
import MainPage from './components/mainPage'
import { Route, Switch } from 'react-router-dom'
import ErrorPage from './components/errorPage'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    booksInShelves: []
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then(books => this.setState(prevState => ({ booksInShelves: books })))
  }

  modifyBooksInShelves = (bookToAdd, shelf) => {
    const BookOnShelf = this.state.booksInShelves.filter(book => book.id === bookToAdd.id)
    BookOnShelf.length !== 0 ?
      shelf === 'none' ? this.setState({ booksInShelves: this.state.booksInShelves.filter(book => book.id !== bookToAdd.id) })
        :
        this.setState(prevState => ({
          booksInShelves: this.state.booksInShelves.map(book => {
            if (book.id === bookToAdd.id) {
              return { ...book, authors: bookToAdd.authors, shelf: shelf }
            }
            return book
          })
        }))
      :
      this.setState(prevState => ({ booksInShelves: [...prevState.booksInShelves, { ...bookToAdd, shelf: shelf }] }),)
  }

  moveBook = (book, shelf) => {
    this.modifyBooksInShelves(book, shelf)
    BooksAPI.update(book, shelf)
  }
  render() {
    return (
      <div className="app" >
        <Switch>
          <Route exact path='/' render={() => (
            <MainPage booksInShelves={this.state.booksInShelves} moveBook={this.moveBook} />)}
          />
          <Route path='/search' render={() => (
            <SearchPage moveBook={this.moveBook} booksInShelves={this.state.booksInShelves} />
          )} />
          <Route component={ErrorPage} />
        </Switch>
      </div>
    )
  }
}

export default BooksApp
