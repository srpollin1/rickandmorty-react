import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');

  const reload = () => {
    window.location.reload();
  }

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login handleLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/home"
          element={isLoggedIn ? <Home handleLogout={handleLogout} /> : <Navigate to="/home" />}
        />
      </Routes>
      <nav>
        <ul>
          {isLoggedIn ? (
            <>
              <li>
                <button className='btn btn-danger overlay-button shadow' onClick={handleLogout}>Logout</button>
              </li>
            </>
          ) : (
            <>

              <li className='register text-center p-3'>
                <Link to="/register" className="btn btn-primary">1.- Register</Link>
              </li>
              <li className='login text-center p-3'>
                <Link to="/login" className="btn btn-primary">2.- Login</Link>
              </li>

              <div className='text-center justify-content-center p-3'>
                <button className="btn btn-secondary" onClick={reload}>3.- Rick and Morty</button>

              </div>


              <div className="text-center p-3 border border-success rounded m-5 shadow">
                <h5>Instrucciones</h5>
                <p>Para poder ingresar necesita iniciar sesión, <br />
                  una vez realizado aprete boton Rick and Morty <br />
                  para ingresar. </p>
              </div>
            </>
          )}
        </ul>
      </nav>
    </Router>
  );
}

export default App;
