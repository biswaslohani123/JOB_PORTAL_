import Application from "@/app/models/Application";
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

        // Only jobseeker can view their applications

        if (user.role !== "jobseeker") {

            return NextResponse.json({

                success: false,
                message: "Only jobseekers can view applications"
            }, {status: 403})
            
        }

        // Find applications of logged-in user

        const applications = await Application.find({

            applicant: user.userId,
        })
            .populate(
                "job",
                 "title company location salary jobType experienceLevel deadline status"

            ).sort({cratedAt: -1})

        return NextResponse.json({

            success: true,
            applications

        }, {status: 200})

    } catch (error) {

        console.error("Get my applications error", error)

        return NextResponse.json({

            success: false,
            message: "Server error"
        }, {status: 500})
        
    }

}