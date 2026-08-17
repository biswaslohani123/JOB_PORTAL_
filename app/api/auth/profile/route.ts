import User from "@/app/models/User";
import { verifyToken } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { getAuthUser } from "@/lib/getAuthUser";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {

    try {

        await connectDB();

        const decoded = getAuthUser(req)

        const user = await User.findById(decoded.userId).select("-password")

        if (!user) {

            return NextResponse.json({

                success: false,
                message: "user not found"
            }, {status: 404})
            
        }

        return NextResponse.json({

            success: true,
            user
        })


    } catch (error) {

        return NextResponse.json({

            success: false,
            message: "unauthorized"
        }, {status: 401})
        
    }
}