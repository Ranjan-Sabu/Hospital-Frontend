import React, { useContext, useEffect, useState } from 'react'
import './HomePage.css'
import AuthContext from '../context/AuthContext'
import { Link } from 'react-router-dom'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'



const Homepage = () => {
  let {user,authToken,logoutUser} = useContext(AuthContext)
  console.log('user',user)
  let [doctorList,setDoctorList] = useState(null)
  let [dataFetched, setDataFetched] = useState(false);
  console.log('doctorlist', doctorList);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/doctorlist/', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + String(authToken.access),
        }
      });
      console.log(response);

      if (response.status === 200) {  // Check the status instead of response.data
        const data = await response.data;
        setDoctorList(data);
        setDataFetched(true);
        console.log(data);
      } else if (response.status === 401) {
        alert('Unauthorized');
      }
    } catch (error) {
      console.log('Error when fetching doctors', error);
    }
  }

  useEffect(() => {
    if (!dataFetched) {
      fetchDoctors();
    }
  }, [dataFetched]);

  // Rest of your component code

  return (
    <body>
    <header>
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZwT" crossorigin="anonymous"/>

<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>

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
    <div className="main container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
  <img className='image img-fluid' src='https://continentalhospitals.com/images/slides/1aacccd507c773c0c880df7562bcc6df.jpg' alt="Hospital Image" />

  <div className="row mt-4">
    {doctorList && doctorList.map((doctor, index) => (
      <div key={index} className="col-md-4 mb-4">
        <div className="card" style={{ width: '100%' }}>
          {/* Assuming the doctor's image is available in the doctor object */}
          <img className="card-img-top" src={doctor.imageSrc} alt={`Dr. ${doctor.username}`} />

          <div className="card-body">
            <h5 className="card-title">{doctor.username}</h5>
            <h6 className="card-subtitle mb-2 text-muted">{doctor.doctor[0].department}</h6>
            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <a href="#" className="btn btn-primary">Go somewhere</a>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

  
    <footer>
      <p>&copy; 2024 Hospital Name. All rights reserved.</p>
    </footer>
  
  </body>
  )
}

export default Homepage