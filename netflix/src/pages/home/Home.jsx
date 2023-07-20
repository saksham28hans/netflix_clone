import { React, useState,useEffect } from 'react';
import Featured from '../../components/featured/Featured';
import List from '../../components/list/List';
import Navbar from '../../components/navbar/Navbar';
import './home.scss';
import axios from "axios";

const Home = ({type}) => {
  const [lists, setlists] = useState([]);
  const [genre, setgenre] = useState(null);

  useEffect(() => {
    const getRandomList = async ()=>{
      try {
        const res = await axios.get(
          `lists${type ? "?type="+type : ""}${genre ? "&genre="+ genre : ""}`,
          {
            headers : {
              token : `Bearer ${localStorage.getItem("user").accessToken}`
            },
          }
          );
          setlists(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    getRandomList();
  }, [type,genre]);
  return (
    <div className='home'>
      <Navbar />
      <Featured type={type} setgenre={setgenre}/>
      {lists.map((list)=>(
      <List list = {list} key={list._id}/>
      ))}
    </div>
  );
}

export default Home;
