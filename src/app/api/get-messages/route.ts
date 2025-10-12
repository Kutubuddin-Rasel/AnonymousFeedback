import dbConnect from "@/lib/dbConnect";
import { checkAuthentication } from "@/helpers/checkAuthentication";
import mongoose from "mongoose";
import UserModel from "@/model/User";

export async function GET(reques:Request){
    await dbConnect();

    const user = await checkAuthentication();
    if(!user){
        return Response.json({
            success: false,
            message: "Not authenticated"}, { status: 401 })
    }
    
    const userID = new mongoose.Types.ObjectId(user._id);
    try {
        const user = await UserModel.aggregate([
            {$match :{id:userID}},
            {$unwind:'$messages'},
            {$sort:{'messages.createdAt':-1}},
            {$group:{_id:'$_id',messages:{$push:'$messages'}}}
        ])
        console.log(user);
        if(!user || user.length === 0){
            return Response.json(
                {
                    success:false,
                    message:"User not found"
                },{status:404}
            )
        }
        return Response.json(
                {
                    success:true,
                    message:user[0].messages
                },{status:500}
            )
    } catch (error) {
        console.log(`Internal server error: ${error}`);
        return Response.json(
                {
                    success:false,
                    message:"Error while aggregating usermodel"
                },{status:500}
            )
    }
}