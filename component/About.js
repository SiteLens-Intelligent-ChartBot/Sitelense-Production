'use client';
import Image from 'next/image';
import { motion, useScroll, useTransform, useMotionValue } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const AnimatedContent = ({ children, stagger = 0.1 }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={variants}
    >
      {/* This is a bit of a hack to apply variants to direct children */}
      {Array.isArray(children) ? children.map((child, i) => <motion.div key={i} variants={itemVariants}>{child}</motion.div>) : <motion.div variants={itemVariants}>{children}</motion.div>}
    </motion.div>
  );
};


export default function About() {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  // 3D card tilt effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-200, 200], [10, -10]);
  const rotateY = useTransform(mouseX, [-200, 200], [-10, 10]);

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    mouseX.set(event.clientX - rect.left - rect.width / 2);
    mouseY.set(event.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.section
      id="about"
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={{
        visible: { transition: { staggerChildren: 0.2 } }
      }}
      className="relative bg-gradient-to-br from-[#fdf6f2] to-[#fde8ea] py-24 px-6 overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
          <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover opacity-20"
          >
              <source src="/AboutVideo.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-[#fdf6f2] via-[#fdf6f2] to-transparent"></div>
      </div>

      <div className="relative z-10 container mx-auto grid md:grid-cols-2 gap-16 items-center">
        <AnimatedContent>
            <h2 className="text-4xl font-extrabold text-gray-900 mb-6">Crafting Your Perfect Soundtrack</h2>
            <p className="text-gray-700 max-w-lg text-xl leading-relaxed">
                From the first beat to the last dance, we are dedicated to creating an unforgettable auditory experience. Our passion is music, and our mission is to make your event legendary. We blend artistry with technology to read the crowd and curate a vibe that's uniquely yours.
            </p>
        </AnimatedContent>

        <motion.div
          className="relative flex justify-center"
          style={{ perspective: 800 }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <motion.div
            className="absolute w-[380px] h-[380px] border-4 border-[#f45b69] rounded-full"
            style={{ rotateX, rotateY }}
            animate={{
                boxShadow: [
                    "0 0 30px rgba(244, 91, 105, 0.5)",
                    "0 0 50px rgba(244, 91, 105, 0.7)",
                    "0 0 30px rgba(244, 91, 105, 0.5)",
                ]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div style={{ rotateX, rotateY, x: 0, y: 0 }}>
            <Image
              src="/logo.png"
              alt="DJ Logo"
              width={350}
              height={350}
              className="drop-shadow-2xl rounded-full"
            />
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}