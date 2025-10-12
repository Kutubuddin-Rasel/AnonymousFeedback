import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { checkAuthentication } from "@/helpers/checkAuthentication";

export async function POST(request: Request) {
    await dbConnect();
    const user = await checkAuthentication();
    if(!user){
        return Response.json({
            success: false,
            message: "Not authenticated"
        }, { status: 401 })
    }
    const userID = user._id;
    const { acceptingMessage } = await request.json();
    try {
        const updatedUser = await UserModel.findByIdAndUpdate(userID, { isAcceptingMessage: acceptingMessage }, { new: true });

        if (!updatedUser) {
            return Response.json({
                success: false,
                message: "Failed to update user status to accept messages "
            }, { status: 401 })
        }
        return Response.json({
            success: true,
            message: "Message acceptance updated successfully.",
            updatedUser
        }, { status: 200 })
    } catch (error) {
        return Response.json({
            success: false,
            message: "Failed to update user status to accept messages"
        }, { status: 500 })
    }
}

export async function GET(request: Request) {
    await dbConnect();

    const user = await checkAuthentication();
    if(!user){
        return Response.json({
            success: false,
            message: "Not authenticated"
        }, { status: 401 })
    }

    const userID = user._id;
    try {
        const foundUser = await UserModel.findById(userID);
        if (!foundUser) {
            return Response.json({
                success: false,
                message: "User not found "
            }, { status: 404 })
        }
        return Response.json({
            success: true,
            isAcceptingmessage: foundUser.isAcceptingMessage
        }, { status: 200 })
    } catch (error) {
        return Response.json({
            success: false,
            message: "Error in getting user message acceptance status"
        }, { status: 500 })
    }
}