import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  GraduationCap, 
  Heart, 
  Leaf, 
  Users, 
  Target, 
  Globe,
  Lightbulb,
  Shield,
  Handshake
} from 'lucide-react';

const Mission = () => {
  const missionPillars = [
    {
      icon: GraduationCap,
      title: 'Education Excellence',
      description: 'Providing quality education and learning opportunities that empower individuals and strengthen communities for generations to come.',
      goals: [
        'Build and maintain schools in underserved areas',
        'Train local teachers and education leaders',
        'Provide scholarships and learning materials',
        'Develop digital literacy programs'
      ]
    },
    {
      icon: Heart,
      title: 'Healthcare Access',
      description: 'Ensuring essential healthcare services reach those who need them most, creating healthier communities and brighter futures.',
      goals: [
        'Establish mobile health clinics',
        'Train community health workers',
        'Provide preventive care and education',
        'Support maternal and child health'
      ]
    },
    {
      icon: Leaf,
      title: 'Environmental Stewardship',
      description: 'Promoting sustainable practices that protect our planet while creating economic opportunities for local communities.',
      goals: [
        'Implement reforestation projects',
        'Develop clean water solutions',
        'Promote sustainable agriculture',
        'Support renewable energy initiatives'
      ]
    }
  ];

  const coreValues = [
    {
      icon: Target,
      title: 'Purpose-Driven Impact',
      description: 'Every action we take is intentional and measurable, focused on creating lasting positive change in the communities we serve.'
    },
    {
      icon: Users,
      title: 'Community Partnership',
      description: 'We work alongside local leaders and families, ensuring that our programs are culturally appropriate and community-led.'
    },
    {
      icon: Lightbulb,
      title: 'Innovation & Adaptation',
      description: 'We embrace new ideas and technologies while adapting our approaches based on community feedback and changing needs.'
    },
    {
      icon: Shield,
      title: 'Transparency & Accountability',
      description: 'We maintain the highest standards of transparency in our operations and are accountable to the communities we serve.'
    },
    {
      icon: Handshake,
      title: 'Collaborative Spirit',
      description: 'We believe in the power of partnerships, working with local organizations, governments, and other NGOs to maximize impact.'
    },
    {
      icon: Globe,
      title: 'Global Perspective',
      description: 'While we work locally, we think globally, sharing knowledge and best practices across all our program locations.'
    }
  ];

  const visionPoints = [
    'Communities that are self-sufficient and thriving',
    'Children who have access to quality education',
    'Families with reliable healthcare and clean water',
    'Environments that are protected and sustainable',
    'Economic opportunities for all community members',
    'Strong local leadership and governance'
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 text-primary border-primary/30">
              Our Mission
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6">
              Empowering Communities,
              <span className="block text-primary">Transforming Lives</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Our mission is to create sustainable pathways out of poverty by providing education, healthcare, 
              and environmental solutions that empower communities to build their own brighter futures.
            </p>
          </div>
        </div>
      </section>

      {/* Vision Statement */}
      <section className="py-20 bg-background">
        <div className="container mx-auto max-w-7xl px-6">
          <Card className="max-w-4xl mx-auto shadow-strong">
            <CardContent className="p-12">
              <div className="text-center mb-8">
                <Globe className="h-16 w-16 mx-auto mb-6 text-primary" />
                <h2 className="text-3xl font-bold font-heading mb-4">Our Vision</h2>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  We envision a world where every community has the resources, knowledge, and opportunities 
                  needed to create lasting prosperity and well-being for all its members.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                {visionPoints.map((point, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                    <p className="text-muted-foreground">{point}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Mission Pillars */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
              Our Three Pillars
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Every program we develop is built around these three interconnected pillars, 
              ensuring comprehensive and sustainable community development.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {missionPillars.map((pillar, index) => (
              <Card key={index} className="bg-gradient-card shadow-medium hover:shadow-strong transition-all duration-300 group">
                <CardContent className="p-8">
                  <div className="flex justify-center mb-6">
                    <div className="p-4 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <pillar.icon className="h-10 w-10 text-primary" />
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold font-heading mb-4 text-center">
                    {pillar.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed mb-6 text-center">
                    {pillar.description}
                  </p>
                  
                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm uppercase tracking-wide text-primary">
                      Key Initiatives:
                    </h4>
                    {pillar.goals.map((goal, goalIndex) => (
                      <div key={goalIndex} className="flex items-start space-x-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                        <p className="text-sm text-muted-foreground">{goal}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-background">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
              Our Guiding Values
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              These values shape our culture, guide our decisions, and ensure we remain true to our mission 
              as we grow and evolve.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreValues.map((value, index) => (
              <Card key={index} className="shadow-medium hover:shadow-strong transition-all duration-300 group">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors flex-shrink-0">
                      <value.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold font-heading mb-3">
                        {value.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Theory of Change */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
              Our Theory of Change
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We believe that sustainable change happens when communities are empowered to lead their own development.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                {
                  step: '01',
                  title: 'Listen & Learn',
                  description: 'We begin by listening to community needs and understanding local context and culture.'
                },
                {
                  step: '02',
                  title: 'Partner & Plan',
                  description: 'We collaborate with local leaders to develop culturally appropriate and sustainable solutions.'
                },
                {
                  step: '03',
                  title: 'Implement & Support',
                  description: 'We provide resources and expertise while building local capacity and leadership skills.'
                },
                {
                  step: '04',
                  title: 'Transfer & Sustain',
                  description: 'We gradually transfer ownership to the community, ensuring long-term sustainability.'
                }
              ].map((phase, index) => (
                <Card key={index} className="text-center shadow-medium hover:shadow-strong transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <span className="text-3xl font-bold text-primary">{phase.step}</span>
                    </div>
                    <h3 className="text-lg font-bold font-heading mb-3">
                      {phase.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {phase.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-impact text-white">
        <div className="container mx-auto max-w-7xl px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
            Be Part of Our Mission
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto text-white/90">
            Our mission is only possible with partners like you. Join us in creating lasting change 
            and building bridges to hope around the world.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="default" size="xl" className="bg-primary hover:bg-primary/90">
              Support Our Mission
            </Button>
            <Button variant="outline" size="xl" className="text-white border-white hover:bg-white hover:text-secondary">
              Learn About Our Programs
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Mission;