import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import BookContext from '../../context/book/bookContext'

const BookItem = ({ book }) => {
  const bookContext = useContext(BookContext)
  const {deleteBook, setCurrent, clearCurrent} = bookContext

  const {_id, title, author, isbn, publisher, pages, year, about, readIn, type} = book

  const onDelete = () => {
    deleteBook(_id)
    clearCurrent()
  }

  return (
    <div className='card bg-light'>
      <h3 className='text-primary text-left'>
        {title} {' '}
        <span style={{float: 'right'}} className={ 'badge ' +
            (type === 'non-ficition' ? 'badge-success' : 'badge-primary')
          }>
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
      </h3>
      
        <h4 className='text-primary text-left'>
          <i> by {author}{' '} </i>  
        
        </h4>
            <p> <i>Publisher:</i>  {publisher} {''} <i>Year:</i> {year}{''}. <i>Pages:</i> {pages}{''} </p>
            <p><i>About:</i> {about}{''} </p>
            <p>
              <i >ReadIn:</i> <span className="text-primary"> {readIn}{''} {''} </span> 
              <i>ISBN:</i> {isbn}{''} 
            </p>
      
      <p>
        <button className='btn btn-dark btn-sm' onClick={() => setCurrent(book)}> Edit </button>
        <button className='btn btn-danger btn-sm' onClick={onDelete}> Delete </button>
      </p>
    </div>
  )
}

BookItem.propTypes = {
  book: PropTypes.object.isRequired
}

export default BookItem;
