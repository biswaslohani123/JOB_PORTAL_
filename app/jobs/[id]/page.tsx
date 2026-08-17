"use client"

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, MapPin } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";


type Job = {

    _id: string;
    title: string;
    description: string;
    company: string;
    location: string;
    salary: number;
    jobType: string;
    experienceLevel: string;
    skills: string[];
    deadline : string;
    status: string
}

export default function page() {

    const params = useParams()
    const router = useRouter()

    const [job, setJob] = useState<Job | null>(null);
    const [loading, setLoading] = useState(true)

    async function fetchJob() {

        try {

            const response = await fetch(`/api/jobs/${params.id}`)

            const data = await response.json();

            if (!response.ok) {

                toast.error(data.message || "Failed to load job")
                router.push('/')
                return
                
            }

            setJob(data.job)
            
        } catch (error) {
            
            toast.error("Something went wrong")
            
        } finally {

            setLoading(false)
        }
    }

    useEffect(() => {
        fetchJob()
    }, [])

    if (loading) {
        
        return (

            <main className="min-h-screen bg-[#080808] px-4 py-20 text-white">
                <div className="mx-auto max-w-5xl text-center text-gray-400">
                    Loading Job.......
                </div>
            </main>
        )
        
    }

    if (!job) {

        return null
        
    }

  return (
    <main className="min-h-screen  px-4 py-12 ">
        <div className="mx-auto max-w-5xl px-5 py-12">

            <Link href='/'>
                <Button variant='ghost' className="mb-8 ">

                <ArrowLeft className="mr-2 h-4 w-4 cursor-pointer"/> Back to Jobs

                </Button>
            </Link>

            <Card>

                <CardContent className="p-6 md:p-10">

                    <div className="flex flex-col justify-between gap-6 md:flex-row">

                        <div>
                            <Badge className="mb-4">

                                {job.jobType}

                            </Badge>

                            <h1 className="text-3xl font-bold md:text-5xl">
                                {job.title}
                            </h1>

                            <p className="mt-3 text-sm text-muted-foreground">
                                {job.description}
                            </p>

                            <p className="mt-3 text-lg text-muted-foreground">
                                {job.company}
                            </p>
                        </div>

                    <Link href={`/jobs/${job._id}/apply`}>
                        <Button className="cursor-pointer">
                            Apply Now
                        </Button>
                    </Link>

                    </div>

                    <div className="mt-8 grid gap-4 border-t pt-8 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">

                        <div className="flex items-center gap-3">

                            <MapPin className="h-5 w-5"/>

                            <div>
                                <p className="text-xs text-muted-foreground">
                                    Location
                                </p>

                                <p className="text-sm font-medium">
                                    {job.location}
                                </p>
                            </div>
                            
                        </div>

                        <div>
                            <p className="text-xs text-muted-foreground">
                                Salary
                            </p>

                            <p className="mt-1 text-sm font-semibold">
                                Rs. {job.salary.toLocaleString()}
                            </p>
                        </div>

                        <div>
                            <p className="text-xs text-muted-foreground">
                                Experience
                            </p>

                            <p className="mt-1 text-sm font-medium">
                                {job.experienceLevel}
                            </p>
                        </div>

                        <div>
                            <p className="text-xs text-muted-foreground">
                                Deadline
                            </p>

                            <p className="mt-1 text-sm font-medium">

                                {new Date(job.deadline).toLocaleDateString()}
                                
                            </p>
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground">
                                Status
                            </p>

                            <Badge className={job.status === 'active' ? "bg-green-500 text-white" : "bg-red-500  text-white"}>
                                {job.status }
                            </Badge>
                        </div>

                    </div>

                </CardContent>
            
            </Card>

        </div>
    </main>
  )
}
