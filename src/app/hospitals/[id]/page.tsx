
"use client";

import { use } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, User, Loader2, ArrowLeft, Stethoscope, Video, Calendar, ExternalLink, Navigation } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCollection, useFirestore, useMemoFirebase } from "@/firebase";
import { collection, query, where } from "firebase/firestore";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const TAMILNADU_HOSPITALS = [
  {
    id: "hospital-kg",
    name: "KG Hospital",
    city: "Coimbatore",
    location: "Arts College Road",
    desc: "NABH Accredited Tertiary care hospital specializing in Cardiology and Nephrology.",
    specialty: "Cardiology",
    website: "https://www.kghospital.com/",
    mapQuery: "KG+Hospital+Coimbatore"
  },
  {
    id: "hospital-ganga",
    name: "Ganga Hospital",
    city: "Coimbatore",
    location: "Mettupalayam Road",
    desc: "World-renowned center for Orthopaedics, Trauma and Plastic Surgery.",
    specialty: "Orthopaedics",
    website: "https://www.gangahospital.com/",
    mapQuery: "Ganga+Hospital+Coimbatore"
  },
  {
    id: "hospital-psg",
    name: "PSG Hospitals",
    city: "Coimbatore",
    location: "Peelamedu",
    desc: "Multispeciality teaching hospital offering comprehensive patient care and research.",
    specialty: "General Medicine",
    website: "https://www.psghospitals.com/",
    mapQuery: "PSG+Hospitals+Coimbatore"
  },
  {
    id: "hospital-kmch",
    name: "KMCH",
    city: "Coimbatore",
    location: "Avinashi Road",
    desc: "A modern multi-specialty hospital with state-of-the-art diagnostic facilities.",
    specialty: "Multi-Specialty",
    website: "https://www.kmchhospitals.com/",
    mapQuery: "KMCH+Hospital+Coimbatore"
  }
];

