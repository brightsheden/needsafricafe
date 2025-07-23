import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Heart, Award, Target } from 'lucide-react';
import teamPhoto from '@/assets/team-photo.jpg';

const About = () => {
  const milestones = [
    { year: '2016', event: 'HopeBridge Founded', description: 'Started with a vision to transform communities through sustainable development' },
    { year: '2017', event: 'First School Built', description: 'Completed our first educational facility serving 200 children in rural Guatemala' },
    { year: '2019', event: 'Healthcare Initiative', description: 'Launched mobile health clinics reaching 10 remote communities' },
    { year: '2021', event: 'Environmental Program', description: 'Planted 50,000 trees and established 15 sustainable farming cooperatives' },
    { year: '2023', event: 'Global Expansion', description: 'Extended our reach to 12 countries across 3 continents' },
    { year: '2024', event: '15,000 Lives Touched', description: 'Reached major milestone of directly impacting 15,000+ individuals' },
  ];

  const coreValues = [
    {
      icon: Heart,
      title: 'Compassion',
      description: 'We lead with empathy and understanding, recognizing the dignity and potential in every person we serve.'
    },
    {
      icon: Users,
      title: 'Community',
      description: 'We believe sustainable change comes from within communities, working alongside local leaders and families.'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'We strive for the highest standards in everything we do, ensuring maximum impact with every resource.'
    },
    {
      icon: Target,
      title: 'Sustainability',
      description: 'We focus on long-term solutions that empower communities to thrive independently for generations to come.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 text-primary border-primary/30">
              Our Story
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6">
              Building Bridges to Hope
            </h1>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Founded in 2016, HopeBridge began with a simple belief: every person deserves the opportunity to thrive. 
              What started as a small initiative in one community has grown into a global movement for positive change.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20 bg-background">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6">
                Our Mission
              </h2>
              <p className="text-lg leading-relaxed text-muted-foreground mb-6">
                To create sustainable pathways out of poverty by providing education, healthcare, and economic opportunities 
                to underserved communities worldwide. We believe that by investing in people and partnering with local leaders, 
                we can build lasting change that spans generations.
              </p>
              <p className="text-lg leading-relaxed text-muted-foreground mb-8">
                Every project we undertake is designed with sustainability at its core, ensuring that communities can 
                continue to grow and prosper long after our initial intervention.
              </p>
              <Button variant="default" size="lg">
                Learn About Our Programs
              </Button>
            </div>
            <div className="relative">
              <img
                src={teamPhoto}
                alt="HopeBridge team and community members"
                className="rounded-lg shadow-strong w-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <p className="text-lg font-semibold">Our team with community leaders</p>
                <p className="text-white/80">Guatemala, 2024</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              These principles guide every decision we make and every action we take in our mission to transform lives.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreValues.map((value, index) => (
              <Card key={index} className="text-center bg-gradient-card shadow-medium hover:shadow-strong transition-all duration-300 group">
                <CardContent className="p-8">
                  <div className="flex justify-center mb-6">
                    <div className="p-4 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <value.icon className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold font-heading mb-4">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-background">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
              Our Journey
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From humble beginnings to global impact, here are the key milestones that have shaped our organization.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary/30"></div>
              
              {milestones.map((milestone, index) => (
                <div key={index} className="relative flex items-start mb-12">
                  {/* Timeline dot */}
                  <div className="absolute left-6 w-4 h-4 bg-primary rounded-full border-4 border-background"></div>
                  
                  {/* Content */}
                  <div className="ml-16">
                    <Card className="shadow-medium hover:shadow-strong transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                          <h3 className="text-xl font-bold font-heading">{milestone.event}</h3>
                          <Badge variant="secondary" className="mt-2 sm:mt-0 w-fit">
                            {milestone.year}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground leading-relaxed">
                          {milestone.description}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Founder's Note */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto max-w-7xl px-6">
          <Card className="max-w-4xl mx-auto shadow-strong">
            <CardContent className="p-12">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold font-heading mb-4">A Message from Our Founder</h2>
              </div>
              
              <div className="space-y-6 text-lg leading-relaxed">
                <p className="text-muted-foreground">
                  "When I first traveled to rural Guatemala in 2015, I witnessed both heartbreaking poverty and incredible resilience. 
                  I met families who had so little yet gave so much, children who walked hours to school, and communities that 
                  supported each other through the toughest challenges."
                </p>
                
                <p className="text-muted-foreground">
                  "That experience changed my life forever. I realized that sustainable change doesn't come from outsiders 
                  imposing solutions, but from partnerships built on trust, respect, and shared vision. HopeBridge was born 
                  from this understanding."
                </p>
                
                <p className="text-muted-foreground">
                  "Today, eight years later, I'm humbled by how far we've come together. Every school built, every life saved, 
                  every tree planted represents the power of collective action. But more importantly, it represents hope—hope 
                  that a better future is not just possible, but inevitable when we work together."
                </p>
              </div>
              
              <div className="mt-8 pt-8 border-t border-border">
                <div className="flex items-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                    <span className="text-xl font-bold text-primary">SM</span>
                  </div>
                  <div>
                    <p className="font-semibold text-lg">Sarah Martinez</p>
                    <p className="text-muted-foreground">Founder & Executive Director</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-impact text-white">
        <div className="container mx-auto max-w-7xl px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
            Join Our Story
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto text-white/90">
            Every great story needs many heroes. Become part of our journey and help us write the next chapter of hope and transformation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="default" size="xl" className="bg-primary hover:bg-primary/90">
              Support Our Mission
            </Button>
            <Button variant="outline" size="xl" className="text-white border-white hover:bg-white hover:text-secondary">
              Volunteer With Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;