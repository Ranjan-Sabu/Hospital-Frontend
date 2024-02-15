import React, { useState } from 'react'
import './HomePage.css'
import './DoctorPage.css'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext'

const DoctorsPage = () => {
let {user,logoutUser} = useContext(AuthContext)

  return (
    <body>
    <header>
    <nav class="navbar navbar-expand-lg navbar-light bg-primary fixed-top">
        <div class="container-fluid">
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

                <a class="navbar-brand d-lg-none" href="#">City Hospital</a>
      
          <div class="collapse navbar-collapse" id="navbarResponsive">
            <div class="left-section d-flex align-items-center">
              <a class="navbar-brand d-none d-lg-block" href="#">City Hospital</a>
              <ul class="navbar-nav">
                <li class="nav-item active">
                  <a class="nav-link text-light" href="{% url 'home' %}"><b>Home</b><span class="sr-only">(current)</span></a>
                </li>
                <li class="nav-item">
                  <a href="" class="nav-link text-light"><b>About</b></a>
                </li>
                {/* <li class="nav-item active">
                  <a class="nav-link dropdown-toggle text-light" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                   <b>Categories</b>
                  </a>
                  <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                      <a class="dropdown-item" href=""></a>
                  </div>
                </li> */}
              </ul>
            </div>
      
         
      
            <div class="right-section d-flex align-items-center ml-auto">
               
               {
                  user ? (
                    <div className="user-info-container">
                    <img
                      src="https://bootdey.com/img/Content/avatar/avatar3.png"
                      alt=""
                      className="rounded-circle user-avatar"
                    />
                    <p className="username">{user.username}</p>
                    <button id="logout-btn" onClick={logoutUser}>Logout</button>
                  </div>
                  ) : (
                    <>
                      <button class="rounded-circle"><Link to='/login'>Login</Link></button>
                      <button class="rounded-circle"><Link to='/register' style={{textDecoration:'none'}}>Register</Link></button>
                    </>
                  )
                }

            </div>
          </div>
        </div>
      </nav>
    </header>
    <br></br>
    <div class="containerss">
    <div class="containers">
    <h2>Welcome, Dr. John Doe!</h2>

    <p><strong>Name:</strong> Dr. John Doe</p>
    <p><strong>Specialization:</strong> Cardiologist</p>
    <p><strong>Email:</strong> john.doe@example.com</p>

    <p>Welcome to your doctor home page. You can manage your details, view appointments, and more.</p>
  </div>
  </div>
    </body>
  )
}

export default DoctorsPage