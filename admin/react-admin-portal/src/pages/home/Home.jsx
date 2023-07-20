import React from 'react';
import Chart from '../../components/chart/Chart';
import FeaturedInfo from '../../components/featuredInfo/FeaturedInfo';
import './home.css';
import {userData} from '../../dummyData';
import WidgetSm from '../../components/widgetSm/WidgetSm';
import WidgetLg from '../../components/widgetsLg/WidgetLg';
import { useState, useEffect, useMemo } from "react";
import axios from "axios";

const Home = () => {
  const MONTHS  = useMemo(() => [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ], []);
  
  const [userStats, setuserStats] = useState([]);

  useEffect(() => {
    const getStats = async()=>{
      try {
        const res = await axios.get('users/stats',{headers : {
          token : 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MmE5NjY2ODkyNDM0MDJiYTI2ZTQwMiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY4MDUxMzAwNywiZXhwIjoxNjgwOTQ1MDA3fQ.dC-wgKYKCSG19qNGss7BC0NJbf5-CGYmzCPUcVx9uNo'
        },})
        const statList = res.data.sort((a,b)=>{
              return a._id - b._id;
        })
        statList.map(item=>setuserStats(prev=>[
          ...prev,
          {name : MONTHS[item._id-1],"New User" : item.total},
        ]))
      } catch (error) {
        console.log(error);
      }
    }
    getStats();
  }, [MONTHS]);
  return (
    <div className='home'>
      <FeaturedInfo />
      <Chart data={userStats} title="User Analytics" grid datakey="New User"/>
      <div className="homeWidgets">
        <WidgetSm />
        <WidgetLg />
      </div>
    </div>
  );
}

export default Home;
