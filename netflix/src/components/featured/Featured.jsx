import { InfoOutlined, PlayArrow } from '@material-ui/icons';
import {React, useState, useEffect} from 'react';
import './featured.scss';
import axios from "axios"
import { Link } from 'react-router-dom';

const Featured = ({type, setgenre}) => {
    const [content, setcontent] = useState({});

    useEffect(() => {
      const getRandomMovie = async ()=>{
        try {
            const res= await axios.get(`/movies/random?type=${type}`,
            {
                headers : {
                    token : `Bearer ${localStorage.getItem("user").accessToken}`
                  },
                
            });
            setcontent(res.data[0]);
        } catch (error) {
            console.log(error);
        }
      }
      getRandomMovie();
    }, [type]);
    return (
        <div className='featured'>
        {type &&  (
            <div className="category">
                <span>{type=== "movies" ? "Movies" : "Series"}</span>
                <select name="genre" id="genre" onChange={(e)=>{ setgenre(e.target.value)}}>
                    <option value="">Genre</option>
                    <option value="drama">Drama</option>
                    <option value="comedy">Comedy</option>
                    <option value="crime">Crime</option>
                    <option value="fantasy">Fantasy</option>
                    <option value="historical">Historical</option>
                    <option value="horror">Horror</option>
                    <option value="romance">Romance</option>
                    <option value="sci-fi">Sci-fi</option>
                    <option value="thriller">Thriller</option>
                    <option value="western">Western</option>
                    <option value="animation">Animation</option>
                    <option value="adventure">Adventure</option>
                    <option value="documentary">Documentary</option>
                </select>
            </div>
        )}
            <img  src={content.img} alt="" />
            <div className="info">
                {/* <img src={content.imgTitle} alt="" /> */}
                <h3 className='title'>{content.title}</h3>
                <span className="desc">
                    {content.desc}
                </span>
                <div className="buttons">
                <Link to = {'/watch'} state = {{movie : content}} style={{textDecoration:'none'}}>
                    <button className="play">
                        <PlayArrow />
                        <span>Play</span>
                    </button>
                </Link>
                    <button className="more">
                        <InfoOutlined />
                        <span>Info</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Featured;
