import e from "express";
import { collectionName, collectionName2, collectionName3, connection } from "./dbconfig.js";
import cors from 'cors';
import { ObjectId } from "mongodb";
const app=e();
app.use(e.json());
app.use(cors());
app.post('/add-task',async(req,res)=>{
    const db=await connection();
    const collection=await db.collection(collectionName);
    const result=await collection.insertOne(req.body);
    if(result){
      res.send({message:"New task Added",success:true,result});
    }
    else{
       res.send({message:"Task not Added",success:false});
    }
})

app.get('/tasks',async(req,res)=>{
    const db=await connection();
    const collection=await db.collection(collectionName);
    const result=await collection.find().toArray();
    if(result){
      res.send({message:"Task List Fetched",success:true,result});
    }
    else{
       res.send({message:"Error, try after some time",success:false});
    }
})

app.get('/products',async(req,res)=>{
    const db=await connection();
    const collection=await db.collection(collectionName3);
    const result=await collection.find().toArray();
    if(result){
      res.send({message:"Product List Fetched",success:true,result});
    }
    else{
       res.send({message:"Error, try after some time",success:false});
    }
})

app.get('/task/:id',async(req,res)=>{
    const db=await connection();
    const id=req.params.id;
    const collection=await db.collection(collectionName);
    const result=await collection.findOne({_id:new ObjectId(id)});
    if(result){
      res.send({message:"Task Fetched",success:true,result});
    }
    else{
       res.send({message:"Error, try after some time",success:false});
    }
    // res.send("Working.....");
})


app.delete('/delete/:id',async(req,res)=>{
    const db=await connection();
    const id=req.params.id;
    const collection=await db.collection(collectionName);
    const result=await collection.deleteOne({_id:new ObjectId(id)});
    if(result){
      res.send({message:"Task Deleted",success:true,result});
    }
    else{
       res.send({message:"Error, try after some time",success:false});
    }
    // res.send("Working.....");
})

app.delete('/delete-multiple',async(req,res)=>{
    const db=await connection();
    const Ids=req.body;
    const deleteTaskIds=Ids.map((item)=>new ObjectId(item))
    console.log(Ids);
    const collection=await db.collection(collectionName);
    // const result=await collection.deleteOne({_id:new ObjectId(id)});
    const result=await collection.deleteMany({_id:{$in:deleteTaskIds}});
    // if(true){
    if(result){
      // res.send({message:"Task Deleted",success:true,result});
      res.send({message:"Task Deleted",success:true,});
    }
    else{
       res.send({message:"Error, try after some time",success:false});
    }
    // res.send("Working.....");
})
app.put('/update-task',async(req,res)=>{
    const db=await connection();
    const collection=await db.collection(collectionName);
    const {_id,...fields}=req.body;
    const update={$set:fields}
    const result=await collection.updateOne({_id:new ObjectId(_id)},update);
    // console.log(req.body);
    console.log(fields);
    // res.send("test");
    if(result){
      res.send({message:"Task Data Updated",success:true,result});
    }
    else{
       res.send({message:"Error, try after some time",success:false});
    }
    res.send("Working.....");
})

app.post('/signup',async(req,res)=>{
    const db=await connection();
    const collection=await db.collection(collectionName2);
    const result=await collection.insertOne(req.body);
    if(result){
      res.send({message:"User signup successfully",success:true,result});
    }
    else{
       res.send({message:"signup error",success:false});
    }
    // res.send("Working.....");
})

app.post('/login', async(req,res)=>{
  const db=await connection();
  const collection=await db.collection(collectionName2);
  const {_id,...fields}=req.body;
  const result=await collection.findOne(fields);
  if(result)
  {
    res.send({message:"User login successfully",success:true,result});
  }
  else{
    res.send({message:"login error",success:false});
  }
})

app.get('/',(req,res)=>{
    res.send({
      message:"basic API done",
      success:true
    })
}).listen(3200);
