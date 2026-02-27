
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Video, Clock, MessageSquare, User, MoreVertical, CheckCircle, ArrowUpRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { useUser, useFirestore, useDoc, useMemoFirebase } from "@/firebase";
import { doc } from "firebase/firestore";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function DashboardPage() {
  const { user, isUserLoading } = useUser();
  const db = useFirestore();

  const patientRef = useMemoFirebase(() => (user && db) ? doc(db, "patients", user.uid) : null, [user, db]);
  const doctorRef = useMemoFirebase(() => (user && db) ? doc(db, "doctors", user.uid) : null, [user, db]);
  
  const { data: patientProfile, isLoading: isPatientLoading } = useDoc(patientRef);
  const { data: doctorProfile, isLoading: isDoctorLoading } = useDoc(doctorRef);

  const profile = patientProfile || doctorProfile;
  const isLoadingProfile = isUserLoading || isPatientLoading || isDoctorLoading;

  const appointments = [
    {
      id: "app-1",
      doctor: "Dr. Sarah Mitchell",
      date: "Today, 4:00 PM",
      type: "Video Consultation",
      status: "Upcoming",
      specialty: "Cardiology"
    },
    {
      id: "app-2",
      doctor: "Dr. James Wilson",
      date: "Tomorrow, 10:30 AM",
      type: "Video Consultation",
      status: "Upcoming",
      specialty: "Pediatrics"
    }
  ];

  if (isLoadingProfile) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16 border-2 border-primary">
            <AvatarImage src={profile?.profileImageUrl} alt={profile?.firstName} />
            <AvatarFallback><User className="h-8 w-8" /></AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold font-headline">Welcome back, {profile?.firstName || 'User'}!</h1>
            <p className="text-muted-foreground">Here's an overview of your health activities.</p>
          </div>
        </div>
        <Link href="/doctors">
          <Button className="bg-primary hover:bg-accent shadow-lg shadow-primary/20">
            Book New Appointment
          </Button>
        </Link>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Appointment Section */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Upcoming Appointments
              </h2>
              <Button variant="ghost" size="sm" className="text-primary">View All</Button>
            </div>
            
            <div className="grid gap-4">
              {appointments.map((app) => (
                <Card key={app.id} className="border-none shadow-sm hover:shadow-md transition-all">
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <User className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg">{app.doctor}</h3>
                          <p className="text-sm text-muted-foreground">{app.specialty}</p>
                          <div className="flex items-center gap-3 mt-2">
                            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              {app.date}
                            </div>
                            <Badge variant="secondary" className="text-[10px] uppercase tracking-wider">
                              {app.type}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Link href={`/consultation/${app.id}`}>
                          <Button size="sm" className="bg-primary hover:bg-accent">
                            <Video className="mr-2 h-4 w-4" />
                            Join Call
                          </Button>
                        </Link>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Activity/History Section */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              Recent Consultation History
            </h2>
            <Card className="border-none shadow-sm overflow-hidden">
              <div className="divide-y">
                {[
                  { doctor: "Dr. Emily Chen", date: "Jan 12, 2024", diagnosis: "Contact Dermatitis" },
                  { doctor: "Dr. Sarah Mitchell", date: "Dec 15, 2023", diagnosis: "Routine Checkup" }
                ].map((item, i) => (
                  <div key={i} className="p-4 flex items-center justify-between hover:bg-muted/30 transition-colors">
                    <div className="space-y-1">
                      <p className="font-semibold">{item.doctor}</p>
                      <p className="text-xs text-muted-foreground">{item.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{item.diagnosis}</p>
                      <Button variant="link" size="sm" className="h-auto p-0 text-xs">View Summary</Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </section>
        </div>

        {/* Sidebar Widgets */}
        <div className="space-y-8">
          {/* Message Alerts */}
          <Card className="border-none shadow-sm bg-accent/5">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-accent" />
                Unread Messages
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { from: "Dr. Sarah Mitchell", text: "Your test results are ready...", time: "2h ago" },
                { from: "MoDoc Support", text: "Welcome to our platform!", time: "1d ago" }
              ].map((msg, i) => (
                <div key={i} className="flex gap-3 items-start p-2 rounded-lg hover:bg-white/50 transition-colors cursor-pointer group">
                  <div className="w-2 h-2 rounded-full bg-accent mt-2 shrink-0" />
                  <div className="space-y-1">
                    <p className="text-sm font-bold group-hover:text-primary">{msg.from}</p>
                    <p className="text-xs text-muted-foreground line-clamp-1">{msg.text}</p>
                    <p className="text-[10px] text-muted-foreground uppercase">{msg.time}</p>
                  </div>
                </div>
              ))}
              <Link href="/messages" className="block w-full">
                <Button variant="outline" size="sm" className="w-full">Open Messages</Button>
              </Link>
            </CardContent>
          </Card>

          {/* Quick AI Assessment */}
          <Card className="border-none shadow-sm bg-primary text-primary-foreground">
            <CardHeader>
              <CardTitle className="text-lg">Feeling Unwell?</CardTitle>
              <CardDescription className="text-primary-foreground/70">
                Use our AI tool to check your symptoms instantly.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/ai-assessment">
                <Button variant="secondary" className="w-full group">
                  Assess Now
                  <ArrowUpRight className="ml-2 h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
