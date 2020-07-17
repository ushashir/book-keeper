import React, {Fragment, useContext} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import AuthContext from '../../context/auth/authContext'
import BookContext from '../../context/book/bookContext'

const Navbar = ({title, icon}) => {
  const authContext = useContext(AuthContext)
  const {clearBooks} = useContext(BookContext)

  const {isAuthenticated, logout, user} = authContext

  const onLogout = () => {
    logout()
    clearBooks()
  }

  const authLinks = (
    <Fragment>
      <li>{user && user.firstName}</li>
      <li>
        <a onClick={onLogout} href='#!'>
          <i className='fas fa-sign-out-alt'></i>{' '}
          <span className='hide-sm'>Logout</span>
        </a>
      </li>
    </Fragment>
  )

  const guestLinks = (
    <Fragment>
      <li>
        <Link to='/signup'>Sign Up</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </Fragment>
  )

  return (
    
      <div className='navbar bg-primary'>
        <h1>
          <Link to='/'>
            <i className={icon} /> {title}
          </Link>
        </h1>
        <ul>
        <li>
          <Link to='/welcome'>Home</Link>
        </li> 

          <li>
          <Link to='/about'>About</Link>
          </li> 
          {isAuthenticated ? authLinks : guestLinks}
        </ul>
    </div>
  )
}

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string
}

Navbar.defaultProps = {
  title: 'ReadingCom',
  icon: 'fas fa-id-card-alt'
}

export default Navbar
