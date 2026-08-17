"use client"

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { LocateOff, MapPin } from "lucide-react";
import Link from "next/link";

import { useEffect, useState } from "react";
import { toast } from "sonner";

type Job = {
  

  _id: string;
  description: string
  title: string;
  company: string;
  location: string;
  salary:number;
  jobType: string;
  experienceLevel: string;
  skills: string[];
  deadline: string;
  status: string;

}

export default function page() {

    const [jobs, setJobs ] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);
   

    async function fetchJobs() {
      
      try {

        const response = await fetch('/api/jobs');

        const data = await response.json()

        if (!response.ok) {

          toast.error(data.message || "Failed to load jobs")
          return
          
        }

        setJobs(data.jobs)
        
      } catch (error) {

        toast.error("something went wrong")
        
      } finally {

        setLoading(false)
      }


    }


    useEffect(() => {
      
      fetchJobs()
    
    }, [])

  return (
    <main className="">
      <section className="border-b ">

        <div className="mx-auto max-w-7xl px-4 py-20 text-center">

          <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
            Find Your Next
            <span className=" text-blue-900 ml-2">Opportunity</span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-muted-foreground">
              Discover jobs from companies and find the opportunity
            that matches your skills and career goals.
          </p>

          <div className="mx-auto mt-8 flex max-w-2xl gap-3">

            <Input placeholder="Search Jobs..." className="h-11"/>

            <Button className="h-11 px-6">
              Search
            </Button>

          </div>

        </div>

      </section>

      {/* JObs */}

      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold">
            Latest Jobs
          </h2>

          <p className="mt-2 text-muted-foreground">

            Explore the latest opportunities

          </p>
        </div>

        {
          loading && (

            <div className="py-10 text-center text-muted-foreground">

              Loading Jobs...

            </div>
          )
        }

        {/* No JObs */}

        {
          !loading &&  jobs.length === 0 && (

            <div className="py-10 text-center text-muted-foreground ">

              No jobs available

            </div>
          )
        }

        {/* jobs card */}

        {

          !loading && jobs.length > 0 && (

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

              {
                jobs.map((job) => (

                  <Card key={job._id} className="transition-shadow hover:shadow-lg">

                    <CardHeader>
                      <div className="flex items-start justify-between gap-3">

                        <div>

                        <CardTitle className="text-xl">
                          {job.title}
                        </CardTitle>

                        <p className="mt-1 text-sm text-muted-foreground">

                          {job.company}

                        </p>

                        </div>

                        <Badge>
                          {job.jobType}
                        </Badge>


                      </div>
                    </CardHeader>

                    <CardContent>

                      <div className="space-y-3">

                        <p className="text-sm text-muted-foreground flex gap-2">

                          <MapPin className="w-4"/> {job.location}

                        </p>

                        <p className="text-sm font-medium">

                          Rs. {job.salary.toLocaleString()}

                        </p>

                        <p className="line-clamp-2 text-sm text-muted-foreground">

                          {job.description}

                        </p>

                        {/* skills */}

                        <div className="flex flex-wrap gap-2">

                          {
                            job.skills.slice(0,4).map((skill) => (

                              <Badge key={skill} variant='secondary'>
                                {skill}
                              </Badge>
                            ))
                          }

                        </div>

                        {/* view button */}

                        <Link href={`/jobs/${job._id}`} className="block pt-3">

                          <Button className="w-full">
                            View Job
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

      </section>



    </main>
  )
}
