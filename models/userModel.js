const mongoose = require("mongoose");
const Joi = require("joi");

const userSchema = new mongoose.Schema({
  name:String,
  email:String,
  password:String
},{timestamps:true});

exports.UserModel = mongoose.model("users",userSchema);

exports.validateUser = (_reqBody) => {
  const joiSchema = Joi.object({
    name:Joi.string().min(2).max(150).required(),
    // email() -> בודק שהמייל תקין עם שטרודל נקודה ועוד
    email:Joi.string().min(2).max(200).email().required(),
    password:Joi.string().min(3).max(150).required()
  })

  return joiSchema.validate(_reqBody);
}