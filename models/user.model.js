import mongoose, { trusted } from "mongoose";
import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';
import { json } from "express";

const userSchema = new mongoose.Schema(
    {
        username:{
            type:String,
            required:true,
            unique:true,
            lowercase:true
        },
        email:{
            type:String,
            required:true,
            unique:true,
            lowercase:true
        },
        fullName:{
            type:String,
            required:true,
        },
        avatar:{
            type:String,
            required:true
        },
        coverImage:{
            type:String,
            required:true
        },
        watchHistory:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"Video"
            }
        ],
        password:{
            type:String,
            required:[true,"Password is required !"]
        },
        referenceToken:{
            type:String
        }
    },
    {
        timestamps:true
    }
)
userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next();
    this.password = bcrypt.hash(this.password,10);
    next();
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password);
}

userSchema.methods.generateAccessToken = function(){
    return jsonwebtoken.sign(
        {
        _id:this._id,
        email:this.email,
        username:this.username,
        fullName:this.fullName 
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:process.env.ACCESS_TOKEN_EXPIRY}
    )
}

userSchema.methods.generateRefrenceToken = function(){
    return jsonwebtoken.sign(
        {
            _id:this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn:process.env.REFRESH_TOKEN_EXPIRY}
    )
}


export const User = mongoose.model("User",userSchema);