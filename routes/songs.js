const express = require("express");
const {songsModel,validatSongs} = require("../models/songsModel");
const router = express.Router();

router.get("/" ,async ( req,res)=> {
try{

    const perPage = 2;
    // ?page=
    const page = req.query.page - 1 || 0;
    const data = await songsModel
    .find({})
    .limit(perPage)
    .skip(page * perPage)
    res.json(data);
}
catch(err){
    console.log(err);
    res.status(502).json({err})
}
})


router.post("/", async(req,res) => {
    const validBody = validatSongs(req.body);
    if(validBody.error){
      return res.status(400).json(validBody.error.details)
    }
    try{
      const songs = new songsModel(req.body);
      await songs.save();
      res.status(201).json(songs);
    }
    catch(err){
      console.log(err);
      res.status(502).json({err})
    }
  })
  

module.exports =router; 