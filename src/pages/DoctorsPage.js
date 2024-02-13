import React, { useState } from 'react'
import './HomePage.css'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext'

const DoctorsPage = () => {
let {user,logoutUser} = useContext(AuthContext)
let [doctor,setdoctor] = useState() 

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
    <div>
        <p>Doctors Page</p>
    </div>
    </body>
  )
}

export default DoctorsPage