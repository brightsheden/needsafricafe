import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Heart, Shield, Users, Award, CreditCard, Smartphone, Building } from 'lucide-react';
import useScrollAnimation from '@/hooks/useScrollAnimation';
import DonationForm from '@/components/Shared/DonationForm';

const Donate = () => {
  const [amount, setAmount] = useState('');
  const [frequency, setFrequency] = useState('one-time');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '' });

  const heroRef = useScrollAnimation();
  const formRef = useScrollAnimation();
  const impactRef = useScrollAnimation();
  const trustRef = useScrollAnimation();

  const presetAmounts = ['1000', '5000', '10000'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Donation submitted:', { amount, frequency, paymentMethod, formData });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section 
        ref={heroRef.ref}
        className={`bg-gradient-to-r from-primary to-secondary text-white py-20 transition-all duration-1000 ${
          heroRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="container mx-auto max-w-7xl px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold font-serif mb-6">
            Give Hope. Make a Difference Today.
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
            Every donation creates ripples of positive change in communities that need it most. 
            Join thousands of compassionate donors making lasting impact.
          </p>
          
        </div>
      </section>

      <div className="container mx-auto max-w-7xl px-6 py-16">
        <div className="flex justify-center items-center">
          {/* Donation Form */}
          <DonationForm/>

       
      


        </div>
      </div>
    </div>
  );
};

export default Donate;