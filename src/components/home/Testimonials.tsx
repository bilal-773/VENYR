import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const testimonials = [
  {
    id: 1,
    name: 'Michael Chen',
    role: 'Watch Collector',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80',
    rating: 5,
    text: 'The quality of craftsmanship is exceptional. My Chronograph Elite has become my daily wear and still looks brand new after 6 months.',
  },
  {
    id: 2,
    name: 'Sarah Williams',
    role: 'Fashion Designer',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80',
    rating: 5,
    text: 'VENYR\'s Chelsea boots are absolutely stunning. The leather quality is unmatched, and they go perfectly with everything in my wardrobe.',
  },
  {
    id: 3,
    name: 'James Rodriguez',
    role: 'Entrepreneur',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    rating: 5,
    text: 'Best purchase I\'ve made this year. The attention to detail and customer service are phenomenal. Truly a premium brand.',
  },
  {
    id: 4,
    name: 'Emma Thompson',
    role: 'Architect',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
    rating: 5,
    text: 'Timeless design indeed. My minimalist watch receives compliments daily. It\'s elegant, understated, and built to last.',
  },
];

export function Testimonials() {
  return (
    <section className="py-24 md:py-32 bg-secondary/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary rounded-full blur-[120px]" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary rounded-full blur-[120px]" />
      </div>

      <div className="container-main relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <span className="text-primary text-xs uppercase tracking-[0.2em] font-medium">Testimonials</span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl mt-4">Worn by Thousands, Loved by All</h2>
        </motion.div>

        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={0}
          slidesPerView={1}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{
            clickable: true,
            bulletActiveClass: 'swiper-pagination-bullet-active-custom',
          }}
          navigation={true}
          className="testimonials-swiper pb-16"
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={testimonial.id}>
              <motion.div
                className="max-w-4xl mx-auto bg-card rounded-3xl p-12 md:p-16 border border-border text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                {/* Customer Photo */}
                <div className="flex justify-center mb-8">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-primary/20">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Stars */}
                <div className="flex justify-center gap-2 mb-8">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.2, delay: i * 0.07 }}
                    >
                      <Star
                        className="w-6 h-6 fill-primary text-primary"
                        strokeWidth={0}
                      />
                    </motion.div>
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-foreground text-xl md:text-2xl leading-relaxed mb-10 max-w-3xl mx-auto font-light">
                  "{testimonial.text}"
                </p>

                {/* Author */}
                <div>
                  <h4 className="font-medium text-lg mb-1">{testimonial.name}</h4>
                  <p className="text-muted-foreground">{testimonial.role}</p>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style>{`
        .testimonials-swiper .swiper-pagination {
          bottom: 0;
        }
        .testimonials-swiper .swiper-pagination-bullet {
          background: hsl(var(--muted));
          opacity: 0.5;
          width: 8px;
          height: 8px;
          transition: all 0.2s;
        }
        .testimonials-swiper .swiper-pagination-bullet-active-custom {
          background: hsl(var(--primary));
          opacity: 1;
          width: 24px;
          border-radius: 4px;
        }
      `}</style>
    </section>
  );
}

