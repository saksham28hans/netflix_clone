import { ArrowBackIosOutlined, ArrowForwardIosOutlined } from '@material-ui/icons';
import {React,useRef,useState} from 'react';
import ListItem from '../listItem/ListItem';
import './list.scss';

const List = ({list}) => {

  const [slideNumber, setslideNumber] = useState(0);
  const [slideIndex, setslideIndex] = useState(0);
  const [clickLimit, setclickLimit] = useState(window.innerWidth / 230);
  const listRef = useRef();
  // const handleClick = (direction)=>{
  //   let distance = listRef.current.getBoundingClientRect().x - 50;
  //   if(direction === "left" && slideNumber > 0)
  //   {
  //       setslideNumber(slideNumber-1);
  //       listRef.current.style.transform = `translateX(${230+distance}px)`
  //   }
  //   if(direction === "right" && slideNumber < 10-clickLimit)
  //   {
  //       setslideNumber(slideNumber+1);
  //       listRef.current.style.transform = `translateX(${-230+distance}px)`
  //   }
  // }
  console.log(list)
  const handleClick = (direction)=>{
    if(direction === "left")
    {
        setslideIndex(slideIndex > 0 ? slideIndex-1:0);
    }
    else{
        setslideIndex(slideIndex+1);
    }
}

  return (
    <div className='list'>
      <span className="listTitle">{list.title}</span>
      <div className="arrow_left" style={{display:`${slideIndex ===0 ?`none`:''} `}}>
      <ArrowBackIosOutlined  className='sliderArrow left' onClick={()=>{handleClick("left")}}/>
      </div>
      <div className="arrow_right" style={{display:`${slideIndex ===1 ?`none`:''} `}}>
      <ArrowForwardIosOutlined className='sliderArrow right' onClick={()=>{handleClick("right")}}/>
      </div>
      <div className="wrapper" id="wrap" style={{transform:`translateX(${slideIndex * -100}vw)`}}>
        <div className="container" ref={listRef}>
            {list.content.map((item,i)=> (
            <ListItem index={i} item = {item} key={i} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default List;
