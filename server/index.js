const express=require('express')
const cors=require('cors')

const router=require('./routers')
const moongose=require('mongoose')
const app=express()


app.use(express.json());

app.use(cors())

app.use('/players',router)
app.get('/',(req,res)=>{
    res.json({message:"hello "})

})

moongose.connect('mongodb://127.0.0.1:27017/bank')

app.listen(3001,()=>{
    console.log("server is running on port 3001")
})