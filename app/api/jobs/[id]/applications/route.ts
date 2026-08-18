import Application from "@/app/models/Application";
import Job from "@/app/models/JobModel";
import { connectDB } from "@/lib/db";
import { getAuthUser } from "@/lib/getAuthUser";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest, {params} : {params: Promise<{id: string}>}) {

    try {

        await connectDB();

        const user = getAuthUser(req)

        if (!user) {

            return NextResponse.json({

                success: false,
                message: "unauthorized"

            }, {status: 401})
            
        }

        // Only employer

        if (user.role !== "employer") {

            return NextResponse.json({

                success: false,
                message: "only employers can view applicants"
            }, {status: 403})
            
        }
        const { id } = await params;

        // find job
        const job = await Job.findById(id)

        if (!job) {

            return NextResponse.json({

                success: false,
                message: "Job not found"
            }, {status: 404})
            
        }

        // Make sure employer owns this job

        if (job.createdBy.toString() !== user.userId) {

            return NextResponse.json({

                success: false,
                message: "You can only view applicants for your own jobs"
            }, {status: 403})
            
        }

        // get Applications

        const applications = await Application.find({

            job: id
        })
            .populate("applicant", "name email")
            .sort({createdAt: -1})

        return NextResponse.json({

            success: true,
            applications
        })
        
    } catch (error) {

        console.error("Get applicants error", error)

        return NextResponse.json({

            success: false,
            message: "Server error"
        }, {status: 500})
        
    }
}