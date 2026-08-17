"use client"

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import React, { FormEvent, useState } from 'react'
import { toast } from 'sonner';

export default function page() {

    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");


    async function handleLogin(e: FormEvent<HTMLFormElement>) {

        e.preventDefault();

        setLoading(true);
        setError("");

        try {


            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: {

                    "Content-Type": "application/json"
                },
                body: JSON.stringify({

                    email,
                    password
                })
            })

            const data = await response.json();

            if (!response.ok) {

                toast.error(data.message || "Login failed");
                return
                
            }
            

            // save jwt
            localStorage.setItem("token", data.token);

            // save user information
            localStorage.setItem("user", JSON.stringify(data.user))

            toast.success("Logged in successfully")
            
            router.push('/')
            
        } catch (error) {
            
            toast.error("Something went wrong . please try again")
            
        } finally {

            setLoading(false)
        }
    }

  return (
    
    <main className='min-h-screen flex items-center justify-center px-4'>
        <Card className='w-full max-w-md'>

            <CardHeader>
                <CardTitle className='text-3xl font-semibold'>
                    Welcome Back
                </CardTitle>

                <CardDescription>
                    Login to your Job Portal account
                </CardDescription>
            </CardHeader>

            <CardContent>

                <form onSubmit={handleLogin} className='space-y-5'>

                    {
                        error && (

                            <div className='rounded-md bg-red-50 p-3 text-sm text-red-600'>
                                {error}
                            </div>
                        )
                    }

                    <div className='space-y-2'>
                        <Label htmlFor='email'>
                            Email
                        </Label>

                        <Input id='email' type='email' placeholder='enter your email' value={email} onChange={(e) => setEmail(e.target.value)}/>

                    </div>

                    <div className='space-y-2'>
                        <Label htmlFor='password'>
                            Password
                        </Label>

                        <Input id='password' type='password' placeholder='Enter your password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </div>

                    <Button type='submit' className='w-full' disabled={loading}>
                        {loading ? "Logging in..." : "Login"}
                    </Button>

                </form>

                <p className='mt-6 text-center text-sm text-muted-foreground'>

                    Don't have an account?{" "}
                    <Link className='font-medium text-primary hover:underline' href='/register'>
                            Create an account
                    </Link>

                </p>

            </CardContent>

        </Card>
    </main>
  )
}
