
"use client";

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Star, MapPin, Loader2, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCollection, useFirestore, useMemoFirebase } from "@/firebase";
import { collection } from "firebase/firestore";

export default function DoctorsPage() {
  const db = useFirestore();
  const doctorsRef = useMemoFirebase(() => db ? collection(db, "doctors") : null, [db]);
  const { data: doctors, isLoading } = useCollection(doctorsRef);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold font-headline">Find Your Specialist</h1>
          <p className="text-muted-foreground">Book private video consultations with top-rated doctors.</p>
        </div>
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input className="pl-10 h-11 bg-white" placeholder="Search by name or specialty..." />
        </div>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading practitioners...</p>
        </div>
      ) : !doctors || doctors.length === 0 ? (
        <div className="text-center py-24 border-2 border-dashed rounded-2xl">
          <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-bold">No practitioners found</h3>
          <p className="text-muted-foreground">Try adjusting your search criteria or check back later.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {doctors.map((doc) => (
            <Card key={doc.id} className="group hover:shadow-xl transition-all duration-300 border-none overflow-hidden bg-white">
              <CardHeader className="p-0 relative h-64">
                {doc.profileImageUrl ? (
                  <Image 
                    src={doc.profileImageUrl} 
                    alt={`${doc.firstName} ${doc.lastName}`} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full bg-muted flex items-center justify-center">
                    <User className="h-12 w-12 text-muted-foreground" />
                  </div>
                )}
                <div className="absolute top-3 right-3">
                  <Badge className="bg-white/90 text-primary hover:bg-white">Available</Badge>
                </div>
              </CardHeader>
              <CardContent className="p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-lg">Dr. {doc.firstName} {doc.lastName}</h3>
                  <div className="flex items-center gap-1 text-xs font-semibold text-amber-500">
                    <Star className="h-3 w-3 fill-current" />
                    {doc.averageRating || "5.0"}
                  </div>
                </div>
                <p className="text-primary font-medium text-sm">{doc.specializations?.[0] || 'General Practitioner'}</p>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  Virtual Consultation
                </div>
              </CardContent>
              <CardFooter className="p-5 pt-0">
                <Link href={`/doctors/${doc.id}`} className="w-full">
                  <Button className="w-full bg-primary hover:bg-accent group-hover:shadow-lg transition-all">
                    Book Appointment
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
