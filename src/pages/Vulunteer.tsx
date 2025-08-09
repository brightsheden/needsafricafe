import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { MapPin, Phone, Mail } from 'lucide-react';
import useScrollAnimation from '@/hooks/useScrollAnimation';

const Volunteer = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    country: '',
    role: '',
    type: '',
    hours: '',
    days: '',
    cv: null as File | null,
  });

  const heroRef = useScrollAnimation();
  const formRef = useScrollAnimation();
  const infoRef = useScrollAnimation();
  const faqRef = useScrollAnimation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Volunteer form submitted:', formData);
    // reset form
    setFormData({
      firstName: '',
      lastName: '',
      age: '',
      country: '',
      role: '',
      type: '',
      hours: '',
      days: '',
      cv: null,
    });
  };

  const handleChange = (field: string, value: string | File | null) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const faqs = [
    {
      question: 'Do I need experience to volunteer?',
      answer: 'Not always. Some roles require experience, but many are open to all willing participants with training provided.'
    },
    {
      question: 'Can I volunteer remotely?',
      answer: 'Yes, certain roles can be performed remotely depending on your skills and availability.'
    },
    {
      question: 'Is there a minimum age to volunteer?',
      answer: 'Most roles require volunteers to be at least 18 years old. Some opportunities may accept younger volunteers with parental consent.'
    },
    {
      question: 'Will I receive any certification?',
      answer: 'Yes, upon completion of your volunteer service, you will receive a certificate of recognition.'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section
        ref={heroRef.ref}
        className={`bg-gradient-to-r from-primary to-secondary text-white py-20 transition-all duration-1000 ${
          heroRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="container mx-auto max-w-7xl px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold font-serif mb-6">
            Become a Volunteer
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
            Join our mission to make a difference. Fill out the form below to apply for a volunteer position with our organization.
          </p>
        </div>
      </section>

      {/* Main content */}
      <div className="container mx-auto max-w-7xl px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Volunteer Form */}
          <div
            ref={formRef.ref}
            className={`transition-all duration-1000 delay-200 ${
              formRef.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}
          >
            <Card className="shadow-strong">
              <CardHeader>
                <CardTitle className="text-2xl font-serif">Volunteer Application Form</CardTitle>
                <p className="text-muted-foreground">We’ll get back to you within 5 business days</p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label>First Name *</Label>
                      <Input
                        value={formData.firstName}
                        required
                        onChange={(e) => handleChange('firstName', e.target.value)}
                        placeholder="Your first name"
                      />
                    </div>
                    <div>
                      <Label>Last Name *</Label>
                      <Input
                        value={formData.lastName}
                        required
                        onChange={(e) => handleChange('lastName', e.target.value)}
                        placeholder="Your last name"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label>Age *</Label>
                      <Input
                        type="number"
                        min="16"
                        required
                        value={formData.age}
                        onChange={(e) => handleChange('age', e.target.value)}
                        placeholder="Your age"
                      />
                    </div>
                    <div>
                      <Label>Country *</Label>
                      <Input
                        required
                        value={formData.country}
                        onChange={(e) => handleChange('country', e.target.value)}
                        placeholder="Country of residence"
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Volunteer Role *</Label>
                    <Select
                      onValueChange={(value) => handleChange('role', value)}
                      value={formData.role}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="computer-tech">Computer Tech</SelectItem>
                        <SelectItem value="lab-tech">Laboratory Tech</SelectItem>
                        <SelectItem value="medical-tech">Medical Equipment Tech</SelectItem>
                        <SelectItem value="others">Others</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Volunteer Type *</Label>
                    <Select
                      onValueChange={(value) => handleChange('type', value)}
                      value={formData.type}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="full-time">Full Time</SelectItem>
                        <SelectItem value="part-time">Part Time</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {formData.type === 'part-time' && (
                    <>
                      <div>
                        <Label>Part Time Hours</Label>
                        <Input
                          type="text"
                          value={formData.hours}
                          onChange={(e) => handleChange('hours', e.target.value)}
                          placeholder="e.g. 4 hours/day"
                        />
                      </div>
                      <div>
                        <Label>Part Time Days</Label>
                        <Input
                          type="text"
                          value={formData.days}
                          onChange={(e) => handleChange('days', e.target.value)}
                          placeholder="e.g. Monday, Wednesday, Friday"
                        />
                      </div>
                    </>
                  )}

                  <div>
                    <Label>Attach Your CV/Resume *</Label>
                    <Input
                      type="file"
                      required
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => handleChange('cv', e.target.files ? e.target.files[0] : null)}
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full">
                    Submit Application
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Info card */}
          <div
            ref={infoRef.ref}
            className={`transition-all duration-1000 delay-400 ${
              infoRef.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}
          >
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle className="text-2xl font-serif">Volunteer Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Office Address</h3>
                    <p className="text-muted-foreground">
                      12645 Memorial Dr Suite F1 <br /> #634 Houston, TX 77024
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Phone Number</h3>
                    <p className="text-muted-foreground">919-699-4012, 832-495-5157</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Mail className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Email Address</h3>
                    <p className="text-muted-foreground">info@needsafrica.org</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ */}
        <div
          ref={faqRef.ref}
          className={`mt-16 transition-all duration-1000 delay-800 ${
            faqRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-3xl font-bold font-serif text-center mb-12">Volunteer FAQs</h2>
          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-6">
                  <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Volunteer;
