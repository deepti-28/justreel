import type {
  Creator,
  Reel,
  Review,
  Booking,
  Notification,
  Conversation,
  Message,
  Destination,
  DroneOperator,
  WishlistItem,
} from '@/types';
import {
  AVATARS,
  REEL_THUMBNAILS,
  WEDDING_IMAGES,
  DESTINATION_IMAGES,
} from '@/constants';

const CREATOR_NAMES = [
  'Aarav Mehta', 'Diya Sharma', 'Karan Singh', 'Ananya Reddy',
  'Rohan Kapoor', 'Ishita Gupta', 'Vikram Patel', 'Sneha Iyer',
  'Arjun Nair', 'Pooja Verma', 'Rahul Joshi', 'Meera Desai',
  'Aditya Rao', 'Kavya Menon', 'Siddharth Bose', 'Nisha Agarwal',
  'Dev Malhotra', 'Tara Krishnan', 'Yash Chopra', 'Riya Malhotra',
];

const CITIES_DATA = [
  { city: 'Mumbai', state: 'Maharashtra', country: 'India' },
  { city: 'Delhi', state: 'Delhi', country: 'India' },
  { city: 'Goa', state: 'Goa', country: 'India' },
  { city: 'Jaipur', state: 'Rajasthan', country: 'India' },
  { city: 'Udaipur', state: 'Rajasthan', country: 'India' },
  { city: 'Bangalore', state: 'Karnataka', country: 'India' },
  { city: 'Shimla', state: 'Himachal Pradesh', country: 'India' },
  { city: 'Manali', state: 'Himachal Pradesh', country: 'India' },
  { city: 'Kerala', state: 'Kerala', country: 'India' },
  { city: 'Pune', state: 'Maharashtra', country: 'India' },
];

const CATEGORIES_LIST = [
  ['wedding', 'pre-wedding', 'engagement'],
  ['wedding', 'drone', 'destination'],
  ['pre-wedding', 'travel', 'fashion'],
  ['events', 'corporate', 'birthday'],
  ['wedding', 'destination', 'drone'],
  ['music-video', 'fashion', 'events'],
  ['wedding', 'pre-wedding', 'maternity'],
  ['drone', 'travel', 'destination'],
];

const EQUIPMENT_LIST = [
  ['Sony A7IV', 'DJI Mavic 3', 'Sigma 35mm f/1.4', 'GoPro Hero 12'],
  ['Canon R5', 'DJI Air 2S', 'RF 50mm f/1.2', 'Ronin RS3'],
  ['Sony FX3', 'DJI Inspire 3', 'GMaster 24-70', 'Aputure 600d'],
  ['Nikon Z9', 'DJI Mavic 3 Pro', 'Z 85mm f/1.2', 'Zhiyun Crane'],
  ['Panasonic GH6', 'DJI Mini 4 Pro', 'Leica 25mm', 'Godox V1'],
];

const LANGUAGES_LIST = [
  ['English', 'Hindi', 'Marathi'],
  ['English', 'Hindi', 'Punjabi'],
  ['English', 'Hindi', 'Tamil'],
  ['English', 'Hindi', 'Bengali'],
  ['English', 'Hindi', 'Gujarati'],
  ['English', 'Hindi', 'Telugu'],
];

