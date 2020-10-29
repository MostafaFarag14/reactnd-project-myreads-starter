import React, { Component } from 'react'

const options = [
  {
    value: 'currentlyReading',
    text: 'Currently Reading'
  },
  {
    value: 'wantToRead',
    text: 'Want to Read'
  },
  {
    value: 'read',
    text: 'Read'
  },
  {
    value: 'none',
    text: 'None'
  }
]
export default class Book extends Component {
  render() {
    const { book, moveBook } = this.props
    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
            <div className="book-shelf-changer">
              <select value={book.shelf} onChange={e => moveBook(book, e.target.value)}>
                <option value="move" disabled>Move to...</option>
                {options.map((option, index) => (<option key={index} value={option.value}
                >
                  {option.text}
                </option>))}
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          {
            book.authors !== undefined &&
            <div className="book-authors">{book.authors.map((author, index) => <div key={index}>{author}</div>)}</div>
          }
        </div>
      </li>
    )
  }
}
