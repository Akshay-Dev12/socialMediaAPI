
import mongoose from "mongoose";
import bcrypt from "bcrypt";
const saltRounds = 10;
import {userSchema,postSchema} from "../model/model"

const User=mongoose.model('User',userSchema)
const Post =mongoose.model('Post',postSchema)



export const registerUser =((req,res)=>{
    // console.log(req.body)
    let userBody=req.body;
    bcrypt.hash(userBody.password, saltRounds, function(err, hash) {
        if(err){
            res.send("Password not hashed")
        }else{
            console.log(hash)
            userBody.password=hash;
            let newUser=User(userBody)
            newUser.save((err,user)=>{
                if(err){
                    res.send(err)
                }else{
                    res.send("Sucessfully Stored"+user)
                }
            })
        }
    });
})


export const login=(async(req,res)=>{
    let login=req.body;
    let user=await User.findOne({email:login.email})
    !user && res.send("No user")
    const match = await bcrypt.compare(login.password, user.password);
    if(match){
        res.send("Login Success")
    }else{
        res.send("Credientials not matched")
    }
})


export const updateUser =((req,res)=>{
    var newvalues = { $set: { name: req.body.name, email: req.body.email } };
    User.updateOne({_id:req.params.id},newvalues,(err,sucess)=>{
        if(err){
            res.send(err)
        }else{
            res.send("Contact is updated")
        }
    })
})

export const deleteUser=((req,res)=>{
    User.deleteOne({_id:req.params.id},(err,del)=>{
        if(err){
            res.send("Contact not seen")
        }
        else{
            res.send("Deleted succesfully")
        }
    })
})

export const follow=(async(req,res)=>{
    if(req.params.id !==req.body.id){
        let currentUser=await User.findById(req.body.id)
        let user=await User.findById(req.params.id)
        if(!user.followers.includes(req.body.id)){
            await user.updateOne({$push:{followers:req.body.id}})
            await currentUser.updateOne({$push:{following:req.params.id}})
            res.send("Followed the user")
        }else{
            res.send("You are already followed")
        }
    }else{
        res.send("You cannot follow yourself")
    }
})

export const unfollow=(async(req,res)=>{
    if(req.params.id!==req.body.id){
        let currentUser=await User.findById(req.body.id)
        let user=await User.findById(req.params.id)
        if(currentUser.following.includes(req.params.id)){
            await currentUser.updateOne({$pull:{following:req.params.id}})
            await user.updateOne({$pull:{followers:req.body.id}})
            res.send("Successfully unfollowed the user")

        }else{
            res.send("You cannot follow a user that you are not following")
        }

    }else{
        res.send("You are the same user")
    }
})

export const createPost=((req,res)=>{
    let newPost=Post(req.body)
    newPost.save((err,post)=>{
        if(err){
            res.send(err)
        }else{
            res.send("Successfully stored the post")
        }
    })
})

export const updatePost=((req,res)=>{
    let newValues={$set:{description:req.body.des,image:req.body.image}}
    Post.updateOne({_id:req.params.id},newValues,(err,update)=>{
        if(err){
            res.send(err)
        }else{
            res.send("The post is updated")
        }
    })

})

export const likePost=(async(req,res)=>{
    let currentUser=await User.findById(req.body.id) ///find user 
    let postToLike=await Post.findById(req.params.id)  //find the post

    if(!postToLike.like.includes(req.body.id)){
        await postToLike.updateOne({$push:{like:req.body.id}})
        res.send("You like the post")
    }else{
        res.send("Already liked")
    }

})

export const dislikePost=(async(req,res)=>{
    let currentUser=await User.findById(req.body.id) ///find user 

    let postTodisLike=await Post.findById(req.params.id)  //find the post

    if(postTodisLike.like.includes(req.body.id)){
        await postTodisLike.updateOne({$pull:{like:req.body.id}})
        res.send("You dislike the post")
    }else{
        res.send("You are not liked")
    }

})











