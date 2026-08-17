import { authorize } from "@/lib/authorize";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {

    try {

        const user = authorize(req, ["employer"])

        return NextResponse.json({

            success: true,
            message: "You are an employer",
            user
        })
        
    } catch (error) {

        return NextResponse.json({

            success: false,
            message: "Forbidden"
            
        }, {status: 403})
        
    }
}