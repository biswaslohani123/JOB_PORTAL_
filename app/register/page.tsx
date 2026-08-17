"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function page() {

    const router = useRouter();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleRegister(e: FormEvent<HTMLFormElement>) {

        e.preventDefault();

        setLoading(true);
        setError("");
        
        try {

            const response = await fetch("/api/auth/register",{

                method: "POST",

                headers: {"Content-Type": "application/json"},

                body: JSON.stringify({

                    name,
                    email,
                    password
                })
            })

            const data = await response.json();

            if (!response.ok) {

                setError(data.message)
                return
                
            }

            // store jwt 
            localStorage.setItem("token", data.token);

            // store user
            localStorage.setItem(

                "user",
                JSON.stringify(data.user)
            )
            
            router.push('/')

        } catch (error) {

            setError("Something went wrong")
            
        } finally {

            setLoading(false)
        }
    }

  return (
    <main className="min-h-screen flex items-center justify-center px-4">

        <Card className="w-full max-w-md">
            <CardHeader>
                <CardTitle className="text-3xl font-semibold text-">
                    Create an account
                </CardTitle>

                <CardDescription>
                    Create your Job Portal account
                </CardDescription>
            </CardHeader>

            <CardContent>
                <form onSubmit={handleRegister} className="space-y-5">
                    {
                        error && (

                            <div className="rounded-md bg-red-50 p-3 text-sm text-red-600">
                                {error}
                            </div>
                        )
                    }

                    <div className="space-y-2">

                        <Label htmlFor="name">
                            Full Name
                        </Label>

                        <Input id="name" type="text" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} required/>

                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">
                            Email
                        </Label>

                        <Input id="email" type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required/>

                    </div>

                    <div className="space-y-2">

                        <Label htmlFor="password">
                            Password
                        </Label>

                        <Input id="password" type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required/>

                    </div>

                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? "Creating account..." : "Create Account"}
                    </Button>
                </form>
                <p  className="text-center">Already have an account? <Link className="text-blue-500" href='/login'>Login</Link></p>
            </CardContent>

        </Card>

    </main>
  )
}
