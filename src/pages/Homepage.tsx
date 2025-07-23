import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import DonationForm from '@/components/Shared/DonationForm';
import ImpactCounter from '@/components/Shared/ImpactCounter';
import ProgramCard from '@/components/Shared/ProgramCard';
import useScrollAnimation from '@/hooks/useScrollAnimation';
import { ArrowRight, Heart, Users, Globe, CheckCircle } from 'lucide-react';
import heroImage from '@/assets/hero-image.jpg';
import educationImage from '@/assets/education-program.jpg';
import healthcareImage from '@/assets/healthcare-program.jpg';
import environmentImage from '@/assets/environment-program.jpg';

const Homepage = () => {
  // Scroll animations for each section
  const programsSection = useScrollAnimation();
  const testimonialsSection = useScrollAnimation();
  const newsletterSection = useScrollAnimation();
  const ctaSection = useScrollAnimation();

  const impactStats = [
    { number: 15000, label: 'Lives Transformed', suffix: '+' },
    { number: 127, label: 'Projects Completed' },
    { number: 45, label: 'Communities Served' },
    { number: 8, label: 'Years of Impact' },
  ];

  const featuredPrograms = [
    {
      title: 'Education for All',
      description: 'Providing quality education and learning resources to underserved communities, empowering children with knowledge and skills for a brighter future.',
      image: educationImage,
      category: 'Education',
      impact: '500+ Students',
    },
    {
      title: 'Healthcare Access',
      description: 'Delivering essential healthcare services and medical support to remote areas, ensuring everyone has access to basic health needs.',
      image: healthcareImage,
      category: 'Healthcare',
      impact: '2,000+ Patients',
    },
    {
      title: 'Environmental Action',
      description: 'Leading sustainable environmental initiatives that protect our planet while creating economic opportunities for local communities.',
      image: environmentImage,
      category: 'Environment',
      impact: '10,000+ Trees',
    },
  ];

  const testimonials = [
    {
      text: "HopeBridge transformed our entire community. My daughter now attends school every day, and our family has access to clean water for the first time.",
      author: "Maria Santos",
      location: "Guatemala"
    },
    {
      text: "The healthcare program saved my life. When I couldn't afford treatment, HopeBridge provided the medical care I needed completely free.",
      author: "James Okonkwo",
      location: "Nigeria"
    },
    {
      text: "Through the environmental program, we learned sustainable farming. Our crop yields increased by 300% while protecting our land.",
      author: "Priya Sharma",
      location: "India"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-hero"></div>
        
        <div className="relative z-10 container mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <div className="text-white space-y-8 animate-fade-in-up">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading leading-tight">
                Transforming Lives,
                <span className="block text-primary">One Act at a Time</span>
              </h1>
              <p className="text-xl md:text-2xl leading-relaxed text-white/90">
                Building bridges to hope, opportunity, and lasting change in communities around the world. 
                Together, we can create a future where everyone thrives.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="hero" size="xl" className="animate-scale-in">
                  Join Our Mission
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button variant="outline" size="xl" className="text-white border-white hover:bg-white hover:text-primary animate-scale-in">
                  Watch Our Story
                </Button>
              </div>
            </div>

            {/* Donation Form */}
            <div className="animate-slide-in-right">
              <DonationForm variant="hero" />
            </div>
          </div>
        </div>
      </section>

      {/* Impact Numbers */}
      <ImpactCounter stats={impactStats} />

      {/* Programs Preview */}
      <section ref={programsSection.ref} className="py-20 bg-background">
        <div className="container mx-auto max-w-7xl px-6">
          <div className={`text-center mb-16 transition-all duration-700 ${
            programsSection.isVisible 
              ? 'opacity-100 transform translate-y-0' 
              : 'opacity-0 transform translate-y-8'
          }`}>
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
              Our Core Programs
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive solutions addressing the most critical needs in education, healthcare, and environmental sustainability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPrograms.map((program, index) => (
              <div
                key={index}
                className={`transition-all duration-700 ${
                  programsSection.isVisible 
                    ? 'opacity-100 transform translate-y-0' 
                    : 'opacity-0 transform translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <ProgramCard
                  {...program}
                  variant={index === 0 ? 'featured' : 'default'}
                />
              </div>
            ))}
          </div>

          <div className={`text-center mt-12 transition-all duration-700 ${
            programsSection.isVisible 
              ? 'opacity-100 transform translate-y-0' 
              : 'opacity-0 transform translate-y-8'
          }`} style={{ transitionDelay: '450ms' }}>
            <Button variant="default" size="lg">
              View All Programs
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section ref={testimonialsSection.ref} className="py-20 bg-muted/30">
        <div className="container mx-auto max-w-7xl px-6">
          <div className={`text-center mb-16 transition-all duration-700 ${
            testimonialsSection.isVisible 
              ? 'opacity-100 transform translate-y-0' 
              : 'opacity-0 transform translate-y-8'
          }`}>
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
              Stories of Hope
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Real stories from real people whose lives have been transformed through our programs and your generous support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`transition-all duration-700 ${
                  testimonialsSection.isVisible 
                    ? 'opacity-100 transform translate-y-0 scale-100' 
                    : 'opacity-0 transform translate-y-8 scale-95'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <Card className="bg-gradient-card shadow-medium hover:shadow-strong transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="mb-6">
                      <Heart className="h-8 w-8 text-primary mb-4" />
                      <p className="text-lg leading-relaxed italic">
                        "{testimonial.text}"
                      </p>
                    </div>
                    <div className="border-t pt-4">
                      <p className="font-semibold">{testimonial.author}</p>
                      <p className="text-muted-foreground">{testimonial.location}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter & Social */}
      <section ref={newsletterSection.ref} className="py-20 bg-primary/5">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className={`transition-all duration-700 ${
              newsletterSection.isVisible 
                ? 'opacity-100 transform translate-x-0' 
                : 'opacity-0 transform -translate-x-8'
            }`}>
              <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
                Stay Connected
              </h2>
              <p className="text-xl text-muted-foreground mb-6">
                Get the latest updates on our programs, impact stories, and opportunities to get involved.
              </p>
              <div className="flex items-center space-x-4 text-muted-foreground">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span>Monthly impact reports</span>
              </div>
              <div className="flex items-center space-x-4 text-muted-foreground mt-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span>Volunteer opportunities</span>
              </div>
              <div className="flex items-center space-x-4 text-muted-foreground mt-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span>Exclusive donor updates</span>
              </div>
            </div>

            <div className={`transition-all duration-700 ${
              newsletterSection.isVisible 
                ? 'opacity-100 transform translate-x-0' 
                : 'opacity-0 transform translate-x-8'
            }`} style={{ transitionDelay: '300ms' }}>
              <Card className="shadow-medium">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-4">Join Our Community</h3>
                  <p className="text-muted-foreground mb-6">
                    Subscribe to our newsletter and be part of the change.
                  </p>
                  <div className="space-y-4">
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <Button variant="default" size="lg" className="w-full">
                      Subscribe Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section ref={ctaSection.ref} className="py-20 bg-gradient-impact text-white">
        <div className="container mx-auto max-w-7xl px-6 text-center">
          <div className={`transition-all duration-700 ${
            ctaSection.isVisible 
              ? 'opacity-100 transform translate-y-0 scale-100' 
              : 'opacity-0 transform translate-y-8 scale-95'
          }`}>
            <Globe className="h-16 w-16 mx-auto mb-6 text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
              Ready to Make a Difference?
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto text-white/90">
              Every action counts. Whether you donate, volunteer, or simply spread the word, 
              you're helping us build a better world for everyone.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="default" size="xl" className="bg-primary hover:bg-primary/90">
                Donate Today
              </Button>
              <Button variant="outline" size="xl" className="text-white border-white hover:bg-white hover:text-secondary">
                Become a Volunteer
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;