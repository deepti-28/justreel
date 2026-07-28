import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle, Clock, Circle, ArrowLeft, Star, MessageCircle, Download } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { MOCK_BOOKINGS } from '@/data/mockData';
import { formatCurrency, formatDateTime, cn } from '@/lib/utils';
import { useToastStore } from '@/store';

export function BookingTrackingPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToast } = useToastStore();
  const booking = MOCK_BOOKINGS.find(b => b.id === id) || MOCK_BOOKINGS[0];

  return (
    <div className="min-h-screen bg-surface py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-sm text-text-secondary hover:text-primary mb-6">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        <div className="bg-white rounded-2xl shadow-card p-6 mb-6">
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-border">
            <img src={booking.creatorAvatar} alt={booking.creatorName} className="w-16 h-16 rounded-xl object-cover" />
            <div className="flex-1">
              <h1 className="text-xl font-bold text-text-primary">{booking.creatorName}</h1>
              <p className="text-sm text-text-secondary">{booking.packageName} Package · {formatDateTime(booking.eventDate)}</p>
            </div>
            <span className={cn(
              'badge',
              booking.status === 'completed' ? 'bg-green-50 text-green-600' :
              booking.status === 'confirmed' ? 'bg-blue-50 text-blue-600' :
              'bg-amber-50 text-amber-600'
            )}>
              {booking.status.replace('_', ' ')}
            </span>
          </div>

          <h2 className="font-bold text-text-primary mb-6">Booking Timeline</h2>
          <div className="space-y-1">
            {booking.trackingSteps.map((step, i) => (
              <div key={step.id} className="flex gap-4">
                <div className="flex flex-col items-center">
                  {step.status === 'completed' ? (
                    <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center">
                      <CheckCircle className="w-5 h-5" />
                    </div>
                  ) : step.status === 'current' ? (
                    <div className="w-10 h-10 rounded-full bg-brand-gradient text-white flex items-center justify-center animate-pulse-brand">
                      <Clock className="w-5 h-5" />
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-surface border-2 border-border text-text-secondary flex items-center justify-center">
                      <Circle className="w-4 h-4" />
                    </div>
                  )}
                  {i < booking.trackingSteps.length - 1 && (
                    <div className={cn('w-0.5 h-12', step.status === 'completed' ? 'bg-green-500' : 'bg-border')} />
                  )}
                </div>
                <div className="pb-8 flex-1">
                  <p className={cn('font-semibold', step.status === 'current' ? 'text-primary' : step.status === 'completed' ? 'text-text-primary' : 'text-text-secondary')}>
                    {step.title}
                  </p>
                  <p className="text-sm text-text-secondary">{step.description}</p>
                  {step.timestamp && (
                    <p className="text-xs text-text-secondary mt-1">{formatDateTime(step.timestamp)}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-card p-6 mb-6">
          <h2 className="font-bold text-text-primary mb-4">Payment Summary</h2>
          <div className="space-y-2">
            <div className="flex justify-between text-sm"><span className="text-text-secondary">Package Amount</span><span>{formatCurrency(booking.amount)}</span></div>
            <div className="flex justify-between text-sm"><span className="text-text-secondary">GST (18%)</span><span>{formatCurrency(booking.gst)}</span></div>
            <div className="flex justify-between text-sm"><span className="text-text-secondary">Platform Fee</span><span>{formatCurrency(booking.platformFee)}</span></div>
            {booking.travelCharge && <div className="flex justify-between text-sm"><span className="text-text-secondary">Travel Charges</span><span>{formatCurrency(booking.travelCharge)}</span></div>}
            <div className="flex justify-between font-bold text-lg pt-2 border-t border-border"><span className="text-text-primary">Total</span><span className="text-primary">{formatCurrency(booking.total)}</span></div>
          </div>
        </div>

        {booking.status === 'completed' && (
          <div className="bg-white rounded-2xl shadow-card p-6 mb-6 text-center">
            <h2 className="font-bold text-text-primary mb-2">Rate Your Experience</h2>
            <p className="text-sm text-text-secondary mb-4">How was your experience with {booking.creatorName}?</p>
            <div className="flex justify-center gap-2 mb-4">
              {[1, 2, 3, 4, 5].map(star => (
                <button key={star} onClick={() => addToast('Thanks for your review!')} className="hover:scale-110 transition-transform">
                  <Star className="w-8 h-8 text-amber-400 fill-amber-400" />
                </button>
              ))}
            </div>
            <Button onClick={() => addToast('Review submitted!')}>Submit Review</Button>
          </div>
        )}

        <div className="flex flex-wrap gap-3">
          <Button variant="outline" onClick={() => addToast('Invoice downloaded!')}>
            <Download className="w-4 h-4" /> Download Invoice
          </Button>
          <Button variant="ghost" onClick={() => navigate('/messages')}>
            <MessageCircle className="w-4 h-4" /> Message Creator
          </Button>
        </div>
      </div>
    </div>
  );
}
