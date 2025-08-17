import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Leaf, TreePine, Bird, Award } from "lucide-react";
import AssessmentFlow from "@/components/AssessmentFlow";

const Index = () => {
  const [showAssessment, setShowAssessment] = useState(false);

  if (showAssessment) {
    return <AssessmentFlow onBack={() => setShowAssessment(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-accent/20">
      {/* Hero Section */}
      <header className="relative overflow-hidden py-20 px-6">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-primary-glow/5" />
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="flex items-center gap-2 p-3 bg-primary/10 rounded-full">
              <Leaf className="h-8 w-8 text-primary" />
              <TreePine className="h-8 w-8 text-primary-glow" />
              <Bird className="h-8 w-8 text-primary" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Are You Ready to Become a{" "}
            <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              Biodiversity Consultant?
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Discover your fit for a career protecting ecosystems and guiding sustainable development. 
            Take our comprehensive assessment to evaluate your readiness and potential.
          </p>
          
          <Button 
            variant="assessment" 
            size="lg" 
            onClick={() => setShowAssessment(true)}
            className="text-lg px-8 py-6 h-auto"
          >
            <Award className="mr-2 h-5 w-5" />
            Start Assessment
          </Button>
          
          <p className="text-sm text-muted-foreground mt-4">
            ⏱️ Takes 20-30 minutes • Get personalized career guidance
          </p>
        </div>
      </header>

      {/* What You'll Discover Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">What You'll Discover</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-primary/10">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Leaf className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Your Natural Fit</CardTitle>
                <CardDescription>
                  Assess your personality traits, interests, and values alignment with biodiversity work
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Environmental passion score</li>
                  <li>• Analytical thinking assessment</li>
                  <li>• Field work compatibility</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-primary/10">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <TreePine className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Technical Readiness</CardTitle>
                <CardDescription>
                  Evaluate your current knowledge and identify skill gaps
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Ecology & biology knowledge</li>
                  <li>• Environmental law awareness</li>
                  <li>• Data analysis capabilities</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-primary/10">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Bird className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Career Guidance</CardTitle>
                <CardDescription>
                  Get personalized learning paths and role recommendations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Customized learning roadmap</li>
                  <li>• Alternative career paths</li>
                  <li>• Next steps recommendations</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Career Roles Preview */}
      <section className="py-16 px-6 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Biodiversity Career Paths</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "Biodiversity Consultant",
                description: "Conduct environmental impact assessments and advise on conservation strategies",
                skills: ["Environmental Assessment", "Report Writing", "Stakeholder Engagement"]
              },
              {
                title: "Conservation Planner",
                description: "Develop conservation strategies and plan protected areas",
                skills: ["Conservation Biology", "GIS Mapping", "Project Management"]
              },
              {
                title: "Field Ecologist", 
                description: "Collect data in natural habitats and monitor species trends",
                skills: ["Species Identification", "Data Collection", "Fieldwork"]
              },
              {
                title: "Environmental Policy Advisor",
                description: "Shape policies and strategies for environmental protection",
                skills: ["Policy Analysis", "Research", "Communication"]
              }
            ].map((role, index) => (
              <Card key={index} className="border-primary/10">
                <CardHeader>
                  <CardTitle className="text-lg">{role.title}</CardTitle>
                  <CardDescription>{role.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {role.skills.map((skill, skillIndex) => (
                      <Badge key={skillIndex} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Explore Your Future?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Take the first step towards a meaningful career in biodiversity conservation
          </p>
          
          <Button 
            variant="assessment" 
            size="lg" 
            onClick={() => setShowAssessment(true)}
            className="text-lg px-8 py-6 h-auto"
          >
            <Award className="mr-2 h-5 w-5" />
            Begin Your Assessment
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;