export default function HospitalDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const db = useFirestore();
  
  const hospital = TAMILNADU_HOSPITALS.find(h => h.id === id);
  const imageData = PlaceHolderImages.find(img => img.id === id);

  const doctorsQuery = useMemoFirebase(() => {
    if (!db) return null;
    return query(collection(db, "doctors"), where("hospitalId", "==", id));
  }, [db, id]);

  const { data: doctors, isLoading } = useCollection(doctorsQuery);

  if (!hospital) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-bold">Hospital not found</h1>
        <Link href="/">
          <Button variant="link" className="mt-4">Back to home</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Hospital Banner */}
      <div className="relative h-[400px] w-full">
        <Image 
          src={imageData?.imageUrl || "https://picsum.photos/seed/hospital/1200/600"} 
          alt={hospital.name} 
          width={1200}
          height={600}
          className="object-cover h-full" 
          data-ai-hint={imageData?.imageHint || "hospital campus"}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16">
          <div className="container mx-auto">
            <Link href="/" className="inline-flex items-center text-sm font-bold text-primary hover:gap-2 transition-all mb-6 bg-white/90 px-4 py-2 rounded-full shadow-sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Hospitals
            </Link>
            <div className="space-y-4 max-w-4xl">
              <Badge className="bg-primary hover:bg-primary shadow-lg px-4 py-1">
                {hospital.specialty} Specialist Facility
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold font-headline text-foreground">{hospital.name}</h1>
              <div className="flex flex-wrap items-center gap-6 text-foreground/80 font-medium">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  {hospital.location}, {hospital.city}
                </div>
                <div className="flex items-center gap-2">
                  <Stethoscope className="h-5 w-5 text-primary" />
                  NABH Accredited
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-12 grid lg:grid-cols-3 gap-12">
        {/* About & Specialists Section */}
        <div className="lg:col-span-2 space-y-12">
          <section className="space-y-6">
            <div className="flex items-center justify-between border-b pb-4">
              <h2 className="text-3xl font-bold font-headline">Affiliated Specialists</h2>
              <a href={hospital.website} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="text-primary border-primary hover:bg-primary/5">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Official Website
                </Button>
              </a>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Consult with top-rated medical practitioners exclusively affiliated with {hospital.name}. 
              Select a specialist below to view availability and book a secure video consultation.
            </p>

            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20 gap-4">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
                <p className="text-muted-foreground font-medium">Loading specialist profiles...</p>
              </div>
            ) : !doctors || doctors.length === 0 ? (
              <div className="text-center py-20 border-2 border-dashed rounded-3xl bg-slate-50">
                <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-bold">No specialists listed yet</h3>
                <p className="text-muted-foreground max-w-sm mx-auto">
                  We are currently verifying specialist profiles for this facility. Please check back shortly.
                </p>
                <div className="mt-8 flex gap-4 justify-center">
                  <Button variant="outline">Notify Me</Button>
                  <Link href="/doctors">
                    <Button>Browse All Doctors</Button>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {doctors.map((doc) => (
                  <Card key={doc.id} className="group hover:shadow-xl transition-all duration-300 border-none overflow-hidden bg-white ring-1 ring-slate-200">
                    <CardHeader className="p-0 relative h-56">
                      <Image 
                        src={doc.profileImageUrl || `https://picsum.photos/seed/${doc.id}/400/400`} 
                        alt={`${doc.firstName} ${doc.lastName}`} 
                        width={400}
                        height={400}
                        className="object-cover h-full group-hover:scale-105 transition-transform duration-500"
                        data-ai-hint="doctor portrait"
                      />
                      <div className="absolute top-3 right-3">
                        <Badge className="bg-white/95 text-primary hover:bg-white flex items-center gap-1 shadow-md">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                          Online
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6 space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-bold text-xl">Dr. {doc.firstName} {doc.lastName}</h3>
                          <p className="text-primary font-bold text-sm">{doc.specializations?.[0]}</p>
                        </div>
                        <div className="flex items-center gap-1 text-sm font-bold text-amber-500 bg-amber-50 px-2 py-1 rounded-lg">
                          <Star className="h-4 w-4 fill-current" />
                          {doc.averageRating || "5.0"}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
                        <Video className="h-3.5 w-3.5" />
                        Available for Video Call
                      </div>
                    </CardContent>
                    <CardFooter className="p-6 pt-0">
                      <Link href={`/doctors/${doc.id}`} className="w-full">
                        <Button className="w-full bg-primary hover:bg-accent shadow-lg shadow-primary/10">
                          Book Appointment
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </section>

          {/* Location Section with Google Maps */}
          <section className="space-y-6">
            <div className="flex items-center gap-2 border-b pb-4">
              <Navigation className="h-6 w-6 text-primary" />
              <h2 className="text-3xl font-bold font-headline">Location & Directions</h2>
            </div>
            <Card className="overflow-hidden border-none shadow-lg bg-white p-0 h-[400px]">
              <iframe
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyA8_EXAMPLE_NOT_REAL&q=${hospital.mapQuery}`}
                // Using standard non-API key embed URL as fallback for reliability
                srcDoc={`
                  <style>
                    body { margin: 0; font-family: sans-serif; }
                    .map-container { position: relative; width: 100%; height: 100%; }
                    iframe { width: 100%; height: 100%; border: 0; }
                  </style>
                  <div class="map-container">
                    <iframe 
                      src="https://maps.google.com/maps?q=${hospital.mapQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed"
                      frameborder="0" 
                      scrolling="no" 
                      marginheight="0" 
                      marginwidth="0">
                    </iframe>
                  </div>
                `}
              ></iframe>
            </Card>
            <div className="flex items-center justify-between">
              <p className="text-muted-foreground">
                {hospital.location}, {hospital.city}, Tamil Nadu
              </p>
              <Button variant="outline" size="sm" asChild>
                <a href={`https://www.google.com/maps/search/?api=1&query=${hospital.mapQuery}`} target="_blank" rel="noopener noreferrer">
                  Open in Google Maps
                </a>
              </Button>
            </div>
          </section>
        </div>

        {/* Info Sidebar */}
        <div className="space-y-8">
          <Card className="border-none shadow-xl bg-slate-900 text-slate-50 p-8">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Calendar className="h-6 w-6 text-primary" />
              Facility Info
            </h3>
            <div className="space-y-6">
              <div>
                <p className="text-slate-400 text-sm font-bold uppercase tracking-wider mb-2">Hospital Name</p>
                <p className="text-lg font-medium">{hospital.name}</p>
              </div>
              <div>
                <p className="text-slate-400 text-sm font-bold uppercase tracking-wider mb-2">Primary Specialization</p>
                <Badge className="bg-primary/20 text-primary border-primary/30 text-base py-1 px-4">
                  {hospital.specialty}
                </Badge>
              </div>
              <div>
                <p className="text-slate-400 text-sm font-bold uppercase tracking-wider mb-2">Full Address</p>
                <p className="text-base text-slate-300">{hospital.location}, {hospital.city}, Tamil Nadu, India</p>
              </div>
              <div className="pt-6 border-t border-slate-800">
                <a href={hospital.website} target="_blank" rel="noopener noreferrer" className="w-full block">
                  <Button className="w-full bg-white text-slate-900 hover:bg-slate-200 font-bold py-6">
                    Visit Official Site
                  </Button>
                </a>
              </div>
            </div>
          </Card>

          <Card className="border-none shadow-lg p-8 bg-primary/5 border border-primary/10">
            <CardHeader className="p-0 mb-4">
              <CardTitle className="text-xl">Safety & Trust</CardTitle>
            </CardHeader>
            <CardContent className="p-0 space-y-4">
              <p className="text-sm text-muted-foreground leading-relaxed">
                All consultations are HIPAA-compliant and secure. Your medical records are strictly confidential and only accessible by your chosen practitioner.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-sm font-medium">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  Verified Practitioners
                </li>
                <li className="flex items-center gap-3 text-sm font-medium">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  Instant Summaries
                </li>
                <li className="flex items-center gap-3 text-sm font-medium">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  Secure Payments
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
