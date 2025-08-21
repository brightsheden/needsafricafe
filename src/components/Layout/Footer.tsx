import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from '@/assets/logo.png';
import { useCreateSubscription } from '@/api/subscription';
import { useToast } from '@/hooks/use-toast';
import ReCAPTCHA from "react-google-recaptcha";
import { CAPTCHA_KEY, API_URL } from '../../../config';


const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Footer: React.FC = () => {
  const { toast } = useToast();
  const createSubscription = useCreateSubscription();
  const [email, setEmail] = useState('');
  const [inlineError, setInlineError] = useState<string | null>(null);
  const [captcha2Token, setCaptcha2Token] = useState<string | null>(null);

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
    if (!captcha2Token) {
      setInlineError('Please complete the captcha.');
      toast({ title: 'Captcha required', description: 'Please complete the captcha.', type: 'error' });
      return;
    }
    try {
      await createSubscription.mutateAsync({ email: trimmed });
      toast({ title: 'Subscribed', description: 'Thanks — you have been subscribed!', type: 'success' });
      setEmail('');
      setCaptcha2Token(null);

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

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <img src={Logo} alt="NeedsAfrica logo" className="w-full h-full" />
            </Link>
            <p className="text-white/90 mb-6 leading-relaxed">
              Connecting Donors with Schools and Hospitals in Africa
              Join us in bridging the gap with educational and medical equipment for Africa.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="text-white/80 hover:text-white hover:bg-white/10" aria-label="facebook">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-white/80 hover:text-white hover:bg-white/10" aria-label="twitter">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-white/80 hover:text-white hover:bg-white/10" aria-label="instagram">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-white/80 hover:text-white hover:bg-white/10" aria-label="linkedin">
                <Linkedin className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { name: 'About Us', href: '/about' },
                { name: 'Our Mission', href: '/mission' },
                { name: 'Projects', href: '/projects' },
              ].map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-white/80 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-white/80">12645 Memorial Dr Suite F1 #634 Houston, TX 77024</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-primary" />
                <span className="text-white/80">919-699-4012, 832-495-5157</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-primary" />
                <span className="text-white/80"> info@needsafrica.org</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Stay Updated</h3>
            <p className="text-white/80 mb-4">
              Subscribe to our newsletter for the latest updates and impact stories.
            </p>
            <form onSubmit={handleSubmit} className="space-y-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-label="newsletter-email"
              />
              {inlineError && <p className="text-sm text-red-400">{inlineError}</p>}
                      <div className="mt-2">
          <ReCAPTCHA
            sitekey={CAPTCHA_KEY}
            onChange={(token) => setCaptcha2Token(token)}
            onExpired={() => setCaptcha2Token(null)}
          />
        </div>
              <Button
                type="submit"
                variant="default"
                className="w-full bg-primary hover:bg-primary/90"
                disabled={createSubscription.isLoading}
              >
                {createSubscription.isLoading ? 'Subscribing...' : 'Subscribe'}
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/80 text-sm">© 2025 NeedsAfrica. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="text-white/80 hover:text-white text-sm transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="text-white/80 hover:text-white text-sm transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