function randomFrom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generatePackages(creatorId: string, index: number): any[] {
  const basePrice = 15000 + index * 5000;
  return [
    {
      id: `${creatorId}-pkg-1`,
      creatorId,
      name: 'Essential',
      description: 'Perfect for intimate gatherings and pre-wedding shoots.',
      price: basePrice,
      duration: '6 hours coverage',
      deliverables: ['100+ edited photos', '1 highlight reel (60s)', 'Online gallery', '5 prints'],
      addOns: [
        { id: 'extra-hour', name: 'Extra Hour', price: 3000, description: 'Additional hour of coverage' },
        { id: 'drone-add', name: 'Drone Coverage', price: 8000, description: 'Aerial shots add-on' },
      ],
    },
    {
      id: `${creatorId}-pkg-2`,
      creatorId,
      name: 'Premium',
      description: 'Complete coverage for your full wedding day.',
      price: basePrice + 20000,
      duration: '12 hours coverage',
      deliverables: ['300+ edited photos', '3 highlight reels', 'Full ceremony video', 'Online gallery', '20 prints'],
      addOns: [
        { id: 'extra-hour', name: 'Extra Hour', price: 3000, description: 'Additional hour of coverage' },
        { id: 'second-shooter', name: 'Second Shooter', price: 12000, description: 'Additional photographer' },
        { id: 'raw-footage', name: 'Raw Footage', price: 5000, description: 'All raw video files' },
      ],
      popular: true,
    },
    {
      id: `${creatorId}-pkg-3`,
      creatorId,
      name: 'Luxury',
      description: 'Full weekend coverage with premium editing.',
      price: basePrice + 50000,
      duration: '2 days coverage',
      deliverables: ['500+ edited photos', '5 cinematic reels', 'Full event films', 'Premium album', 'Drone coverage', 'Same-day teaser'],
      addOns: [
        { id: 'extra-hour', name: 'Extra Hour', price: 3000, description: 'Additional hour of coverage' },
        { id: 'premium-album', name: 'Premium Album', price: 15000, description: 'Luxury photo album' },
        { id: 'express-delivery', name: 'Express Delivery', price: 8000, description: 'Delivery within 7 days' },
      ],
    },
  ];
}

function generateReviews(creatorId: string, count: number): any[] {
  const events = ['Wedding', 'Pre-Wedding', 'Engagement', 'Birthday', 'Corporate Event'];
  const comments = [
    'Absolutely brilliant work! The reels captured every emotion perfectly.',
    'Professional, punctual and incredibly talented. Highly recommend!',
    'The drone shots were breathtaking. Exceeded all our expectations.',
    'Amazing experience from booking to delivery. 10/10 service.',
    'Beautiful editing and storytelling. Our wedding film is a masterpiece.',
    'Great communication and stunning final deliverables.',
    'Best decision we made for our wedding. Every moment was captured.',
    'Creative angles and smooth transitions. Truly cinematic quality.',
  ];
  const reviews: any[] = [];
  for (let i = 0; i < count; i++) {
    reviews.push({
      id: `${creatorId}-rev-${i}`,
      userId: `user-${i}`,
      userName: randomFrom(['Aisha K.', 'Rohit S.', 'Neha P.', 'Vikram R.', 'Sara M.', 'Karan J.']),
      userAvatar: randomFrom(AVATARS),
      creatorId,
      bookingId: `${creatorId}-bkg-${i}`,
      rating: randomInt(4, 5),
      comment: randomFrom(comments),
      createdAt: new Date(Date.now() - i * 86400000 * randomInt(3, 60)).toISOString(),
      helpful: randomInt(0, 50),
      category: randomFrom(['wedding', 'pre-wedding', 'engagement', 'events']),
      event: randomFrom(events),
    });
  }
  return reviews;
}

function generateReels(creator: any, count: number): any[] {
  const titles = [
    'Sunset Wedding Highlights', 'Royal Udaipur Affair', 'Beach Pre-Wedding',
    'Drone Cinematic', 'Hill Station Love Story', 'Mehndi Night Vibes',
    'Sangeet Highlights', 'Intimate Engagement', 'Fashion Film', 'Travel Diaries',
  ];
  const tagsPool = ['wedding', 'cinematic', 'drone', 'prewedding', 'love', 'indianwedding', '4k', 'cinematic'];
  const reels: any[] = [];
  for (let i = 0; i < count; i++) {
    reels.push({
      id: `${creator.id}-reel-${i}`,
      creatorId: creator.id,
      creatorName: creator.name,
      creatorAvatar: creator.avatar,
      title: randomFrom(titles),
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      thumbnail: randomFrom(REEL_THUMBNAILS),
      likes: randomInt(1200, 50000),
      comments: randomInt(45, 800),
      shares: randomInt(20, 500),
      saves: randomInt(100, 3000),
      views: randomInt(50000, 500000),
      tags: tagsPool.slice(0, randomInt(3, 6)),
      location: creator.city,
      category: randomFrom(creator.categories),
      duration: randomInt(15, 60),
      createdAt: new Date(Date.now() - i * 86400000 * randomInt(1, 30)).toISOString(),
    });
  }
  return reels;
}

