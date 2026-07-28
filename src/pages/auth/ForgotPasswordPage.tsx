import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Form';
import { useToastStore } from '@/store';
import { APP_CONFIG } from '@/constants';

export function ForgotPasswordPage() {
  const { addToast } = useToastStore();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setSent(true);
      addToast('Reset link sent to your email!');
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface p-6">
      <div className="w-full max-w-md">
        <Link to="/" className="flex items-center gap-2 justify-center mb-8">
          <img src={APP_CONFIG.logo} alt="JustReel" className="h-10 w-10 rounded-lg" />
          <span className="text-2xl font-bold">JustReel</span>
        </Link>

        <div className="bg-white rounded-2xl shadow-card p-8">
          {sent ? (
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-green-500" />
              </div>
              <h2 className="text-xl font-bold text-text-primary mb-2">Check Your Email</h2>
              <p className="text-text-secondary text-sm mb-6">We've sent a password reset link to {email}</p>
              <Link to="/reset-password" className="btn-primary inline-block">
                Enter Reset Code
              </Link>
            </div>
          ) : (
            <>
              <Link to="/login" className="flex items-center gap-1 text-sm text-text-secondary hover:text-primary mb-4">
                <ArrowLeft className="w-4 h-4" /> Back to login
              </Link>
              <h2 className="text-2xl font-bold text-text-primary mb-2">Forgot Password?</h2>
              <p className="text-text-secondary text-sm mb-6">Enter your email and we'll send you a reset link.</p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input label="Email Address" type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} icon={<Mail className="w-4 h-4" />} required />
                <Button type="submit" size="lg" className="w-full" disabled={loading}>
                  {loading ? 'Sending...' : 'Send Reset Link'} <ArrowRight className="w-4 h-4" />
                </Button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export function ResetPasswordPage() {
  const { addToast } = useToastStore();
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      addToast('Password reset successfully!');
      window.location.href = '/login';
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface p-6">
      <div className="w-full max-w-md">
        <Link to="/" className="flex items-center gap-2 justify-center mb-8">
          <img src={APP_CONFIG.logo} alt="JustReel" className="h-10 w-10 rounded-lg" />
          <span className="text-2xl font-bold">JustReel</span>
        </Link>
        <div className="bg-white rounded-2xl shadow-card p-8">
          <h2 className="text-2xl font-bold text-text-primary mb-2">Reset Password</h2>
          <p className="text-text-secondary text-sm mb-6">Enter the code sent to your email and your new password.</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input label="Verification Code" placeholder="Enter 6-digit code" value={code} onChange={e => setCode(e.target.value)} required />
            <Input label="New Password" type="password" placeholder="Enter new password" value={password} onChange={e => setPassword(e.target.value)} required />
            <Button type="submit" size="lg" className="w-full" disabled={loading}>
              {loading ? 'Resetting...' : 'Reset Password'} <ArrowRight className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
