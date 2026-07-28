import { useAuthStore, useToastStore } from '@/store';
import { Button } from '@/components/ui/Button';
import { Input, Switch } from '@/components/ui/Form';
import { Badge } from '@/components/ui';
import { User, Lock, Bell, Shield, Trash2, Globe, MessageCircle } from 'lucide-react';
import { useState } from 'react';

export function SettingsPage() {
  const { user, updateUser } = useAuthStore();
  const { addToast } = useToastStore();
  const [name, setName] = useState(user?.name || '');
  const [email] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');

  const [notifSettings, setNotifSettings] = useState({
    email: true, sms: true, push: false, whatsapp: true,
    bookingUpdates: true, payments: true, offers: true, reviews: true, messages: true, support: true,
  });
  const [marketingConsent, setMarketingConsent] = useState(true);
  const [whatsappConsent, setWhatsappConsent] = useState(true);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <h1 className="text-2xl font-bold text-text-primary">Settings</h1>

      <div className="bg-white rounded-2xl p-6 border border-border">
        <div className="flex items-center gap-3 mb-4">
          <User className="w-5 h-5 text-primary" />
          <h2 className="font-bold text-text-primary">Profile</h2>
        </div>
        <div className="flex items-center gap-4 mb-6">
          <img src={user?.avatar} alt={user?.name} className="w-20 h-20 rounded-full object-cover" />
          <Button variant="outline" size="sm">Change Photo</Button>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <Input label="Full Name" value={name} onChange={e => setName(e.target.value)} />
          <Input label="Email" value={email} disabled />
          <Input label="Phone" value={phone} onChange={e => setPhone(e.target.value)} />
          <Input label="Location" placeholder="City, State" />
        </div>
        <Button className="mt-4" onClick={() => { updateUser({ name, phone }); addToast('Profile updated!'); }}>Save Changes</Button>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-border">
        <div className="flex items-center gap-3 mb-4">
          <Lock className="w-5 h-5 text-primary" />
          <h2 className="font-bold text-text-primary">Security</h2>
        </div>
        <div className="space-y-4">
          <Input label="Current Password" type="password" placeholder="Enter current password" />
          <Input label="New Password" type="password" placeholder="Enter new password" />
          <Button variant="outline" onClick={() => addToast('Password updated!')}>Update Password</Button>
          <div className="pt-4 border-t border-border flex items-center justify-between">
            <div><p className="font-semibold text-sm">Two-Factor Authentication</p><p className="text-xs text-text-secondary">Add an extra layer of security</p></div>
            <Switch checked={false} onChange={() => addToast('2FA toggled')} />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-border">
        <div className="flex items-center gap-3 mb-4">
          <Bell className="w-5 h-5 text-primary" />
          <h2 className="font-bold text-text-primary">Notifications</h2>
        </div>
        <div className="space-y-3">
          {Object.entries({
            email: 'Email notifications', sms: 'SMS alerts', push: 'Push notifications', whatsapp: 'WhatsApp updates',
            bookingUpdates: 'Booking updates', payments: 'Payment confirmations', offers: 'Special offers',
            reviews: 'Review reminders', messages: 'New messages', support: 'Support updates',
          }).map(([key, label]) => (
            <div key={key} className="flex items-center justify-between">
              <span className="text-sm text-text-primary">{label}</span>
              <Switch
                checked={(notifSettings as any)[key]}
                onChange={v => setNotifSettings({ ...notifSettings, [key]: v })}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-border">
        <div className="flex items-center gap-3 mb-4">
          <Shield className="w-5 h-5 text-primary" />
          <h2 className="font-bold text-text-primary">Privacy & Consent</h2>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div><p className="text-sm font-semibold">Marketing Communications</p><p className="text-xs text-text-secondary">Receive promotional content</p></div>
            <Switch checked={marketingConsent} onChange={setMarketingConsent} />
          </div>
          <div className="flex items-center justify-between">
            <div><p className="text-sm font-semibold">WhatsApp Consent</p><p className="text-xs text-text-secondary">Allow messages via WhatsApp</p></div>
            <Switch checked={whatsappConsent} onChange={setWhatsappConsent} />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-red-200">
        <div className="flex items-center gap-3 mb-4">
          <Trash2 className="w-5 h-5 text-red-500" />
          <h2 className="font-bold text-red-500">Danger Zone</h2>
        </div>
        <p className="text-sm text-text-secondary mb-4">Deleting your account will permanently remove all your data, bookings and history.</p>
        <Button variant="danger" onClick={() => addToast('Account deletion requested', 'error')}>Delete Account</Button>
      </div>
    </div>
  );
}
