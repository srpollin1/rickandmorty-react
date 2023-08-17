import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    const response = await fetch('https://reqres.in/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    console.log(data);

    if (response.ok) {
      setIsLoggedIn(true);
      setErrorMessage('');
      localStorage.setItem('isLoggedIn', 'true');
    } else {
      setErrorMessage('Inicio de sesión fallido. Verifica tus credenciales.');
    }
  };

  if (isLoggedIn) {
    return <Navigate to="/home" />;
  }

  return (
    <div className="container mt-5 shadow p-3 border rounded shadow">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">Login</h2>
              {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button className="btn btn-primary" onClick={handleLogin}>Login</button>
              <p className="mt-2">
                ¿No tienes una cuenta? <Link to="/register">Regístrate aquí</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
