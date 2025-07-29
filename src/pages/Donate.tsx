import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Heart, Shield, Users, Award, CreditCard, Smartphone, Building } from 'lucide-react';
import useScrollAnimation from '@/hooks/useScrollAnimation';

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
          <Button variant="hero" size="xl" className="bg-white text-primary hover:bg-white/90">
            <Heart className="mr-2 h-5 w-5" />
            Donate Now
          </Button>
        </div>
      </section>

      <div className="container mx-auto max-w-7xl px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Donation Form */}
          <div 
            ref={formRef.ref}
            className={`transition-all duration-1000 delay-200 ${
              formRef.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}
          >
            <Card className="shadow-strong">
              <CardHeader>
                <CardTitle className="text-2xl font-serif">Make Your Donation</CardTitle>
                <p className="text-muted-foreground">
                  Your generosity fuels our mission to transform lives
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Info */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Name (Optional)</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  {/* Donation Amount */}
                  <div>
                    <Label>Donation Amount</Label>
                    <div className="grid grid-cols-3 gap-2 mt-2">
                      {presetAmounts.map((preset) => (
                        <Button
                          key={preset}
                          type="button"
                          variant={amount === preset ? "default" : "outline"}
                          onClick={() => setAmount(preset)}
                          className="h-12"
                        >
                          ₦{parseInt(preset).toLocaleString()}
                        </Button>
                      ))}
                    </div>
                    <Input
                      className="mt-2"
                      type="number"
                      placeholder="Custom amount"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </div>

                  {/* Frequency */}
                  <div>
                    <Label>Donation Frequency</Label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <Button
                        type="button"
                        variant={frequency === 'one-time' ? "default" : "outline"}
                        onClick={() => setFrequency('one-time')}
                      >
                        One-time
                      </Button>
                      <Button
                        type="button"
                        variant={frequency === 'monthly' ? "default" : "outline"}
                        onClick={() => setFrequency('monthly')}
                      >
                        Monthly
                      </Button>
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div>
                    <Label>Payment Method</Label>
                    <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose payment method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="card">
                          <div className="flex items-center">
                            <CreditCard className="mr-2 h-4 w-4" />
                            Credit/Debit Card
                          </div>
                        </SelectItem>
                        <SelectItem value="transfer">
                          <div className="flex items-center">
                            <Building className="mr-2 h-4 w-4" />
                            Bank Transfer
                          </div>
                        </SelectItem>
                        <SelectItem value="ussd">
                          <div className="flex items-center">
                            <Smartphone className="mr-2 h-4 w-4" />
                            USSD
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button 
                    type="submit" 
                    variant="donate" 
                    size="lg" 
                    className="w-full"
                    disabled={!amount || !paymentMethod || !formData.email}
                  >
                    <Heart className="mr-2 h-5 w-5" />
                    Support Now - {amount ? `₦${parseInt(amount).toLocaleString()}` : '₦0'} 
                    {frequency === 'monthly' ? '/month' : ''}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Impact Stats */}
          <div className="space-y-8">
            <div 
              ref={impactRef.ref}
              className={`transition-all duration-1000 delay-400 ${
                impactRef.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
              }`}
            >
              <h2 className="text-3xl font-bold font-serif mb-6">Your Donations Help Us...</h2>
              
              <div className="grid gap-6">
                <Card className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Users className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">15,000+</h3>
                      <p className="text-muted-foreground">Lives Transformed</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-secondary/10 p-3 rounded-full">
                      <Award className="h-8 w-8 text-secondary" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">89</h3>
                      <p className="text-muted-foreground">Projects Completed</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-accent/10 p-3 rounded-full">
                      <Heart className="h-8 w-8 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">₦2.5M</h3>
                      <p className="text-muted-foreground">Funds Raised This Year</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            {/* Trust Elements */}
            <div 
              ref={trustRef.ref}
              className={`transition-all duration-1000 delay-600 ${
                trustRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">Secure & Trusted</h3>
                <div className="flex items-center gap-4 mb-4">
                  <Shield className="h-6 w-6 text-secondary" />
                  <span className="text-sm">SSL Encrypted Payments</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">256-bit Security</Badge>
                  <Badge variant="outline">PCI Compliant</Badge>
                  <Badge variant="outline">Bank Grade Security</Badge>
                </div>
                
                <div className="mt-6 p-4 bg-muted rounded-lg">
                  <p className="text-sm italic">
                    "Thanks to donors like you, my children now have access to clean water and education. 
                    Your generosity has changed our entire community."
                  </p>
                  <p className="text-sm font-medium mt-2">- Amina, Beneficiary Mother</p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Donate;