import "dotenv/config";
import { MongoClient } from "mongodb";

const uri= process.env.MONGODB_URI;
const databaseName=process.env.MONGODB_DATABASE;

if(!uri)
{
    throw new Error("MONGODB URI IS MISSING FROM .ENV");
}
if(!databaseName)
{
    throw new Error("databse is missing from .env");
}
export const client=new MongoClient(uri);
export const db = client.db(databaseName);