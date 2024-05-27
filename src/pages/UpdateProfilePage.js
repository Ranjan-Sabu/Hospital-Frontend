import React, { useContext, useEffect, useState } from 'react';
import './UpdateProfilePage.css';
import AuthContext from '../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { fetchDoctorDetails } from './DoctorsPage'; 

function UpdateProfilePage() {
  const navigate = useNavigate();
  const [value, setValue] = useState({});
  const { user, authToken } = useContext(AuthContext);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/userprofile/", {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + String(authToken.access),
        },
      });

      if (response.status === 200) {
        const data = await response.data;
        setValue(data.data);
        console.log("Fetched Data:", data.data);
      } else {
        console.log('Error fetching user profile');
      }
    } catch (error) {
      console.error('Error fetching user profile', error);
    }
  };

  const EditProfile = async (e) => {
    e.preventDefault();
  
    const patchData = {
      username: e.target.username.value,
      // email: e.target.email.value,
      first_name: e.target.firstname.value,
      last_name: e.target.lastname.value,
    };
  
    if (user.is_doctor) {
      patchData.doctors = {
        hospital: e.target.hospital.value || null,
        department: e.target.department.value || null,
      };
    }
  
    try {
      const response = await axios.patch('http://127.0.0.1:8000/userprofile/', patchData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken.access}`,
        },
      });
      fetchDoctorDetails()
      if (response.status === 200) {
        if (user.is_doctor) {
          navigate('/doctor');
        } else {
          navigate('/');
        }
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      if (error.response) {
        console.error('Error response status:', error.response.status);
        console.error('Error response data:', error.response.data);
      }
    }
  };
  
  if (!value.username) {
    return <div>Loading...</div>; 
  }

  return (
    <>
    <section className="vh-100" style={{ backgroundColor: "GrayText" }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-lg-6 mb-4 mb-lg-0">
            <div className="card mb-3" style={{ borderRadius: ".5rem" }}>
              <div className="row g-0">
                <div className="col-md-4 gradient-custom text-center text-white"
                  style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem', backgroundColor: "Highlight" }}>
                  <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                    alt="Avatar" className="img-fluid my-5" style={{ width: "80px" }} />
                  <h5>{value.username}</h5>
                  <p>{user.is_doctor ? 'Doctor' : 'Web Designer'}</p>
                  <i className="far fa-edit mb-5"></i>
                </div>
                <div className="col-md-8">
                  <div className="card-body p-4">
                    <h6>PROFILE</h6>
                    <hr className="mt-0 mb-4" />
                    <div className="row pt-1">
                      <div className="col-6 mb-3">
                        <h6>Email</h6>
                        <p className="text-muted">{value.email}</p>
                      </div>
                    </div>
                   
                    <hr className="mt-0 mb-4" />
                    <form onSubmit={EditProfile} className="form update-form">
                      <div className="row mb-3">
                        <div className="col-md-6">
                          <label htmlFor="username" className="form-label">
                            Username:
                          </label>
                          <input
                            id="username"
                            className='form-control'
                            name="username"
                            placeholder="Username"
                            required
                            type="text"
                            Value={value.username || ''}
                          />
                        </div>

                        <div className="col-md-6">
                          <label htmlFor="firstname" className="form-label">
                            First Name:
                          </label>
                          <input
                            id="firstname"
                            className='form-control'
                            name="firstname"
                            placeholder="First Name"
                            required
                            type="text"
                            defaultValue={value.first_name || ''}
                          />
                        </div>
                      </div>

                      <div className="row mb-3">
                        <div className="col-md-6">
                          <label htmlFor="lastname" className="form-label">
                            Last Name:
                          </label>
                          <input
                            id="lastname"
                            className='form-control'
                            name="lastname"
                            placeholder="Last Name"
                            required
                            type="text"
                            defaultValue={value.last_name || ''}
                          />
                        </div>

                        {user.is_doctor ? (
                          <>
                            <div className="col-md-6">
                              <label htmlFor="hospital" className="form-label">
                                Hospital:
                              </label>
                              <input
                                id="hospital"
                                className='form-control'
                                name="hospital"
                                placeholder="Hospital"
                                defaultValue={value.doctors && value.doctors?.hospital || ''}
                              />
                            </div>

                            <div className="col-md-6">
                              <label htmlFor="department" className="form-label">
                                Department:
                              </label>
                              <input
                                id="department"
                                className='form-control'
                                name="department"
                                placeholder="Department"
                                defaultValue={value.doctors && value.doctors?.department || ''}
                              />
                            </div>
                          </>
                        ) : null}
                      </div>


                      <button className='btn btn-primary' type="submit">Update</button>
                   </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div>
      <div className="container">
        <div className="row">
          <form onSubmit={EditProfile} className="form update-form" style={{ textAlign: 'center' }}>
            <div className="segment"></div>
            <label className="label">
              <input className='input' name="username" placeholder="Username" required type="text" Value={value.username || ''} />
            </label>
            <label className="label">
              <input className='input' name="firstname" placeholder="First Name" required type="text" defaultValue={value.first_name || ''} />
            </label>
            <label className="label">
              <input className='input' name="lastname" placeholder="Last Name" required type="text" defaultValue={value.last_name || ''} />
            </label>
            <label className="label">
              <input className='input' name="email" placeholder="Email" required type="email" defaultValue={value.email || ''} />
            </label>
            {user.is_doctor ? (
              <>
                <label className='label'>
                  <input className='input' name="hospital" placeholder="Hospital" defaultValue={value.doctors&& value.doctors?.hospital || ''} />
                </label>
                <label className="label">
                  <input className='input' name="department" placeholder="Department" defaultValue={value.doctors && value.doctors?.department || ''} />
                </label>
              </>
            ) : null}
            <br />
            <button className='button' type="submit">Update</button>
          </form>
        </div>
      </div>
    </div>
    </>
  );
}

export default UpdateProfilePage;
