
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Stethoscope, User, MessageSquare, LayoutDashboard, BrainCircuit } from "lucide-react";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-primary p-1.5 rounded-lg group-hover:bg-accent transition-colors">
            <Stethoscope className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="text-2xl font-bold font-headline tracking-tight text-primary">MoDoc</span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <Link href="/doctors" className="text-sm font-medium hover:text-primary transition-colors">Find Doctors</Link>
          <Link href="/ai-assessment" className="flex items-center gap-1.5 text-sm font-medium hover:text-primary transition-colors">
            <BrainCircuit className="h-4 w-4" />
            AI Assessment
          </Link>
          <Link href="/messages" className="text-sm font-medium hover:text-primary transition-colors">Messages</Link>
          <Link href="/dashboard" className="text-sm font-medium hover:text-primary transition-colors">Dashboard</Link>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/auth/login">
            <Button variant="ghost" size="sm">Login</Button>
          </Link>
          <Link href="/auth/register">
            <Button size="sm" className="bg-primary hover:bg-accent transition-all">Sign Up</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
