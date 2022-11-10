import mongoose from "mongoose";
const Schema=mongoose.Schema;


export const userSchema =new Schema({
  name:{
    type:String,
    required:true,
    max:50,
    unique:true
  },
  email:{
    type:String,
    required:true,
    max:50
  },
  password:{
    type:String,
    required:true,
    min:3,
    max:40
  },
  proPic:{
    type:String,
    default:""
  },
  coverPic:{
    type:String,
    default:""
  },
  followers:{
    type:Array,  //it will be the user id like [1,2,3,4]
    required:[]
  },
  following:{
    type:Array,
    required:[]
  },
  isAdmin:{
    type:Boolean,
    default:false
  },
},
  {timestamps:true}
)

export const postSchema=new Schema({
  userId:{
    type:String,
    required:true

  },
  description:{
    type:String,
    required:true
  },
  image:{
    type:String,
    required:true
  },
  like:{
    type:Array,
    required:[]
  },
},
{timestamps:true}
)