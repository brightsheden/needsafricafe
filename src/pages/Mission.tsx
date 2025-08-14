import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {  
  Globe,
  Target
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Mission = () => {

  const navigate = useNavigate();
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
            To improve education and healthcare in Africa by redirecting underutilized resources in developed countries to communities that need them most.
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
                  
We envision a future where surplus equipment in one part of the world becomes a lifeline for learning and healing in another—creating opportunity, equity, and dignity for all.


                </p>
              </div>
              
             
            </CardContent>
          </Card>
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

export default Mission;