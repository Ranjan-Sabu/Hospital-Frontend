import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';


const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
    const nav = useNavigate()
    let [authToken, SetAuthToken] = useState(localStorage.getItem('authToken') ? JSON.parse(localStorage.getItem('authToken')) : null)
    let [user, SetUser] = useState(localStorage.getItem('authToken') ? jwtDecode(localStorage.getItem('authToken')) : null)
    let [loading, setLoading] = useState(false)

    // Function to handle user login
    let loginUser = async (e) => {
        e.preventDefault();
        try {
            console.log('form jsfduol')
          const response = await axios.post('http://127.0.0.1:8000/login/', {
            email: e.target.email.value,
            password: e.target.password.value,
          });
    
          if (response.status === 200) {
            const data = response.data;
            setLoading(true);
            SetAuthToken(data);
            const user = jwtDecode(data.access);
            console.log(user)
            SetUser(user);
            localStorage.setItem('authToken', JSON.stringify(data));
            console.log(data)
            console.log(response)

            if (user.blocked) {
            alert('Your account is blocked. Please contact support for assistance.');
            } else if (user.is_admin) {
              nav('/admin');
            } else if(user.is_doctor){
              nav('/doctor')
            }
            else {
              nav('/')
            }
          }
          else {
            if (response.data && response.data.detail === 'Incorrect password') {
                alert('Incorrect password. Please try again.');
            } else {
                alert('Something went wrong.');
            }
        }
        } catch (error) {
          if (error.response && error.response.status === 401) {
            alert(error.response.data.detail);
          } else {
    
            alert('An error occurred while trying to log in. Please try again later.');
          }
        }
      }
    

  //   let loginUser = async (e) => {
  //     e.preventDefault();
  //     try {
  //         const response = await axios.post('http://127.0.0.1:8000/login/', {
  //             email: e.target.email.value,
  //             password: e.target.password.value,
  //         });
  
  //         if (response.status === 200) {
  //             const user = response.data;
  
  //             if (!user.is_active) {
  //                 alert('Your account is blocked. Please contact support for assistance.');
  //             } else if (user.is_admin) {
  //                 nav('/admin');
  //             } else if (user.is_doctor) {
  //                 nav('/doctor')
  //             } else {
  //                 nav('/')
  //             }
  //         } else {
  //             alert('Login failed. Please check your credentials.');
  //         }
  //     } catch (error) {
  //         if (error.response && error.response.status === 401) {
  //             alert(error.response.data.detail);
  //         } else {
  //             alert('An error occurred while trying to log in. Please try again later.');
  //         }
  //     }
  // }
  
    let logoutUser = () => {
       const shouldLogout = window.confirm("Are you sure you want to log out?");
        if (shouldLogout) {
          SetAuthToken(null);
          SetUser(null);
          localStorage.removeItem('authToken');
          nav('/');
        }
      }
    
    // Context data to be provided
    const contextData = {
        user:user,
        loginUser:loginUser,
        logoutUser:logoutUser
    };

    // Provide the context data to the components
    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    );
};

