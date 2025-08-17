import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { AssessmentState } from "../AssessmentFlow";

interface PsychometricSectionProps {
  data: AssessmentState;
  onComplete: (data: any) => void;
  onNext: () => void;
  onPrevious: () => void;
  isLast: boolean;
}

const interestQuestions = [
  "I enjoy learning about ecosystems and wildlife",
  "I would like a career that contributes to environmental sustainability",
  "I find nature documentaries and environmental research fascinating",
  "I'm motivated by solving environmental challenges",
  "I enjoy outdoor activities and spending time in nature"
];

const personalityQuestions = [
  "I enjoy solving practical problems in natural settings",
  "I prefer working independently on detailed tasks",
  "I'm comfortable with uncertainty and adapting to field conditions",
  "I communicate complex ideas clearly to diverse audiences",
  "I persist through challenges even when progress is slow"
];

const workStyleQuestions = [
  "I prefer following structured protocols rather than improvising",
  "I enjoy collaborative teamwork over solo work",
  "I'm more energized by fieldwork than office-based tasks",
  "I prefer long-term projects over quick turnaround assignments",
  "I work better with deadlines and clear milestones"
];

const motivationQuestions = [
  "I see failure as a learning opportunity",
  "I'm driven by making a positive environmental impact",
  "I seek feedback to continuously improve my skills",
  "I'm willing to work in challenging outdoor conditions",
  "I'm motivated by scientific discovery and research"
];

const PsychometricSection = ({ data, onComplete }: PsychometricSectionProps) => {
  const [currentSubsection, setCurrentSubsection] = useState(0);
  const [answers, setAnswers] = useState<{[key: string]: number}>({});

  const subsections = [
    { name: "Interest Assessment", questions: interestQuestions, key: "interests" },
    { name: "Personality Fit", questions: personalityQuestions, key: "personality" },
    { name: "Work Style Preferences", questions: workStyleQuestions, key: "workStyle" },
    { name: "Motivation Evaluation", questions: motivationQuestions, key: "motivation" }
  ];

  const currentSubsectionData = subsections[currentSubsection];
  const progress = ((currentSubsection + 1) / subsections.length) * 100;

  const handleAnswer = (questionIndex: number, value: string) => {
    const key = `${currentSubsection}-${questionIndex}`;
    setAnswers(prev => ({
      ...prev,
      [key]: parseInt(value)
    }));
  };

  const canProceed = () => {
    const currentQuestions = currentSubsectionData.questions;
    return currentQuestions.every((_, index) => {
      const key = `${currentSubsection}-${index}`;
      return answers[key] !== undefined;
    });
  };

  const handleNext = () => {
    if (currentSubsection < subsections.length - 1) {
      setCurrentSubsection(currentSubsection + 1);
    } else {
      // Compile all answers and complete section
      const psychometricData = {
        psychometric: {
          interests: interestQuestions.map((_, i) => answers[`0-${i}`] || 0),
          personality: personalityQuestions.map((_, i) => answers[`1-${i}`] || 0),
          workStyle: workStyleQuestions.map((_, i) => answers[`2-${i}`] || 0),
          motivation: motivationQuestions.map((_, i) => answers[`3-${i}`] || 0)
        }
      };
      onComplete(psychometricData);
    }
  };

  const scaleLabels = [
    "Strongly Disagree",
    "Disagree", 
    "Neutral",
    "Agree",
    "Strongly Agree"
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Psychometric Evaluation</h2>
        <p className="text-muted-foreground text-lg">
          Understanding your personality, interests, and motivations for biodiversity work
        </p>
      </div>

      <Card className="border-primary/20 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            {currentSubsectionData.name}
            <span className="text-sm font-normal text-muted-foreground">
              {currentSubsection + 1} of {subsections.length}
            </span>
          </CardTitle>
          <CardDescription>
            Rate how much you agree with each statement on a scale of 1-5
          </CardDescription>
          <Progress value={progress} className="mt-4" />
        </CardHeader>
        
        <CardContent className="space-y-8">
          {currentSubsectionData.questions.map((question, index) => {
            const key = `${currentSubsection}-${index}`;
            return (
              <div key={index} className="space-y-4">
                <Label className="text-base font-medium leading-relaxed">
                  {index + 1}. {question}
                </Label>
                <RadioGroup
                  value={answers[key]?.toString() || ""}
                  onValueChange={(value) => handleAnswer(index, value)}
                  className="grid grid-cols-5 gap-4"
                >
                  {[1, 2, 3, 4, 5].map((value) => (
                    <div key={value} className="text-center">
                      <RadioGroupItem
                        value={value.toString()}
                        id={`${key}-${value}`}
                        className="mx-auto mb-2"
                      />
                      <Label 
                        htmlFor={`${key}-${value}`}
                        className="text-xs leading-tight cursor-pointer"
                      >
                        {value}
                      </Label>
                      <p className="text-xs text-muted-foreground mt-1">
                        {scaleLabels[value - 1]}
                      </p>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            );
          })}
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={() => setCurrentSubsection(Math.max(0, currentSubsection - 1))}
          disabled={currentSubsection === 0}
        >
          Previous
        </Button>
        
        <Button 
          variant="assessment"
          onClick={handleNext}
          disabled={!canProceed()}
        >
          {currentSubsection === subsections.length - 1 ? "Complete Section" : "Next"}
        </Button>
      </div>
    </div>
  );
};

export default PsychometricSection;