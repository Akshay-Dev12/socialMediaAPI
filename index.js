import express from'express';
import routes from './src/routes/routes';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';


const app=express()
const PORT=3000;

app.use(express.urlencoded({extended:true}))
app.use(bodyParser.json())
routes(app)
app.listen(PORT,()=>{
    console.log(`Your server is running on port ${PORT}`)
})

mongoose.Promise=global.Promise;
var db = "mongodb://localhost:27017/smAPI";
mongoose.connect(db,{
    useNewUrlParser:true,
    useUnifiedTopology:true
});


app.use(express.static('public'));
app.use('/images', express.static('images'))



