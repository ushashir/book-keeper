import React, {useContext, useEffect} from 'react'
import Books from '../books/Books'
import BookForm from '../books/BookForm'
import BookFilter from '../books/BookFilter'
import AuthContext from '../../context/auth/authContext'
import BookContext from '../../context/book/bookContext'

const Home = () => {
  const {loadUser} = useContext(AuthContext)
  const {books} = useContext(BookContext)

  useEffect(() => {
    loadUser()
    // eslint-disable-next-line
  }, [])

  return (
    <div className='grid-2'>
      <div className=''>
        <BookForm />
      </div>
      <div className=''>
        {books !== null && <BookFilter />}
        <Books />
      </div>
    </div>
  )
}

export default Home
