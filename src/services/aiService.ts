interface AIRequest {
  feature: string;
  input: string;
  context?: Record<string, any>;
}

interface AIResponse {
  output: string;
  suggestions?: string[];
  data?: Record<string, any>;
}

const PLACEHOLDER_RESPONSES: Record<string, (input: string) => AIResponse> = {
  'smart-search': (input) => ({
    output: `Based on "${input}", I found creators who specialize in this area. Here are my top recommendations: creators in Goa for beach weddings, Udaipur for palace weddings, and drone-certified professionals for aerial coverage.`,
    suggestions: ['Beach wedding filmmaker in Goa', 'Drone specialist in Udaipur', 'Budget-friendly pre-wedding in Jaipur'],
    data: { matchedCreators: ['creator-1', 'creator-5', 'creator-8'] },
  }),
  'shoot-planner': (input) => ({
    output: `Here's your optimized shoot plan for "${input}":\n\n1. Pre-event scout (1 day before)\n2. Getting ready shots (2 hours before)\n3. Ceremony coverage (full duration)\n4. Couple portraits during golden hour (45 min)\n5. Reception highlights (2 hours)\n6. Drone shots between key moments\n\nRecommended crew: 1 lead filmmaker + 1 second shooter + 1 drone operator.`,
    suggestions: ['Add drone coverage', 'Plan for indoor backup', 'Include same-day teaser'],
  }),
  'budget-estimator': (input) => ({
    output: `Estimated budget for "${input}":\n\n- Essential Package: ₹25,000 - ₹40,000\n- Premium Package: ₹50,000 - ₹85,000\n- Luxury Package: ₹100,000 - ₹200,000\n\nAdditional costs: Travel (₹2,000-10,000), Drone add-on (₹8,000), Second shooter (₹12,000).\n\nRecommended: Premium package at ₹85,000 with drone coverage.`,
    suggestions: ['See detailed breakdown', 'Compare packages', 'Find budget-friendly creators'],
    data: { low: 25000, mid: 85000, high: 200000 },
  }),
  'creator-recommendation': (input) => ({
    output: `Based on your preferences "${input}", I recommend:\n\n1. Aarav Mehta - 4.9 rating, drone certified, Udaipur specialist\n2. Diya Sharma - 4.8 rating, fashion & pre-wedding expert\n3. Karan Singh - 4.7 rating, destination wedding pro\n\nThese creators match your style, budget and location preferences.`,
    suggestions: ['Show more creators', 'Compare these creators', 'View their reels'],
  }),
  'caption-generator': (input) => ({
    output: `Here are engaging captions for "${input}":\n\n1. "Forever starts here, with you by my side"\n2. "Two souls, one love, endless memories"\n3. "A love story written in the stars, captured frame by frame"\n4. "From this moment to forever, every second is magical"`,
    suggestions: ['Make them shorter', 'Add emojis', 'Generate hashtags too'],
  }),
  'hashtag-generator': (input) => ({
    output: `Trending hashtags for "${input}":\n\n#JustReel #WeddingFilms #IndianWedding #CinematicWedding #WeddingReels #LoveStory #CoupleGoals #WeddingInspiration #WeddingPhotography #DroneShot`,
    suggestions: ['Add niche hashtags', 'Add location hashtags', 'Add trending hashtags'],
  }),
  'faq-assistant': (input) => ({
    output: `Great question! For "${input}": JustReel connects you with verified filmmakers and drone operators. You can browse reels, compare creators, and book directly. All payments are secure and protected. Need more specific help?`,
    suggestions: ['How do I book?', 'What is the refund policy?', 'How do drone permissions work?'],
  }),
  'review-summarizer': (input) => ({
    output: `Summary of reviews for "${input}":\n\nOverall sentiment: Very Positive (95%)\n\nKey strengths: Professional service, stunning cinematic quality, punctual delivery, excellent communication.\n\nCommon praises: "Breathtaking drone shots", "Exceeded expectations", "Every moment captured perfectly".\n\nAreas of note: Slightly premium pricing but worth the investment.`,
    suggestions: ['See full reviews', 'Compare with similar creators'],
  }),
  'quote-generator': (input) => ({
    output: `Custom quote for "${input}":\n\nBase Package: ₹45,000\nDrone Coverage: +₹8,000\nTravel (within 100km): +₹2,000\nSecond Shooter: +₹12,000\nExpress Delivery: +₹5,000\n\nTotal Estimate: ₹72,000 (excluding GST)\nGST (18%): ₹12,960\nGrand Total: ₹84,960`,
    suggestions: ['Adjust package', 'Remove add-ons', 'Book this quote'],
    data: { base: 45000, total: 84960 },
  }),
  'event-copilot': (input) => ({
    output: `I'm your AI Event Copilot! For "${input}", I can help you plan timelines, suggest creators, estimate budgets, manage guest lists, and coordinate logistics. What would you like to start with?`,
    suggestions: ['Plan my wedding timeline', 'Estimate my budget', 'Find creators near me'],
  }),
};

export async function callAI(request: AIRequest): Promise<AIResponse> {
  await new Promise(resolve => setTimeout(resolve, 800));
  const handler = PLACEHOLDER_RESPONSES[request.feature];
  if (handler) {
    return handler(request.input);
  }
  return {
    output: `I received your request about "${request.input}". This is a placeholder response - connect a Gemini API key to enable full AI capabilities.`,
    suggestions: ['Try a different question', 'Explore AI features'],
  };
}

export function getAIFeatureName(feature: string): string {
  const names: Record<string, string> = {
    'smart-search': 'AI Smart Search',
    'shoot-planner': 'AI Shoot Planner',
    'budget-estimator': 'AI Budget Estimator',
    'creator-recommendation': 'AI Creator Recommendation',
    'caption-generator': 'AI Caption Generator',
    'hashtag-generator': 'AI Hashtag Generator',
    'faq-assistant': 'AI FAQ Assistant',
    'review-summarizer': 'AI Review Summarizer',
    'quote-generator': 'AI Quote Generator',
    'event-copilot': 'AI Event Copilot',
  };
  return names[feature] || 'AI Assistant';
}
