import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Mail, Lock, User, Phone, Eye, EyeOff, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input, Checkbox } from '@/components/ui/Form';
import { useAuthStore, useToastStore } from '@/store';
import { APP_CONFIG } from '@/constants';

export function RegisterPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login } = useAuthStore();
  const { addToast } = useToastStore();
  const preselectedRole = searchParams.get('role');
  const [role, setRole] = useState<'client' | 'creator'>(preselectedRole === 'creator' ? 'creator' : 'client');
  const [showPassword, setShowPassword] = useState(false);
  const [agree, setAgree] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agree) { addToast('Please accept the terms', 'error'); return; }
    setLoading(true);
    setTimeout(() => {
      login(form.email, role as any);
      addToast('Account created successfully!');
      navigate('/role-selection');
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 relative">
        <img src="https://images.pexels.com/photos/1589032/pexels-photo-1589032.jpeg" alt="Beach Wedding" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/80 to-primary/80" />
        <div className="relative flex flex-col justify-end p-12 text-white">
          <Link to="/" className="flex items-center gap-2 mb-8">
            <img src={APP_CONFIG.logo} alt="JustReel" className="h-10 w-10 rounded-lg" />
            <span className="text-2xl font-bold">JustReel</span>
          </Link>
          <h1 className="text-4xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            Join JustReel Today
          </h1>
          <p className="text-lg opacity-90 mb-8">
            {role === 'creator' ? 'Showcase your work, get bookings and grow your business.' : 'Find and book the perfect creator for your events.'}
          </p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6 bg-surface overflow-y-auto">
        <div className="w-full max-w-md py-8">
          <div className="lg:hidden mb-8">
            <Link to="/" className="flex items-center gap-2">
              <img src={APP_CONFIG.logo} alt="JustReel" className="h-10 w-10 rounded-lg" />
              <span className="text-2xl font-bold">JustReel</span>
            </Link>
          </div>

          <h2 className="text-2xl font-bold text-text-primary mb-2">Create Account</h2>
          <p className="text-text-secondary mb-6">Get started with JustReel in minutes.</p>

          <div className="grid grid-cols-2 gap-3 mb-6">
            {(['client', 'creator'] as const).map(r => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={`p-4 rounded-xl border-2 text-left transition-all ${role === r ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/40'}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-text-primary capitalize">{r}</span>
                  {role === r && <CheckCircle className="w-4 h-4 text-primary" />}
                </div>
                <p className="text-xs text-text-secondary">{r === 'client' ? 'Book creators for events' : 'List your services & get booked'}</p>
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input label="Full Name" placeholder="John Doe" value={form.name} onChange={e => setForm({...form, name: e.target.value})} icon={<User className="w-4 h-4" />} required />
            <Input label="Email Address" type="email" placeholder="you@example.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})} icon={<Mail className="w-4 h-4" />} required />
            <Input label="Phone Number" type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} icon={<Phone className="w-4 h-4" />} required />
            <div>
              <Input label="Password" type={showPassword ? 'text' : 'password'} placeholder="Create a strong password" value={form.password} onChange={e => setForm({...form, password: e.target.value})} icon={<Lock className="w-4 h-4" />} required />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-xs text-text-secondary hover:text-primary flex items-center gap-1 mt-1">
                {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                {showPassword ? 'Hide' : 'Show'} password
              </button>
            </div>

            <Checkbox label="I agree to the Terms of Service and Privacy Policy" checked={agree} onChange={setAgree} />

            <Button type="submit" size="lg" className="w-full" disabled={loading}>
              {loading ? 'Creating account...' : 'Create Account'} <ArrowRight className="w-4 h-4" />
            </Button>
          </form>

          <p className="text-center text-sm text-text-secondary mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-primary font-semibold hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
