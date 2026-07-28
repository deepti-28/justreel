import { useNavigate } from 'react-router-dom';
import { Camera, User, ArrowRight, CheckCircle, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useAuthStore, useToastStore } from '@/store';
import { APP_CONFIG } from '@/constants';
import { motion } from 'framer-motion';

export function RoleSelectionPage() {
  const navigate = useNavigate();
  const { user, setRole } = useAuthStore();
  const { addToast } = useToastStore();

  const selectRole = (role: 'client' | 'creator') => {
    setRole(role);
    addToast(`Welcome to JustReel as a ${role}!`);
    navigate(role === 'creator' ? '/dashboard/creator' : '/dashboard/client');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface p-6">
      <div className="w-full max-w-3xl">
        <div className="text-center mb-10">
          <img src={APP_CONFIG.logo} alt="JustReel" className="h-16 w-16 rounded-xl object-cover mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-text-primary mb-2">Choose Your Role</h1>
          <p className="text-text-secondary">How would you like to use JustReel?</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => selectRole('client')}
            className="card p-8 cursor-pointer group hover:border-primary text-center"
          >
            <div className="w-16 h-16 rounded-2xl bg-brand-gradient text-white flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <User className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-text-primary mb-2">I'm a Client</h2>
            <p className="text-sm text-text-secondary mb-4">Book creators for weddings, events and celebrations.</p>
            <ul className="space-y-2 text-left text-sm text-text-secondary mb-6">
              {['Browse & compare creators', 'Watch reels & portfolios', 'Book & track bookings', 'AI-powered planning'].map(item => (
                <li key={item} className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-primary shrink-0" /> {item}
                </li>
              ))}
            </ul>
            <Button className="w-full">Continue as Client <ArrowRight className="w-4 h-4" /></Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => selectRole('creator')}
            className="card p-8 cursor-pointer group hover:border-primary text-center"
          >
            <div className="w-16 h-16 rounded-2xl bg-brand-gradient text-white flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Camera className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-text-primary mb-2">I'm a Creator</h2>
            <p className="text-sm text-text-secondary mb-4">Showcase your work and get booked by clients.</p>
            <ul className="space-y-2 text-left text-sm text-text-secondary mb-6">
              {['Upload reels & portfolio', 'Create packages & pricing', 'Manage bookings & calendar', 'Track revenue & analytics'].map(item => (
                <li key={item} className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-primary shrink-0" /> {item}
                </li>
              ))}
            </ul>
            <Button className="w-full">Continue as Creator <ArrowRight className="w-4 h-4" /></Button>
          </motion.div>
        </div>

        <div className="mt-8 p-4 bg-primary/5 rounded-xl border border-primary/10 flex items-center gap-3">
          <Sparkles className="w-5 h-5 text-primary shrink-0" />
          <p className="text-sm text-text-secondary">You can switch between roles anytime from your settings.</p>
        </div>
      </div>
    </div>
  );
}
