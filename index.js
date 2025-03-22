const express=require('express')
const mongoose=require('mongoose')
const app=express()
require('dotenv').config()
const UserModel=require('./Schema/Schema')
app.use(express.json())

app.post('/create', async(req,res)=>{
    const {username,password}=req.body
    try {
        const CheckUsername= await UserModel.findOne({username})
        if(CheckUsername){
          res.status(400).json({message:"Usernmae already in use"})
        }
        const saveUsers= await UserModel.create(req.body)
        
        res.status(201).json({
            message:"User created successfully",
            user:saveUsers
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Internal server error"})
    }
})

app.get('/',async(req,res)=>{
   try {
    const AllUsers= await UserModel.find()
    res.status(200).json({Users:AllUsers})
   } catch (error) {
    res.status(500).json({message:"Internal server error"})
   }
})

app.put('/update/:id',async (req,res)=>{
    const {id}=req.params
     try {
        const updateUsers= await UserModel.findByIdAndUpdate(id,req.body,{new:true})
        if(!updateUsers){
        res.status(400).json({message:"User not found"})
        }
        res.status(200).json({updateUser:updateUsers})
     } catch (error) {
        res.status(500).json({message:"Internal server error"})
     }
})

app.delete('/delete/:id',async(req,res)=>{
    const {id}=req.params
    try {
        const  deleteUsers= await UserModel.findByIdAndDelete(id)

        if(!deleteUsers){
        res.status(400).json({message:"User not found"})
        }
        res.status(200).json({message:"User  was deleted successfully"})
    } catch (error) {
        res.status(500).json({message:"Internal server error"})
    }
})


mongoose.connect(process.env.MONGOURL).then(()=>{
    console.log('Server is running')
    app.listen(process.env.PORT,()=>console.log(`App is listenning on port ${process.env.PORT}`))
}).catch((e)=>console.log(e))