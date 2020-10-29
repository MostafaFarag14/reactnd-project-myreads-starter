import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'

import SearchPage from './components/searchPage'
import MainPage from './components/mainPage'
import { Route } from 'react-router-dom'


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

  modifyBooksInShelves = (modifiedBook, shelf) => {
    this.setState( prevState => ({
      booksInShelves : this.state.booksInShelves.map( book => {
        if(book.id === modifiedBook.id){
          return {...book, shelf: shelf}
        }
        return book
      })
    }))

  }

  moveBook = (book, shelf) => {
    BooksAPI.update(book, shelf)
      .then(res => {
        console.log(res)
        this.modifyBooksInShelves(book, shelf)
      })
  }
  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <MainPage booksInShelves={this.state.booksInShelves} moveBook={this.moveBook} />)}
        />
        <Route path='/search' component={SearchPage} />
      </div>
    )
  }
}

export default BooksApp
