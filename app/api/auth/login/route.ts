import User from "@/app/models/User";
import { createToken } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {

    try {

        await connectDB();

        const { email, password } = await req.json()

        if (!email || !password) {

            return NextResponse.json({

                success: false,
                message: "Email and password are required"

            }, { status: 400 })

        }

        const user = await User.findOne({ email })

        if (!user) {

            return NextResponse.json({

                success: false,
                message: "Invalid email or password"
            })

        }

        const isPasswordMatch = await bcrypt.compare(

            password,
            user.password
        )

        if (!isPasswordMatch) {

            return NextResponse.json({

                success: false,
                message: "Invalid email or password"
            }, { status: 401 })

        }

        const token = createToken(

            user._id.toString(),
            user.role
        )

        return NextResponse.json({
            success: true,
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });

    } catch (error) {

        console.error(error);

        return NextResponse.json(
            {
                success: false,
                message: "Server error",
            },
            { status: 500 }
        );

    }
}