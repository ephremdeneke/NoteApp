import mongoose from "mongoose";
export const connectDB = async ()=> {
    try{
        await mongoose.connect( process.env.MONGO_URI );
        
            console.log("MONGOOSE connected successfully");
       }
    catch (error){
        console.error("Error connecting to the database", error);
    }
};