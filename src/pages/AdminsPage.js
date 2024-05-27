import React from 'react';
import './AdminsPage.css';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import { Link } from 'react-router-dom';

const AdminsPage = () => {
  const [allUser, setAllUser] = useState(null);
  const { authToken, logoutUser } = useContext(AuthContext);
  const [blockedUsers, setBlockedUsers] = useState({});


  const fetchUserList = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/adminuserlist/', {
        headers: {
          'Authorization': 'Bearer ' + String(authToken.access),
        },
      });

      if (response.status === 200) {
        const userList = response.data;
        const initialBlockedUsers = userList.reduce((acc, user) => {
          // Retrieve the blocked status from server response or default to false
          acc[user.pk] = user.blocked || false;
          return acc;
        }, {});
        setBlockedUsers(initialBlockedUsers);

        setAllUser(userList);
      } else {
        console.log('Failed to fetch user list.');
      }
    } catch (error) {
      console.error('Error fetching user list:', error);
    }
  };

  useEffect(() => {
    fetchUserList();
  }, []);

  const blockUnblockUser = async (pk, block) => {
    try {
      const response = await axios.patch(`http://127.0.0.1:8000/adminuserlist/${pk}/`, { blocked: block }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + String(authToken.access),
        },
      });

      if (response.status === 200) {
        console.log(`User ${block ? 'blocked' : 'unblocked'} successfully.`);
        // Update the state
        setBlockedUsers((prevBlockedUsers) => ({
          ...prevBlockedUsers,
          [pk]: block,
        }));
      } else {
        console.log(`Failed to ${block ? 'block' : 'unblock'} user.`);
      }
    } catch (error) {
      console.error(`Error ${block ? 'blocking' : 'unblocking'} user:`, error);
    }
  };


  return (
    <body>
      <div class="container">
        <h2>Admin Panel</h2>

        <div class="row">
          <div class="col-md-6">
            <h3>Manage And View Users</h3>
            <ul class="list-group user-list">
              {allUser &&
                allUser.map((users, index) => (
                  !users.is_doctor ? (
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                      {users.username}
                      <Link to={`/user/${users.pk}`} class="btn btn-primary btn-sm">
                        View
                      </Link>
                      {blockedUsers[users.pk] ? (
                        <button
                          className="btn btn-success btn-sm"
                          onClick={() => blockUnblockUser(users.pk, false)}
                        >
                          Unblock
                        </button>
                      ) : (
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => blockUnblockUser(users.pk, true)}
                        >
                          Block
                        </button>
                      )}
                    </li>
                  ) : null 
                ))}
                
            </ul>
          </div>

          <div class="col-md-6">
            <h3>Manage And View Doctors</h3>
            <ul class="list-group user-list">
              {allUser &&
                allUser.map((users, index) => (
                  // Check if users.is_doctor is true
                  users.is_doctor ? (
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                      {users.username}
                      <Link to={`/user/${users.pk}`} class="btn btn-primary btn-sm">
                        View
                      </Link>
                      {blockedUsers[users.pk] ? (
                        <button
                          className="btn btn-success btn-sm"
                          onClick={() => blockUnblockUser(users.pk, false)}
                        >
                          Unblock
                        </button>
                      ) : (
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => blockUnblockUser(users.pk, true)}
                        >
                          Block
                        </button>
                      )}
                      </li>
                          ) : null 
                  ))}
              </ul>
          </div>
        </div>
      </div>
    </body>
  );
};

export default AdminsPage;
