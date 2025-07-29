import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { MapPin, Phone, Mail, User, UserCheck, Users } from 'lucide-react';
import useScrollAnimation from '@/hooks/useScrollAnimation';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const heroRef = useScrollAnimation();
  const formRef = useScrollAnimation();
  const infoRef = useScrollAnimation();
  const teamRef = useScrollAnimation();
  const faqRef = useScrollAnimation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
    // Reset form
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const teamContacts = [
    {
      name: 'Sarah Johnson',
      role: 'Project Lead',
      email: 'sarah@ngowebsite.org',
      icon: UserCheck
    },
    {
      name: 'Michael Chen',
      role: 'Volunteer Coordinator',
      email: 'michael@ngowebsite.org',
      icon: Users
    },
    {
      name: 'Aisha Okonkwo',
      role: 'Community Outreach',
      email: 'aisha@ngowebsite.org',
      icon: User
    }
  ];

  const faqs = [
    {
      question: 'How can I make a donation?',
      answer: 'You can donate through our secure online donation form, bank transfer, or mobile money. Visit our Donate page for more options.'
    },
    {
      question: 'Can I volunteer with your organization?',
      answer: 'Yes! We welcome volunteers. You can apply through our website or contact our Volunteer Coordinator. We have opportunities for all skill levels.'
    },
    {
      question: 'How do you ensure transparency with donations?',
      answer: 'We publish annual reports, project updates, and financial statements. All donors receive regular updates on how their contributions are being used.'
    },
    {
      question: 'Do you partner with other organizations?',
      answer: 'Absolutely! We collaborate with local NGOs, government agencies, and international organizations to maximize our impact.'
    },
    {
      question: 'How can my company get involved?',
      answer: 'We offer various corporate partnership opportunities including sponsorships, employee volunteer programs, and CSR initiatives. Contact us to discuss options.'
    }
  ];

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
            Get in Touch
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
            Have questions? Want to partner with us? We'd love to hear from you. 
            Together, we can create lasting change.
          </p>
        </div>
      </section>

      <div className="container mx-auto max-w-7xl px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div 
            ref={formRef.ref}
            className={`transition-all duration-1000 delay-200 ${
              formRef.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}
          >
            <Card className="shadow-strong">
              <CardHeader>
                <CardTitle className="text-2xl font-serif">Send us a Message</CardTitle>
                <p className="text-muted-foreground">
                  We'll get back to you within 24 hours
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Name *</Label>
                      <Input
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      required
                      value={formData.subject}
                      onChange={(e) => handleInputChange('subject', e.target.value)}
                      placeholder="What is this regarding?"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      placeholder="Tell us more about your inquiry..."
                    />
                  </div>

                  <Button 
                    type="submit" 
                    variant="default" 
                    size="lg" 
                    className="w-full"
                  >
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div 
              ref={infoRef.ref}
              className={`transition-all duration-1000 delay-400 ${
                infoRef.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
              }`}
            >
              <Card className="shadow-medium">
                <CardHeader>
                  <CardTitle className="text-2xl font-serif">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start gap-4">
                    <MapPin className="h-6 w-6 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold">Office Address</h3>
                      <p className="text-muted-foreground">
                        123 Hope Street, Unity District<br />
                        Lagos, Nigeria 100001
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Phone className="h-6 w-6 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold">Phone Number</h3>
                      <p className="text-muted-foreground">+234 (0) 123 456 7890</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Mail className="h-6 w-6 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold">Email Address</h3>
                      <p className="text-muted-foreground">hello@ngowebsite.org</p>
                    </div>
                  </div>

                  {/* Simple map placeholder */}
                  <div className="mt-6 bg-muted rounded-lg h-48 flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      <MapPin className="h-12 w-12 mx-auto mb-2" />
                      <p>Interactive Map Coming Soon</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Team Contacts */}
            <div 
              ref={teamRef.ref}
              className={`transition-all duration-1000 delay-600 ${
                teamRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <h2 className="text-2xl font-bold font-serif mb-6">Direct Team Contact</h2>
              <div className="space-y-4">
                {teamContacts.map((contact, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <contact.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{contact.name}</h3>
                        <p className="text-sm text-muted-foreground">{contact.role}</p>
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <a href={`mailto:${contact.email}`}>Contact</a>
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div 
          ref={faqRef.ref}
          className={`mt-16 transition-all duration-1000 delay-800 ${
            faqRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-3xl font-bold font-serif text-center mb-12">
            Frequently Asked Questions
          </h2>
          
          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-6">
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;