function generatePortfolio(creator: any, count: number): any[] {
  const portfolio: any[] = [];
  for (let i = 0; i < count; i++) {
    portfolio.push({
      id: `${creator.id}-port-${i}`,
      type: Math.random() > 0.4 ? 'image' : 'video',
      url: randomFrom(WEDDING_IMAGES),
      thumbnail: randomFrom(WEDDING_IMAGES),
      title: randomFrom(['Wedding Day', 'Pre-Wedding Shoot', 'Drone Shot', 'Couple Portrait', 'Event Highlight']),
      category: randomFrom(creator.categories),
      location: creator.city,
    });
  }
  return portfolio;
}

export const MOCK_CREATORS: Creator[] = CREATOR_NAMES.map((name, index) => {
  const cityData = CITIES_DATA[index % CITIES_DATA.length];
  const categories = CATEGORIES_LIST[index % CATEGORIES_LIST.length];
  const baseCreator = {
    id: `creator-${index + 1}`,
    userId: `user-creator-${index + 1}`,
    name,
    avatar: AVATARS[index % AVATARS.length],
    banner: WEDDING_IMAGES[index % WEDDING_IMAGES.length],
    bio: `Award-winning ${categories[0]} filmmaker specializing in cinematic storytelling. ${randomInt(5, 12)} years of experience capturing unforgettable moments across India.`,
    location: `${cityData.city}, ${cityData.state}`,
    city: cityData.city,
    state: cityData.state,
    country: cityData.country,
    rating: Number((4.5 + Math.random() * 0.5).toFixed(1)),
    reviewCount: randomInt(45, 320),
    bookingCount: randomInt(120, 850),
    followerCount: randomInt(5000, 120000),
    experience: randomInt(3, 15),
    verified: true,
    droneCertified: Math.random() > 0.4,
    destinationSpecialist: categories.includes('destination'),
    hillWeddingSpecialist: categories.includes('destination') && !!cityData.city.toLowerCase().match(/shimla|manali|kashmir/),
    categories,
    languages: LANGUAGES_LIST[index % LANGUAGES_LIST.length],
    equipment: EQUIPMENT_LIST[index % EQUIPMENT_LIST.length],
    startingPrice: 15000 + index * 5000,
    responseTime: randomFrom(['within 2 hours', 'within 6 hours', 'within 24 hours']),
    deliveryTime: randomFrom(['7 days', '14 days', '21 days', '30 days']),
    badge: randomFrom(['Top Rated', 'Pro', 'Elite', undefined, undefined]),
    instagram: `https://instagram.com/${name.toLowerCase().replace(/\s/g, '')}`,
    youtube: `https://youtube.com/@${name.toLowerCase().replace(/\s/g, '')}`,
    travelCharges: [
      { range: '0-50 km', charge: 0 },
      { range: '50-100 km', charge: 2000 },
      { range: '100-200 km', charge: 5000 },
      { range: '200+ km', charge: 10000 },
    ],
    availability: ['2024-12-15', '2024-12-20', '2024-12-28', '2025-01-05', '2025-01-10', '2025-01-15'],
  };
  return {
    ...baseCreator,
    packages: generatePackages(baseCreator.id, index),
    portfolio: generatePortfolio(baseCreator, 12),
    reels: generateReels(baseCreator, 4),
    reviews: generateReviews(baseCreator.id, baseCreator.reviewCount > 10 ? 10 : baseCreator.reviewCount),
  };
});

export const MOCK_REELS: Reel[] = MOCK_CREATORS.flatMap(c =>
  c.reels.map(r => ({ ...r, creatorName: c.name, creatorAvatar: c.avatar }))
);

