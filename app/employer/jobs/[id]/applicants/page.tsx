"use client"

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, FileText, Mail, User } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";


type Applicant = {

    _id: string;
    coverLetter: string;
    resume: string;
    status: "pending" | "shortlisted" | "rejected" | "accepted";
    createdAt: string;

    applicant: {

        _id: string;
        name: string;
        email: string;
    }
}

export default function page() {

    const params = useParams()
    const jobId= params.id as string

    const [applications , setApplications] = useState<Applicant[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchApplications = async () => {

        try {

            const token = localStorage.getItem("token")

            const response = await fetch(`/api/jobs/${jobId}/applications`, {

                method: "GET",

                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            const data = await response.json()

            if (!response.ok) {

                toast.error(data.message || "Failed tp fetch applicants")
                
            }
            setApplications(data.applications || [])
            
        } catch (error: any) {

            toast.error(error.message)
            
        } finally {

            setLoading(false)
        }
    }


        useEffect(() => {

        if (jobId) {
            fetchApplications();
        }

    }, [jobId]);

    const getStatusClass = (status: string) => {

        switch (status) {

            case "accepted":
                return "bg-green-600 hover:bg-green-600";

            case "rejected":
                return "bg-red-600 hover:bg-red-600";

            case "shortlisted":
                return "bg-blue-600 hover:bg-blue-600";

            default:
                return "bg-yellow-600 hover:bg-yellow-600";
        }
    };




    return (

        <div className="min-h-screen  p-6">

            <div className="max-w-5xl mx-auto space-y-6">

                {/* Header */}

                <div>

                    <Link href="/employer/jobs">

                        <Button
                            variant="outline"
                            className="mb-5"
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Jobs
                        </Button>

                    </Link>

                    <div className="flex items-center justify-between">

                        <div>

                            <h1 className="text-3xl font-bold">
                                Applicants
                            </h1>

                            <p className="text-gray-400 mt-1">
                                People who applied for this job
                            </p>

                        </div>

                        <Badge variant="secondary">
                            {applications.length}{" "}
                            {applications.length === 1
                                ? "Applicant"
                                : "Applicants"}
                        </Badge>

                    </div>

                </div>


                {/* Loading */}

                {loading && (

                    <div className="text-center py-20">

                        <p className="text-gray-400">
                            Loading applicants...
                        </p>

                    </div>

                )}


                {/* No Applicants */}

                {!loading && applications.length === 0 && (

                    <Card className=" border-zinc-800">

                        <CardContent className="py-20 text-center">

                            <User className="mx-auto h-12 w-12 text-gray-500 mb-4" />

                            <h2 className="text-xl font-semibold">
                                No applicants yet
                            </h2>

                            <p className="text-gray-400 mt-2">
                                Nobody has applied for this job yet.
                            </p>

                        </CardContent>

                    </Card>

                )}


                {/* Applicants */}

                {!loading && applications.length > 0 && (

                    <div className="space-y-5">

                        {applications.map((application) => (

                            <Card
                                key={application._id}
                                className=" border-zinc-800"
                            >

                                <CardHeader>

                                    <div className="flex items-center justify-between gap-4">

                                        <div className="flex items-center gap-4">

                                            <div className="h-12 w-12 rounded-full  flex items-center justify-center">

                                                <User className="h-6 w-6 text-gray-400" />

                                            </div>

                                            <div>

                                                <CardTitle>
                                                    {application.applicant.name}
                                                </CardTitle>

                                                <div className="flex items-center gap-2 text-sm text-gray-400 mt-1">

                                                    <Mail className="h-4 w-4" />

                                                    {application.applicant.email}

                                                </div>

                                            </div>

                                        </div>


                                        <Badge
                                            className={getStatusClass(
                                                application.status
                                            )}
                                        >
                                            {application.status}
                                        </Badge>

                                    </div>

                                </CardHeader>


                                <CardContent>

                                    {/* Cover Letter */}

                                    <div className="mb-5">

                                        <h3 className="font-semibold mb-2">
                                            Cover Letter
                                        </h3>

                                        <p className="text-gray-400 leading-relaxed">
                                            {application.coverLetter}
                                        </p>

                                    </div>


                                    {/* Applied Date */}

                                    <p className="text-sm text-gray-500 mb-5">

                                        Applied on{" "}

                                        {new Date(
                                            application.createdAt
                                        ).toLocaleDateString()}

                                    </p>


                                    {/* Actions */}

                                    <div className="flex gap-3">

                                        <a
                                            href={application.resume}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >

                                            <Button variant="outline">

                                                <FileText className="mr-2 h-4 w-4" />

                                                View Resume

                                            </Button>

                                        </a>


                                        <Button>
                                            View Applicant
                                        </Button>

                                    </div>

                                </CardContent>

                            </Card>

                        ))}

                    </div>

                )}

            </div>

        </div>

    );
}
   

