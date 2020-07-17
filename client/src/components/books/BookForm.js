import React, {useState, useContext, useEffect} from 'react'
import BookContext from '../../context/book/bookContext'

const BookForm = () => {
  const bookContext = useContext(BookContext)

  const {addBook, updateBook, current, clearCurrent} = bookContext

  const initialState = {
    title: '',
    author: '',
    publisher: '',
    year: '',
    pages: '',
    isbn: '',
    about: '',
    readIn: '',
    type: 'Non Fiction'
  }

  useEffect(() => {
    if (current !== null) {
      setBook(current)
    } else {
      setBook(initialState)
    }
    // eslint-disable-next-line
  }, [bookContext, current])

  const [book, setBook] = useState(initialState)

  const { title, author, isbn, publisher, pages, year, about, readIn, type} = book

  const onChange = e =>
    setBook({...book, [e.target.name]: e.target.value})

  const onSubmit = e => {
    e.preventDefault()
    if (current === null) {
      addBook(book)
    } else {
      updateBook(book)
    }
    clearAll()
  }

  const clearAll = () => {
    clearCurrent()
  }

  return (
    <form onSubmit={onSubmit}>
      <h2 className='text-primary'>
        {current ? 'Edit Book' : 'Add Book'}
      </h2>
     
      <input type='text' name='title' placeholder='Title' value={title} onChange={onChange} />
      <input type='text' name='author' placeholder='Author' value={author} onChange={onChange} />
      <input type='text' name='publisher' placeholder='Publisher' value={publisher} onChange={onChange} />
      <input type='text' name='about' placeholder='About' value={about} onChange={onChange} />
      <input type='number' name='isbn' placeholder='ISBN' value={isbn} onChange={onChange} />
      <input type='number' name='pages' placeholder='No of pages' value={pages} onChange={onChange} />
      <input type='number' name='year' placeholder='Publication year' value={year} onChange={onChange} />
      <input type='text' name='readIn' placeholder='Read In' value={readIn} onChange={onChange} />

      <h5> Book Type </h5>
      <input type='radio' name='type' value='non-fiction' checked={type === 'non-fiction'} onChange={onChange}/>

      Non Fiction{' '}
      <input type='radio' name='type' value='fiction' checked={type === 'fiction'} onChange={onChange} />
      Fiction
      <div>
        <input type='submit'  value={current ? 'Update Book' : 'Add Book'} className='btn btn-primary btn-block' />
      </div>
      {current && (
        <div> <button className='btn btn-light btn-block' onClick={clearAll}>  Clear  </button>  </div>
      )}
    </form>
  )
}

export default BookForm
