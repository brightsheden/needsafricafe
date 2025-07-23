import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart } from 'lucide-react';

const DonationForm = ({ variant = "default" }: { variant?: "default" | "hero" }) => {
  const [amount, setAmount] = useState('');
  const [frequency, setFrequency] = useState('once');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  const predefinedAmounts = ['25', '50', '100', '250'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle donation submission
    console.log('Donation submitted:', { ...formData, amount, frequency });
  };

  const cardClass = variant === "hero" 
    ? "bg-white/95 backdrop-blur-sm border-white/20 shadow-strong" 
    : "bg-card shadow-medium";

  return (
    <Card className={cardClass}>
      <CardHeader className="text-center">
        <div className="flex justify-center mb-2">
          <Heart className="h-8 w-8 text-primary" />
        </div>
        <CardTitle className="text-2xl font-bold">Make a Donation</CardTitle>
        <p className="text-muted-foreground">
          Your support transforms lives and builds stronger communities
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Frequency Selection */}
          <div>
            <Label className="text-base font-semibold">Donation Frequency</Label>
            <div className="flex rounded-lg bg-muted p-1 mt-2">
              <button
                type="button"
                onClick={() => setFrequency('once')}
                className={`flex-1 rounded-md py-2 text-sm font-medium transition-all ${
                  frequency === 'once'
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                One-time
              </button>
              <button
                type="button"
                onClick={() => setFrequency('monthly')}
                className={`flex-1 rounded-md py-2 text-sm font-medium transition-all ${
                  frequency === 'monthly'
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Monthly
              </button>
            </div>
          </div>

          {/* Amount Selection */}
          <div>
            <Label className="text-base font-semibold">Amount</Label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {predefinedAmounts.map((presetAmount) => (
                <button
                  key={presetAmount}
                  type="button"
                  onClick={() => setAmount(presetAmount)}
                  className={`py-3 px-4 rounded-lg border-2 font-medium transition-all ${
                    amount === presetAmount
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  ${presetAmount}
                </button>
              ))}
            </div>
            <div className="mt-3">
              <Input
                type="number"
                placeholder="Enter custom amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="text-center font-semibold text-lg"
              />
            </div>
          </div>

          {/* Personal Information */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter your full name"
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <Button 
            type="submit" 
            variant="donate" 
            size="lg" 
            className="w-full"
            disabled={!amount || !formData.name || !formData.email}
          >
            Donate ${amount} {frequency === 'monthly' ? '/month' : 'now'}
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            Your donation is secure and tax-deductible. You will receive a receipt via email.
          </p>
        </form>
      </CardContent>
    </Card>
  );
};

export default DonationForm;