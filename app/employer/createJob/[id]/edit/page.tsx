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
    description: string;
    company: string;
    location: string;
    salary: number;
    jobType: string;
    experienceLevel: string;
    skills: string[];
    deadline: string
}

export default function page() {

    const params = useParams();
    const router = useRouter();

    const [job, setJob] = useState<Job | null>(null);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("")
    const [company, setCompany] = useState("");
    const [location, setLocation] = useState("");
    const [salary, setSalary] = useState("");
    const [jobType, setJobType] = useState("")
    const [experienceLevel, setExperienceLevel] = useState("")
    const [skills, setSkills] = useState("")
    const [deadline, setDeadline] = useState("")

    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);

    // fetch existing Jobs

    async function fetchJobs () {

        try {

            const response = await fetch(`/api/jobs/${params.id}`)

            const data = await response.json()

            if (!response.ok) {

                toast.error(data.message || "Failed to load job ")
                router.push("/employer/dashboard")
                return  
            }
            
            const currentJob: Job = data.job
            setJob(currentJob)

            setTitle(currentJob.title)
            setDescription(currentJob.description)
            setCompany(currentJob.company)
            setLocation(currentJob.location)
            setSalary(String(currentJob.salary))
            setJobType(currentJob.jobType);
            setExperienceLevel(currentJob.experienceLevel)
            setSkills(currentJob.skills.join(", "))

            // Format date for input[type=date]
            setDeadline(

                new Date(currentJob.deadline)
                .toISOString()
                .split("T")[0]
            )

        } catch (error) {

            toast.error("Something went wrong")

            
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchJobs()
    },[params.id])

    // update JOb

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {

        e.preventDefault()

        if (!title || !description || !company || !location || !salary || !jobType || !experienceLevel || !skills || !deadline) {

            toast.error("Please fill all field")
            return
            
        }

        try {

            setUpdating(true)

            const token = localStorage.getItem("token")

            if (!token) {

                toast.error("Please login first")
                router.push("/login")
                return
                
            }

            const response = await fetch(`/api/jobs/${params.id}`, {

                method: "PUT",
                
                headers: {

                    "Content-Type" : "application/json",
                    Authorization: `Bearer ${token}`
                },

                body: JSON.stringify({

                    title,
                    description,
                    company,
                    location,
                    salary: Number(salary),
                    jobType,
                    experienceLevel,
                    skills: skills
                        .split(",")
                        .map((skill) => skill.trim())
                        .filter((skill) => skill !== ""),
                        deadline
                })
            })
            const data =await response.json()

            if (!response.ok) {

                toast.error(data.message || "Failed to update job")
                return
                
            }

            toast.success("Job Updated successfully")
            router.push('/employer/dashboard')
            
        } catch (error) {

            toast.error("Something went wrong")

            
        } finally {
            setUpdating(false)
        }
    }

    if (loading) {
    return (
      <main className="min-h-screen px-4 py-20">
        <div className="text-center text-muted-foreground">
          Loading job...
        </div>
      </main>
    );
  }


   


  return (
    <main className="min-h-screen px-4 py-12">

      <div className="mx-auto max-w-3xl">

        <Link href="/employer/dashboard">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>

        <Card>

          <CardHeader>
            <CardTitle className="text-2xl">
              Edit Job
            </CardTitle>

            <p className="text-sm text-muted-foreground">
              Update your job posting information.
            </p>
          </CardHeader>

          <CardContent>

            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >

              {/* Title */}

              <div className="space-y-2">
                <Label htmlFor="title">
                  Job Title
                </Label>

                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              {/* Company */}

              <div className="space-y-2">
                <Label htmlFor="company">
                  Company
                </Label>

                <Input
                  id="company"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />
              </div>

              {/* Location */}

              <div className="space-y-2">
                <Label htmlFor="location">
                  Location
                </Label>

                <Input
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>

              {/* Salary */}

              <div className="space-y-2">
                <Label htmlFor="salary">
                  Salary
                </Label>

                <Input
                  id="salary"
                  type="number"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                />
              </div>

              {/* Job Type */}

              <div className="space-y-2">
                <Label htmlFor="jobType">
                  Job Type
                </Label>

                <select
                  id="jobType"
                  value={jobType}
                  onChange={(e) => setJobType(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="">Select job type</option>

                  <option value="full-time">
                    Full Time
                  </option>

                  <option value="part-time">
                    Part Time
                  </option>

                  <option value="internship">
                    Internship
                  </option>

                  <option value="contract">
                    Contract
                  </option>
                </select>
              </div>

              {/* Experience */}

              <div className="space-y-2">
                <Label htmlFor="experienceLevel">
                  Experience Level
                </Label>

                <select
                  id="experienceLevel"
                  value={experienceLevel}
                  onChange={(e) =>
                    setExperienceLevel(e.target.value)
                  }
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="">
                    Select experience level
                  </option>

                  <option value="entry">
                    Entry Level
                  </option>

                  <option value="mid">
                    Mid Level
                  </option>

                  <option value="senior">
                    Senior Level
                  </option>
                </select>
              </div>

              {/* Skills */}

              <div className="space-y-2">
                <Label htmlFor="skills">
                  Skills
                </Label>

                <Input
                  id="skills"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                />

                <p className="text-xs text-muted-foreground">
                  Separate skills using commas.
                </p>
              </div>

              {/* Deadline */}

              <div className="space-y-2">
                <Label htmlFor="deadline">
                  Application Deadline
                </Label>

                <Input
                  id="deadline"
                  type="date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                />
              </div>

              {/* Description */}

              <div className="space-y-2">
                <Label htmlFor="description">
                  Job Description
                </Label>

                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) =>
                    setDescription(e.target.value)
                  }
                  rows={8}
                />
              </div>

              {/* Submit */}

              <Button
                type="submit"
                className="w-full"
                disabled={updating}
              >
                {updating
                  ? "Updating Job..."
                  : "Update Job"}
              </Button>

            </form>

          </CardContent>
        </Card>

      </div>
    </main>
  );
}
  

