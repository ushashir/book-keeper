import React, {Fragment} from 'react'

// Import Modules
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

// Import Utils
import setAuthToken from './utils/setAuthToken'

// Import Private Route
import PrivateRoute from './components/routing/PrivateRoute'

// Import Layouts
import Navbar from './components/layouts/Navbar'
import Alerts from './components/layouts/Alerts'

// Import Static Pages
import Home from './components/pages/Home';
import Welcome from './components/pages/Welcome';
import About from './components/pages/About';
import Footer from './components/pages/Footer';


// Import Components
import Signup from './components/auth/Signup'
import Login from './components/auth/Login'

// Import States
import BookState from './context/book/BookState'
import AuthState from './context/auth/AuthState'
import AlertState from './context/alert/AlertState'

// Import CSS
import './App.css'

if (localStorage.tokem) {
  setAuthToken(localStorage.token)
}

const App = () => {
  return (
    <AuthState>
      <BookState>
        <Router>
          <Fragment>
            <Navbar />
            <div className='container'>
              <AlertState>
                <Alerts />
                <Switch>
                  <PrivateRoute exact path='/' component={Home} />
                  <Route exact path='/welcome' component={Welcome} />
                  <Route exact path='/about' component={About} />
                  <Route exact path='/signup' component={Signup} />
                  <Route exact path='/login' component={Login} />
                </Switch>
              </AlertState>
            </div>
            <br /> <br />
          <Footer />
        </Fragment>
      </Router>
    </BookState>
  </AuthState>
  )
}

export default App;
