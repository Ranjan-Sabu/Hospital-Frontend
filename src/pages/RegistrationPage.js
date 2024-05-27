import React, { useState } from 'react';
import 'bootstrap-css-only/css/bootstrap.min.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';

const RegistrationPage = () => {
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState('');

  const handleSumbit = async (e) => {
    e.preventDefault();

    // Extract values from form fields
    const username = document.getElementById('username').value;
    const first_name = document.getElementById('first_name').value;
    const last_name = document.getElementById('last_name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const password2 = document.getElementById('password2').value;
    const is_doctor = document.getElementById('is_doctor').value;

    const data = {
      username,
      first_name,
      last_name,
      email,
      password,
      password2,
      is_doctor,
    };

    try {
      if (password.length < 8) {
        alert('Password must be at least 8 characters long.');
        return; 
      }
    
      if (password !== password2) {
        alert('Passwords do not match.');
        return; 
      }
    
      const response = await axios.post('http://127.0.0.1:8000/register/', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    
      if (response.status === 201) {
        alert('Registration successful. You can now log in');
        navigate('/login');
      } else {
        toast.error('Registration failed. Please check your details and try again.');
        setSuccessMessage('');
      }
    } catch (error) {
      alert('Registration failed. Please check your details and try again.');
      setSuccessMessage('');
    }
    
  }

  return (
    <div className="container py-5 h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col">
          <div className="card card-registration my-4">
            <div className="row g-0">
              <div className="col-xl-6 d-none d-xl-block">
                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/img4.webp"
                  alt="Sample photo" className="img-fluid" />
              </div>
              <div className="col-xl-6">
                <div className="card-body p-md-5 text-black">
                  <h3 className="mb-5 text-uppercase">User Registration</h3>
                  <form onSubmit={handleSumbit}>
                    <div className="mb-4">
                      <label htmlFor="username" className="form-label">Username</label>
                      <input type="text" id="username" className="form-control form-control-lg" required />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="first_name" className="form-label">First Name</label>
                      <input type="text" id="first_name" className="form-control form-control-lg" required />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="last_name" className="form-label">Last Name</label>
                      <input type="text" id="last_name" className="form-control form-control-lg" required />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="email" className="form-label">Email</label>
                      <input type="email" id="email" className="form-control form-control-lg" required />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="password" className="form-label">Password</label>
                      <input type="password" id="password" className="form-control form-control-lg" required />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="password2" className="form-label">Confirm Password</label>
                      <input type="password" id="password2" className="form-control form-control-lg" required />
                    </div>
                    <Form.Select id="is_doctor" className="mb-4" aria-label="Default select example" required>
                      <option value="">Select User Type</option>
                      <option value="False">I'm not a Doctor</option>
                      <option value="True">I'm a Doctor</option>
                    </Form.Select>
                    <div className="d-flex justify-content-end pt-3">
                      <button type="reset" className="btn btn-light btn-lg">Reset all</button>
                      <button type="submit" className="btn btn-warning btn-lg ms-2">Register</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default RegistrationPage;
