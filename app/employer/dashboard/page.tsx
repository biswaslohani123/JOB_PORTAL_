"use client"

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, ClosedCaption, MapPin, Plus } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type Job = {

    _id: string;
    title: string;
    company: string;
    location: string;
    salary: number;
    jobType: string;
    experienceLevel: string;
    deadline: string;
    status: string;
    skills: string[]
    createdAt: string;
}

export default function page() {

    const [jobs, setJobs] = useState<Job[]>([])
    const [loading, setLoading] = useState(true);

    async  function fetchJobs() {

        try {

            const token = localStorage.getItem("token")

            if (!token) {

                toast.error("Please login first")
                return
                
            }

            const response = await fetch("/api/jobs/employerjobs", {

                method: "GET",

                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            const data = await response.json();

            if (!response.ok) {

                toast.error(data.message || "Failed to load jobs")
                return;
                
            }

            setJobs(data.jobs)
            
        } catch (error) {

            toast.error("Something went wrong")

            
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {

        fetchJobs()

    },[])

    const activeJobs = jobs.filter((job) => job.status === 'active').length

    const closedJobs = jobs.filter((job) => job.status !== "active").length


  return (
    
    <main className="min-h-screen px-4 py-12">

        <div className="mx-auto max-w-7xl">

            <div className="mb-10 flex flex-col justify-between gap-2 sm:flex-row sm:items-center">

                <div>
                    <h1 className="text-3xl font-bold md:text-4xl">Employer Dashboard</h1>


                    <p className="mt-2 text-muted-foreground">
                        Manage your job postings and applications
                    </p>
                </div>

                <Link href='/employer/createJob'>
                    <Button className="p-5 cursor-pointer">
                        <Plus className="mr-2 h-4 w-4"/>
                        Post a Job
                    </Button>
                </Link>


            </div>

            {/* Statistics */}

            <div className="mb-10 grid gap-5 sm:grid-cols-3">

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>

                            <p className="text-sm text-muted-foreground">
                                Total Jobs
                            </p>

                            <p className="mt-2 text-3xl font-bold">
                                {jobs.length}
                            </p>
                            </div>
                        <Briefcase className="h-8 w-8 text-muted-foreground"/>
                        </div>


                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">

                        <div>
                            <p className="text-sm text-muted-foreground">
                                Active Jobs
                            </p>

                            <p className="mt-2 text-3xl font-bold">
                                {activeJobs}
                            </p>
                          
                        </div>

                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">


                        <div>
                            <p className="text-sm text-muted-foreground">
                                Closed Jobs
                            </p>

                            <p className="mt-2 text-3xl font-bold">

                                {closedJobs}

                            </p>
                        </div>

                    </CardContent>
                </Card>

            </div>

            {/* Jobs */}

            <div className="mb-6">

                <h2 className="text-2xl font-bold">
                    My Jobs
                </h2>

                <p className="mt-1 text-muted-foreground">

                    Manage the Jobs you have posted

                </p>

            </div>

            {
                loading && (

                    <div className="py-12 text-center text-muted-foreground">

                        Loading Jobs....

                    </div>
                )
            }

            {/* No JObs */}

            {
                !loading && jobs.length === 0 && (

                    <Card>
                        <CardContent className="flex flex-col items-center py-16 text-center">

                            <Briefcase className="mb-4 h-10 w-10 text-muted-foreground"/>

                            <h3 className="text-xl font-semibold">
                                No jobs posted yet
                            </h3>

                            <p className="mt-2 text-muted-foreground">

                                Create your first job posting to find candidates

                            </p>

                            <Link href='/employer/jobs/create' className="mt-6">

                                <Button>
                                    <Plus className="mr-3 h-4 w-4"/>
                                    Post Your first job
                                </Button>

                            </Link>

                        </CardContent>
                    </Card>
                )
            }

            {/* JObs list */}

            {
                !loading && jobs.length > 0 && (

                    <div className="grid  gap-5  md:grid-cols-2">

                        {
                            jobs.map((job) => (

                                <Card key={job._id}>

                                    <CardHeader>
                                        <div className="flex items-start justify-between gap-4">

                                            <CardTitle className="text-xl">
                                                {job.title}
                                            </CardTitle>

                                            <p className="mt-1 text-sm text-muted-foreground">
                                                {job.company}
                                            </p>

                                        </div>

                                       <Badge className={job.status === 'active' ? "bg-green-500 text-white" : "bg-red-500 text-white"}>
                                        {job.status}
                                       </Badge>

                                    </CardHeader>

                                    <CardContent>
                                        <div className="space-y-3">

                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <MapPin className="h-4 w-4"/>

                                                {job.location}
                                            </div>

                                        </div>

                                    {/* Job information */}

                                    <div className="flex flex-wrap gap-2">

                                        <Badge variant="secondary">
                                            {job.jobType}
                                        </Badge>

                                        <Badge variant="secondary">
                                            {job.experienceLevel}
                                        </Badge>

                                    </div>

                                    <div className="flex flex-wrap gap-2">

                                        <Badge variant="secondary">
                                            {job.skills.map((skill) => (
                                                <Badge key={skill}>{skill}</Badge>
                                            ))}
                                        </Badge>

                                        
                                    </div>
                                    
                                    {/* Salary */}

                                    <p className="text-sm font-medium">
                                        Rs. {job.salary.toLocaleString()}
                                    </p>

                                    {/* Deadline */}

                                    <p className="text-sm text-muted-foreground">
                                        Deadline:{" "}
                                        {new Date(job.deadline).toLocaleDateString()}
                                    </p>

                                    {/* Actions */}

                                    <div className="flex gap-3 border-t pt-4">

                                        <Link href={`/jobs/${job._id}`}>
                                            <Button variant='outline'>
                                                View
                                            </Button>
                                        </Link>

                                        <Link href={`/employer/createJob/${job._id}/edit`}>
                                            <Button variant='outline'>
                                                Edit
                                            </Button>
                                        </Link>

                                    </div>


                                    </CardContent>

                                </Card>

                            ))
                        }

                    </div>
                )
            }

        </div>

    </main>
  )
}
