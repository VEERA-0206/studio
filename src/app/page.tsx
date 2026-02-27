
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Building2, MapPin, ArrowRight, ShieldCheck, Video, BrainCircuit, HeartPulse } from "lucide-react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  const getHospitalImage = (id: string) => {
    return PlaceHolderImages.find(img => img.id === id);
  };

  const TAMILNADU_HOSPITALS = [
    {
      id: "hospital-kg",
      name: "KG Hospital",
      city: "Coimbatore",
      location: "Arts College Road",
      desc: "NABH Accredited Tertiary care hospital specializing in Cardiology and Nephrology.",
      specialty: "Cardiology"
    },
    {
      id: "hospital-ganga",
      name: "Ganga Hospital",
      city: "Coimbatore",
      location: "Mettupalayam Road",
      desc: "World-renowned center for Orthopaedics, Trauma and Plastic Surgery.",
      specialty: "Orthopaedics"
    },
    {
      id: "hospital-psg",
      name: "PSG Hospitals",
      city: "Coimbatore",
      location: "Peelamedu",
      desc: "Multispeciality teaching hospital offering comprehensive patient care and research.",
      specialty: "General Medicine"
    },
    {
      id: "hospital-kmch",
      name: "KMCH",
      city: "Coimbatore",
      location: "Avinashi Road",
      desc: "A modern multi-specialty hospital with state-of-the-art diagnostic facilities.",
      specialty: "Multi-Specialty"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <Badge variant="secondary" className="px-4 py-1 text-sm font-semibold text-primary bg-primary/10 border-primary/20">
              <HeartPulse className="w-4 h-4 mr-2" />
              Tamil Nadu's Leading Healthcare Network
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold font-headline leading-tight tracking-tight text-foreground">
              Direct Access to <span className="text-primary italic">Top Specialists</span> in Tamil Nadu.
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-xl">
              Discover world-class hospitals and consult with renowned medical practitioners across the state from the comfort of your home.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link href="#hospitals">
                <Button size="lg" className="px-8 py-7 text-lg bg-primary hover:bg-accent transition-all shadow-xl shadow-primary/20">
                  Discover Hospitals
                </Button>
              </Link>
              <Link href="/ai-assessment">
                <Button variant="outline" size="lg" className="px-8 py-7 text-lg border-primary text-primary hover:bg-primary/5">
                  AI Symptom Check
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-1/3 h-full hidden lg:block">
          <div className="w-full h-full bg-gradient-to-l from-primary/5 to-transparent rounded-bl-[200px]" />
        </div>
      </section>

      {/* Featured Hospitals Section */}
      <section id="hospitals" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
            <div className="space-y-4 max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-bold font-headline tracking-tight">Famous Hospitals</h2>
              <p className="text-lg text-muted-foreground">
                We bridge the gap between you and the most prestigious medical institutions in Tamil Nadu.
                Select a hospital to view its specialist medical staff and book a consultation.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {TAMILNADU_HOSPITALS.map((hospital) => {
              const imageData = getHospitalImage(hospital.id);
              return (
                <Link key={hospital.id} href={`/hospitals/${hospital.id}`}>
                  <Card className="group border-none shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer bg-slate-50/50">
                    <div className="grid lg:grid-cols-5 h-full">
                      <div className="lg:col-span-2 relative min-h-[240px]">
                        <Image
                          src={imageData?.imageUrl || "https://picsum.photos/seed/hospital/800/600"}
                          alt={hospital.name}
                          width={800}
                          height={600}
                          className="object-cover h-full group-hover:scale-105 transition-transform duration-700"
                          data-ai-hint={imageData?.imageHint || "hospital building"}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent lg:hidden" />
                        <div className="absolute bottom-4 left-4 lg:hidden">
                           <Badge className="bg-primary shadow-lg">{hospital.specialty}</Badge>
                        </div>
                      </div>
                      <CardContent className="lg:col-span-3 p-8 flex flex-col justify-between">
                        <div className="space-y-4">
                          <div className="hidden lg:block">
                            <Badge variant="outline" className="text-primary border-primary/20 bg-primary/5 mb-2">
                              {hospital.specialty}
                            </Badge>
                          </div>
                          <CardTitle className="text-3xl font-bold group-hover:text-primary transition-colors">{hospital.name}</CardTitle>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <MapPin className="h-4 w-4 text-primary" />
                            <span className="text-sm font-medium">{hospital.location}, {hospital.city}</span>
                          </div>
                          <p className="text-muted-foreground leading-relaxed line-clamp-3">
                            {hospital.desc}
                          </p>
                        </div>
                        <div className="pt-6 flex items-center justify-between text-primary font-bold group-hover:gap-2 transition-all">
                          <span>View Specialists</span>
                          <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose MoDoc */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-bold font-headline">Secure & Comprehensive Care</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need for a premium healthcare experience, delivered securely to your device.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Encrypted Consultations",
                desc: "Full HD video calls protected by end-to-end encryption for your absolute privacy.",
                icon: ShieldCheck,
                color: "bg-blue-100 text-blue-600"
              },
              {
                title: "AI-Powered Triage",
                desc: "Advanced symptom assessment tools to guide you to the right medical specialty quickly.",
                icon: BrainCircuit,
                color: "bg-purple-100 text-purple-600"
              },
              {
                title: "Virtual Health Records",
                desc: "Securely store and share medical history and consultation summaries with your providers.",
                icon: Building2,
                color: "bg-green-100 text-green-600"
              }
            ].map((f, i) => (
              <Card key={i} className="border-none bg-white shadow-sm hover:shadow-md transition-shadow p-8 space-y-6">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${f.color} shadow-sm`}>
                  <f.icon className="h-7 w-7" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold text-xl">{f.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{f.desc}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-24">
        <div className="bg-primary rounded-[3rem] p-12 md:p-20 text-primary-foreground text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 w-96 h-96 bg-accent/20 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
          <div className="relative z-10 space-y-8">
            <h2 className="text-4xl md:text-6xl font-bold font-headline leading-tight">Your Health, Elevated.</h2>
            <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto font-medium">
              Join the future of healthcare. Connect with Tamil Nadu's finest medical professionals today.
            </p>
            <div className="flex flex-wrap justify-center gap-6 pt-4">
              <Link href="/auth/register">
                <Button size="lg" variant="secondary" className="px-10 py-7 text-lg hover:scale-105 transition-transform">
                  Create Your Account
                </Button>
              </Link>
              <Link href="/doctors">
                <Button size="lg" variant="outline" className="px-10 py-7 text-lg border-white text-white hover:bg-white hover:text-primary transition-all">
                  Browse All Doctors
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
