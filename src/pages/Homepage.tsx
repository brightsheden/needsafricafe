import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import DonationForm from '@/components/Shared/DonationForm';
import ImpactCounter from '@/components/Shared/ImpactCounter';
import ProgramCard from '@/components/Shared/ProgramCard';
import useScrollAnimation from '@/hooks/useScrollAnimation';
import { ArrowRight, Heart, Users, Globe, CheckCircle } from 'lucide-react';
import heroImage from '@/assets/hero-image.jpg';
import educationImage from '@/assets/class.jpg';
import healthcareImage from '@/assets/health.jpg';
import environmentImage from '@/assets/comm.jpg';
import { Link } from 'react-router-dom';
import Logo from '@/assets/logo.png';
import { useCreateSubscription } from '@/api/subscription';
import { useToast } from '@/hooks/use-toast';
import ReCAPTCHA from "react-google-recaptcha";
import { CAPTCHA_KEY, API_URL } from '../../config';

import { Input } from '@/components/ui/input';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


const Homepage = () => {
  // Scroll animations for each section
  const programsSection = useScrollAnimation();
  const testimonialsSection = useScrollAnimation();
  const newsletterSection = useScrollAnimation();
  const ctaSection = useScrollAnimation();

  const { toast } = useToast();
  const createSubscription = useCreateSubscription();
  const [email, setEmail] = useState('');
  const [inlineError, setInlineError] = useState<string | null>(null);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setInlineError(null);

    // client-side validation
    const trimmed = email.trim();
    if (!trimmed) {
      setInlineError('Please enter your email address.');
      toast({ title: 'Error', description: 'Please enter your email address.', type: 'error' });
      return;
    }
    if (!emailRegex.test(trimmed)) {
      setInlineError('Please enter a valid email address.');
      toast({ title: 'Invalid email', description: 'Enter a valid email address.', type: 'error' });
      return;
    }
    if (!captchaToken) {
      setInlineError('Please complete the captcha.');
      toast({ title: 'Captcha required', description: 'Please complete the captcha.', type: 'error' });
      return;
    }
    try {
      await createSubscription.mutateAsync({ email: trimmed });
      toast({ title: 'Subscribed', description: 'Thanks — you have been subscribed!', type: 'success' });
      setEmail('');
      setCaptchaToken(null);

    } catch (err: any) {
      // try to read message from backend error shape
      const serverMessage =
        err?.response?.data?.message || err?.message || 'Subscription failed';

      // handle already exists specifically
      if (typeof serverMessage === 'string' && serverMessage.toLowerCase().includes('exists')) {
        setInlineError('This email is already subscribed.');
        toast({ title: 'Already subscribed', description: 'This email already exists.', type: 'error' });
      } else if (typeof serverMessage === 'string' && serverMessage.toLowerCase().includes('invalid')) {
        setInlineError('Invalid email address.');
        toast({ title: 'Invalid email', description: serverMessage, type: 'error' });
      } else {
        setInlineError('Could not subscribe. Please try again later.');
        toast({ title: 'Error', description: serverMessage, type: 'error' });
      }
      console.error('Subscribe error:', err);
    }
  };

  const featuredPrograms = [
    {
      title: 'Educational Equipment Distribution',
      description: ' Supplying schools with lab equipment, computers, and books.',
      image: educationImage,
      category: 'Education',
      impact: '500+ Students',
    },
    {
      title: 'Medical Equipment Distribution',
      description: ' Providing hospitals and labs with critical medical equipment and supplies',
      image: healthcareImage,
      category: 'Healthcare',
      impact: '2,000+ Patients',
    },
    {
      title: 'Volunteer and Community Engagement',
      description: 'Offering opportunities for individuals and organizations to participate in collection, sorting, and advocacy.',
      image: environmentImage,
      category: 'Volunteer',
      impact: '10,000+ Trees',
    },
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
                NeedsAfrica
               
              </h1>
              <p className="text-xl md:text-2xl leading-relaxed text-white/90">
                Connecting Donors with Schools and Hospitals in Africa
 Join us in bridging the gap with educational and medical equipment for Africa.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/donate">
                  <Button variant="hero" size="xl" className="animate-scale-in">
                  Join Our Mission
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                </Link>
              
               
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
      {/* <ImpactCounter stats={impactStats} /> */}

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
            <Link to="/projects">
              <Button variant="default" size="lg">
                View All Programs
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
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

                  <form onSubmit={handleSubmit} className="space-y-2">
              <Input
                type="email"
                placeholder="Enter your email"
              className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-label="newsletter-email"
              />
              {inlineError && <p className="text-sm text-red-400">{inlineError}</p>}
        <div className="mt-2">
          <ReCAPTCHA
            sitekey={CAPTCHA_KEY}
            onChange={(token) => setCaptchaToken(token)}
            onExpired={() => setCaptchaToken(null)}
          />
        </div>
                    <Button variant="default" size="lg" className="w-full">
                      Subscribe Now
                    </Button>
                    </form>
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
              <Link to="/donate">
                <Button variant="default" size="xl" className="bg-primary hover:bg-primary/90">
                  Donate Today
                </Button>
              </Link>
              <Link to="/volunteer">
                <Button variant="outline" size="xl" className="text-primary border-white hover:bg-white hover:text-secondary">
                  Become a Volunteer
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;