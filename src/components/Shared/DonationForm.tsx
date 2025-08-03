import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart } from 'lucide-react';
import { useDonate } from '@/api/donation';

type DonationFormProps = {
  variant?: "default" | "hero";
  projectId?: string;
};

const DonationForm = ({ variant = "default", projectId }: DonationFormProps) => {
  const [amount, setAmount] = useState('');
  const [currency,setCurrency] = useState("NGN")
  const [paymentClient, setPaymentClient] = useState("PAYSTACK")
  const [frequency, setFrequency] = useState('ONCE');
  const {mutate:donate, isLoading, isPending, isSuccess, isError,error, data} = useDonate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  console.log(projectId, "project id")

  const predefinedAmounts = ['25', '50', '100', '250'];

  const handleCurrencyChange = (value: string) => {
    setCurrency(value);
  
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const data ={
      "donor_email":formData.email,
      "donor_full_name":formData.name,
      "amount":amount,
      "currency":currency,
      "payment_client":paymentClient,
      "frequency":frequency
    }
    if (projectId){
      data["project_id"] = projectId
    }

    donate(data)
    
  };

  useEffect(()=>{
    if(isSuccess){
      window.location.href=data.checkout_url
    }

    if (currency === "USD"){
      setPaymentClient("PAYPAL")
    }
    else if (currency === "NGN"){
      setPaymentClient("PAYSTACK")
   }

    console.log(paymentClient)
    console.log(currency)
  },[isSuccess,currency])

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

          {/*CURRENCY*/}
          <div>
            <Label className="text-base font-semibold">Currency</Label>
            <div className='flex rounded-lg bg-muted p-1 mt-2'>
               <button
                type="button"
                onClick={() => handleCurrencyChange('USD')}
                className={`flex-1 rounded-md py-2 text-sm font-medium transition-all ${
                  currency === 'USD'
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                USD
              </button>
              <button
                type="button"
                onClick={() => handleCurrencyChange('NGN')}
                className={`flex-1 rounded-md py-2 text-sm font-medium transition-all ${
                  currency === 'NGN'
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                NGN
              </button>

            </div>
          </div>
          {/* Frequency Selection */}
          <div>
            <Label className="text-base font-semibold">Donation Frequency</Label>
            <div className="flex rounded-lg bg-muted p-1 mt-2">
              <button
                type="button"
                onClick={() => setFrequency('ONCE')}
                className={`flex-1 rounded-md py-2 text-sm font-medium transition-all ${
                  frequency === 'ONCE'
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                One-time
              </button>
              <button
                type="button"
                onClick={() => setFrequency('MONTHLY')}
                className={`flex-1 rounded-md py-2 text-sm font-medium transition-all ${
                  frequency === 'MONTHLY'
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
                  {currency === "USD" ? `$${presetAmount}` : `₦${presetAmount}`}
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
          {isPending? (
            <Button 
              type="submit" 
              variant="donate" 
              size="lg" 
              className="w-full"
              
            >
              Loading..
            </Button>
          ) : (
            <Button 
              type="submit" 
              variant="donate" 
              size="lg" 
              className="w-full"
              disabled={!amount || !formData.name || !formData.email}
            >
              Donate {currency} {amount} {frequency === 'monthly' ? '/month' : 'now'}
            </Button>
          )}

          <p className="text-xs text-muted-foreground text-center">
            Your donation is secure and tax-deductible. You will receive a receipt via email.
          </p>
        </form>
      </CardContent>
    </Card>
  );
};

export default DonationForm;