export const MOCK_DESTINATIONS: Destination[] = [
  {
    id: 'goa',
    name: 'Goa',
    state: 'Goa',
    country: 'India',
    image: DESTINATION_IMAGES.goa,
    description: 'Beach weddings with sunset vibes and Portuguese charm. Goa offers stunning beachfront venues, luxury resorts and a relaxed, bohemian atmosphere perfect for intimate celebrations.',
    creatorsCount: 248,
    avgPrice: 75000,
    weather: {
      best_months: ['October', 'November', 'February', 'March'],
      temperature: '28-32°C',
      humidity: '70-80%',
      notes: 'Avoid monsoon season (June-September). December is peak season.',
    },
    travelCost: { from_delhi: 8000, from_mumbai: 5000, from_bangalore: 6000 },
    droneRestrictions: [
      'No flying near military zones',
      'Permission required for beach venues',
      'Max altitude 120m',
      'No flying over crowds',
    ],
    popularFor: ['Beach Wedding', 'Sunset Ceremony', 'Bohemian Theme'],
    hotels: [
      { name: 'Taj Holiday Village', rating: 4.8, price_per_night: 18000, distance: '0.5 km from beach' },
      { name: 'ITC Grand Goa', rating: 4.7, price_per_night: 22000, distance: '1 km from beach' },
      { name: 'W Goa', rating: 4.9, price_per_night: 35000, distance: '2 km from beach' },
    ],
    category: 'beach',
  },
  {
    id: 'udaipur',
    name: 'Udaipur',
    state: 'Rajasthan',
    country: 'India',
    image: DESTINATION_IMAGES.udaipur,
    description: 'Royal palace weddings in the City of Lakes. Udaipur offers magnificent heritage venues, lake-side palaces and regal Rajasthani hospitality.',
    creatorsCount: 186,
    avgPrice: 120000,
    weather: {
      best_months: ['September', 'October', 'November', 'February', 'March'],
      temperature: '25-35°C',
      humidity: '40-60%',
      notes: 'Winters are ideal. Summers are extremely hot (40°C+).',
    },
    travelCost: { from_delhi: 7000, from_mumbai: 8000, from_bangalore: 9000 },
    droneRestrictions: [
      'No flying near heritage monuments without ASI permission',
      'Palace venues require special permission',
      'Max altitude 100m',
    ],
    popularFor: ['Palace Wedding', 'Royal Theme', 'Lake Side'],
    hotels: [
      { name: 'Taj Lake Palace', rating: 4.9, price_per_night: 45000, distance: 'On the lake' },
      { name: 'The Oberoi Udaivilas', rating: 4.9, price_per_night: 55000, distance: '1 km from lake' },
      { name: 'City Palace Hotel', rating: 4.7, price_per_night: 28000, distance: '0.5 km from palace' },
    ],
    category: 'heritage',
  },
  {
    id: 'jaipur',
    name: 'Jaipur',
    state: 'Rajasthan',
    country: 'India',
    image: DESTINATION_IMAGES.jaipur,
    description: 'Pink City heritage weddings with regal grandeur. Jaipur offers majestic forts, heritage havelis and grand palace venues.',
    creatorsCount: 203,
    avgPrice: 95000,
    weather: {
      best_months: ['October', 'November', 'February', 'March'],
      temperature: '22-35°C',
      humidity: '35-55%',
      notes: 'Best from October to March. Avoid summer months.',
    },
    travelCost: { from_delhi: 4000, from_mumbai: 7000, from_bangalore: 8000 },
    droneRestrictions: [
      'No flying near Amber Fort',
      'Heritage monument permission required',
      'Max altitude 100m',
    ],
    popularFor: ['Heritage Wedding', 'Fort Wedding', 'Rajasthani Theme'],
    hotels: [
      { name: 'Rambagh Palace', rating: 4.9, price_per_night: 40000, distance: '2 km from city center' },
      { name: 'Samode Palace', rating: 4.8, price_per_night: 30000, distance: '45 km from Jaipur' },
      { name: 'The Lalit', rating: 4.6, price_per_night: 18000, distance: '1 km from city center' },
    ],
    category: 'heritage',
  },
  {
    id: 'kerala',
    name: 'Kerala',
    state: 'Kerala',
    country: 'India',
    image: DESTINATION_IMAGES.kerala,
    description: 'Backwater weddings amidst lush greenery. Kerala offers serene backwater venues, tea garden estates and Ayurveda-themed celebrations.',
    creatorsCount: 142,
    avgPrice: 85000,
    weather: {
      best_months: ['September', 'October', 'November', 'December', 'January'],
      temperature: '26-32°C',
      humidity: '75-85%',
      notes: 'Avoid monsoon (June-August). November-February is ideal.',
    },
    travelCost: { from_delhi: 9000, from_mumbai: 7000, from_bangalore: 5000 },
    droneRestrictions: [
      'No flying near wildlife sanctuaries',
      'Tea garden venues may restrict drones',
      'Max altitude 120m',
    ],
    popularFor: ['Backwater Wedding', 'Ayurveda Theme', 'Eco Wedding'],
    hotels: [
      { name: 'Taj Malabar', rating: 4.8, price_per_night: 25000, distance: 'On backwaters' },
      { name: 'Coconut Lagoon', rating: 4.7, price_per_night: 20000, distance: 'On backwaters' },
      { name: 'Spice Village', rating: 4.6, price_per_night: 15000, distance: 'Tea gardens' },
    ],
    category: 'beach',
  },
  {
    id: 'shimla',
    name: 'Shimla',
    state: 'Himachal Pradesh',
    country: 'India',
    image: DESTINATION_IMAGES.shimla,
    description: 'Hill station weddings with misty mountain backdrops. Shimla offers colonial-era churches, pine forest venues and snow-capped mountain views.',
    creatorsCount: 98,
    avgPrice: 65000,
    weather: {
      best_months: ['April', 'May', 'June', 'September', 'October'],
      temperature: '10-25°C',
      humidity: '50-70%',
      notes: 'Winter weddings (Dec-Feb) offer snow backdrops. Check road access.',
    },
    travelCost: { from_delhi: 5000, from_mumbai: 9000, from_bangalore: 10000 },
    droneRestrictions: [
      'Altitude affects drone battery - carry spares',
      'No flying in restricted forest areas',
      'Max altitude 80m due to elevation',
    ],
    popularFor: ['Hill Wedding', 'Snow Wedding', 'Forest Theme'],
    hotels: [
      { name: 'The Oberoi Wildflower', rating: 4.8, price_per_night: 30000, distance: '8 km from Shimla' },
      { name: 'Clarkes Hotel', rating: 4.5, price_per_night: 12000, distance: 'City center' },
      { name: 'Wildflower Hall', rating: 4.9, price_per_night: 40000, distance: '12 km from Shimla' },
    ],
    category: 'hill',
  },
  {
    id: 'manali',
    name: 'Manali',
    state: 'Himachal Pradesh',
    country: 'India',
    image: DESTINATION_IMAGES.manali,
    description: 'Snow-capped mountain weddings in adventure paradise. Manali offers valley views, snow weddings and riverside ceremonies.',
    creatorsCount: 76,
    avgPrice: 55000,
    weather: {
      best_months: ['April', 'May', 'June', 'September', 'October'],
      temperature: '5-20°C',
      humidity: '40-60%',
      notes: 'Snow weddings possible Dec-March. Roads may close in heavy snow.',
    },
    travelCost: { from_delhi: 6000, from_mumbai: 10000, from_bangalore: 11000 },
    droneRestrictions: [
      'High altitude - carry 3+ batteries',
      'No flying in Rohtang Pass area',
      'Cold weather drone care required',
    ],
    popularFor: ['Snow Wedding', 'Adventure Theme', 'Valley Views'],
    hotels: [
      { name: 'The Himalayan', rating: 4.8, price_per_night: 25000, distance: '3 km from mall' },
      { name: 'Manu Allaya', rating: 4.6, price_per_night: 18000, distance: '1 km from mall' },
      { name: 'Apple Country Resort', rating: 4.5, price_per_night: 14000, distance: '4 km from mall' },
    ],
    category: 'hill',
  },
];

