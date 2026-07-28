import { useState } from 'react';
import { useParams, useSearchParams, useNavigate, Link } from 'react-router-dom';
import { Check, Calendar, Clock, MapPin, Package, Camera, Home, CreditCard, ChevronRight, ChevronLeft, CheckCircle, Tag, FileText } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input, Textarea, Checkbox, RadioGroup } from '@/components/ui/Form';
import { Badge } from '@/components/ui';
import { Progress } from '@/components/ui/Overlay';
import { getCreatorById } from '@/data/mockData';
import { useBookingDraftStore, useToastStore, useAuthStore } from '@/store';
import { calculateBookingTotal, formatCurrency, cn } from '@/lib/utils';
import { PAYMENT_METHODS, GST_RATE, PLATFORM_FEE_RATE } from '@/constants';

const STEPS = [
  { id: 'package', label: 'Package', icon: Package },
  { id: 'date', label: 'Date & Time', icon: Calendar },
  { id: 'details', label: 'Event Details', icon: MapPin },
  { id: 'addons', label: 'Add-ons', icon: Camera },
  { id: 'coupon', label: 'Coupon & Referral', icon: Tag },
  { id: 'review', label: 'Review', icon: FileText },
  { id: 'payment', label: 'Payment', icon: CreditCard },
];

