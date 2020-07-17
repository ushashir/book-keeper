import React, {useState, useContext, useEffect} from 'react';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';
import { Link } from 'react-router-dom';

const Register = props => {
  const alertContext = useContext(AlertContext)
  const authContext = useContext(AuthContext)

  const {setAlert} = alertContext
  const {register, error, clearErrors, isAuthenticated} = authContext

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/')
    }

    if (error && error.keyword === 'exists') {
      setAlert(error.msg, 'danger')
      clearErrors()
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history])

  const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    occupation: '',
    password: '',
    confirmPassword: ''
  }

  const [user, setUser] = useState(initialState)

  const {firstName, lastName, email, password, confirmPassword} = user

  const onChange = e => setUser({...user, [e.target.name]: e.target.value})

  const onSubmit = e => {
    e.preventDefault()
    if (
      firstName === '' ||
      lastName === '' ||
      email === '' ||
      password === '' ||
      confirmPassword === ''
    ) {
      setAlert('Please enter all fields', 'danger')
    } else if (password !== confirmPassword) {
      setAlert('Passwords do not match', 'danger')
    } else {
      register({firstName, lastName, email, password})
    }
  }

  return (
    <div className='form-container'>
      <h1>
        <span className='text-primary'>Sign Up Here</span>
      </h1>

      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='firstName'>First Name</label>
          <input type='text' name='firstName' value={firstName} onChange={onChange}  required  />
        </div>
        <div className='form-group'>
          <label htmlFor='lastName'>Last Name</label>
          <input  type='text'  name='lastName' value={lastName}  onChange={onChange} />
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Email Address</label>
          <input  type='email' name='email'  value={email}  onChange={onChange} required />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input type='password' name='password'  value={password}  onChange={onChange}  required  minLength='8' />
        </div>
        <div className='form-group'>
          <label htmlFor='confirmPassword'>Confirm Password</label>
          <input  type='password' name='confirmPassword' value={confirmPassword} onChange={onChange} required  minLength='8' />
        </div>
        <input  type='submit'  value='Register' className='btn btn-primary btn-block' />
        <p> Already have an Account ! <span className='text-primary'> <Link to='/login'>Login Here</Link> </span></p>
      </form>
    </div>
  )
}

export default Register
