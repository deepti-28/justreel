import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, UserRole } from '@/types';
import { MOCK_WISHLIST, MOCK_NOTIFICATIONS, MOCK_BOOKINGS } from '@/data/mockData';
import type { WishlistItem, Notification } from '@/types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, role: UserRole) => void;
  logout: () => void;
  setRole: (role: UserRole) => void;
  updateUser: (data: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (email, role) => {
        const user: User = {
          id: 'current',
          email,
          name: email === 'creator@justreel.com' ? 'Aarav Mehta' : email === 'admin@justreel.com' ? 'Admin' : 'Guest User',
          avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
          role,
          verified: true,
          createdAt: new Date().toISOString(),
        };
        set({ user, isAuthenticated: true });
      },
      logout: () => set({ user: null, isAuthenticated: false }),
      setRole: (role) => set((state) => ({ user: state.user ? { ...state.user, role } : null })),
      updateUser: (data) => set((state) => ({ user: state.user ? { ...state.user, ...data } : null })),
    }),
    { name: 'justreel-auth' }
  )
);

interface WishlistState {
  items: WishlistItem[];
  toggleWishlist: (type: WishlistItem['type'], itemId: string) => void;
  isWishlisted: (itemId: string) => boolean;
  removeItem: (id: string) => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: MOCK_WISHLIST,
      toggleWishlist: (type, itemId) => {
        const existing = get().items.find(i => i.itemId === itemId);
        if (existing) {
          set({ items: get().items.filter(i => i.itemId !== itemId) });
        } else {
          const newItem: WishlistItem = {
            id: `w-${Date.now()}`,
            type,
            itemId,
            addedAt: new Date().toISOString(),
          };
          set({ items: [...get().items, newItem] });
        }
      },
      isWishlisted: (itemId) => get().items.some(i => i.itemId === itemId),
      removeItem: (id) => set({ items: get().items.filter(i => i.id !== id) }),
    }),
    { name: 'justreel-wishlist' }
  )
);

interface NotificationState {
  notifications: Notification[];
  markRead: (id: string) => void;
  markAllRead: () => void;
  unreadCount: () => number;
}

export const useNotificationStore = create<NotificationState>()(
  persist(
    (set, get) => ({
      notifications: MOCK_NOTIFICATIONS,
      markRead: (id) => set({ notifications: get().notifications.map(n => n.id === id ? { ...n, read: true } : n) }),
      markAllRead: () => set({ notifications: get().notifications.map(n => ({ ...n, read: true })) }),
      unreadCount: () => get().notifications.filter(n => !n.read).length,
    }),
    { name: 'justreel-notifications' }
  )
);

interface ToastState {
  toasts: { id: string; message: string; type: 'success' | 'error' | 'info' }[];
  addToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  removeToast: (id: string) => void;
}

export const useToastStore = create<ToastState>((set, get) => ({
  toasts: [],
  addToast: (message, type = 'success') => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    set({ toasts: [...get().toasts, { id, message, type }] });
    setTimeout(() => get().removeToast(id), 3000);
  },
  removeToast: (id) => set({ toasts: get().toasts.filter(t => t.id !== id) }),
}));

interface CompareState {
  compareList: string[];
  addToCompare: (creatorId: string) => void;
  removeFromCompare: (creatorId: string) => void;
  clearCompare: () => void;
  isComparing: (creatorId: string) => boolean;
}

export const useCompareStore = create<CompareState>()(
  persist(
    (set, get) => ({
      compareList: [],
      addToCompare: (creatorId) => {
        if (get().compareList.length < 4 && !get().compareList.includes(creatorId)) {
          set({ compareList: [...get().compareList, creatorId] });
        }
      },
      removeFromCompare: (creatorId) => set({ compareList: get().compareList.filter(id => id !== creatorId) }),
      clearCompare: () => set({ compareList: [] }),
      isComparing: (creatorId) => get().compareList.includes(creatorId),
    }),
    { name: 'justreel-compare' }
  )
);

interface BookingDraftState {
  creatorId: string | null;
  packageId: string | null;
  step: number;
  formData: Record<string, any>;
  setCreator: (id: string) => void;
  setPackage: (id: string) => void;
  setStep: (step: number) => void;
  setFormData: (data: Record<string, any>) => void;
  reset: () => void;
}

export const useBookingDraftStore = create<BookingDraftState>()(
  persist(
    (set) => ({
      creatorId: null,
      packageId: null,
      step: 0,
      formData: {},
      setCreator: (id) => set({ creatorId: id }),
      setPackage: (id) => set({ packageId: id }),
      setStep: (step) => set({ step }),
      setFormData: (data) => set((state) => ({ formData: { ...state.formData, ...data } })),
      reset: () => set({ creatorId: null, packageId: null, step: 0, formData: {} }),
    }),
    { name: 'justreel-booking-draft' }
  )
);
