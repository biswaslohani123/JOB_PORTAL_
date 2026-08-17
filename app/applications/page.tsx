"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {  Briefcase, Calendar, MapPin } from "lucide-react";
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
};

type Application = {
  _id: string;
  job: Job;
  coverLetter: string;
  resume: string;
  status: "pending" | "shortlisted" | "rejected" | "accepted";
  createdAt: string;
};

export default function ApplicationPage() {
  const [application, setApplication] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchApplication() {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Please login first");

        return;
      }

      const response = await fetch("/api/applications/myapplication", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Failed to load applications");
        return;
      }

      setApplication(data.applications);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchApplication();
  }, []);

  function getStatusClass(status: Application["status"]) {
    switch (status) {
      case "accepted":
        return "bg-green-500 text-white";
      case "shortlisted":
        return "bg-blue-500 text-white";
      case "rejected":
        return "bg-red-500 text-white";
      default:
        return "bg-yellow-500 text-white";
    }
  }

  return (
    <main className="min-h-screen px-4 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10">
          <h1 className="text-3xl font-bold md:text-4xl">My Applications</h1>
          <p className="mt-2 text-muted-foreground">
            Track the jobs you have applied for
          </p>
        </div>

        {loading && (
          <div className="py-16 text-center text-muted-foreground">
            Loading Application
          </div>
        )}

        {/* no applications */}

        {!loading && application.length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16 text-center">
              <Briefcase className="mb-4 h-10 text-muted-foreground" />

              <h2 className="text-xl font-semibold">No applications yet</h2>
              <p className="mt-2 text-muted-foreground">
                Start exploring jobs and apply for positions that match your
                skills.
              </p>

              <Link href="/" className="mt-6">
                <Button>
                  Browse Jobs
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}

        {/* Applications */}

        {
            !loading && application.length > 0 && (

                <div className="space-y-5">

                    {
                        application.map((application) => (

                            <Card key={application._id}>

                                <CardHeader>
                                    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">

                                        <div>
                                            <CardTitle className="text-xl">

                                                {application.job.title}


                                            </CardTitle>

                                            <p className="mt-1 text-muted-foreground">
                                                {application.job.company}
                                            </p>
                                        </div>

                                        
                                        <Badge className={getStatusClass(application.status)}>

                                            {application.status}
                                        </Badge>
                                        


                                        
                                    </div>
                                </CardHeader>

                                <CardContent>

                                    <div className="grid grid-4 text-sm sm:grid-cols-2 md:grid-cols-4">
                                        
                                        <div className="flex items-center gap-2">

                                            <MapPin className="h-4 w-4 text-muted-foreground"/>

                                            <div>
                                                <p className="text-xs text-muted-foreground">
                                                    Location
                                                </p>

                                                <p className="font-medium">
                                                    {application.job.location}
                                                </p>
                                            </div>

                                        </div>

                                        <div className="flex items-center gap-2">

                                            <Briefcase className="h-4 w-4 text-muted-foreground "/>
                                            <div>
                                                <p className="text-xs text-muted-foreground">
                                                    Job Type
                                                </p>

                                                <p className="font-medium">
                                                    {application.job.jobType}
                                                </p>
                                            </div>

                                        </div>

                                        {/* Salary */}

                                        <div>
                                            <p className="text-xs text-muted-foreground">
                                                Salary
                                            </p>

                                            <p className="mt-1 font-medium">
                                                Rs. {application.job.salary.toLocaleString()}
                                            </p>
                                        </div>

                                        <div className="flex items-center gap-2">

                                            <Calendar className="h-4 w-4 text-muted-foreground"/>

                                            <div>
                                                <p className="text-xs text-muted-foreground">
                                                    Applied
                                                </p>

                                                <p className="font-medium">

                                                    {
                                                        new Date(
                                                            application.createdAt
                                                        ).toLocaleDateString()
                                                    }

                                                </p>
                                            </div>

                                        </div>

                                    </div>

                                    <div className="mt-6 flex justify-end border-t pt-5">

                                        <Link href={`/jobs/${application.job._id}`}>
                                            <Button variant="outline">
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

      </div>
    </main>
  );
}
