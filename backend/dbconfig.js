//user name rohitkumar1_db_user
// password k8oHjwOBFk5RO4jh

import { MongoClient } from "mongodb";

// const url="mongodb://localhost:27017/";
const url="mongodb+srv://rohitkumar1_db_user:k8oHjwOBFk5RO4jh@cluster0.jvt2vci.mongodb.net/?appName=Cluster0";
const dbName="node-project";
export const collectionName="todo";
export const collectionName2="users";
export const collectionName3="Products";
const client=new MongoClient(url);  

export const connection=async()=>{
  const connect=await client.connect();
  return await connect.db(dbName)
}

