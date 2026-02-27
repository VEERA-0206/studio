
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Stethoscope, CheckCircle2, Loader2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth, useFirestore } from "@/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { auth } = useAuth ? { auth: useAuth() } : { auth: null };
  const db = useFirestore ? useFirestore() : null;
  const router = useRouter();
  const { toast } = useToast();

  const handleRegister = async (e: React.FormEvent, type: 'patient' | 'doctor') => {
    e.preventDefault();
    if (!auth || !db) return;

    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const firstName = formData.get('first-name') as string;
    const lastName = formData.get('last-name') as string;

    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (type === 'patient') {
        await setDoc(doc(db, "patients", user.uid), {
          id: user.uid,
          externalAuthId: user.uid,
          firstName,
          lastName,
          email,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
      } else {
        const specialty = formData.get('specialty') as string;
        const license = formData.get('license') as string;
        await setDoc(doc(db, "doctors", user.uid), {
          id: user.uid,
          externalAuthId: user.uid,
          firstName,
          lastName,
          email,
          specializations: [specialty],
          licenseNumber: license,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
          averageRating: 0
        });
      }

      toast({
        title: "Account Created",
        description: `Welcome to MoDoc, ${firstName}!`,
      });
      router.push("/dashboard");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Registration Failed",
        description: error.message || "Could not create account.",
      });
      setIsLoading(false);
    }
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
              <form onSubmit={(e) => handleRegister(e, 'patient')} className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first-name">First Name</Label>
                    <Input id="first-name" name="first-name" placeholder="John" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name">Last Name</Label>
                    <Input id="last-name" name="last-name" placeholder="Doe" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" placeholder="john@example.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" name="password" type="password" required />
                </div>
                <Button className="w-full bg-primary hover:bg-accent mt-4" type="submit" disabled={isLoading}>
                  {isLoading ? <Loader2 className="animate-spin h-4 w-4" /> : "Create Account"}
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="doctor" className="mt-6">
              <form onSubmit={(e) => handleRegister(e, 'doctor')} className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="doc-first-name">First Name</Label>
                    <Input id="doc-first-name" name="first-name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="doc-last-name">Last Name</Label>
                    <Input id="doc-last-name" name="last-name" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="specialty">Specialization</Label>
                  <Input id="specialty" name="specialty" placeholder="e.g. Cardiology" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="license">Medical License Number</Label>
                  <Input id="license" name="license" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="doc-email">Email</Label>
                  <Input id="doc-email" name="email" type="email" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="doc-password">Password</Label>
                  <Input id="doc-password" name="password" type="password" required />
                </div>
                <Button className="w-full bg-primary hover:bg-accent mt-4" type="submit" disabled={isLoading}>
                  {isLoading ? <Loader2 className="animate-spin h-4 w-4" /> : "Join as Practitioner"}
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
