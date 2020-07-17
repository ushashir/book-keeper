import React, {useState, useContext, useEffect} from 'react';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';
import { Link } from 'react-router-dom';

const Login = props => {
  const alertContext = useContext(AlertContext)
  const authContext = useContext(AuthContext)

  const initialState = {
    email: '',
    password: ''
  }

  const {setAlert} = alertContext
  const {login, error, clearErrors, isAuthenticated} = authContext

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/')
    }

    if (error && error.keyword === 'invalid') {
      setAlert(error.msg, 'danger')
      clearErrors()
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history])

  const [user, setUser] = useState(initialState)

  const {email, password} = user

  const onChange = e => setUser({...user, [e.target.name]: e.target.value})

  const onSubmit = e => {
    e.preventDefault()
    if (email === '' || password === '') {
      setAlert('Please enter all fields', 'danger')
    } else {
      login({email, password})
    }
  }

  return (
    <div className='form-container'>
      <h1>
         <span className='text-primary'>Login Here</span>
      </h1>
      <form onSubmit={onSubmit}>

        <div className='form-group'>
          <label htmlFor='email'>Email Address</label>
          <input  type='email'  name='email' value={email}  onChange={onChange}  required  />
        </div>

        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input type='password' name='password' value={password} onChange={onChange} required />
        </div>
        <input  type='submit' value='Login'  className='btn btn-primary btn-block' />
        <p>I don't have an Account ! <span className='text-primary'> <Link to='/signup'>Sign Up Here</Link> </span></p> 
      
        
      </form>
    </div>
  )
}

export default Login
