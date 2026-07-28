import { useParams, useNavigate, Link } from 'react-router-dom';
import { CheckCircle, Download, MessageCircle, Calendar, MapPin, Package, Mail, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { MOCK_BOOKINGS } from '@/data/mockData';
import { formatCurrency, formatDateTime } from '@/lib/utils';
import { useToastStore } from '@/store';
import { motion } from 'framer-motion';

export function BookingConfirmationPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToast } = useToastStore();
  const booking = MOCK_BOOKINGS.find(b => b.id === id) || MOCK_BOOKINGS[0];

  return (
    <div className="min-h-screen bg-surface py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', duration: 0.8 }}
          className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle className="w-12 h-12 text-green-500" />
        </motion.div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-text-primary mb-2">Booking Confirmed!</h1>
          <p className="text-text-secondary">Your booking has been successfully placed. We've sent confirmation to your email and WhatsApp.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-card p-6 mb-6">
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-border">
            <img src={booking.creatorAvatar} alt={booking.creatorName} className="w-16 h-16 rounded-xl object-cover" />
            <div>
              <p className="font-bold text-text-primary text-lg">{booking.creatorName}</p>
              <p className="text-sm text-text-secondary">{booking.packageName} Package</p>
            </div>
            <div className="ml-auto">
              <span className="text-xs text-text-secondary">Booking ID</span>
              <p className="font-mono text-sm font-semibold text-primary">#{booking.id.slice(-8).toUpperCase()}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-primary" />
              <div>
                <p className="text-xs text-text-secondary">Event Date</p>
                <p className="font-semibold text-text-primary text-sm">{formatDateTime(booking.eventDate)}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-primary" />
              <div>
                <p className="text-xs text-text-secondary">Venue</p>
                <p className="font-semibold text-text-primary text-sm">{booking.location}</p>
              </div>
            </div>
          </div>

          <div className="bg-surface rounded-xl p-4 space-y-2">
            <div className="flex justify-between text-sm"><span className="text-text-secondary">Package Amount</span><span>{formatCurrency(booking.amount)}</span></div>
            <div className="flex justify-between text-sm"><span className="text-text-secondary">GST (18%)</span><span>{formatCurrency(booking.gst)}</span></div>
            <div className="flex justify-between text-sm"><span className="text-text-secondary">Platform Fee</span><span>{formatCurrency(booking.platformFee)}</span></div>
            <div className="flex justify-between font-bold text-lg pt-2 border-t border-border"><span className="text-text-primary">Total Paid</span><span className="text-primary">{formatCurrency(booking.total)}</span></div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 border border-border flex items-center gap-3">
            <Mail className="w-8 h-8 text-primary" />
            <div>
              <p className="font-semibold text-text-primary text-sm">Email Confirmation</p>
              <p className="text-xs text-text-secondary">Sent to your inbox</p>
            </div>
            <CheckCircle className="w-5 h-5 text-green-500 ml-auto" />
          </div>
          <div className="bg-white rounded-xl p-4 border border-border flex items-center gap-3">
            <MessageSquare className="w-8 h-8 text-green-500" />
            <div>
              <p className="font-semibold text-text-primary text-sm">WhatsApp Confirmation</p>
              <p className="text-xs text-text-secondary">Sent to your phone</p>
            </div>
            <CheckCircle className="w-5 h-5 text-green-500 ml-auto" />
          </div>
        </div>

        <div className="flex flex-wrap gap-3 justify-center">
          <Button onClick={() => navigate(`/booking/tracking/${booking.id}`)}>
            <Package className="w-4 h-4" /> Track Booking
          </Button>
          <Button variant="outline" onClick={() => addToast('Invoice downloaded!')}>
            <Download className="w-4 h-4" /> Download Invoice
          </Button>
          <Button variant="ghost" onClick={() => navigate('/messages')}>
            <MessageCircle className="w-4 h-4" /> Message Creator
          </Button>
        </div>

        <div className="mt-8 text-center">
          <Link to="/explore" className="text-sm text-text-secondary hover:text-primary">Continue exploring creators</Link>
        </div>
      </div>
    </div>
  );
}

