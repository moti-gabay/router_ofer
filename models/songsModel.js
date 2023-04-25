const mongoose = require("mongoose");
const Joi = require("joi");

const songsSchema = new mongoose.Schema({
    title:String,
    year:Number,
    band:String,
    youtube_url:String,
    genre:String
  },{timestamps:true})
  
  exports.songsModel = mongoose.model("songs",songsSchema);

  exports.validatSongs = (_reqBody) => {
    const joiSchema = Joi.object({
      title:Joi.string().min(2).max(150).required(),
      year:Joi.number().min(2).max(9999).required(),
      band:Joi.string().min(2).max(999).required(),
      youtube_url:Joi.string().min(2).max(9999).required(),
      genre:Joi.string().min(2).max(999).required(),
    })
    return joiSchema.validate(_reqBody);
  }