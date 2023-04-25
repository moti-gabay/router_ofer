const express = require("express");
const bcrypt = require("bcrypt");
const { validateUser, UserModel } = require("../models/userModel");
const router = express.Router();

router.get("/", async(req,res) => {
  res.json({msg:"Users endpoint"});
})

router.post("/", async(req,res) => {
  const validBody = validateUser(req.body);
  if(validBody.error){
    return res.status(400).json(validBody.error.details)
  }
  try{
    const user = new UserModel(req.body);
    // נצפין את הסיסמא שלנו
    user.password = await bcrypt.hash(user.password,10)
    await user.save();
    // מונע מהצד לקוח לראות את ההצפנה
    user.password = "****"
    res.status(201).json(user)
  }
  catch(err){
    if(err.code == 11000){
      return res.status(401).json({msg:"Email already in system",code:11000})
    }
    console.log(err);
    res.status(502).json({err})
  }
})

module.exports = router;