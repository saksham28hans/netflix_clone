import { ArrowBackOutlined } from '@material-ui/icons';
import React from 'react';
import './watch.scss';
import { Link, useLocation } from 'react-router-dom';

const Watch = () => {
  const location = useLocation();
  return (
    <div className='watch'>
     <Link to = '/'>
       <div className="back">
        <ArrowBackOutlined />
        Home
       </div>
     </Link>
       <video src={location.state.movie.video} className='video' autoPlay progress controls></video>
    </div>
  );
}

export default Watch;
