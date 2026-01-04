import { Layout } from '@/components/layout/Layout';
import { CinematicHero } from '@/components/home/CinematicHero';
import { FeaturedProductCarousel } from '@/components/home/FeaturedProductCarousel';
import { DualCollections } from '@/components/home/DualCollections';
import { ProductGridWithFilters } from '@/components/home/ProductGridWithFilters';
import { BrandStory } from '@/components/home/BrandStory';
import { InstagramFeed } from '@/components/home/InstagramFeed';
import { Testimonials } from '@/components/home/Testimonials';
import { EnhancedNewsletter } from '@/components/home/EnhancedNewsletter';

export default function Index() {
  return (
    <Layout>
        {/* Hero Section - Full-width Cinematic */}
        <CinematicHero />

        {/* Featured Product Carousel */}
        <FeaturedProductCarousel />

        {/* Dual Collection Cards */}
        <DualCollections />

        {/* Product Grid with Filters */}
        <ProductGridWithFilters />

        {/* Brand Story */}
        <BrandStory />

        {/* Instagram Feed */}
        <InstagramFeed />

        {/* Testimonials */}
        <Testimonials />

        {/* Newsletter */}
        <EnhancedNewsletter />
      </Layout>
  );
}
