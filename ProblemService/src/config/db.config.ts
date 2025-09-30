import mongoose from "mongoose";
import logger from "./logger.config";
import { serverConfig } from "./index";
export const connectDB=async()=>{
    try{
        const dbUri=serverConfig.DB_URL;
        await mongoose.connect(dbUri);
        logger.info("connected to mongodb");
        mongoose.connection.on("error",(error)=>{
            logger.error("mongodb connection error",error)
        })
        mongoose.connection.on("connected",()=>{
            logger.info("connected to mongodb")
        });
        mongoose.connection.on("disconnected",()=>{
            logger.info("mongodb disconnected")
        });
        mongoose.connection.on("reconnected",()=>{
            logger.info("mongodb reconnected")
        });
    }
    catch(error){
        logger.error("failed to connect to mongodb",error)
        process.exit(1);
    }

}