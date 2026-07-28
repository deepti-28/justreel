import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Phone, Apple, Chrome, MessageCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Form';
import { Checkbox } from '@/components/ui/Form';
import { useAuthStore, useToastStore } from '@/store';
import { APP_CONFIG } from '@/constants';

export function LoginPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login } = useAuthStore();
  const { addToast } = useToastStore();
  const [mode, setMode] = useState<'email' | 'phone'>('email');
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const role = email === 'creator@justreel.com' ? 'creator' : email === 'admin@justreel.com' ? 'admin' : 'client';
      login(email || 'client@justreel.com', role as any);
      addToast('Welcome back to JustReel!');
      const redirect = searchParams.get('redirect');
      if (redirect) {
        navigate(redirect);
      } else if (role === 'creator') {
        navigate('/dashboard/creator');
      } else if (role === 'admin') {
        navigate('/dashboard/admin');
      } else {
        navigate('/dashboard/client');
      }
      setLoading(false);
    }, 800);
  };

  const handleSocial = (provider: string) => {
    setLoading(true);
    setTimeout(() => {
      login(`user@${provider}.com`, 'client');
      addToast(`Signed in with ${provider}!`);
      navigate('/role-selection');
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <img src="https://images.pexels.com/photos/1589032/pexels-photo-1589032.jpeg" alt="Beach Wedding" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/80 to-secondary/80" />
        <div className="relative flex flex-col justify-end p-12 text-white">
          <Link to="/" className="flex items-center gap-2 mb-8">
            <img src={APP_CONFIG.logo} alt="JustReel" className="h-10 w-10 rounded-lg" />
            <span className="text-2xl font-bold">JustReel</span>
          </Link>
          <h1 className="text-4xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            Welcome Back to JustReel
          </h1>
          <p className="text-lg opacity-90 mb-8">
            Book the perfect filmmaker for your wedding, event or celebration.
          </p>
          <div className="space-y-3">
            {['5,200+ verified creators', '48,000+ events covered', 'AI-powered matching'].map(item => (
              <div key={item} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs">✓</div>
                <span className="text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right - Form */}
      <div className="flex-1 flex items-center justify-center p-6 bg-surface">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8">
            <Link to="/" className="flex items-center gap-2">
              <img src={APP_CONFIG.logo} alt="JustReel" className="h-10 w-10 rounded-lg" />
              <span className="text-2xl font-bold">JustReel</span>
            </Link>
          </div>

          <h2 className="text-2xl font-bold text-text-primary mb-2">Sign In</h2>
          <p className="text-text-secondary mb-6">Welcome back! Please enter your details.</p>

          <div className="flex gap-2 p-1 bg-white rounded-xl border border-border mb-6">
            <button
              onClick={() => setMode('email')}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${mode === 'email' ? 'bg-brand-gradient text-white' : 'text-text-secondary'}`}
            >
              Email
            </button>
            <button
              onClick={() => setMode('phone')}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${mode === 'phone' ? 'bg-brand-gradient text-white' : 'text-text-secondary'}`}
            >
              Phone
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'email' ? (
              <Input
                label="Email Address"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                icon={<Mail className="w-4 h-4" />}
                required
              />
            ) : (
              <>
                <Input
                  label="Phone Number"
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  icon={<Phone className="w-4 h-4" />}
                  required
                />
                <Button type="button" variant="outline" className="w-full" onClick={() => addToast('OTP sent via WhatsApp!')}>
                  <MessageCircle className="w-4 h-4" /> Send WhatsApp OTP
                </Button>
              </>
            )}

            <Input
              label="Password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={<Lock className="w-4 h-4" />}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-xs text-text-secondary hover:text-primary flex items-center gap-1"
            >
              {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              {showPassword ? 'Hide' : 'Show'} password
            </button>

            <div className="flex items-center justify-between">
              <Checkbox label="Remember me" checked={remember} onChange={setRemember} />
              <Link to="/forgot-password" className="text-sm text-primary hover:underline">Forgot password?</Link>
            </div>

            <Button type="submit" size="lg" className="w-full" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'} <ArrowRight className="w-4 h-4" />
            </Button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-text-secondary">OR CONTINUE WITH</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <button onClick={() => handleSocial('google')} className="flex items-center justify-center py-2.5 border border-border rounded-xl hover:border-primary hover:bg-surface transition-all">
              <Chrome className="w-5 h-5 text-text-secondary" />
            </button>
            <button onClick={() => handleSocial('apple')} className="flex items-center justify-center py-2.5 border border-border rounded-xl hover:border-primary hover:bg-surface transition-all">
              <Apple className="w-5 h-5 text-text-secondary" />
            </button>
            <button onClick={() => handleSocial('whatsapp')} className="flex items-center justify-center py-2.5 border border-border rounded-xl hover:border-primary hover:bg-surface transition-all">
              <MessageCircle className="w-5 h-5 text-green-500" />
            </button>
          </div>

          <p className="text-center text-sm text-text-secondary mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="text-primary font-semibold hover:underline">Sign up free</Link>
          </p>

          <div className="mt-6 p-3 bg-primary/5 rounded-xl border border-primary/10 text-xs text-text-secondary text-center">
            <span className="font-semibold text-primary">Demo:</span> Use creator@justreel.com for creator, admin@justreel.com for admin
          </div>
        </div>
      </div>
    </div>
  );
}
