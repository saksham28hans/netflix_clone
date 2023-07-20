import {React, useContext, useState} from 'react';
import "./navbar.scss";
import { ArrowDropDown, Notifications, Search } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { logout } from '../../context/authContext/AuthActions';
import { AuthContext } from '../../context/authContext/AuthContext';
const Navbar = () => {
  
  const { dispatch } = useContext(AuthContext)
  const [isScrolled, setisScrolled] = useState(false);

  window.onscroll = ()=>{
    setisScrolled(window.scrollY === 0 ? false : true);
    return ()=>{ window.onscroll = null}
  };
 
  return (
    <div className={isScrolled ? 'navbar scrolled' : 'navbar'}>
      <div className="container">
        <div className="left">
          <img src="/images/logo.svg" alt="" />
          <Link to='/' className='link'>  
          <span>Homepage</span>
          </Link>
          <Link to='/series' className='link'>
          <span className='navbarlinks'>Series</span>
          </Link>
          <Link to="/movies"className='link '>
          <span className='navbarlinks'>Movies</span>
          </Link>
          <span>New and Popular</span>
          <span>My List</span>
        </div>
        <div className="right">
           <Search className='icon'/>
           <span>KID</span>
           <Notifications className='icon'/>
           <img src="https://firebasestorage.googleapis.com/v0/b/netflix-572f3.appspot.com/o/items%2Fnetflix_avatar.jpg?alt=media&token=92ac301f-726a-4714-80f0-fdf6eb083d54" alt="" />
           <div className="profile">
           <ArrowDropDown className='icon'/>
           <div className="options">
            <span>Settings</span>
            <span onClick={()=>dispatch(logout())}>Logout</span>
           </div>
           </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
