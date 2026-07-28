export type UserRole = 'client' | 'creator' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  avatar: string;
  role: UserRole;
  phone?: string;
  verified: boolean;
  createdAt: string;
}

export interface Creator {
  id: string;
  userId: string;
  name: string;
  avatar: string;
  banner: string;
  bio: string;
  location: string;
  city: string;
  state: string;
  country: string;
  rating: number;
  reviewCount: number;
  bookingCount: number;
  followerCount: number;
  experience: number;
  verified: boolean;
  droneCertified: boolean;
  destinationSpecialist: boolean;
  hillWeddingSpecialist: boolean;
  categories: string[];
  languages: string[];
  equipment: string[];
  packages: Package[];
  portfolio: PortfolioItem[];
  reels: Reel[];
  reviews: Review[];
  availability: string[];
  travelCharges: TravelCharge[];
  startingPrice: number;
  responseTime: string;
  deliveryTime: string;
  badge?: string;
  instagram?: string;
  youtube?: string;
}

export interface Package {
  id: string;
  creatorId: string;
  name: string;
  description: string;
  price: number;
  duration: string;
  deliverables: string[];
  addOns: AddOn[];
  popular?: boolean;
}

export interface AddOn {
  id: string;
  name: string;
  price: number;
  description: string;
}

export interface TravelCharge {
  range: string;
  charge: number;
}

export interface PortfolioItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  thumbnail?: string;
  title: string;
  category: string;
  location: string;
}

export interface Reel {
  id: string;
  creatorId: string;
  creatorName: string;
  creatorAvatar: string;
  title: string;
  videoUrl: string;
  thumbnail: string;
  likes: number;
  comments: number;
  shares: number;
  saves: number;
  views: number;
  tags: string[];
  location: string;
  category: string;
  duration: number;
  liked?: boolean;
  saved?: boolean;
  followed?: boolean;
  createdAt: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  creatorId: string;
  bookingId: string;
  rating: number;
  comment: string;
  images?: string[];
  createdAt: string;
  helpful: number;
  category: string;
  event: string;
}

export interface Booking {
  id: string;
  clientId: string;
  creatorId: string;
  creatorName: string;
  creatorAvatar: string;
  packageId: string;
  packageName: string;
  eventDate: string;
  eventTime: string;
  location: string;
  status: BookingStatus;
  amount: number;
  gst: number;
  platformFee: number;
  total: number;
  couponDiscount?: number;
  addOns: AddOn[];
  requirements?: string;
  travelCharge?: number;
  accommodationRequired?: boolean;
  createdAt: string;
  confirmedAt?: string;
  completedAt?: string;
  invoiceUrl?: string;
  trackingSteps: TrackingStep[];
}

export type BookingStatus =
  | 'pending'
  | 'confirmed'
  | 'in_progress'
  | 'completed'
  | 'cancelled'
  | 'disputed';

export interface TrackingStep {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'current' | 'upcoming';
  timestamp?: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  createdAt: string;
  read: boolean;
  type: 'text' | 'image' | 'booking';
}

export interface Conversation {
  id: string;
  participants: string[];
  participantName: string;
  participantAvatar: string;
  lastMessage: string;
  lastMessageAt: string;
  unreadCount: number;
  bookingId?: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  link?: string;
  avatar?: string;
}

export type NotificationType =
  | 'booking'
  | 'payment'
  | 'message'
  | 'review'
  | 'offer'
  | 'system';

export interface Destination {
  id: string;
  name: string;
  state: string;
  country: string;
  image: string;
  description: string;
  creatorsCount: number;
  avgPrice: number;
  weather: WeatherInfo;
  travelCost: TravelCost;
  droneRestrictions: string[];
  popularFor: string[];
  hotels: Hotel[];
  category: 'beach' | 'hill' | 'heritage' | 'international' | 'city';
}

export interface WeatherInfo {
  best_months: string[];
  temperature: string;
  humidity: string;
  notes: string;
}

export interface TravelCost {
  from_delhi: number;
  from_mumbai: number;
  from_bangalore: number;
}

export interface Hotel {
  name: string;
  rating: number;
  price_per_night: number;
  distance: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
  color: string;
}

export interface FilterState {
  category: string;
  budget: [number, number];
  location: string;
  rating: number;
  verified: boolean;
  droneCertified: boolean;
  destinationSpecialist: boolean;
  hillWeddingSpecialist: boolean;
  experience: number;
  sortBy: string;
  languages: string[];
  gender: string;
}

export interface BookingFormData {
  packageId: string;
  eventDate: string;
  eventTime: string;
  location: string;
  requirements: string;
  addOns: string[];
  travelRequired: boolean;
  accommodationRequired: boolean;
  couponCode?: string;
  paymentMethod: string;
}

export interface AIMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt: string;
}

export interface DroneOperator {
  id: string;
  name: string;
  avatar: string;
  location: string;
  dgcaVerified: boolean;
  equipment: string[];
  capabilities: string[];
  rating: number;
  reviewCount: number;
  pricePerHour: number;
  available: boolean;
}

export interface WishlistItem {
  id: string;
  type: 'creator' | 'reel' | 'package';
  itemId: string;
  addedAt: string;
}
