const express = require("express");
const {DrinkModel, validatDrink} = require("../models/drinkModel");
const router = express.Router();

router.get("/", async(req,res) => {
  try{
    const perPage = 4;
    // ?page=
    const page = req.query.page - 1 || 0;
    const data = await DrinkModel
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
  // בודק שהמידע שמגיע מצד לקוח תקין לפני שמעביר
  // למסד נתונים
  const validBody = validatDrink(req.body);
  if(validBody.error){
    return res.status(400).json(validBody.error.details)
  }
  try{
    // לייצר רשומה חדשה מהבאדי
    const drink = new DrinkModel(req.body);
    await drink.save();
    res.status(201).json(drink);
  }
  catch(err){
    console.log(err);
    res.status(502).json({err})
  }
})

router.put("/:id", async(req,res) => {
  const validBody = validatDrink(req.body);
  if(validBody.error){
    return res.status(400).json(validBody.error.details)
  }
  try{
    const id = req.params.id;
    const data = await DrinkModel.updateOne({_id:id},req.body);
    // modfiedCount:1
    res.json(data);
  }
  catch(err){
    console.log(err);
    res.status(502).json({err})
  }
})

router.delete("/:id", async(req,res) => {
  try{
    const id = req.params.id;
    const data = await DrinkModel.deleteOne({_id:id});
    // deletedCount:1
    res.json(data);
  }
  catch(err){
    console.log(err);
    res.status(502).json({err})
  }
})

module.exports = router;