export function BookingPage() {
  const { creatorId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const creator = getCreatorById(creatorId || '');
  const { addToast } = useToastStore();
  const { isAuthenticated } = useAuthStore();
  const { step, setStep, formData, setFormData, reset } = useBookingDraftStore();

  const [selectedPackage, setSelectedPackage] = useState(
    creator?.packages.find(p => p.id === searchParams.get('package')) || creator?.packages[0]
  );
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [eventDetails, setEventDetails] = useState({
    date: '',
    time: '',
    location: '',
    requirements: '',
    travelRequired: false,
    accommodationRequired: false,
  });

  if (!creator) {
    return <div className="py-20 text-center">Creator not found. <Link to="/explore" className="text-primary">Browse creators</Link></div>;
  }

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto py-20 text-center">
        <h2 className="text-xl font-bold mb-4">Please sign in to continue</h2>
        <Button to={`/login?redirect=/book/${creatorId}`}>Sign In</Button>
      </div>
    );
  }

  const addOnsPrice = selectedPackage?.addOns
    .filter(a => selectedAddOns.includes(a.id))
    .reduce((sum, a) => sum + a.price, 0) || 0;
  const travelCharge = eventDetails.travelRequired ? 5000 : 0;
  const couponDiscount = couponApplied ? Math.round((selectedPackage!.price + addOnsPrice) * 0.1) : 0;
  const totals = calculateBookingTotal(
    selectedPackage!.price,
    addOnsPrice,
    travelCharge,
    couponDiscount,
    GST_RATE,
    PLATFORM_FEE_RATE
  );

  const nextStep = () => {
    if (step < STEPS.length - 1) {
      setStep(step + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    if (step > 0) {
      setStep(step - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleConfirmBooking = () => {
    addToast('Booking confirmed successfully!');
    const bookingId = `booking-${Date.now()}`;
    navigate(`/booking/confirmation/${bookingId}`);
  };

  const applyCoupon = () => {
    if (couponCode.toUpperCase() === 'JUSTREEL10') {
      setCouponApplied(true);
      addToast('Coupon applied! 10% discount');
    } else {
      addToast('Invalid coupon code', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-surface py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to={`/creator/${creator.id}`} className="flex items-center gap-1 text-sm text-text-secondary hover:text-primary mb-6">
          <ChevronLeft className="w-4 h-4" /> Back to {creator.name}
        </Link>

        <div className="bg-white rounded-2xl p-4 mb-6 flex items-center gap-3">
          <img src={creator.avatar} alt={creator.name} className="w-12 h-12 rounded-xl object-cover" />
          <div>
            <p className="font-bold text-text-primary">{creator.name}</p>
            <p className="text-xs text-text-secondary">Booking in progress</p>
          </div>
        </div>

        {/* Stepper */}
        <div className="bg-white rounded-2xl p-4 mb-6">
          <div className="flex items-center justify-between overflow-x-auto">
            {STEPS.map((s, i) => (
              <div key={s.id} className="flex items-center flex-1 min-w-[80px]">
                <div className="flex flex-col items-center gap-1">
                  <div className={cn(
                    'w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all',
                    i < step ? 'bg-green-500 text-white' : i === step ? 'bg-brand-gradient text-white' : 'bg-surface text-text-secondary'
                  )}>
                    {i < step ? <Check className="w-4 h-4" /> : i + 1}
                  </div>
                  <span className={cn('text-[10px] whitespace-nowrap', i === step ? 'text-primary font-semibold' : 'text-text-secondary')}>{s.label}</span>
                </div>
                {i < STEPS.length - 1 && <div className={cn('flex-1 h-0.5 mx-1', i < step ? 'bg-green-500' : 'bg-border')} />}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 mb-6">
          {/* Step Content */}
          {step === 0 && (
            <div>
              <h2 className="text-xl font-bold mb-4">Select a Package</h2>
              <div className="space-y-3">
                {creator.packages.map(pkg => (
                  <button
                    key={pkg.id}
                    onClick={() => setSelectedPackage(pkg)}
                    className={cn(
                      'w-full text-left p-4 rounded-xl border-2 transition-all',
                      selectedPackage?.id === pkg.id ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/40'
                    )}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-text-primary">{pkg.name}</h3>
                          {pkg.popular && <Badge variant="primary">Popular</Badge>}
                        </div>
                        <p className="text-xs text-text-secondary">{pkg.duration}</p>
                      </div>
                      <span className="font-bold text-primary text-lg">{formatCurrency(pkg.price)}</span>
                    </div>
                    <p className="text-sm text-text-secondary mb-2">{pkg.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {pkg.deliverables.slice(0, 3).map(d => (
                        <span key={d} className="text-xs px-2 py-0.5 rounded-full bg-surface text-text-secondary">{d}</span>
                      ))}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 1 && (
            <div>
              <h2 className="text-xl font-bold mb-4">Select Date & Time</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <Input label="Event Date" type="date" value={eventDetails.date} onChange={e => setEventDetails({...eventDetails, date: e.target.value})} />
                <Input label="Event Time" type="time" value={eventDetails.time} onChange={e => setEventDetails({...eventDetails, time: e.target.value})} />
              </div>
              <div className="mt-4">
                <p className="label">Creator Availability</p>
                <div className="flex flex-wrap gap-2">
                  {creator.availability.map(date => (
                    <Badge key={date} variant="success">
                      {new Date(date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-xl font-bold mb-4">Event Details</h2>
              <div className="space-y-4">
                <Input label="Event Location / Venue" placeholder="e.g., The Leela Palace, Udaipur" value={eventDetails.location} onChange={e => setEventDetails({...eventDetails, location: e.target.value})} icon={<MapPin className="w-4 h-4" />} />
                <Textarea label="Special Requirements" placeholder="Tell the creator about any specific shots, themes, or requests..." value={eventDetails.requirements} onChange={e => setEventDetails({...eventDetails, requirements: e.target.value})} />
                <div className="space-y-3">
                  <Checkbox label="Travel required (creator travels to your location)" checked={eventDetails.travelRequired} onChange={v => setEventDetails({...eventDetails, travelRequired: v})} />
                  <Checkbox label="Accommodation required for creator" checked={eventDetails.accommodationRequired} onChange={v => setEventDetails({...eventDetails, accommodationRequired: v})} />
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-xl font-bold mb-4">Add-ons</h2>
              <div className="space-y-3">
                {selectedPackage?.addOns.map(addon => (
                  <label key={addon.id} className={cn('flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all', selectedAddOns.includes(addon.id) ? 'border-primary bg-primary/5' : 'border-border')}>
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={selectedAddOns.includes(addon.id)}
                        onChange={e => {
                          if (e.target.checked) setSelectedAddOns([...selectedAddOns, addon.id]);
                          else setSelectedAddOns(selectedAddOns.filter(id => id !== addon.id));
                        }}
                        className="w-4 h-4 text-primary rounded"
                      />
                      <div>
                        <p className="font-semibold text-text-primary text-sm">{addon.name}</p>
                        <p className="text-xs text-text-secondary">{addon.description}</p>
                      </div>
                    </div>
                    <span className="font-bold text-primary">{formatCurrency(addon.price)}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <h2 className="text-xl font-bold mb-4">Coupon & Referral</h2>
              <div className="space-y-4">
                <div>
                  <label className="label">Have a coupon code?</label>
                  <div className="flex gap-2">
                    <Input placeholder="e.g., JUSTREEL10" value={couponCode} onChange={e => setCouponCode(e.target.value)} disabled={couponApplied} />
                    <Button variant="outline" onClick={applyCoupon} disabled={couponApplied}>
                      {couponApplied ? 'Applied' : 'Apply'}
                    </Button>
                  </div>
                  {couponApplied && <p className="text-xs text-green-600 mt-1 flex items-center gap-1"><CheckCircle className="w-3 h-3" /> 10% discount applied!</p>}
                </div>
                <div className="p-4 bg-primary/5 rounded-xl border border-primary/10">
                  <p className="text-sm font-semibold text-primary mb-1">Use code JUSTREEL10 for 10% off!</p>
                  <p className="text-xs text-text-secondary">Valid on all packages this wedding season.</p>
                </div>
                <Input label="Referral Code (optional)" placeholder="Enter friend's referral code" />
              </div>
            </div>
          )}

          {step === 5 && (
            <div>
              <h2 className="text-xl font-bold mb-4">Review Your Booking</h2>
              <div className="space-y-4">
                <div className="bg-surface rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-text-primary">{selectedPackage?.name} Package</h3>
                    <span className="font-bold text-primary">{formatCurrency(selectedPackage!.price)}</span>
                  </div>
                  <p className="text-xs text-text-secondary mb-3">{selectedPackage?.duration} · {selectedPackage?.description}</p>
                  {selectedAddOns.length > 0 && (
                    <div className="border-t border-border pt-2">
                      <p className="text-xs font-semibold text-text-secondary mb-1">Add-ons:</p>
                      {selectedPackage?.addOns.filter(a => selectedAddOns.includes(a.id)).map(a => (
                        <div key={a.id} className="flex justify-between text-sm">
                          <span className="text-text-secondary">{a.name}</span>
                          <span className="text-text-primary">{formatCurrency(a.price)}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="bg-surface rounded-xl p-4 space-y-2">
                  <div className="flex justify-between text-sm"><span className="text-text-secondary">Event Date</span><span className="font-semibold">{eventDetails.date || 'Not set'}</span></div>
                  <div className="flex justify-between text-sm"><span className="text-text-secondary">Event Time</span><span className="font-semibold">{eventDetails.time || 'Not set'}</span></div>
                  <div className="flex justify-between text-sm"><span className="text-text-secondary">Location</span><span className="font-semibold">{eventDetails.location || 'Not set'}</span></div>
                </div>
              </div>
            </div>
          )}

          {step === 6 && (
            <div>
              <h2 className="text-xl font-bold mb-4">Payment</h2>
              <div className="space-y-3 mb-6">
                {PAYMENT_METHODS.map(method => (
                  <label key={method.id} className={cn('flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all', paymentMethod === method.id ? 'border-primary bg-primary/5' : 'border-border')}>
                    <input type="radio" name="payment" checked={paymentMethod === method.id} onChange={() => setPaymentMethod(method.id)} className="text-primary" />
                    <div className="flex-1">
                      <p className="font-semibold text-text-primary text-sm">{method.name}</p>
                      <p className="text-xs text-text-secondary">{method.description}</p>
                    </div>
                  </label>
                ))}
              </div>

              {/* Cost Breakdown */}
              <div className="bg-surface rounded-xl p-4 space-y-2">
                <h3 className="font-bold text-text-primary mb-2">Cost Breakdown</h3>
                <div className="flex justify-between text-sm"><span className="text-text-secondary">Package Price</span><span>{formatCurrency(selectedPackage!.price)}</span></div>
                {addOnsPrice > 0 && <div className="flex justify-between text-sm"><span className="text-text-secondary">Add-ons</span><span>{formatCurrency(addOnsPrice)}</span></div>}
                {travelCharge > 0 && <div className="flex justify-between text-sm"><span className="text-text-secondary">Travel Charges</span><span>{formatCurrency(travelCharge)}</span></div>}
                {couponDiscount > 0 && <div className="flex justify-between text-sm text-green-600"><span>Coupon Discount</span><span>-{formatCurrency(couponDiscount)}</span></div>}
                <div className="flex justify-between text-sm"><span className="text-text-secondary">GST (18%)</span><span>{formatCurrency(totals.gst)}</span></div>
                <div className="flex justify-between text-sm"><span className="text-text-secondary">Platform Fee (5%)</span><span>{formatCurrency(totals.platformFee)}</span></div>
                <div className="flex justify-between font-bold text-lg pt-2 border-t border-border"><span className="text-text-primary">Total</span><span className="text-primary">{formatCurrency(totals.total)}</span></div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={prevStep} disabled={step === 0}>
            <ChevronLeft className="w-4 h-4" /> Back
          </Button>
          {step < STEPS.length - 1 ? (
            <Button onClick={nextStep}>
              Continue <ChevronRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button onClick={handleConfirmBooking}>
              <CheckCircle className="w-4 h-4" /> Confirm & Pay {formatCurrency(totals.total)}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
