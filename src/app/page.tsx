
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Video, ShieldCheck, MessageCircle, Clock, ArrowRight, BrainCircuit } from "lucide-react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function Home() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-medical');

  return (
    <div className="flex flex-col gap-16 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 md:pt-24 lg:pt-32">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-700">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                Trusted Remote Healthcare
              </div>
              <h1 className="text-5xl md:text-6xl font-bold font-headline leading-tight tracking-tight">
                Your Health, <span className="text-primary">Anytime, Anywhere.</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
                Experience the future of medical care with MoDoc. Secure video consultations, 
                AI-powered symptom assessment, and seamless messaging with top medical specialists.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/doctors">
                  <Button size="lg" className="px-8 bg-primary hover:bg-accent shadow-lg shadow-primary/20">
                    Find a Doctor
                  </Button>
                </Link>
                <Link href="/ai-assessment">
                  <Button variant="outline" size="lg" className="px-8 border-primary text-primary hover:bg-primary/5">
                    Try AI Assessment
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-700">
              {heroImage && (
                <Image
                  src={heroImage.imageUrl}
                  alt={heroImage.description}
                  fill
                  className="object-cover"
                  data-ai-hint={heroImage.imageHint}
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-3xl font-bold font-headline">Comprehensive Virtual Care</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Everything you need for a complete medical experience from the comfort of your home.
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Secure Video",
              desc: "Encrypted high-definition video calls for private consultations.",
              icon: Video,
              color: "bg-blue-100 text-blue-600"
            },
            {
              title: "AI Symptom Tool",
              desc: "Get instant guidance on potential specialties for your symptoms.",
              icon: BrainCircuit,
              color: "bg-purple-100 text-purple-600"
            },
            {
              title: "Private Messaging",
              desc: "Communicate securely with your doctors anytime.",
              icon: MessageCircle,
              color: "bg-green-100 text-green-600"
            },
            {
              title: "Smart Scheduling",
              desc: "Book appointments instantly based on real-time availability.",
              icon: Clock,
              color: "bg-orange-100 text-orange-600"
            }
          ].map((f, i) => (
            <Card key={i} className="hover:shadow-lg transition-all duration-300 border-none bg-white/50 backdrop-blur-sm">
              <CardContent className="p-6 space-y-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${f.color}`}>
                  <f.icon className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-xl">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Social Proof / Security */}
      <section className="bg-white border-y py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-md space-y-4">
              <div className="flex items-center gap-2 text-primary font-bold">
                <ShieldCheck className="h-6 w-6" />
                <span>Enterprise-Grade Security</span>
              </div>
              <h2 className="text-3xl font-bold font-headline">Your privacy is our top priority</h2>
              <p className="text-muted-foreground">
                We use industry-standard encryption for all communications. Your data is stored 
                securely and only accessible to you and your authorized healthcare providers.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8 w-full md:w-auto">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary">10k+</div>
                <div className="text-sm text-muted-foreground uppercase tracking-widest font-semibold mt-1">Patients</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary">500+</div>
                <div className="text-sm text-muted-foreground uppercase tracking-widest font-semibold mt-1">Specialists</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4">
        <div className="bg-primary rounded-3xl p-12 text-primary-foreground text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
          
          <div className="relative z-10 space-y-6">
            <h2 className="text-4xl font-bold font-headline">Ready to consult with a professional?</h2>
            <p className="text-primary-foreground/80 max-w-xl mx-auto">
              Join thousands of patients who have improved their access to healthcare through MoDoc.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/auth/register">
                <Button size="lg" variant="secondary" className="px-8">
                  Get Started for Free
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
