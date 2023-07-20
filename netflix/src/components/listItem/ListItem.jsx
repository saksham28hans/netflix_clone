import { Add, PlayArrow, ThumbDownOutlined,ThumbUpAltOutlined } from '@material-ui/icons';
import {React, useState, useEffect} from 'react';
import './listItem.scss';
import axios from "axios";
import { Link } from 'react-router-dom';

const ListItem = ({index, item}) => {
  const [isHovered, setisHovered] = useState(false);
  const [movie, setmovie] = useState({});
  useEffect(() => {
    const getMovie = async()=>{
      try {
        const mov = await axios('movies/find/'+item);
        setmovie(mov.data);
      } catch (error) {
        console.log(error);
      }
    }
    getMovie();
  }, [item]);
  return (
    // <Link to = {'/watch'} state = {{movie : movie}} style={{textDecoration:'none'}}>
    <div className='listItem' 
    // style={{left:isHovered && index * 225 -50 + index*2.5}}
    onMouseEnter={()=>{setisHovered(true)}} onMouseLeave={()=>{setisHovered(false)}}>
     
      <img src={movie.img} alt="" />


      <div className="itemInfo">
        <div className="icons">
        <Link to = {'/watch'} state = {{movie : movie}} style={{textDecoration:'none'}}>
          <PlayArrow className='icon'/>
          </Link>
          <Add className='icon'/>
          <ThumbUpAltOutlined className='icon'/>
          <ThumbDownOutlined className='icon'/>
        </div>

        {isHovered && (
         <>
         <video src={movie.trailer} controls autoPlay={true}  loop></video>
        <div className="itemInfoTop">
          <span>{movie.duration}</span>
          <span className="limit">+{movie.limit}</span>
          <span>{movie.year}</span>
        </div>
        <div className="desc">
         {movie.desc}
        </div>
        <div className="genre">{movie.genre}</div>
        </>
        )}
      </div>
    </div>
    // </Link>
  );
}

export default ListItem;
