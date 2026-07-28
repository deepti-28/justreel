import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Search, Sparkles, ArrowRight, Star, Users, Calendar, MapPin, Heart,
  CheckCircle, Play, Download, Apple, ChevronRight, Quote, BadgeCheck,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { CreatorCard, ReelCard, DestinationCard } from '@/components/cards';
import { Accordion } from '@/components/ui/Overlay';
import { HeroCarousel } from '@/components/layout/HeroCarousel';
import { MOCK_CREATORS, MOCK_REELS, MOCK_DESTINATIONS } from '@/data/mockData';
import {
  CATEGORIES, STATS, HOW_IT_WORKS, FAQS, TESTIMONIALS, BLOGS,
  DESTINATION_WEDDINGS, APP_CONFIG,
} from '@/constants';
import { formatNumber } from '@/lib/utils';

const iconMap: Record<string, any> = {
  Search, Sparkles, ShoppingBag: ArrowRight, MapPin, CheckCircle, Users, Calendar, Heart,
};

export function LandingPage() {
  const navigate = useNavigate();

  const trendingReels = MOCK_REELS.slice(0, 8);
  const featuredCreators = MOCK_CREATORS.slice(0, 4);
  const popularDestinations = MOCK_DESTINATIONS.slice(0, 3);

  return (
    <div className="overflow-hidden">
      {/* Hero Carousel */}
      <HeroCarousel />

      {/* Stats */}
      <section className="bg-surface py-12 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map((stat, i) => {
              const Icon = iconMap[stat.icon] || Users;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center"
                >
                  <div className="w-12 h-12 rounded-xl bg-brand-gradient text-white flex items-center justify-center mx-auto mb-3">
                    <Icon className="w-6 h-6" />
                  </div>
                  <p className="text-3xl font-bold text-text-primary">{stat.value}</p>
                  <p className="text-sm text-text-secondary mt-1">{stat.label}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="section-title">Popular Categories</h2>
          <p className="section-subtitle">Find the perfect creator for every occasion</p>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          {CATEGORIES.map((cat, i) => (
            <motion.button
              key={cat.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              onClick={() => navigate(`/explore?category=${cat.id}`)}
              className="group flex flex-col items-center gap-2 p-4 rounded-2xl border border-border hover:border-primary hover:shadow-card transition-all"
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-white transition-transform group-hover:scale-110"
                style={{ background: `linear-gradient(135deg, ${cat.color}, ${cat.color}dd)` }}
              >
                {cat.icon === 'Heart' && <Heart className="w-7 h-7" />}
                {cat.icon === 'Sparkles' && <Sparkles className="w-7 h-7" />}
                {cat.icon === 'MapPin' && <MapPin className="w-7 h-7" />}
                {cat.icon === 'Music' && <Play className="w-7 h-7" />}
                {cat.icon === 'Briefcase' && <Users className="w-7 h-7" />}
                {cat.icon === 'PartyPopper' && <Star className="w-7 h-7" />}
                {cat.icon === 'Plane' && <ArrowRight className="w-7 h-7" />}
                {cat.icon === 'Cake' && <Calendar className="w-7 h-7" />}
                {cat.icon === 'Drone' && <Sparkles className="w-7 h-7" />}
                {cat.icon === 'Baby' && <Heart className="w-7 h-7" />}
                {cat.icon === 'Shirt' && <Star className="w-7 h-7" />}
                {cat.icon === 'Ring' && <Heart className="w-7 h-7" />}
              </div>
              <span className="text-xs font-semibold text-text-primary text-center">{cat.name}</span>
              <span className="text-[10px] text-text-secondary">{cat.count}</span>
            </motion.button>
          ))}
        </div>
      </section>

      {/* Trending Reels */}
      <section className="py-16 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="section-title">Trending Reels</h2>
              <p className="section-subtitle">Watch the latest work from top creators</p>
            </div>
            <Button to="/reels" variant="ghost">
              View All <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {trendingReels.map((reel, i) => (
              <motion.div
                key={reel.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <ReelCard reel={reel} onClick={() => navigate('/reels')} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Creators */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="section-title">Featured Creators</h2>
            <p className="section-subtitle">Top-rated filmmakers handpicked for you</p>
          </div>
          <Button to="/explore" variant="ghost">
            Explore All <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredCreators.map((creator, i) => (
            <motion.div
              key={creator.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <CreatorCard creator={creator} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-16 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="section-title">Popular Destinations</h2>
              <p className="section-subtitle">Discover creators in trending wedding destinations</p>
            </div>
            <Button to="/destinations" variant="ghost">
              View All <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {popularDestinations.map((dest, i) => (
              <motion.div
                key={dest.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <DestinationCard destination={dest} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Destination & Hill Weddings */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative rounded-2xl overflow-hidden h-80 group cursor-pointer"
            onClick={() => navigate('/destinations')}
          >
            <img src={DESTINATION_WEDDINGS[1].image} alt="Destination Weddings" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="absolute bottom-0 p-6 text-white">
              <h3 className="text-2xl font-bold mb-2">Destination Weddings</h3>
              <p className="text-sm opacity-90 mb-3">Beach, palace & heritage venues with expert creators</p>
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-accent">
                Explore Destinations <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative rounded-2xl overflow-hidden h-80 group cursor-pointer"
            onClick={() => navigate('/destinations/shimla')}
          >
            <img src={DESTINATION_WEDDINGS[4].image} alt="Hill Weddings" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="absolute bottom-0 p-6 text-white">
              <h3 className="text-2xl font-bold mb-2">Hill Weddings</h3>
              <p className="text-sm opacity-90 mb-3">Misty mountains, snow backdrops & drone specialists</p>
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-accent">
                Explore Hill Stations <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Work */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="section-title">Featured Work</h2>
            <p className="section-subtitle">Stunning reels from our top creators</p>
          </div>
          <Button to="/reels" variant="ghost">View All <ArrowRight className="w-4 h-4" /></Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {trendingReels.map((reel, i) => (
            <motion.div
              key={reel.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="relative rounded-2xl overflow-hidden group cursor-pointer aspect-[9/16]"
              onClick={() => navigate('/reels')}
            >
              <img src={reel.thumbnail} alt={reel.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 p-4 text-white">
                <div className="flex items-center gap-2 mb-1">
                  <img src={reel.creatorAvatar} alt={reel.creatorName} className="w-6 h-6 rounded-full object-cover border border-white/30" />
                  <span className="text-xs font-semibold truncate">{reel.creatorName}</span>
                  <BadgeCheck className="w-3.5 h-3.5 text-primary shrink-0" />
                </div>
                <p className="text-sm font-bold line-clamp-1">{reel.title}</p>
                <div className="flex items-center gap-3 mt-1 text-xs opacity-80">
                  <span className="flex items-center gap-1"><Heart className="w-3 h-3" /> {reel.likes}</span>
                  <span className="flex items-center gap-1"><Play className="w-3 h-3" /> {reel.views}</span>
                </div>
              </div>
              <div className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/20 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Play className="w-4 h-4 text-white fill-white" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="section-title">How It Works</h2>
            <p className="section-subtitle">Book your perfect creator in 4 simple steps</p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {HOW_IT_WORKS.map((step, i) => {
              const Icon = iconMap[step.icon] || Search;
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative"
                >
                  {i < HOW_IT_WORKS.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-[60%] w-full h-0.5 bg-border" />
                  )}
                  <div className="relative bg-white rounded-2xl p-6 card">
                    <div className="w-12 h-12 rounded-xl bg-brand-gradient text-white flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold text-primary">STEP {step.step}</span>
                    <h3 className="font-bold text-text-primary mt-1">{step.title}</h3>
                    <p className="text-sm text-text-secondary mt-2">{step.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="section-title">Loved by Couples</h2>
          <p className="section-subtitle">Real stories from real celebrations</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="card p-6"
            >
              <Quote className="w-8 h-8 text-primary/30 mb-3" />
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <p className="text-text-secondary text-sm leading-relaxed mb-4">{t.text}</p>
              <div className="flex items-center gap-3">
                <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <p className="font-semibold text-text-primary text-sm">{t.name}</p>
                  <p className="text-xs text-text-secondary">{t.event}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Blogs */}
      <section className="py-16 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="section-title">From Our Blog</h2>
              <p className="section-subtitle">Tips, guides and inspiration for your event</p>
            </div>
            <Button to="/blog" variant="ghost">View All <ArrowRight className="w-4 h-4" /></Button>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {BLOGS.map((blog, i) => (
              <motion.div
                key={blog.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card overflow-hidden group cursor-pointer"
                onClick={() => navigate('/blog')}
              >
                <div className="h-48 overflow-hidden">
                  <img src={blog.image} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5">
                  <span className="badge-primary mb-2">{blog.category}</span>
                  <h3 className="font-bold text-text-primary line-clamp-2 group-hover:text-primary transition-colors">{blog.title}</h3>
                  <p className="text-sm text-text-secondary mt-2 line-clamp-2">{blog.excerpt}</p>
                  <div className="flex items-center gap-2 mt-3 text-xs text-text-secondary">
                    <span>{blog.author}</span> · <span>{blog.readTime}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-subtitle">Everything you need to know about JustReel</p>
        </div>
        <Accordion items={FAQS} />
      </section>

      {/* Download App CTA */}
      <section className="py-16 bg-brand-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-3">Take JustReel Everywhere</h2>
              <p className="text-lg opacity-90 mb-6">Download our app to browse reels, book creators and track your bookings on the go.</p>
              <div className="flex flex-wrap gap-3">
                <button className="flex items-center gap-3 bg-white text-text-primary rounded-xl px-5 py-3 hover:scale-105 transition-transform">
                  <Apple className="w-6 h-6" />
                  <div className="text-left">
                    <p className="text-[10px] opacity-70">Download on the</p>
                    <p className="text-sm font-bold">App Store</p>
                  </div>
                </button>
                <button className="flex items-center gap-3 bg-white text-text-primary rounded-xl px-5 py-3 hover:scale-105 transition-transform">
                  <Download className="w-6 h-6" />
                  <div className="text-left">
                    <p className="text-[10px] opacity-70">GET IT ON</p>
                    <p className="text-sm font-bold">Google Play</p>
                  </div>
                </button>
              </div>
            </div>
            <div className="hidden md:flex justify-center">
              <div className="w-64 h-96 rounded-3xl bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center">
                <Play className="w-16 h-16 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
