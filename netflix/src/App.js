import { useContext } from 'react';
import './App.scss';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Watch from './pages/watch/Watch';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";
import { AuthContext } from './context/authContext/AuthContext';

function App() {
  const { user } = useContext(AuthContext);
  return (
    <Router>
    <Routes>
    <Route exact path = "/" element = {user ? <Home /> : <Navigate to='/login'/> } />
    <Route exact path = "/register" element = {!user ? <Register /> : <Navigate to='/'/>} />
    <Route exact path = "/login" element = {!user ? <Login /> : <Navigate to='/' />} />
  
    <Route exact path = "/movies" element =  {user ? <Home type="movies" /> : <Navigate to='/login'/> } />
    <Route exact path = "/series" element =  {user ? <Home type="series" />: <Navigate to='/login'/> } />
    <Route exact path = '/watch' element = {<Watch />} />


    {/* // <Register /> */}
    {/* <Login /> */}
    </Routes>
    </Router>
  );
}

export default App;
