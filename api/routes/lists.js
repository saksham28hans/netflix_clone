const router = require('express').Router();
const List = require('../models/List');
const verify = require('../verifyToken');

//Create
router.post('/', verify, async(req,res)=>{
    if(req.user.isAdmin)
    {
      const newList = new List(req.body);
      try {
          const savedList = await newList.save();
          res.status(201).json(savedList);
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
 router.delete('/:id',verify, async(req,res)=>{
    if(req.user.isAdmin)
    {
        try {
            await List.findByIdAndDelete(req.params.id);
            res.status(200).json("The List has been deleted");
        } catch (error) {
            res.status(500).json(err);
        }
    }
    else
    {
        res.status(401).json("You are not authorized");
    }
 })

 //Get
 router.get('/',async(req,res)=>{
    const typeQuery = req.query.type;
    const genreQuery = req.query.genre;
    let list = [];
    try {
        if(typeQuery)
        {
           if(genreQuery)
           {
            list = await List.aggregate([
                { $match : { type : typeQuery, genre : genreQuery } },
                { $sample : { size : 10} },
            ]);
           }
           else
           {
             list = await List.aggregate([
                { $sample : {size: 10} },
                { $match : { type : typeQuery } },
             ]);
           }
        }
        else
        {
            list =  await List.aggregate([
                { $sample : { size : 10 } },
               ]);
        }
        res.status(200).json(list);
    } catch (error) {
        res.status(500).json(error);
    }
 })
module.exports = router;