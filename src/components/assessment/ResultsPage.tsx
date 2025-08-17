import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AssessmentState } from "../AssessmentFlow";
import { 
  Award, 
  Target, 
  TrendingUp, 
  BookOpen, 
  Users, 
  MapPin,
  CheckCircle,
  AlertCircle,
  XCircle,
  Leaf,
  TreePine,
  Bird
} from "lucide-react";

interface ResultsPageProps {
  data: AssessmentState;
  onComplete: (data: any) => void;
  onNext: () => void;
  onPrevious: () => void;
  isLast: boolean;
}

const ResultsPage = ({ data }: ResultsPageProps) => {
  // Calculate scores from assessment data
  const calculateScore = (responses: number[]) => {
    if (responses.length === 0) return 0;
    const average = responses.reduce((sum, score) => sum + score, 0) / responses.length;
    return Math.round((average / 5) * 100);
  };

  const psychometricScore = Math.round((
    calculateScore(data.psychometric.interests) +
    calculateScore(data.psychometric.personality) +
    calculateScore(data.psychometric.workStyle) +
    calculateScore(data.psychometric.motivation)
  ) / 4);

  const technicalScore = Math.round((
    calculateScore(data.technical.aptitude) +
    calculateScore(data.technical.knowledge) +
    calculateScore(data.technical.domainSpecific)
  ) / 3);

  const wiscarScores = {
    will: calculateScore(data.wiscar.will),
    interest: calculateScore(data.wiscar.interest),
    skill: calculateScore(data.wiscar.skill),
    cognition: calculateScore(data.wiscar.cognition),
    ability: calculateScore(data.wiscar.ability),
    realWorld: calculateScore(data.wiscar.realWorld)
  };

  const overallScore = Math.round((psychometricScore + technicalScore + Object.values(wiscarScores).reduce((a, b) => a + b, 0) / 6) / 3);

  const getRecommendation = (score: number) => {
    if (score >= 80) return { text: "Strongly Recommended", color: "assessment-ready", icon: CheckCircle };
    if (score >= 60) return { text: "Recommended with Development", color: "assessment-potential", icon: AlertCircle };
    return { text: "Consider Alternative Paths", color: "assessment-needs-work", icon: XCircle };
  };

  const recommendation = getRecommendation(overallScore);
  const RecommendationIcon = recommendation.icon;

  const careerPaths = [
    {
      title: "Biodiversity Consultant",
      match: overallScore,
      description: "Environmental impact assessments and conservation strategy development",
      requirements: ["Environmental science degree", "Field experience", "Report writing skills"]
    },
    {
      title: "Conservation Planner", 
      match: Math.max(60, overallScore - 10),
      description: "Developing conservation strategies and protected area management",
      requirements: ["Ecology background", "GIS skills", "Project management"]
    },
    {
      title: "Field Ecologist",
      match: Math.max(55, overallScore - 15),
      description: "Species monitoring and habitat data collection",
      requirements: ["Biology degree", "Field techniques", "Data analysis"]
    },
    {
      title: "Environmental Policy Advisor",
      match: Math.max(50, overallScore - 20),
      description: "Policy development and environmental regulation guidance",
      requirements: ["Policy analysis", "Communication skills", "Legal knowledge"]
    }
  ];

  const learningPath = overallScore >= 80 ? "Advanced" : overallScore >= 60 ? "Intermediate" : "Foundation";

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <div className="flex items-center gap-2 p-4 bg-primary/10 rounded-full">
            <Leaf className="h-8 w-8 text-primary" />
            <Award className="h-10 w-10 text-primary-glow" />
            <TreePine className="h-8 w-8 text-primary" />
          </div>
        </div>
        <h2 className="text-4xl font-bold mb-4">Your Assessment Results</h2>
        <p className="text-muted-foreground text-lg">
          Comprehensive analysis of your biodiversity consultant readiness
        </p>
      </div>

      {/* Overall Score */}
      <Card className="border-primary/20 shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl flex items-center justify-center gap-3">
            <RecommendationIcon className="h-8 w-8" style={{ color: `hsl(var(--${recommendation.color}))` }} />
            Overall Confidence Score: {overallScore}%
          </CardTitle>
          <CardDescription className="text-lg">
            <Badge 
              variant="secondary" 
              className="text-lg px-4 py-2"
              style={{ backgroundColor: `hsl(var(--${recommendation.color}) / 0.1)`, color: `hsl(var(--${recommendation.color}))` }}
            >
              {recommendation.text}
            </Badge>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Progress value={overallScore} className="h-3" />
        </CardContent>
      </Card>

      {/* Detailed Scores */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-primary/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Psychometric Fit
            </CardTitle>
            <CardDescription>Personality and interest alignment</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              <span>Score</span>
              <span className="font-semibold">{psychometricScore}%</span>
            </div>
            <Progress value={psychometricScore} className="mb-4" />
            <div className="text-sm text-muted-foreground">
              {psychometricScore >= 80 ? "Excellent natural fit for biodiversity work" :
               psychometricScore >= 60 ? "Good alignment with some development areas" :
               "Consider exploring interest and motivation drivers"}
            </div>
          </CardContent>
        </Card>

        <Card className="border-primary/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              Technical Readiness
            </CardTitle>
            <CardDescription>Knowledge and analytical skills</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              <span>Score</span>
              <span className="font-semibold">{technicalScore}%</span>
            </div>
            <Progress value={technicalScore} className="mb-4" />
            <div className="text-sm text-muted-foreground">
              {technicalScore >= 80 ? "Strong technical foundation ready for advanced work" :
               technicalScore >= 60 ? "Solid base with some knowledge gaps to address" :
               "Foundational learning recommended before specializing"}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* WISCAR Breakdown */}
      <Card className="border-primary/10">
        <CardHeader>
          <CardTitle>WISCAR Framework Analysis</CardTitle>
          <CardDescription>Detailed breakdown across six key dimensions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            {Object.entries(wiscarScores).map(([key, score]) => {
              const labels = {
                will: "Will (Motivation)",
                interest: "Interest (Passion)", 
                skill: "Skill (Current)",
                cognition: "Cognition (Learning)",
                ability: "Ability (Growth)",
                realWorld: "Real-World Fit"
              };
              
              return (
                <div key={key} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{labels[key as keyof typeof labels]}</span>
                    <span className="font-semibold">{score}%</span>
                  </div>
                  <Progress value={score} className="h-2" />
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Career Path Recommendations */}
      <Card className="border-primary/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Recommended Career Paths
          </CardTitle>
          <CardDescription>Career options ranked by your assessment results</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {careerPaths.map((path, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <h4 className="font-semibold mb-1">{path.title}</h4>
                  <p className="text-sm text-muted-foreground mb-2">{path.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {path.requirements.map((req, reqIndex) => (
                      <Badge key={reqIndex} variant="outline" className="text-xs">
                        {req}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="text-right ml-4">
                  <div className="text-lg font-semibold">{path.match}%</div>
                  <div className="text-xs text-muted-foreground">Match</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Learning Path */}
      <Card className="border-primary/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Your Learning Path: {learningPath} Level
          </CardTitle>
          <CardDescription>Recommended next steps based on your assessment</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {learningPath === "Advanced" && (
              <div className="space-y-2">
                <h4 className="font-semibold text-assessment-ready">Ready for Advanced Training</h4>
                <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground">
                  <li>Environmental Impact Assessment Certification</li>
                  <li>Advanced GIS and Remote Sensing</li>
                  <li>Conservation Planning Specialization</li>
                  <li>Professional networking and internships</li>
                </ul>
              </div>
            )}
            
            {learningPath === "Intermediate" && (
              <div className="space-y-2">
                <h4 className="font-semibold text-assessment-potential">Build on Your Foundation</h4>
                <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground">
                  <li>Environmental Science Fundamentals</li>
                  <li>Basic GIS and Data Analysis</li>
                  <li>Field Survey Techniques</li>
                  <li>Environmental Law and Policy Basics</li>
                </ul>
              </div>
            )}
            
            {learningPath === "Foundation" && (
              <div className="space-y-2">
                <h4 className="font-semibold text-assessment-needs-work">Start with the Basics</h4>
                <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground">
                  <li>Introduction to Ecology and Biodiversity</li>
                  <li>Basic Biology and Environmental Science</li>
                  <li>Scientific Communication Skills</li>
                  <li>Explore volunteer opportunities in conservation</li>
                </ul>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4">
        <Button variant="outline" size="lg">
          <MapPin className="mr-2 h-4 w-4" />
          Find Courses
        </Button>
        <Button variant="assessment" size="lg">
          <Bird className="mr-2 h-4 w-4" />
          Explore Careers
        </Button>
      </div>
    </div>
  );
};

export default ResultsPage;