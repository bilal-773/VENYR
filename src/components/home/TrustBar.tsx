import { motion } from 'framer-motion';
import { Truck, Award, RotateCcw, Shield } from 'lucide-react';

const features = [
  {
    icon: Truck,
    title: 'Free Worldwide Shipping',
    description: 'On orders over Rs. 41,700',
  },
  {
    icon: Award,
    title: 'Premium Craftsmanship',
    description: 'Handpicked quality',
  },
  {
    icon: RotateCcw,
    title: '30-Day Returns',
    description: 'Hassle-free policy',
  },
  {
    icon: Shield,
    title: 'Secure Payment',
    description: '100% protected',
  },
];

export function TrustBar() {
  return (
    <section className="py-12 md:py-16 border-y border-border bg-secondary/20">
      <div className="container-main">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center text-center gap-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="font-medium text-sm mb-1">{feature.title}</h3>
                <p className="text-xs text-muted-foreground">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}




