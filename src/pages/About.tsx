import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { ArrowRight } from 'lucide-react';

const values = [
  {
    title: 'Quality Without Compromise',
    description: 'We source only the finest materials and work with artisans who share our commitment to excellence. Every piece is inspected multiple times before earning the VENYR name.',
  },
  {
    title: 'Timeless Design',
    description: 'Trends come and go, but true style endures. We design pieces that look as good in ten years as they do today—classic silhouettes with subtle, refined details.',
  },
  {
    title: 'Sustainable Craftsmanship',
    description: 'Fast fashion has no place in our world. We believe in creating fewer, better things that last. Our Goodyear-welted boots can be resoled. Our watches are built to be passed down.',
  },
];

const commitments = [
  'Premium materials from trusted suppliers',
  'Rigorous quality control',
  'Authenticity guaranteed',
  '2-year warranty on all watches',
  'Free repairs for manufacturing defects',
  'Sustainable packaging',
];

export default function About() {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-hero-gradient pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="container-main text-center">
          <span className="text-muted-foreground text-xs uppercase tracking-[0.2em] mb-4 block opacity-0 animate-fade-up">
            About Us
          </span>
          <h1 className="section-title opacity-0 animate-fade-up stagger-1">Our Story</h1>
          <p className="section-subtitle mt-4 max-w-xl mx-auto opacity-0 animate-fade-up stagger-2">
            Timeless by design since 2020
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 md:py-32">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="opacity-0 animate-fade-up">
              <span className="text-muted-foreground text-xs uppercase tracking-[0.2em]">The Beginning</span>
              <h2 className="font-serif text-3xl md:text-4xl mt-4 mb-8">
                A Passion for Timeless Style
              </h2>
              <div className="space-y-5 text-muted-foreground leading-relaxed">
                <p>
                  VENYR was founded with a simple vision: to make premium timepieces and handcrafted footwear accessible to those who appreciate quality over quantity. We believed that true luxury lies not in logos or fleeting trends, but in the subtle details, the quality of materials, and the story behind each piece.
                </p>
                <p>
                  Our journey began in a small workshop where we carefully curated our first collection of watches from master craftsmen. Today, we've expanded to include an exceptional range of Chelsea boots, each pair handmade using traditional techniques passed down through generations. But our mission remains unchanged: to provide timeless pieces that you'll treasure for years to come.
                </p>
                <p>
                  We source only the finest materials and work with artisans who share our commitment to excellence. Every piece is inspected multiple times before earning the VENYR name. From the moment a product enters our collection to when it reaches your hands, we ensure every detail meets our exacting standards.
                </p>
              </div>
            </div>
            <div className="aspect-square bg-secondary rounded-3xl overflow-hidden opacity-0 animate-fade-up stagger-2">
              <img
                src="https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&q=80"
                alt="VENYR workshop"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 md:py-32 bg-secondary/30">
        <div className="container-main">
          <div className="text-center mb-16">
            <span className="text-muted-foreground text-xs uppercase tracking-[0.2em]">What We Stand For</span>
            <h2 className="font-serif text-3xl md:text-4xl mt-4">Our Values</h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              At VENYR, we're not just selling products—we're building a community of individuals who value quality, craftsmanship, and timeless style.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-card p-10 rounded-3xl opacity-0 animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <span className="text-muted-foreground/30 font-serif text-5xl">0{index + 1}</span>
                <h3 className="font-serif text-xl mt-4 mb-4">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality */}
      <section className="py-24 md:py-32">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 aspect-square bg-secondary rounded-3xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80"
                alt="VENYR quality craftsmanship - Premium materials and attention to detail"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="order-1 lg:order-2">
              <span className="text-muted-foreground text-xs uppercase tracking-[0.2em]">Our Promise</span>
              <h2 className="font-serif text-3xl md:text-4xl mt-4 mb-8">
                Commitment to Quality
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Quality is at the heart of everything we do. From the moment a product enters our collection to when it reaches your hands, we ensure every detail meets our exacting standards. We believe in transparent pricing—no inflated markups, no artificial scarcity. We offer exceptional quality at fair prices by selling directly to you, cutting out traditional retail markups.
              </p>
              <p className="text-muted-foreground mb-10 leading-relaxed">
                Every VENYR piece comes with a lifetime craftsmanship warranty, certificate of authenticity, free worldwide shipping, 30-day money-back guarantee, and expert customer service. This is fashion that respects both people and planet.
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {commitments.map((commitment, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-foreground mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground text-sm">{commitment}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 bg-primary text-primary-foreground">
        <div className="container-main text-center">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-6">
            Experience the Difference
          </h2>
          <p className="text-primary-foreground/70 mb-10 max-w-xl mx-auto">
            Join thousands of customers who have discovered the VENYR difference.
          </p>
          <Link
            to="/watches"
            className="inline-flex items-center gap-3 bg-background text-foreground px-8 py-4 font-medium hover:opacity-90 transition-all duration-300"
          >
            Shop Now
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </Layout>
  );
}
