const router = require('express').Router();
const Movie = require('../models/Movie');
const verify = require('../verifyToken');

//Create
router.post('/', verify, async(req,res)=>{
   if(req.user.isAdmin)
   {
     const newMovie = new Movie(req.body);
     try {
         const savedMovie = await newMovie.save();
         res.status(201).json(savedMovie);
     } catch (error) {
        res.status(500).json(error);
     }
   }
   else
   {
    return res.status(401).json("You are not authorized")
   }
})

//Update
router.put('/:id', verify, async(req,res)=>{
    if(req.user.isAdmin)
    {
      try {
          const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, {
            $set : req.body
          },
          {new : true}
          );
          res.status(202).json(updatedMovie);
      } catch (error) {
         res.status(500).json(error);
      }
    }
    else
    {
     return res.status(401).json("You are not authorized")
    }
 })

 //Delete
router.delete('/:id', verify, async(req,res)=>{
    if(req.user.isAdmin)
    {
      try {
           await Movie.findByIdAndDelete(req.params.id);
          res.status(200).json("The movie has been deleted");
      } catch (error) {
         res.status(500).json(error);
      }
    }
    else
    {
     return res.status(401).json("You are not authorized")
    }
 })

 //Get
router.get('/find/:id',async(req,res)=>{
      try {
           const movie = await Movie.findById(req.params.id);
          res.status(200).json(movie);
      } catch (error) {
         res.status(500).json(error);
      }
 })

 //Get Random
 router.get('/random', async(req,res)=>{
    const type = req.query.type;
    let movie;
    try {
        if(type === "series")
        {
            movie = await Movie.aggregate([
                { $match : {isSeries : true}},
                { $sample : {size :1}},
            ])
        }
        else
        {
            movie = await Movie.aggregate([
                { $match : {isSeries : false}},
                { $sample : {size :1}},
            ])
        }
        res.status(200).json(movie)
    } catch (error) {
        res.status(500).json(error);
    }
 })

 //Get All
 router.get('/', verify, async(req,res)=>{
    if(req.user.isAdmin)
    {
    try {
         const movie = await Movie.find();
        res.status(200).json(movie.reverse());
    } catch (error) {
       res.status(500).json(error);
    }
    }
    else
    {
     return res.status(401).json("You are not authorized")
    }
})
module.exports = router;