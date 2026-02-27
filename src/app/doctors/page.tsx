
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Star, Calendar, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const DOCTORS = [
  {
    id: "1",
    name: "Dr. Sarah Mitchell",
    specialty: "Cardiologist",
    rating: 4.9,
    reviews: 128,
    availability: "Available Today",
    image: PlaceHolderImages.find(img => img.id === 'doctor-1')?.imageUrl || "https://placehold.co/400x400",
    location: "Virtual Consultation"
  },
  {
    id: "2",
    name: "Dr. James Wilson",
    specialty: "Pediatrician",
    rating: 4.8,
    reviews: 95,
    availability: "Tomorrow",
    image: PlaceHolderImages.find(img => img.id === 'doctor-2')?.imageUrl || "https://placehold.co/400x400",
    location: "London, UK"
  },
  {
    id: "3",
    name: "Dr. Emily Chen",
    specialty: "Dermatologist",
    rating: 5.0,
    reviews: 210,
    availability: "Available Today",
    image: PlaceHolderImages.find(img => img.id === 'doctor-3')?.imageUrl || "https://placehold.co/400x400",
    location: "Virtual Consultation"
  },
  {
    id: "4",
    name: "Dr. Robert Fox",
    specialty: "General Physician",
    rating: 4.7,
    reviews: 84,
    availability: "Next Week",
    image: "https://picsum.photos/seed/doctor4/400/400",
    location: "Manchester, UK"
  }
];

export default function DoctorsPage() {
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

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {DOCTORS.map((doc) => (
          <Card key={doc.id} className="group hover:shadow-xl transition-all duration-300 border-none overflow-hidden bg-white">
            <CardHeader className="p-0 relative h-64">
              <Image 
                src={doc.image} 
                alt={doc.name} 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 right-3">
                <Badge className="bg-white/90 text-primary hover:bg-white">{doc.availability}</Badge>
              </div>
            </CardHeader>
            <CardContent className="p-5 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-lg">{doc.name}</h3>
                <div className="flex items-center gap-1 text-xs font-semibold text-amber-500">
                  <Star className="h-3 w-3 fill-current" />
                  {doc.rating}
                </div>
              </div>
              <p className="text-primary font-medium text-sm">{doc.specialty}</p>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <MapPin className="h-3 w-3" />
                {doc.location}
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
    </div>
  );
}
