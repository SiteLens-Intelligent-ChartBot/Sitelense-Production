'use client';
import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const services = [
  { img: '/Plans1.png', title: 'Wedding DJ & MC' },
  { img: '/Plans2.png', title: 'Corporate Events & Parties' },
  { img: '/Plans3.png', title: 'Club & Festival Performances' },
];

const plans = [
  { img: '/Plans1.png', title: 'Basic Vibes', description: 'Perfect for small gatherings and intimate events. Includes a professional DJ, sound system, and a curated playlist.' },
  { img: '/Plans2.png', title: 'Party Starter', description: 'Ideal for medium-sized parties and corporate events. Everything in Basic Vibes, plus dance floor lighting and a wireless microphone for announcements.' },
  { img: '/Plans3.png', title: 'Premium Celebration', description: 'The complete package for weddings and large events. All features from Party Starter, plus MC services, custom music requests, and extended hours.' },
  { img: '/plan-4.jpg', title: 'Ultimate Experience', description: 'For an unforgettable event. All Premium features, plus a photo booth, advanced lighting effects, and a personalized monogram projection.' },
];

const cardVariants = {
  hidden: { scale: 0.8, opacity: 0, rotateY: 30 },
  visible: (i) => ({
    scale: 1,
    opacity: 1,
    rotateY: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.8,
      ease: [0.6, 0.05, 0.01, 0.9], // Custom cubic-bezier for a snappy effect
    },
  }),
};

const AnimatedCard = ({ children, i }) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      custom={i}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={cardVariants}
      style={{ perspective: 1000 }}
    >
      {children}
    </motion.div>
  );
};

const popupVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 100 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring',
      damping: 25,
      stiffness: 300,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    y: 100,
    transition: {
      duration: 0.3,
    },
  },
};

const gridVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.05,
        }
    },
    exit: {
        transition: {
            staggerChildren: 0.05,
            staggerDirection: -1
        }
    }
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: { opacity: 1, scale: 1, transition: { type: 'spring', damping: 15, stiffness: 400 } },
  exit: { opacity: 0, scale: 0.5, transition: { duration: 0.2 } },
};

const GalleryPopup = ({ service, onClose }) => {
  if (!service) return null;

  // Generate 20 placeholder images for the gallery
  const images = Array.from({ length: 20 }, (_, i) => `https://picsum.photos/seed/${service.title.replace(/\s/g, '-')}-${i}/400/300`);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        variants={popupVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="bg-white rounded-2xl p-6 max-w-5xl w-full relative shadow-2xl"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the popup
      >
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-4xl font-bold transition-transform duration-300 hover:scale-125 z-10"
        >
          &times;
        </button>
        <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-800">{service.title} Gallery</h2>
        <motion.div 
            variants={gridVariants}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 max-h-[75vh] overflow-y-auto pr-2">
          {images.map((img, i) => (
            <motion.div
              key={i}
              variants={imageVariants}
              className="overflow-hidden rounded-lg shadow-md"
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
            >
             <Image
              src={img}
              alt={`${service.title} gallery image ${i + 1}`}
              width={200}
              height={150}
              className="w-full h-full object-cover"
              unoptimized
            />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default function Services() {
  const { ref, inView } = useInView({
    threshold: 0.1,
  });
  const [selectedService, setSelectedService] = useState(null);

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
      }}
      className="bg-[#fefaf6] py-24 px-6 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          className="text-5xl font-extrabold mb-16 text-center text-gray-800"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
        >
          OUR <span className="text-[#f45b69]">SERVICES</span>
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-12">
          {services.map((service, i) => (
            <AnimatedCard key={i} i={i}>
              <motion.div
                onClick={() => setSelectedService(service)}
                className="text-center p-8 rounded-3xl shadow-lg bg-white transform transition-transform duration-400 cursor-pointer"
                whileHover={{
                  scale: 1.08,
                  rotateY: 15,
                  boxShadow: '0px 30px 60px -10px rgba(244, 91, 105, 0.3)',
                }}
              >
                <Image
                  src={service.img}
                  alt={service.title}
                  width={350}
                  height={220}
                  className="rounded-xl shadow-md mx-auto mb-8"
                />
                <h3 className="text-2xl font-bold text-gray-800">{service.title}</h3>
              </motion.div>
            </AnimatedCard>
          ))}
        </div>

        <motion.h2 
          className="text-5xl font-extrabold mt-32 mb-16 text-center text-gray-800"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
        >
          OUR <span className="text-[#f45b69]">PLANS</span>
        </motion.h2>

        <div className="grid md:grid-cols-4 gap-10">
          {plans.map((plan, i) => (
            <AnimatedCard key={i} i={i}>
              <motion.div
                className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-transform duration-400 flex flex-col h-full"
                whileHover={{
                  scale: 1.08,
                  boxShadow: '0px 20px 40px rgba(244, 91, 105, 0.25)',
                }}
              >
                <Image
                  src={plan.img}
                  alt={plan.title}
                  width={400}
                  height={250}
                  className="w-full h-52 object-cover"
                />
                <div className="p-6 text-center flex-grow flex flex-col">
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-800">{plan.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{plan.description}</p>
                  </div>
                  <div className="mt-auto pt-4">
                    <motion.button
                      className="bg-gradient-to-r from-[#f45b69] to-[#d43f4d] text-white font-bold py-3 px-8 rounded-full shadow-md hover:shadow-xl transition-all duration-300"
                      whileHover={{ scale: 1.1, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      View More
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </AnimatedCard>
          ))}
        </div>
      </div>
      <AnimatePresence>
        {selectedService && (
          <GalleryPopup service={selectedService} onClose={() => setSelectedService(null)} />
        )}
      </AnimatePresence>
    </motion.section>
  );
}