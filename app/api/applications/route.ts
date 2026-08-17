import Application from "@/app/models/Application";
import Job from "@/app/models/JobModel";
import { connectDB } from "@/lib/db";
import { getAuthUser } from "@/lib/getAuthUser";
import { NextRequest, NextResponse } from "next/server";




export async function POST(req: NextRequest) {

    try {

        await connectDB();

        const user = await getAuthUser(req)

        if (!user) {

            return NextResponse.json({

                success: false,
                message: "Unauthorized"

            }, {status: 401})
            
        }


        // Only job seeker can apply

        if (user.role !== "jobseeker") {

            return NextResponse.json({

                success: false,
                message: "Only jobseekers can apply for jobs"

            }, {status: 403})
            
        }

        const {jobId, coverLetter, resume} = await req.json()

        if (!jobId || !coverLetter || !resume) {

            return NextResponse.json({

                success: false,
                message: "job cover letter and resume are required"

            }, {status: 400})
            
        }

        // find job

        const job = await Job.findById(jobId)
        if (!job) {

            return NextResponse.json({

                success: false,
                message: "Job not found"
            }, {status: 404})
            
        }

        // check job status

        if (job.status !== "active") {

            return NextResponse.json({

                success: false,
                message:" This job is no longer active"

            }, {status: 400})
            
        }

        // check deadline

        if (new Date(job.deadline) < new Date()) {

            return NextResponse.json({

                success: false,
                message: "Application deadline has passed"

            }, {status: 400})
            
        }

        // check duplicate application

        const existingApplication = await Application.findOne({

            job: jobId,
            applicant: user.userId
        })

        if (existingApplication) {

            return NextResponse.json({

                success: false,
                message: "you have already applied for the job"

            }, {status: 409})
            
        }

        // create application
        const application = await Application.create({

            job: jobId,
            applicant: user.userId,
            coverLetter,
            resume
        })

        return NextResponse.json({

            success: true,
            message: "Application submitted successfully"

        }, {status: 201})
        
    } catch (error) {

        console.error("Application error: ", error)

        return NextResponse.json({
            success: false,
            message:" server error"
        }, {status: 500})
        
    }
}

