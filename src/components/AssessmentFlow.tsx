import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft } from "lucide-react";
import PsychometricSection from "./assessment/PsychometricSection";
import TechnicalSection from "./assessment/TechnicalSection";
import WiscarSection from "./assessment/WiscarSection";
import ResultsPage from "./assessment/ResultsPage";

export interface AssessmentState {
  psychometric: {
    interests: number[];
    personality: number[];
    workStyle: number[];
    motivation: number[];
  };
  technical: {
    aptitude: number[];
    knowledge: number[];
    domainSpecific: number[];
  };
  wiscar: {
    will: number[];
    interest: number[];
    skill: number[];
    cognition: number[];
    ability: number[];
    realWorld: number[];
  };
}

interface AssessmentFlowProps {
  onBack: () => void;
}

const AssessmentFlow = ({ onBack }: AssessmentFlowProps) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [assessmentData, setAssessmentData] = useState<AssessmentState>({
    psychometric: {
      interests: [],
      personality: [],
      workStyle: [],
      motivation: []
    },
    technical: {
      aptitude: [],
      knowledge: [],
      domainSpecific: []
    },
    wiscar: {
      will: [],
      interest: [],
      skill: [],
      cognition: [],
      ability: [],
      realWorld: []
    }
  });

  const sections = [
    { name: "Psychometric Evaluation", component: PsychometricSection },
    { name: "Technical Assessment", component: TechnicalSection },
    { name: "WISCAR Analysis", component: WiscarSection },
    { name: "Results", component: ResultsPage }
  ];

  const progress = ((currentSection + 1) / sections.length) * 100;

  const handleSectionComplete = (sectionData: any) => {
    setAssessmentData(prev => ({
      ...prev,
      ...sectionData
    }));
    
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
    }
  };

  const CurrentComponent = sections[currentSection].component;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/10">
      {/* Header */}
      <header className="border-b bg-card/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              onClick={onBack}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
            
            <div className="text-center flex-1 mx-8">
              <h1 className="text-lg font-semibold">Biodiversity Consultant Assessment</h1>
              <p className="text-sm text-muted-foreground">
                Section {currentSection + 1} of {sections.length}: {sections[currentSection].name}
              </p>
            </div>
            
            <div className="w-24 text-right">
              <p className="text-sm font-medium">{Math.round(progress)}%</p>
            </div>
          </div>
          
          <Progress value={progress} className="mt-4" />
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        <CurrentComponent
          data={assessmentData}
          onComplete={handleSectionComplete}
          onNext={() => setCurrentSection(currentSection + 1)}
          onPrevious={() => setCurrentSection(Math.max(0, currentSection - 1))}
          isLast={currentSection === sections.length - 1}
        />
      </main>
    </div>
  );
};

export default AssessmentFlow;