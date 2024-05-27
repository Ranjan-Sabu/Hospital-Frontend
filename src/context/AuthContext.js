import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useEffect } from "react";


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
              console.log('ADMIMNNNNNNNNNNNNNNNNNNNNNNNNNN');
              alert('welcome Admin')
              nav('/admin');
            } else if(user.is_doctor){
              alert('welcome Doctor')
              nav('/doctor')
            }
            else {
              alert('Welcome')
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
    


  
    let logoutUser = () => {
       const shouldLogout = window.confirm("Are you sure you want to log out?");
        if (shouldLogout) {
          SetAuthToken(null);
          SetUser(null);
          localStorage.removeItem('authToken');
          nav('/');
        }
      }

      let updateToken = async (e) => {
        try {
          const response = await axios.post('http://127.0.0.1:8000/login/refresh/', {
            refresh: authToken?.refresh
          });
    
          let data = response.data
    
    
          if (response.status === 200) {
            SetAuthToken(data)
            SetUser(jwtDecode(data.access))
            localStorage.setItem('authToken', JSON.stringify(data))
          }
    
          else {
    
            logoutUser()
          }
          if (loading) {
            setLoading(false)
          }
        }
        catch {
          console.log('error');
        }
    
      }
    
      useEffect(() => {
        if (loading) {
          updateToken();
        }
        let fourMinutes = 1000 * 60 * 15;
        let interval = setInterval(() => {
          if (authToken) {
            updateToken();
          }
        }, fourMinutes);
        return () => clearInterval(interval);
      }, [authToken, loading]);
    
    
    // Context data to be provided
    const contextData = {
        user:user,
        loginUser:loginUser,
        logoutUser:logoutUser,
        authToken:authToken,
    };

    // Provide the context data to the components
    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    );
};

