import Job from "@/app/models/JobModel";
import { authorize } from "@/lib/authorize";
import { connectDB } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";


// Get single job
export async function GET(req: NextRequest, {params}: {params: Promise<{id: string}>}) {


    try {

        await connectDB();

        const { id } = await params;

        const job = await Job.findById(id).populate("createdBy", "name email")

        if (!job) {

            return NextResponse.json({

                success: false,
                message: "Job not found"

            }, {status: 404})
            
        }

        return NextResponse.json({

            success: true,
            job
        })
        
    } catch (error) {

        console.error("Get single job error", error)

        return NextResponse.json({

            success: false,
            message: "Server error"
        }, {status: 500})
        
    }


}

// update job

export async function PUT(req: NextRequest, {params}: {params: Promise<{id: string}>}) {

    try {

        await connectDB()

        const user = authorize(req, ["employer", "admin"])

        const { id } = await params

        const {title, description, company, location, salary, jobType, experienceLevel, skills, deadline, status} = await req.json()

        // find job

        const job = await Job.findById(id)

        if (!job) {

            return NextResponse.json({

                success: false, 
                message: "Job not found"
            }, {status: 404});
            
        }

        // check ownership

        if (user.role !== "admin" && job.createdBy.toString() !== user.userId) {

            return NextResponse.json({

                success: false,
                message: "You are not allowed to update this job"
            }, {status: 403})
            
        }
        
        // update job

        job.title = title ?? job.title;
        job.description = description ?? job.description;
        job.company = company ?? job.company;
        job.location = location ?? job.location;
        job.salary = salary ?? job.salary;
        job.jobType = jobType ?? job.jobType;
        job.experienceLevel = experienceLevel ?? job.experienceLevel;
        job.skills = skills ?? job.skills;
        job.deadline = deadline ?? job.deadline;
        job.status = status ?? job.status;

        await job.save()

        return NextResponse.json({

            success: true,
            message: "Job updated successfully"

        }, {status: 200})

    } catch (error) {
        
        console.error("Update job error", error)

        return NextResponse.json({

            success: false,
            message: "Unauthorized or server error"

        }, {status: 401})

    }
}


// Delete job

export async function DELETE (req: NextRequest, {params}: {params: Promise<{id: string}>}){

    try {

        await connectDB()

        const user = authorize(req, ["employer", "admin"]);

        const { id } = await params;

        const job = await Job.findById(id);

        if (!job) {

            return NextResponse.json({

                success: false, 
                message: "Job not found"

            }, {status: 404})
            
        }

        // check owner ship
        if (user.role !== "admin" && job.createdBy.toString() !== user.userId) {

            return NextResponse.json({

                success: false,
                message : "You are not allowed to delete this job"

            }, {status: 403})
            
        }

        await Job.findByIdAndUpdate(id)

        return NextResponse.json({

            success: true, 
            message: "Job deleted successfully"
        }, {status: 200})

    } catch (error) {

        console.error("Delete Job error", error)

        return NextResponse.json({

            success: false,
            message : "Unauthorized or server error"
        }, {status: 401})
        
    }
}