import { Visibility } from '@material-ui/icons';
import {React,useState,useEffect} from 'react';
import './widgetSm.css';
import axios from "axios";

const WidgetSm = () => {
  const [newUsers, setnewUsers] = useState([]);
  
  useEffect(() => {
    const getNewUsers = async ()=>{
      try {
        const res = await axios.get('users?new=true',{headers : {
          token : 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MmE5NjY2ODkyNDM0MDJiYTI2ZTQwMiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY4MDUxMzAwNywiZXhwIjoxNjgwOTQ1MDA3fQ.dC-wgKYKCSG19qNGss7BC0NJbf5-CGYmzCPUcVx9uNo'
        },});
        setnewUsers(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    getNewUsers();
  }, []);
  return (
    <div className='widgetSm'>
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
      {newUsers.map((user)=>(
        <li className="widgetSmListItem">
          <img src={user.profilePic || "/images/netflix_avatar.jpg"} alt="" className='widgetSmImg'/>
          <div className="widgetSmUser">
            <span className="widgetSmUsername">{user.username}</span>
          </div>
          <button className="widgetSmButton">
            <Visibility className='widgetSmIcon' />
            Display
          </button>
        </li>
      ))}
      </ul>
    </div>
  );
}

export default WidgetSm;
