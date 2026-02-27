
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BrainCircuit, Loader2, Info, AlertTriangle, CheckCircle2 } from "lucide-react";
import { patientSymptomSpecialtyGuidance, type PatientSymptomSpecialtyGuidanceOutput } from "@/ai/flows/patient-symptom-specialty-guidance";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function AIAssessmentPage() {
  const [symptoms, setSymptoms] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<PatientSymptomSpecialtyGuidanceOutput | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!symptoms.trim()) return;

    setIsLoading(true);
    try {
      const output = await patientSymptomSpecialtyGuidance({ symptoms });
      setResult(output);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <div className="text-center mb-12 space-y-4">
        <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
          <BrainCircuit className="h-8 w-8" />
        </div>
        <h1 className="text-3xl font-bold font-headline">AI Symptom Guidance</h1>
        <p className="text-muted-foreground">
          Describe your symptoms to get guidance on potential medical specialties and next steps.
        </p>
      </div>

      <Alert variant="destructive" className="mb-8 border-amber-200 bg-amber-50 text-amber-800">
        <AlertTriangle className="h-4 w-4 text-amber-600" />
        <AlertTitle className="font-bold">Important Disclaimer</AlertTitle>
        <AlertDescription className="text-amber-700">
          This tool is NOT for medical diagnosis or emergency use. If you are experiencing a 
          medical emergency, please call your local emergency services immediately.
        </AlertDescription>
      </Alert>

      <Card className="mb-8 border-none shadow-xl bg-white/70 backdrop-blur-md">
        <CardHeader>
          <CardTitle>Describe your symptoms</CardTitle>
          <CardDescription>Include details about when they started and how you feel.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Textarea
              placeholder="E.g., I've been having a sharp pain in my lower back for 3 days, it gets worse when I bend over..."
              className="min-h-[150px] resize-none"
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              disabled={isLoading}
            />
            <Button 
              type="submit" 
              className="w-full bg-primary hover:bg-accent" 
              disabled={isLoading || !symptoms.trim()}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing Symptoms...
                </>
              ) : (
                "Get AI Guidance"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {result && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-none shadow-lg">
              <CardHeader className="bg-primary/5">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Stethoscope className="h-5 w-5 text-primary" />
                  Recommended Specialties
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-3">
                  {result.specialties.map((spec, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg">
              <CardHeader className="bg-accent/5">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Info className="h-5 w-5 text-accent" />
                  Next Steps
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-3">
                  {result.nextSteps.map((step, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card className="border-none bg-muted/50">
            <CardContent className="p-4 text-xs text-muted-foreground italic text-center">
              {result.disclaimer}
            </CardContent>
          </Card>

          <div className="flex justify-center pt-4">
            <Button variant="outline" onClick={() => {setResult(null); setSymptoms("");}}>
              Start Over
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

function Stethoscope(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4.8 2.3A.3.3 0 1 0 5 2a.3.3 0 1 0-.2.3Z" />
      <path d="M10 2v2" />
      <path d="M14 2v2" />
      <path d="M3 10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v6Z" />
      <path d="M7 12v6a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-6" />
      <path d="M12 20v2" />
      <path d="M9 22h6" />
    </svg>
  );
}
