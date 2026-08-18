"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"
import { toast } from "sonner"

export default function page() {

  const router = useRouter()

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [company, setCompany] = useState("")
  const [location, setLocation] = useState("")
  const [salary, setSalary] = useState("")
  const [jobType, setJObType] = useState("")
  const [experienceLevel, setExperienceLevel] = useState("")
  const [skills, setSkills] = useState("")
  const [deadline, setDeadline] = useState("")

  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {

      e.preventDefault()

      if (!title || !description || !company || !location || !salary || !jobType || !experienceLevel || !skills || !deadline) {

        toast.error("Please fill all fields")
        return
        
      }

      try {

        setLoading(true)

        const token = localStorage.getItem("token")

        if (!token) {

          toast.error("Please login first")
          router.push("/login")
          return
          
        }

        const response = await fetch("/api/jobs", {

          method: "POST",

          headers: {

            "Content-Type": "application/json",
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

            skills: skills.split(" ").map((skill) => skill.trim()).filter((skill) => skill !== ""),
            deadline
          })
        })
        const data = await response.json()

        if (!response.ok) {

          toast.error(data.message || "Failed to cerate job")
          return
          
        }

        toast.success("Job posted successfully")

        router.push("/employer/dashboard")
        
      } catch (error) {

        toast.error("Something went wrong")
        
      } finally {
        setLoading(false)
      }
  }

  return (

      <main className="min-h-screen px-4 py-12">

        <div className="mx-auto max-w-3xl">

          <Link href='/employer/dashboard'>
            <Button variant='ghost' className="mb-6">
              <ArrowLeft className="mr-2 h-4 w-4"/>
            </Button>
          </Link>

          {/* form */}

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">
                Post a New Job
              </CardTitle>

              <p className="text-sm text-muted-foreground">
                Create a job posting and start finding candidates
              </p>

            </CardHeader>

            <CardContent>

                <form onSubmit={handleSubmit}  className="space-y-6">

                  <div className="space-y-2">
                    <Label htmlFor="title">
                      Job Title
                    </Label>

                    <Input id="title" placeholder="e.g frontend" value={title} onChange={(e) => setTitle(e.target.value)}/>

                  </div>

                  {/* Company */}

                  <div className="space-y-2">
                    <Label htmlFor="company">
                      Company
                    </Label>

                    <Input id="company" placeholder="e.g ABC technologies" value={company} onChange={(e) => setCompany(e.target.value)}/>
                  </div>

                  {/* Location */}

                  <div className="space-y-2">
                    <Label htmlFor="location">
                      Location
                    </Label>

                    <Input id="location" placeholder="e.g. Kathmandu" value={location} onChange={(e) => setLocation(e.target.value)}/>
                  </div>

                  {/* Salary */}

                  <div className="space-y-2">
                    <Label className="salary">
                      Salary
                    </Label>

                    <Input id="salary" type="number" placeholder="e.g. 60000" value={salary} onChange={(e) => setSalary(e.target.value)}/>
                  </div>

                  {/* Job Type */}

                  <div className="space-y-2">

                    <Label htmlFor="jobType">
                      Job Type
                    </Label>

                    <select id="jobType" value={jobType} onChange={(e) => setJObType(e.target.value)} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">

                      <option value="">
                        Select Job type
                      </option>

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

                    {/* Experience */}

                    <div className="space-y-2">

                      <Label htmlFor="experienceLevel">
                        Experience Level
                      </Label> 

                      <select id="experienceLevel" value={experienceLevel} onChange={(e) => setExperienceLevel(e.target.value)} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">

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

                      <Input id="skills" placeholder="React, Next.js, TypeScript, MongoDb" value={skills} onChange={(e) => setSkills(e.target.value)}/>

                      <p className="text-xs text-muted-foreground">Separate skills using commas.</p>

                    </div>

                    {/* Deadline */}

                    <div className="space-y-2">
                      <Label htmlFor="deadline">
                        Application Deadline
                      </Label>

                      <Input id="deadline" type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)}/>
                    </div>

                    {/* Description */}

                    <div className="space-y-2">

                      <Label htmlFor="description">
                        Job Description
                      </Label>

                      <Textarea id="description" placeholder="Describe the job, responsibilities and requirements..." value={description} onChange={(e) => setDescription(e.target.value)} rows={8}>

                      </Textarea>

                    </div>

                    {/* Submit */}

                    <Button type="submit" className="w-full" disabled={loading}>
                      {
                        loading ? "Posting Job..." : "Post Job"
                      }

                    </Button>

                  </div>

                </form>
              
            </CardContent>

          </Card>

        </div>

      </main>

  )
}
