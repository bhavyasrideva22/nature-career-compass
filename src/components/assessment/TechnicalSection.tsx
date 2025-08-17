import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { AssessmentState } from "../AssessmentFlow";

interface TechnicalSectionProps {
  data: AssessmentState;
  onComplete: (data: any) => void;
  onNext: () => void;
  onPrevious: () => void;
  isLast: boolean;
}

const aptitudeQuestions = [
  {
    question: "If all biodiversity consultants must follow environmental regulations, and Sarah is a biodiversity consultant, what can we conclude?",
    options: [
      "Sarah might follow environmental regulations",
      "Sarah definitely follows environmental regulations", 
      "Sarah is an environmental lawyer",
      "Nothing can be concluded"
    ],
    correct: 1
  },
  {
    question: "A study shows that 15% of species in a habitat are endangered. If there are 200 species total, how many are endangered?",
    options: ["15", "20", "30", "50"],
    correct: 2
  },
  {
    question: "Which data visualization would best show species population changes over time?",
    options: ["Pie chart", "Line graph", "Bar chart", "Scatter plot"],
    correct: 1
  }
];

const knowledgeQuestions = [
  {
    question: "What does 'biodiversity' primarily refer to?",
    options: [
      "Only the number of different species in an area",
      "The variety of life including species, genetic, and ecosystem diversity",
      "The economic value of natural resources",
      "The conservation status of endangered species"
    ],
    correct: 1
  },
  {
    question: "What is an Environmental Impact Assessment (EIA)?",
    options: [
      "A financial analysis of environmental projects",
      "A process to evaluate environmental effects of proposed developments",
      "A species counting methodology",
      "A type of conservation plan"
    ],
    correct: 1
  },
  {
    question: "Which tool is commonly used for mapping and analyzing ecological data?",
    options: ["Excel spreadsheets", "GIS software", "Word processors", "Email clients"],
    correct: 1
  }
];

const domainQuestions = [
  {
    question: "What is 'biodiversity offsetting'?",
    options: [
      "Moving species to different locations",
      "Compensating for biodiversity loss by creating equivalent gains elsewhere",
      "Reducing the number of species in an area",
      "Calculating the economic value of ecosystems"
    ],
    correct: 1
  },
  {
    question: "Which international framework addresses biodiversity conservation?",
    options: [
      "Paris Climate Agreement only",
      "Convention on Biological Diversity (CBD)",
      "World Trade Organization rules",
      "International Maritime Organization protocols"
    ],
    correct: 1
  },
  {
    question: "What is the primary purpose of a Habitat Management Plan?",
    options: [
      "To build more infrastructure in natural areas",
      "To guide conservation and restoration activities",
      "To calculate species market values", 
      "To relocate human settlements"
    ],
    correct: 1
  }
];

const TechnicalSection = ({ data, onComplete }: TechnicalSectionProps) => {
  const [currentSubsection, setCurrentSubsection] = useState(0);
  const [answers, setAnswers] = useState<{[key: string]: number}>({});

  const subsections = [
    { name: "General Aptitude", questions: aptitudeQuestions, key: "aptitude" },
    { name: "Environmental Knowledge", questions: knowledgeQuestions, key: "knowledge" },
    { name: "Domain Expertise", questions: domainQuestions, key: "domainSpecific" }
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
      const technicalData = {
        technical: {
          aptitude: aptitudeQuestions.map((_, i) => answers[`0-${i}`] || 0),
          knowledge: knowledgeQuestions.map((_, i) => answers[`1-${i}`] || 0),
          domainSpecific: domainQuestions.map((_, i) => answers[`2-${i}`] || 0)
        }
      };
      onComplete(technicalData);
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Technical Assessment</h2>
        <p className="text-muted-foreground text-lg">
          Evaluating your analytical skills and biodiversity knowledge
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
            Choose the best answer for each question
          </CardDescription>
          <Progress value={progress} className="mt-4" />
        </CardHeader>
        
        <CardContent className="space-y-8">
          {currentSubsectionData.questions.map((item, index) => {
            const key = `${currentSubsection}-${index}`;
            return (
              <div key={index} className="space-y-4">
                <Label className="text-base font-medium leading-relaxed">
                  {index + 1}. {item.question}
                </Label>
                <RadioGroup
                  value={answers[key]?.toString() || ""}
                  onValueChange={(value) => handleAnswer(index, value)}
                  className="space-y-3"
                >
                  {item.options.map((option, optionIndex) => (
                    <div key={optionIndex} className="flex items-center space-x-3">
                      <RadioGroupItem
                        value={optionIndex.toString()}
                        id={`${key}-${optionIndex}`}
                      />
                      <Label 
                        htmlFor={`${key}-${optionIndex}`}
                        className="text-sm leading-relaxed cursor-pointer flex-1"
                      >
                        {option}
                      </Label>
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

export default TechnicalSection;