import { useLocation } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';

const RouteContainer = () => {
  const location = useLocation();

  return (
    <div>
      {location.pathname === '/login' && <Login />}
      {location.pathname === '/register' && <Register />}
      {location.pathname === '/home' && <Home />}
    </div>
  );
};

export default RouteContainer;
