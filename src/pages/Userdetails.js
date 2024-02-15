// Assuming you have a component named UserDetails.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const UserDetails = () => {
  const { authToken } = useContext(AuthContext);
  const { id } = useParams();
  const [userDetails, setUserDetails] = useState(null);
  console.log(userDetails)

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/adminuserlist/${id}/`, {
          headers: {
            'Authorization': 'Bearer ' + String(authToken.access),
          },
        });

        if (response.status === 200) {
          setUserDetails(response.data);
        } else {
          console.log('Failed to fetch user details.');
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, [id, authToken.access]);

  if (!userDetails) {
    return <div>Loading...</div>;
  }

  const user = userDetails.find(user => user.pk.toString() === id);

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className="container mt-5">
    <div className="card bg-light p-3">
      <div className="card-header bg-primary text-white text-center">
        <h2 className="mb-0">User Details</h2>
      </div>
      <div className="card-body">
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label className="font-weight-bold">Username:</label>
              <p className="mb-2">{user.username}</p>
            </div>
            <div className="form-group">
              <label className="font-weight-bold">Email:</label>
              <p className="mb-2">{user.email}</p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label className="font-weight-bold">First Name:</label>
              <p className="mb-2">{user.first_name}</p>
            </div>
            <div className="form-group">
              <label className="font-weight-bold">Last Name:</label>
              <p className="mb-2">{user.last_name}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default UserDetails;
