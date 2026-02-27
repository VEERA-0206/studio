
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Stethoscope, User, BrainCircuit, ShieldCheck, LogOut, Loader2 } from "lucide-react";
import { useUser, useAuth, useDoc, useFirestore, useMemoFirebase } from "@/firebase";
import { signOut } from "firebase/auth";
import { doc } from "firebase/firestore";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Navbar() {
  const { user, isUserLoading } = useUser();
  const { auth } = useAuth ? { auth: useAuth() } : { auth: null };
  const db = useFirestore();
  const router = useRouter();

  const adminDocRef = useMemoFirebase(() => (user && db) ? doc(db, "admins", user.uid) : null, [user, db]);
  const patientDocRef = useMemoFirebase(() => (user && db) ? doc(db, "patients", user.uid) : null, [user, db]);
  const doctorDocRef = useMemoFirebase(() => (user && db) ? doc(db, "doctors", user.uid) : null, [user, db]);

  const { data: adminData } = useDoc(adminDocRef);
  const { data: patientData } = useDoc(patientDocRef);
  const { data: doctorData } = useDoc(doctorDocRef);

  const profile = patientData || doctorData;

  const handleLogout = async () => {
    if (auth) {
      await signOut(auth);
      router.push("/");
    }
  };

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
          {user && (
            <>
              <Link href="/messages" className="text-sm font-medium hover:text-primary transition-colors">Messages</Link>
              <Link href="/dashboard" className="text-sm font-medium hover:text-primary transition-colors">Dashboard</Link>
            </>
          )}
          {adminData && (
            <Link href="/admin" className="flex items-center gap-1.5 text-sm font-bold text-accent hover:text-primary transition-colors">
              <ShieldCheck className="h-4 w-4" />
              Admin
            </Link>
          )}
        </div>

        <div className="flex items-center gap-3">
          {isUserLoading ? (
            <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
          ) : user ? (
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex flex-col items-end">
                <span className="text-xs font-bold leading-none">
                  {profile?.firstName ? `${profile.firstName} ${profile.lastName}` : user.email}
                </span>
                <span className="text-[10px] text-muted-foreground">
                  {patientData ? 'Patient' : doctorData ? 'Practitioner' : 'User'}
                </span>
              </div>
              <Avatar className="h-8 w-8 border">
                <AvatarImage src={profile?.profileImageUrl} alt={user.email || ''} />
                <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
              </Avatar>
              <Button variant="ghost" size="icon" onClick={handleLogout} title="Logout">
                <LogOut className="h-5 w-5 text-muted-foreground hover:text-destructive transition-colors" />
              </Button>
            </div>
          ) : (
            <>
              <Link href="/auth/login">
                <Button variant="ghost" size="sm">Login</Button>
              </Link>
              <Link href="/auth/register">
                <Button size="sm" className="bg-primary hover:bg-accent transition-all">Sign Up</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
