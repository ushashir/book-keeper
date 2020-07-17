import React from 'react';
import { Link } from 'react-router-dom';

const Welcome = () => {
  return (
    <div className='text-center'>
      <h1> Welcome to ReadingCom. </h1>
      <h2>The temple of readers</h2>
      <h2>We host and connect readers to promote global literacy</h2>
      <br />
      <div className="text-primary">
        <h3>  <Link to='/signup'>Sign Up Here</Link></h3>
        <h3> <Link to='/login'>Login Here</Link></h3> 
      </div>
      
    </div>
  )
}

export default Welcome
