"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type User = {
  id: string;
  name: string;
  email: string;
  role: "jobseeker" | "employer" | "admin";
};

export default function NavBar() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  function handleLogOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    toast.success("LoggedOut successfully");

    window.location.href = "/login";
  }

  return (
    <nav className="border-b bg-background">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="text-xl font-bold">
         <Image src="/logo.png" width={100} height={60} alt="Company Logo" />
        </Link>

        <div className="flex items-center gap-4">
          <Link href="/jobs" className="text-sm hover:text-primary">
            Jobs
          </Link>

          {!user && (
            <>
              <Link href="/login">
                <Button variant="outline">Login</Button>
              </Link>

              <Link href="/register">
                <Button>Register</Button>
              </Link>
            </>
          )}

          {user && (
            <>
              {user.role === "jobseeker" && (
                <Link href="/applications">
                  <Button variant="ghost">My Applications</Button>
                </Link>
              )}

              {user.role === "employer" && (
                <Link href="/employer/jobs">
                  <Button variant="ghost">My Jobs</Button>
                </Link>
              )}

              {user.role === "admin" && (
                <Link href="/admin">
                  <Button variant="ghost">Admin</Button>
                </Link>
              )}

              <div className="flex items-center gap-2 rounded-full px-4 py-2 bg-muted">
                <Button className="text-sm rounded-4xl font-medium">{user.name}</Button>
                <Button variant='destructive' className="text-xs text-muted-foreground capitalize bg-secondary px-2 py-0.5 rounded-full">
                  {user.role}
                </Button>
              </div>

              <Button variant="outline" onClick={handleLogOut}>
                LogOut
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