export const MOCK_DRONE_OPERATORS: DroneOperator[] = [
  {
    id: 'drone-1',
    name: 'SkyFrame Studios',
    avatar: AVATARS[0],
    location: 'Mumbai, Maharashtra',
    dgcaVerified: true,
    equipment: ['DJI Inspire 3', 'DJI Mavic 3 Pro', 'FPV Drones'],
    capabilities: ['4K', '8K', 'Night Flying', 'FPV', 'Thermal'],
    rating: 4.9,
    reviewCount: 128,
    pricePerHour: 4500,
    available: true,
  },
  {
    id: 'drone-2',
    name: 'Aerial Eye Productions',
    avatar: AVATARS[1],
    location: 'Bangalore, Karnataka',
    dgcaVerified: true,
    equipment: ['DJI Air 2S', 'DJI Mini 4 Pro', 'Autel EVO II'],
    capabilities: ['4K', 'Night Flying', 'FPV'],
    rating: 4.8,
    reviewCount: 86,
    pricePerHour: 3500,
    available: true,
  },
  {
    id: 'drone-3',
    name: 'CloudNine Drones',
    avatar: AVATARS[2],
    location: 'Delhi, Delhi',
    dgcaVerified: true,
    equipment: ['DJI Inspire 3', 'DJI Mavic 3', 'FPV Drones'],
    capabilities: ['4K', '8K', 'FPV', 'Night Flying', 'Indoor'],
    rating: 4.7,
    reviewCount: 95,
    pricePerHour: 5000,
    available: true,
  },
  {
    id: 'drone-4',
    name: 'Horizon Hunt',
    avatar: AVATARS[3],
    location: 'Goa, Goa',
    dgcaVerified: true,
    equipment: ['DJI Mavic 3 Pro', 'DJI Air 2S'],
    capabilities: ['4K', 'FPV', 'Waterproof'],
    rating: 4.6,
    reviewCount: 62,
    pricePerHour: 4000,
    available: false,
  },
  {
    id: 'drone-5',
    name: 'Eagle View Films',
    avatar: AVATARS[4],
    location: 'Jaipur, Rajasthan',
    dgcaVerified: true,
    equipment: ['DJI Inspire 3', 'DJI Mini 4 Pro', 'FPV Drones'],
    capabilities: ['4K', '8K', 'FPV', 'Night Flying'],
    rating: 4.9,
    reviewCount: 156,
    pricePerHour: 4800,
    available: true,
  },
];

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: 'n1',
    userId: 'current',
    type: 'booking',
    title: 'Booking Confirmed',
    message: 'Your booking with Aarav Mehta has been confirmed for Dec 15, 2024.',
    read: false,
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    link: '/dashboard/client/bookings',
    avatar: AVATARS[0],
  },
  {
    id: 'n2',
    userId: 'current',
    type: 'message',
    title: 'New Message',
    message: 'Diya Sharma sent you a message about your upcoming booking.',
    read: false,
    createdAt: new Date(Date.now() - 7200000).toISOString(),
    link: '/dashboard/client/messages',
    avatar: AVATARS[1],
  },
  {
    id: 'n3',
    userId: 'current',
    type: 'offer',
    title: 'Special Offer',
    message: 'Get 20% off on all Premium packages this wedding season!',
    read: true,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    link: '/explore',
  },
  {
    id: 'n4',
    userId: 'current',
    type: 'review',
    title: 'Leave a Review',
    message: 'How was your experience with Karan Singh? Leave a review.',
    read: true,
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    link: '/dashboard/client/reviews',
    avatar: AVATARS[2],
  },
  {
    id: 'n5',
    userId: 'current',
    type: 'payment',
    title: 'Payment Successful',
    message: 'Your payment of ₹95,000 was processed successfully.',
    read: true,
    createdAt: new Date(Date.now() - 259200000).toISOString(),
    link: '/dashboard/client/invoices',
  },
];

