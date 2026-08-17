import User from "@/app/models/User";
import { createToken } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";



export async function POST(req: NextRequest) {


    try {

        await connectDB()

        const {name, email, password, role} = await req.json()

        if (!name || !email || !password ) {

            return NextResponse.json({

                success: false,
                message: "Name, email and password are required"
            })
            
        }

        const existingUser = await User.findOne({email});

        if (existingUser) {

            return NextResponse.json({

                success: false,
                message: "User already exists"
            }, {status: 409})
            
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({

            name,
            email,
            password: hashedPassword,
            role: "jobseeker"

        })

        // generate token
        const token = createToken(

            user._id.toString(),
            user.role
        )



        return NextResponse.json({

            success: true,
            message: "User registered successfully",
        }, {status: 201})
        
    } catch (error) {

        console.error("Registration error:", error)

        return NextResponse.json({

            success: false,
            message: "Server error"
            
        }, {status: 500})
        
    }
}