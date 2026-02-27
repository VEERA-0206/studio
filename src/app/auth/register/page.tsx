
"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Stethoscope, CheckCircle2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      window.location.href = "/dashboard";
    }, 1000);
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4 bg-background">
      <Card className="w-full max-w-lg border-none shadow-2xl overflow-hidden">
        <div className="bg-primary p-8 text-primary-foreground">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-white/20 p-2 rounded-xl">
              <Stethoscope className="h-6 w-6" />
            </div>
            <span className="text-xl font-bold font-headline tracking-tight">MoDoc</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">Create Account</h1>
          <p className="text-primary-foreground/80">Join MoDoc today and get access to top specialists.</p>
        </div>
        
        <CardContent className="p-8">
          <Tabs defaultValue="patient" className="mb-8">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="patient">I'm a Patient</TabsTrigger>
              <TabsTrigger value="doctor">I'm a Doctor</TabsTrigger>
            </TabsList>
            
            <TabsContent value="patient" className="mt-6">
              <form onSubmit={handleSubmit} className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first-name">First Name</Label>
                    <Input id="first-name" placeholder="John" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name">Last Name</Label>
                    <Input id="last-name" placeholder="Doe" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="john@example.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" required />
                </div>
                <Button className="w-full bg-primary hover:bg-accent mt-4" type="submit" disabled={isLoading}>
                  {isLoading ? "Creating account..." : "Create Account"}
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="doctor" className="mt-6">
              <form onSubmit={handleSubmit} className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="doc-first-name">First Name</Label>
                    <Input id="doc-first-name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="doc-last-name">Last Name</Label>
                    <Input id="doc-last-name" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="specialty">Specialization</Label>
                  <Input id="specialty" placeholder="e.g. Cardiology" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="license">Medical License Number</Label>
                  <Input id="license" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="doc-email">Email</Label>
                  <Input id="doc-email" type="email" required />
                </div>
                <Button className="w-full bg-primary hover:bg-accent mt-4" type="submit" disabled={isLoading}>
                  Join as Practitioner
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <span>By signing up, you agree to our Terms and Privacy Policy.</span>
            </div>
            <div className="text-center text-sm">
              Already have an account?{" "}
              <Link href="/auth/login" className="text-primary font-bold hover:underline">
                Sign in
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
