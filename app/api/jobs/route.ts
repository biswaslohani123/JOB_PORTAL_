import Job from "@/app/models/JobModel";
import { authorize } from "@/lib/authorize";
import { connectDB } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import User from "@/app/models/User";

export async function POST(req: NextRequest) {
    try {

        await connectDB();

        // Authentication + role authorization
        const user = authorize(req, ["employer", "admin"]);

        // Get request body
        const {
            title,
            description,
            company,
            location,
            salary,
            jobType,
            experienceLevel,
            skills,
            deadline
        } = await req.json();

        // Validate fields
        if (
            !title ||
            !description ||
            !company ||
            !location ||
            !salary ||
            !jobType ||
            !experienceLevel ||
            !skills ||
            !deadline
        ) {
            return NextResponse.json(
                {
                    success: false,
                    message: "All fields are required"
                },
                { status: 400 }
            );
        }

        // Create Job
        const job = await Job.create({
            title,
            description,
            company,
            location,
            salary,
            jobType,
            experienceLevel,
            skills,
            deadline,
            createdBy: user.userId
        });

        return NextResponse.json(
            {
                success: true,
                message: "Job created successfully",
                job
            },
            { status: 201 }
        );

    } catch (error) {

        console.error("Create job error:", error);

        // Role/authentication error
        if (
            error instanceof Error &&
            error.message === "Unauthorized"
        ) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Unauthorized"
                },
                { status: 401 }
            );
        }

        if (
            error instanceof Error &&
            error.message === "Forbidden"
        ) {
            return NextResponse.json(
                {
                    success: false,
                    message: "You do not have permission to create jobs"
                },
                { status: 403 }
            );
        }

        // Other server errors
        return NextResponse.json(
            {
                success: false,
                message: "Internal server error"
            },
            { status: 500 }
        );
    }
}

// GET JOBS

export async function GET(req: NextRequest) {

    try {

        await connectDB()

        const jobs = await Job.find().populate("createdBy", "name email").sort({createdAt: -1});

        return NextResponse.json({

            success: true,
            count: jobs.length,
            jobs
        })
        
    } catch (error) {

        console.error("Get jobs error", error)

        return NextResponse.json({

            success: false,
            message: "Server error"
        }, {status: 500})
        
    }
}

