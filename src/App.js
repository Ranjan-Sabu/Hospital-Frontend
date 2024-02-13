import './App.css';
import {Routes,Route} from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import Header from './components/Header'
import {AuthProvider} from './context/AuthContext'
import RegistrationPage from './pages/RegistrationPage';
import UpdateProfilePage from './pages/UpdateProfilePage';
import DoctorsPage from './pages/DoctorsPage';
function App() {
  return (
    <div className="App">
      <AuthProvider>
        {/* <Header/> */}
        <Routes>
          <Route element={<HomePage/>} path='/'/>
          <Route element={<DoctorsPage/>}path='/doctor'/>
          <Route element={<LoginPage/>} path='/login'/>
          <Route element={<RegistrationPage/>} path='/register'/>
          <Route element={<UpdateProfilePage/>} path='/updateprofile'/>
        </Routes>
        </AuthProvider>
    </div>
  );
}

export default App;
