import {React,useState} from 'react';
import './newProduct.css'
import storage from '../../firebase';
import { createMovie } from '../../context/movieContext/moviesApiCalls';
import { useContext } from 'react';
import {MovieContext} from '../../context/movieContext/MovieContext';

const NewProduct = () => {
    const [movie, setmovie] = useState(null);
    const [img, setimg] = useState(null);
    const [imgTitle, setimgTitle] = useState(null);
    const [imgSm, setimgSm] = useState(null);
    const [trailer, settrailer] = useState(null);
    const [video, setvideo] = useState(null);
    const [uploaded, setuploaded] = useState(0);
    const {dispatch} = useContext(MovieContext);

    const handleChange = (e)=>
    {
        const value = e.target.value;
        setmovie({...movie , [e.target.name] : value})
    };

    const handleSubmit = (e)=>{
        e.preventDefault();
        createMovie(movie,dispatch);
    }
    
    const upload = (items)=>{
       items.forEach((item)=>{
        const filename = new Date().getTime() + item.label + item.file.name;
        const uploadTask = storage.ref(`/items/${filename}`).put(item.file);
        uploadTask.on("state_changed",
        (snapshot)=>{
            console.log(snapshot);
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done.");
         },
         (err)=>{
            console.log(err);
         },
         ()=>{
            uploadTask.snapshot.ref.getDownloadURL().then((url)=>{
                setmovie((prev)=>{
                    return { ...prev, [item.label]: url};
                });
                setuploaded((prev)=> prev+1);
            });
         }
         );
       });
    }

    const handleUpload  = (e)=>{
      e.preventDefault();
      upload([
        {file : img, label :'img'},
        {file : imgTitle, label :'imgTitle'},
        {file : imgSm, label :'imgSm'},
        {file : trailer, label :'trailer'},
        {file : video, label :'video'},

      ])
    }
    console.log(movie);
  return (
    <div className='newProduct'>
       <h1 className="addProductTitle">Add Movie</h1>
       <form className="addProductForm">
        <div className="addProductItem">
            <label>Image</label>
            <input type="file" id='img' onChange={(e)=>{setimg(e.target.files[0])}}/>
        </div>
        <div className="addProductItem">
            <label>Title Image</label>
            <input type="file" id='imgTitle' onChange={(e)=>{setimgTitle(e.target.files[0])}}/>
        </div>
        <div className="addProductItem">
            <label>Thumbnail Image</label>
            <input type="file" id='imgSm' onChange={(e)=>{setimgSm(e.target.files[0])}}/>
        </div>
        <div className="addProductItem">
            <label>Title</label>
            <input type="text" placeholder='John Wick' name="title"  onChange={handleChange}/>
        </div>
        <div className="addProductItem">
            <label>Description</label>
            <input type="text" placeholder='description' name="desc"  onChange={handleChange}/>
        </div>
        <div className="addProductItem">
            <label>Year</label>
            <input type="text" placeholder='2023' name="year"  onChange={handleChange}/>
        </div>
        <div className="addProductItem">
            <label>Genre</label>
            <input type="text" placeholder='Action' name="genre"  onChange={handleChange}/>
        </div>
        <div className="addProductItem">
            <label>Duration</label>
            <input type="text" placeholder='1h 44 mins' name="duration"  onChange={handleChange}/>
        </div>
        <div className="addProductItem">
            <label>Limit</label>
            <input type="text" placeholder='18' name="limit"  onChange={handleChange}/>
        </div>
        <div className="addProductItem">
            <label>Is Series?</label>
            <select name="isSeries" id="active" onChange={handleChange}>
                <option value="false">No</option>
                <option value="true">Yes</option>
            </select>
        </div>
        <div className="addProductItem">
            <label>Trailer</label>
            <input type="file" onChange={(e)=>{settrailer(e.target.files[0])}}/>
        </div>
        <div className="addProductItem">
            <label>Video</label>
            <input type="file" onChange={(e)=>{setvideo(e.target.files[0])}}/>
        </div>
        {uploaded === 5 ? (
        <button className="addProductButton" onClick={handleSubmit}>Create </button>
        ) :
        (
        <button className="addProductButton" onClick={handleUpload}>Upload</button>
        )}
       </form>
    </div>
  );
}

export default NewProduct;