export const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv-1',
    participants: ['current', 'creator-1'],
    participantName: 'Aarav Mehta',
    participantAvatar: AVATARS[0],
    lastMessage: 'Looking forward to your wedding shoot! I have some ideas to discuss.',
    lastMessageAt: new Date(Date.now() - 3600000).toISOString(),
    unreadCount: 2,
    bookingId: 'booking-1',
  },
  {
    id: 'conv-2',
    participants: ['current', 'creator-2'],
    participantName: 'Diya Sharma',
    participantAvatar: AVATARS[1],
    lastMessage: 'I have sent you the updated package details.',
    lastMessageAt: new Date(Date.now() - 86400000).toISOString(),
    unreadCount: 0,
  },
  {
    id: 'conv-3',
    participants: ['current', 'creator-3'],
    participantName: 'Karan Singh',
    participantAvatar: AVATARS[2],
    lastMessage: 'Thank you for the booking! See you on the 15th.',
    lastMessageAt: new Date(Date.now() - 172800000).toISOString(),
    unreadCount: 0,
  },
];

export const MOCK_MESSAGES: Record<string, Message[]> = {
  'conv-1': [
    {
      id: 'm1',
      senderId: 'creator-1',
      receiverId: 'current',
      content: 'Hi! Thank you for booking my Premium package. I am excited to work with you!',
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      read: true,
      type: 'text',
    },
    {
      id: 'm2',
      senderId: 'current',
      receiverId: 'creator-1',
      content: 'Thank you! We are looking forward to it. Any specific preparations needed?',
      createdAt: new Date(Date.now() - 85800000).toISOString(),
      read: true,
      type: 'text',
    },
    {
      id: 'm3',
      senderId: 'creator-1',
      receiverId: 'current',
      content: 'Looking forward to your wedding shoot! I have some ideas to discuss.',
      createdAt: new Date(Date.now() - 3600000).toISOString(),
      read: false,
      type: 'text',
    },
  ],
  'conv-2': [
    {
      id: 'm4',
      senderId: 'creator-2',
      receiverId: 'current',
      content: 'I have sent you the updated package details.',
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      read: true,
      type: 'text',
    },
  ],
  'conv-3': [
    {
      id: 'm5',
      senderId: 'creator-3',
      receiverId: 'current',
      content: 'Thank you for the booking! See you on the 15th.',
      createdAt: new Date(Date.now() - 172800000).toISOString(),
      read: true,
      type: 'text',
    },
  ],
};

