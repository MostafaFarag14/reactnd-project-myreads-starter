import React, { Component } from 'react'
import BookShelfBooks from './bookShelfBooks'
export default class BookShelf extends Component {
  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">Currently Reading</h2>
        <BookShelfBooks />
      </div>
    )
  }
}
