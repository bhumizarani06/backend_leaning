import dotenv from "dotenv";
import app from "./app.js";
import { connectDB} from "./config/database.js";

dotenv.config();

const port = Number(process.env.PORT) || 5000;

async function startServer():Promise<void>
{
    try{
        await connectDB();

        app.listen(port,() =>{
            console.log(`server is running ${port}`);
        });

    }catch(error){
        console.error("Failed to start server:",error);
        process.exit(1);
    }
    }
    startServer();