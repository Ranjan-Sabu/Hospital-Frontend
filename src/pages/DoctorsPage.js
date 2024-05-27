import React, { useState } from 'react'
import './HomePage.css'
import './DoctorPage.css'
import { Link, useActionData } from 'react-router-dom'
import { useContext,useEffect } from 'react'
import AuthContext from '../context/AuthContext'
import axios from 'axios'

export const fetchDoctorDetails = async (authToken, setDoctorDetails) => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/userprofile/', {
      headers: {
        'Authorization': 'Bearer ' + String(authToken.access),
      },
    });

    if (response.status === 200) {
      const doctorData = response.data.data;
      console.log('Fetched Doctor Details:', doctorData);
      setDoctorDetails(doctorData);
    } else {
      console.log('Failed to fetch doctor details.');
    }
  } catch (error) {
    console.error('Error fetching doctor details:', error);
  }
};

const DoctorsPage = () => {
let {user,logoutUser,authToken} = useContext(AuthContext)
  
const [doctorDetails, setDoctorDetails] = useState({});
useEffect(() => {
  const fetchDetails = async () => {
    if (authToken && authToken.access) {
      await fetchDoctorDetails(authToken, setDoctorDetails);
    }
  };

  fetchDetails();
}, [authToken]);



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
                 <Link to='/doctor'><a class="nav-link text-light"><b>Home</b><span class="sr-only">(current)</span></a></Link> 
                </li>
              </ul>
            </div>

            <div class="right-section d-flex align-items-center ml-auto">
               
               {
                  user ? (
                    <div className="user-info-container">
                  <Link to='/updateprofile'>
                    <img
                      src="https://bootdey.com/img/Content/avatar/avatar3.png"
                      alt=""
                      className="rounded-circle user-avatar"
                    />
                    </Link>

                    <p className="username">{doctorDetails.username}</p>
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
    <h2>Welcome, Dr.{doctorDetails.username}!</h2>

    <p><strong>Name:</strong> {doctorDetails.first_name}</p>
    <p><strong>Department:</strong> {doctorDetails.doctors?.department  || ''}</p>
    <p><strong>Hospital:</strong> {doctorDetails.doctors?.hospital  || ''}</p>

    <p><strong>Email:</strong> {doctorDetails.email}</p>

    <p>Welcome to your doctor home page. You can manage your details, view appointments, and more.</p>
  </div>
  </div>
    </body>
  )
}

export default DoctorsPage