export const MOCK_BOOKINGS: Booking[] = [
  {
    id: 'booking-1',
    clientId: 'current',
    creatorId: 'creator-1',
    creatorName: 'Aarav Mehta',
    creatorAvatar: AVATARS[0],
    packageId: 'creator-1-pkg-2',
    packageName: 'Premium',
    eventDate: '2024-12-15',
    eventTime: '10:00 AM',
    location: 'The Leela Palace, Udaipur',
    status: 'confirmed',
    amount: 85000,
    gst: 15300,
    platformFee: 4250,
    total: 104550,
    addOns: [
      { id: 'drone-add', name: 'Drone Coverage', price: 8000, description: 'Aerial shots add-on' },
    ],
    travelCharge: 5000,
    createdAt: new Date(Date.now() - 86400000 * 7).toISOString(),
    confirmedAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    trackingSteps: [
      { id: 't1', title: 'Booking Placed', description: 'Your booking was placed successfully', status: 'completed', timestamp: new Date(Date.now() - 86400000 * 7).toISOString() },
      { id: 't2', title: 'Booking Confirmed', description: 'Creator confirmed your booking', status: 'completed', timestamp: new Date(Date.now() - 86400000 * 5).toISOString() },
      { id: 't3', title: 'Pre-Event Consultation', description: 'Scheduled call with creator', status: 'current' },
      { id: 't4', title: 'Event Day Coverage', description: 'Creator will arrive at the venue', status: 'upcoming' },
      { id: 't5', title: 'Editing & Post-Production', description: 'Your reels and photos are being edited', status: 'upcoming' },
      { id: 't6', title: 'Final Delivery', description: 'Receive your final deliverables', status: 'upcoming' },
    ],
  },
  {
    id: 'booking-2',
    clientId: 'current',
    creatorId: 'creator-3',
    creatorName: 'Karan Singh',
    creatorAvatar: AVATARS[2],
    packageId: 'creator-3-pkg-1',
    packageName: 'Essential',
    eventDate: '2024-11-20',
    eventTime: '4:00 PM',
    location: 'Beach Resort, Goa',
    status: 'completed',
    amount: 25000,
    gst: 4500,
    platformFee: 1250,
    total: 30750,
    addOns: [],
    createdAt: new Date(Date.now() - 86400000 * 30).toISOString(),
    confirmedAt: new Date(Date.now() - 86400000 * 28).toISOString(),
    completedAt: new Date(Date.now() - 86400000 * 10).toISOString(),
    trackingSteps: [
      { id: 't1', title: 'Booking Placed', description: 'Your booking was placed successfully', status: 'completed', timestamp: new Date(Date.now() - 86400000 * 30).toISOString() },
      { id: 't2', title: 'Booking Confirmed', description: 'Creator confirmed your booking', status: 'completed', timestamp: new Date(Date.now() - 86400000 * 28).toISOString() },
      { id: 't3', title: 'Pre-Event Consultation', description: 'Scheduled call with creator', status: 'completed', timestamp: new Date(Date.now() - 86400000 * 25).toISOString() },
      { id: 't4', title: 'Event Day Coverage', description: 'Creator arrived at the venue', status: 'completed', timestamp: new Date(Date.now() - 86400000 * 20).toISOString() },
      { id: 't5', title: 'Editing & Post-Production', description: 'Your reels and photos were edited', status: 'completed', timestamp: new Date(Date.now() - 86400000 * 15).toISOString() },
      { id: 't6', title: 'Final Delivery', description: 'Final deliverables delivered', status: 'completed', timestamp: new Date(Date.now() - 86400000 * 10).toISOString() },
    ],
  },
];

