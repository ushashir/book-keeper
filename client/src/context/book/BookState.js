import React, {useReducer} from 'react'
import axios from 'axios'
import BookContext from './bookContext'
import bookReducer from './bookReducer'
import {
          GET_BOOKS,
          ADD_BOOK,
          BOOK_ERROR,
          DELETE_BOOK,
          SET_CURRENT,
          CLEAR_CURRENT,
          UPDATE_BOOK,
          FILTER_BOOKS,
          CLEAR_BOOKS,
          CLEAR_FILTER  
                         } from '../types'
import setAuthToken from '../../utils/setAuthToken'

const BookState = props => {
  const initialState = {
    books: null,
    current: null,
    filtered: null,
    error: null
  }

  const [state, dispatch] = useReducer(bookReducer, initialState)

  // add book
  const addBook = async book => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    try {
      const res = await axios.post('/api/books', book, config)

      dispatch({type: ADD_BOOK, payload: res.data})
    } catch (err) {
      dispatch({type: BOOK_ERROR, payload: err.response.data})
    }
  }

  // update book
  const updateBook = async book => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    try {
      const res = await axios.put(
        `/api/books/${book._id}`,
        book,
        config
      )

      dispatch({type: UPDATE_BOOK, payload: res.data})
    } catch (err) {
      dispatch({type: BOOK_ERROR, payload: err.response.data})
    }
  }

  // get books
  const getBooks = async book => {
    if (localStorage.token) {
      setAuthToken(localStorage.token)
    }

    try {
      const res = await axios.get('/api/books')

      dispatch({type: GET_BOOKS, payload: res.data})
    } catch (err) {
      dispatch({type: BOOK_ERROR, payload: err.response.data})
    }
  }

  // delete book
  const deleteBook = async id => {
    try {
      await axios.delete(`/api/books/${id}`)

      dispatch({type: DELETE_BOOK, payload: id})
    } catch (err) {
      dispatch({type: BOOK_ERROR, payload: err.response.data})
    }
  }

  // clear books
  const clearBooks = () => {
    dispatch({type: CLEAR_BOOKS})
  }

  // set current book
  const setCurrent = book => {
    dispatch({type: SET_CURRENT, payload: book})
  }

  // clear current book
  const clearCurrent = () => {
    dispatch({type: CLEAR_CURRENT})
  }

  // filter books
  const filterBooks = text => {
    dispatch({type: FILTER_BOOKS, payload: text})
  }

  // clear Filter
  const clearFilter = () => {
    dispatch({type: CLEAR_FILTER})
  }

  return (
    <BookContext.Provider
      value={{
        books: state.books,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        getBooks,
        addBook,
        updateBook,
        deleteBook,
        filterBooks,
        clearFilter,
        clearBooks,
        setCurrent,
        clearCurrent
      }}>
      {props.children}
    </BookContext.Provider>
  )
}

export default BookState
