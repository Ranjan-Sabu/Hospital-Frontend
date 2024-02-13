import React, { useContext } from 'react'
import './HomePage.css'
import AuthContext from '../context/AuthContext'
import { Link } from 'react-router-dom'


const Homepage = () => {
  let {user,logoutUser} = useContext(AuthContext)
  console.log('user',user)
  return (
  
    <body>
    <header>
      <nav>
        <div class="logo">Hospital Name</div>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="#doctors">Doctors</a></li>
        </ul>
        <div className="user-actions">
        {user ? (
          <>
            <button id="profile-btn">Profile</button>
           <p>{user.username}</p> 
            <button id="logout-btn" onClick={logoutUser}>Logout</button>
          </>
        ) : (
        <button id="login-btn"><Link to='/login'>Login</Link></button>
        )}
      </div>
      </nav>
    </header>
     <div className="main">
     </div>
  
    <footer>
      <p>&copy; 2024 Hospital Name. All rights reserved.</p>
    </footer>
  
  </body>
  )
}

export default Homepage