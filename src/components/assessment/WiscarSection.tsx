import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { AssessmentState } from "../AssessmentFlow";

interface WiscarSectionProps {
  data: AssessmentState;
  onComplete: (data: any) => void;
  onNext: () => void;
  onPrevious: () => void;
  isLast: boolean;
}

const willQuestions = [
  "I consistently pursue environmental goals even when faced with obstacles",
  "I'm willing to dedicate years to developing expertise in biodiversity",
  "I would relocate for the right biodiversity career opportunity",
  "I'm committed to continuous learning in this rapidly evolving field"
];

const interestQuestions = [
  "I'm excited to solve complex biodiversity challenges",
  "I find environmental policy discussions engaging",
  "I enjoy reading scientific papers about conservation",
  "I would choose biodiversity work over higher-paying alternatives"
];

const skillQuestions = [
  "I can clearly explain technical concepts to non-experts",
  "I'm proficient at analyzing and interpreting data",
  "I have strong written communication skills",
  "I can work effectively in team environments"
];

const cognitionQuestions = [
  "I quickly grasp connections between different environmental factors",
  "I can think strategically about long-term conservation outcomes",
  "I learn new technical skills relatively easily",
  "I can adapt my approach when initial strategies don't work"
];

const abilityQuestions = [
  "I seek feedback to improve my performance",
  "I persist through challenges even when progress is slow",
  "I can manage multiple projects simultaneously",
  "I stay current with developments in environmental science"
];

const realWorldQuestions = [
  "I enjoy conducting field surveys in various weather conditions",
  "I'm comfortable presenting findings to diverse stakeholder groups",
  "I can work independently with minimal supervision",
  "I'm willing to travel frequently for field work and client meetings"
];

const WiscarSection = ({ data, onComplete }: WiscarSectionProps) => {
  const [currentSubsection, setCurrentSubsection] = useState(0);
  const [answers, setAnswers] = useState<{[key: string]: number}>({});

  const subsections = [
    { name: "Will (Motivation)", questions: willQuestions, key: "will", description: "Your commitment and drive" },
    { name: "Interest (Passion)", questions: interestQuestions, key: "interest", description: "Your enthusiasm for the field" },
    { name: "Skill (Current Abilities)", questions: skillQuestions, key: "skill", description: "Your existing capabilities" },
    { name: "Cognition (Learning Ability)", questions: cognitionQuestions, key: "cognition", description: "Your capacity to learn and adapt" },
    { name: "Ability (Growth Potential)", questions: abilityQuestions, key: "ability", description: "Your potential for development" },
    { name: "Real-World Alignment", questions: realWorldQuestions, key: "realWorld", description: "Your fit with actual job requirements" }
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
      const wiscarData = {
        wiscar: {
          will: willQuestions.map((_, i) => answers[`0-${i}`] || 0),
          interest: interestQuestions.map((_, i) => answers[`1-${i}`] || 0),
          skill: skillQuestions.map((_, i) => answers[`2-${i}`] || 0),
          cognition: cognitionQuestions.map((_, i) => answers[`3-${i}`] || 0),
          ability: abilityQuestions.map((_, i) => answers[`4-${i}`] || 0),
          realWorld: realWorldQuestions.map((_, i) => answers[`5-${i}`] || 0)
        }
      };
      onComplete(wiscarData);
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
        <h2 className="text-3xl font-bold mb-4">WISCAR Framework Analysis</h2>
        <p className="text-muted-foreground text-lg">
          Comprehensive evaluation of your readiness across six key dimensions
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
            {currentSubsectionData.description} - Rate your agreement with each statement
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
          {currentSubsection === subsections.length - 1 ? "Complete Assessment" : "Next"}
        </Button>
      </div>
    </div>
  );
};

export default WiscarSection;