export const MOCK_WISHLIST: WishlistItem[] = [
  { id: 'w1', type: 'creator', itemId: 'creator-2', addedAt: new Date(Date.now() - 86400000).toISOString() },
  { id: 'w2', type: 'creator', itemId: 'creator-5', addedAt: new Date(Date.now() - 86400000 * 2).toISOString() },
  { id: 'w3', type: 'reel', itemId: 'creator-1-reel-0', addedAt: new Date(Date.now() - 86400000 * 3).toISOString() },
  { id: 'w4', type: 'package', itemId: 'creator-3-pkg-2', addedAt: new Date(Date.now() - 86400000 * 4).toISOString() },
];

export const CREATOR_ANALYTICS = {
  revenue: [
    { month: 'Jan', revenue: 125000, bookings: 8 },
    { month: 'Feb', revenue: 158000, bookings: 11 },
    { month: 'Mar', revenue: 210000, bookings: 14 },
    { month: 'Apr', revenue: 189000, bookings: 12 },
    { month: 'May', revenue: 245000, bookings: 16 },
    { month: 'Jun', revenue: 320000, bookings: 21 },
    { month: 'Jul', revenue: 285000, bookings: 18 },
  ],
  views: [
    { day: 'Mon', views: 12000 },
    { day: 'Tue', views: 15000 },
    { day: 'Wed', views: 13500 },
    { day: 'Thu', views: 18000 },
    { day: 'Fri', views: 22000 },
    { day: 'Sat', views: 28000 },
    { day: 'Sun', views: 25000 },
  ],
  categoryDistribution: [
    { name: 'Wedding', value: 45, color: '#FF4F9A' },
    { name: 'Pre-Wedding', value: 25, color: '#FF7A45' },
    { name: 'Events', value: 15, color: '#FF9CC6' },
    { name: 'Drone', value: 10, color: '#FFB3D9' },
    { name: 'Other', value: 5, color: '#FFE0D0' },
  ],
  performance: {
    totalRevenue: 1532000,
    totalBookings: 100,
    avgRating: 4.8,
    responseRate: 98,
    completionRate: 96,
    repeatClients: 42,
    profileViews: 24500,
    reelViews: 1250000,
  },
};

export function getCreatorById(id: string): Creator | undefined {
  return MOCK_CREATORS.find(c => c.id === id);
}

export function getReelById(id: string): Reel | undefined {
  return MOCK_REELS.find(r => r.id === id);
}

export function getDestinationById(id: string): Destination | undefined {
  return MOCK_DESTINATIONS.find(d => d.id === id);
}

export function getBookingById(id: string): Booking | undefined {
  return MOCK_BOOKINGS.find(b => b.id === id);
}
