"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";

type Job = {

    _id: string;
    title: string;
    company: string
}

export default function ApplyPage() {

    const params  = useParams()
    const router = useRouter()

    const [job, setJob] = useState<Job | null>(null);

    const [coverLetter, setCoverLetter] = useState("")
    const [resume, setResume] = useState("")

    const [loading, setLoading] = useState(true)
    const [submitting, setSubmitting] = useState(false)

    async function fetchJob () {

        try {

            const response = await fetch(`/api/jobs/${params.id}`)
            const data = await response.json()

            if (!response.ok) {

                toast.error(data.message || "Failed to load job")

                router.push('/')

                return
                
            }

            setJob(data.job)
            
        } catch (error) {

            toast.error("Something went error")
            
        } finally {

            setLoading(false)
        }
    }

    useEffect(() => {

        fetchJob()

    }, [params.id])

    // submit application

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {

        e.preventDefault()

        if (!coverLetter.trim()) {

            toast.error("Cover letter is required")
            return
            
        }

        if (!resume.trim()) {

            toast.error("Resume is required")

            return
            
        }

        try {

            setSubmitting(true)

            const token = localStorage.getItem("token")

            if (!token) {

                toast.error("Please login to apply")

                router.push('/login')

                return
                
            }

            const response = await fetch("/api/applications", {

                method: "POST",

                headers: {

                    "Content-Type" : "application/json",
                    Authorization: `Bearer ${token}`
                },

                body: JSON.stringify({

                    jobId: params.id,
                    coverLetter,
                    resume
                })
            })

            const data = await response.json()

            if (!response.ok) {

                toast.error(data.message || "Failed to submit application")

                return
                
            }

            toast.success("Application submitted successfully")

            router.push(`/jobs/${params.id}`)
            
        } catch (error) {
            
            toast.error("Something went wrong")
            
        } finally {

            setSubmitting(false)
        }
    }


    if (loading) {

        return (

            <main className="min-h-screen px-4 py-20">
                <div className="mx-auto max-w-3xl text-center text-muted-foreground">
                    Loading......
                </div>
            </main>
        )
        
    }

    if (!job) {

        return null
        
    }


  return (
    <main className="min-h-screen px-4 py-12">
        <div className="mx-auto max-w-3xl">

            <Link href={`/jobs/${job._id}`}>

                <Button variant='ghost' className="mb-6 cursor-pointer">

                    <ArrowLeft className="mr-2 h-4 w-4"/>
                    Back to Job
                </Button>

            </Link>

            {/* Application Card */}

            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">

                        Apply for {job.title}

                    </CardTitle>

                    <p className="text-sm text-muted-foreground ">
                        {job.company}
                    </p>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2 mb-3">

                            <Label htmlFor="coverLetter">
                                Cover Letter
                            </Label>
                            
                            <Textarea className="mt-2" id="coverLetter" placeholder="Tell the employer why you are a good fit for this job..." value={coverLetter} onChange={(e) => setCoverLetter(e.target.value)} rows={8}>

                            </Textarea>

                        </div>

                        {/* Resume */}

                        <div className="space-y-2 mt-3">

                            <Label htmlFor="resume">
                                Resume
                            </Label>

                            <Input id="resume" placeholder="Enter your resume URL" value={resume} onChange={((e) => {setResume(e.target.value)})}/>

                            <p className="text-xs text-muted-foreground">
                                We can add actual file later todo
                            </p>
                        </div>

                        <Button type="submit" className=" cursor-pointer w-full" disabled={submitting}>
                            {submitting ? "Submitting" : "Submit Application"}
                        </Button>

                    </form>
                </CardContent>
            </Card>

        </div>
    </main>
  )
}
