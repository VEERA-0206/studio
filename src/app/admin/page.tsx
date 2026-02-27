
"use client";

import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  Users, 
  UserRound, 
  CalendarCheck, 
  Activity, 
  Search, 
  ArrowUpRight, 
  MoreVertical,
  ShieldCheck,
  Stethoscope
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCollection, useFirestore, useMemoFirebase } from "@/firebase";
import { collection } from "firebase/firestore";
import { Badge } from "@/components/ui/badge";

export default function AdminDashboard() {
  const db = useFirestore();

  const patientsRef = useMemoFirebase(() => db ? collection(db, "patients") : null, [db]);
  const doctorsRef = useMemoFirebase(() => db ? collection(db, "doctors") : null, [db]);
  const appointmentsRef = useMemoFirebase(() => db ? collection(db, "appointments") : null, [db]);

  const { data: patients, isLoading: patientsLoading } = useCollection(patientsRef);
  const { data: doctors, isLoading: doctorsLoading } = useCollection(doctorsRef);
  const { data: appointments, isLoading: appointmentsLoading } = useCollection(appointmentsRef);

  const stats = useMemo(() => [
    { 
      label: "Total Patients", 
      value: patients?.length || 0, 
      icon: Users, 
      color: "text-blue-600", 
      bg: "bg-blue-100",
      loading: patientsLoading
    },
    { 
      label: "Active Doctors", 
      value: doctors?.length || 0, 
      icon: Stethoscope, 
      color: "text-purple-600", 
      bg: "bg-purple-100",
      loading: doctorsLoading
    },
    { 
      label: "Total Appointments", 
      value: appointments?.length || 0, 
      icon: CalendarCheck, 
      color: "text-green-600", 
      bg: "bg-green-100",
      loading: appointmentsLoading
    },
    { 
      label: "System Health", 
      value: "Optimal", 
      icon: ShieldCheck, 
      color: "text-orange-600", 
      bg: "bg-orange-100",
      loading: false
    }
  ], [patients, doctors, appointments, patientsLoading, doctorsLoading, appointmentsLoading]);

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <ShieldCheck className="h-8 w-8 text-primary" />
            Admin Command Center
          </h1>
          <p className="text-muted-foreground">Monitor platform activity and manage system resources.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input className="pl-10 h-10 w-64" placeholder="Search logs or users..." />
          </div>
          <Button variant="outline" size="icon">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <Card key={i} className="border-none shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.bg} ${stat.color} p-2 rounded-lg`}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <Badge variant="secondary" className="text-[10px] uppercase">Live</Badge>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
                <h3 className="text-3xl font-bold">
                  {stat.loading ? "..." : stat.value}
                </h3>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Recent Appointments
            </CardTitle>
            <CardDescription>Overview of the latest consultations scheduled across the platform.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {!appointments?.length && !appointmentsLoading ? (
                <div className="text-center py-12 text-muted-foreground border-2 border-dashed rounded-xl">
                  No appointments found in the system yet.
                </div>
              ) : (
                <div className="divide-y">
                  {appointments?.slice(0, 5).map((app: any) => (
                    <div key={app.id} className="py-4 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                          <UserRound className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="font-semibold text-sm">Appointment #{app.id.slice(0, 6)}</p>
                          <p className="text-xs text-muted-foreground">Status: {app.status}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{new Date(app.startTime?.seconds * 1000).toLocaleDateString()}</p>
                        <Badge variant={app.status === 'completed' ? 'default' : 'secondary'} className="text-[10px]">
                          {app.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {appointments && appointments.length > 5 && (
                <Button variant="ghost" className="w-full text-primary" size="sm">
                  View All Appointments <ArrowUpRight className="ml-1 h-3 w-3" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm h-fit">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Stethoscope className="h-5 w-5 text-accent" />
              System Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Storage Utilization</span>
                <span className="font-bold">12%</span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div className="bg-primary h-full w-[12%]" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>API Response Time</span>
                <span className="font-bold">24ms</span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div className="bg-accent h-full w-[15%]" />
              </div>
            </div>
            <div className="pt-4 border-t">
              <h4 className="text-sm font-bold mb-3 uppercase tracking-wider text-muted-foreground">Admin Quick Actions</h4>
              <div className="grid gap-2">
                <Button variant="outline" size="sm" className="justify-start">Verify New Doctors</Button>
                <Button variant="outline" size="sm" className="justify-start">System Maintenance</Button>
                <Button variant="outline" size="sm" className="justify-start text-destructive hover:text-destructive">Platform Lockdown</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
