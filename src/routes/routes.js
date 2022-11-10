import {
    registerUser,login,updateUser,deleteUser,follow, unfollow,createPost,updatePost, likePost,dislikePost
} from '../controllers/controllers'

const routes=(app)=>{   

 app.route('/register')
     .get((req,res)=>{
        res.send("Pass register page")
     })
     .post(registerUser)

app.route('/loginCheck') 
    .get((req,res)=>{
        res.send("Login page is passed")
    })  
    .post(login)  

app.route('/updateUser/:id')
    .put(updateUser)

 
app.route('/deleteUser/:id')
    .delete(deleteUser)

app.route('/:id/follow')
    .put(follow)   

app.route('/:id/unfollow')
    .put(unfollow)    

app.route('/newPost')
    .post(createPost) 

app.route('/updatePost/:id')
    .put(updatePost)   
    
app.route('/like/:id')
    .put(likePost)  
    
app.route('/dislike/:id')
    .put(dislikePost)     
}




export default routes;