import { motion } from 'framer-motion';
import { Instagram, Heart, MessageCircle } from 'lucide-react';

const instagramPosts = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=600&q=80',
    likes: 1240,
    comments: 48,
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1605812860427-4024433a70fd?w=600&q=80',
    likes: 980,
    comments: 32,
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1594534475808-b18fc33b045e?w=600&q=80',
    likes: 1550,
    comments: 67,
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1622434641406-a158123450f9?w=600&q=80',
    likes: 2100,
    comments: 89,
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=600&q=80',
    likes: 1670,
    comments: 54,
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1621996659490-3275b4d0d951?w=600&q=80',
    likes: 1890,
    comments: 71,
  },
];

export function InstagramFeed() {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />

      <div className="container-main relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <span className="text-primary text-xs uppercase tracking-[0.2em] font-medium">Follow Us</span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl mt-4">
            Join Our Community
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Follow @venyr for style inspiration, new arrivals, and exclusive behind-the-scenes content
          </p>
        </motion.div>

        {/* Instagram Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
          {instagramPosts.map((post, index) => (
            <motion.a
              key={post.id}
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square rounded-2xl overflow-hidden bg-secondary"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: index * 0.03 }}
              whileHover={{ scale: 1.05 }}
            >
              <img
                src={post.image}
                alt={`Instagram post ${post.id}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-primary/90 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-6">
                <div className="flex items-center gap-2 text-primary-foreground">
                  <Heart className="w-5 h-5" fill="currentColor" />
                  <span className="font-medium">{post.likes.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-2 text-primary-foreground">
                  <MessageCircle className="w-5 h-5" fill="currentColor" />
                  <span className="font-medium">{post.comments}</span>
                </div>
              </div>

              {/* Instagram icon */}
              <div className="absolute top-4 right-4 w-8 h-8 bg-background/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <Instagram className="w-4 h-4 text-primary" />
              </div>
            </motion.a>
          ))}
        </div>

        {/* Follow CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground rounded-xl font-medium hover:shadow-[0_0_30px_rgba(139,30,63,0.6)] hover:scale-105 transition-all duration-200"
          >
            <Instagram className="w-5 h-5" />
            Follow @venyr
          </a>
        </motion.div>
      </div>
    </section>
  );
}





