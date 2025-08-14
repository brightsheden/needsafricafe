import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Heart, Award, Target } from 'lucide-react';
import aboutPhoto from '@/assets/freepik.jpg'
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();
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
      title: 'Equity & Dignity',
      description: 'We believe access to education and healthcare is a basic right—not a privilege. We serve with compassion and respect, ensuring every community we support is treated with dignity.'
    },
    {
      icon: Target,
      title: 'Sustainability & Stewardship',
      description: 'We maximize the life and impact of valuable resources, reducing waste and acting as responsible stewards of every donation entrusted to us.'
    },
    {
      icon: Award,
      title: 'Integrity & Accountability',
      description: 'We are transparent, ethical, and accountable in all we do—ensuring every donation reaches its intended impact with measurable results.'
    },
    {
      icon: Users,
      title: 'Collaboration & Innovation',
      description: 'We build smart partnerships and apply creative solutions to connect needs with surplus—bridging gaps through technology, logistics, and teamwork.'
    }
  ];
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 text-primary border-primary/30">
              Our About Us
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6">
              Building Bridges to Hope
            </h1>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
               NeedsAfrica is a Texas-based nonprofit dedicated to collecting used educational and medical equipment from donors and delivering them to requesting schools, laboratories, and hospitals across Africa. We believe in practical, sustainable action to address equipment shortages and improve education and healthcare.
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
                About Us
              </h2>
              <p className="text-lg leading-relaxed text-muted-foreground mb-6">
              NeedsAfrica is a Texas-based nonprofit dedicated to collecting used educational and medical equipment from donors and delivering them to requesting schools, laboratories, and hospitals across Africa. We believe in practical, sustainable action to address equipment shortages and improve education and healthcare.
              </p>
             
            </div>
            <div className="relative">
              <img
                src={aboutPhoto}
                alt="HopeBridge team and community members"
                className="rounded-lg shadow-strong w-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <p className="text-lg font-semibold">NeedsAfrica</p>
                <p className="text-white/80">Texas, 2024</p>
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

      
   

      {/* Call to Action */}
    <section className="py-20 bg-gradient-impact text-white">
      <div className="container mx-auto max-w-7xl px-6 text-center">
        <Target className="h-16 w-16 mx-auto mb-6 text-primary" />
        <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
          Support a Project Today
        </h2>
        <p className="text-xl mb-8 max-w-3xl mx-auto text-white/90">
          Choose a project that resonates with your values and make a direct impact on the lives
          of people who need it most. Every contribution, no matter the size, creates lasting change.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="default"
            size="xl"
            className="bg-primary hover:bg-primary/90"
            onClick={() => navigate('/donate')}
          >
            Donate Now
          </Button>
          <Button
            variant="outline"
            size="xl"
            className="text-primary border-white hover:bg-white hover:text-secondary"
            onClick={() => navigate('/volunteer')}
          >
            Become a Monthly Supporter
          </Button>
        </div>
      </div>
    </section>

    </div>
  );
};

export default About;