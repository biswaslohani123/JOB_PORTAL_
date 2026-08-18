import Job from "@/app/models/JobModel";
import { connectDB } from "@/lib/db";
import { getAuthUser } from "@/lib/getAuthUser";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {


    try {

        await connectDB()

        const user = getAuthUser(req)

        if (!user) {

            return NextResponse.json({

                success: false,
                message: "Unauthorized"
            }, {status: 401})
            
        }
        // Only employer can access their jobs

        if (user.role !== "employer") {

            return NextResponse.json({

                success: false,
                message: "Only employers can access their jobs"
            })
            
        }

        const jobs = await Job.find({

            createdBy: user.userId

        }).sort({createdAt: -1})

        return NextResponse.json({

            success: true,
            jobs

        }, {status: 200})
        

        
    } catch (error) {

        console.error("Get employer jobs error:", error)

        return NextResponse.json({

            success: false,
            message: "Server error"
            
        }, {status: 500})
        
    }
}