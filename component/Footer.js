import { Facebook, Instagram, Twitter, Youtube, Music, Send } from "lucide-react";
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const FooterLink = ({ href, children }) => (
    <li>
        <a href={href} className="relative text-gray-300 hover:text-white transition-colors duration-300 group">
            {children}
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#f45b69] transition-all duration-300 ease-out group-hover:w-full"></span>
        </a>
    </li>
);

const SocialIcon = ({ href, icon: Icon }) => (
    <motion.a
        href={href}
        className="p-3 bg-gray-800/50 rounded-full text-gray-300 hover:text-white hover:bg-[#f45b69] transition-all duration-300"
        whileHover={{ y: -4, scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
    >
        <Icon size={20} />
    </motion.a>
);

export default function Footer() {
    const { ref, inView } = useInView({
        threshold: 0.1,
        triggerOnce: true,
    });

    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.2,
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: 'easeOut'
            }
        }
    };

  return (
    <footer id="book-now" ref={ref} className="bg-gradient-to-b from-[#1c1c1c] to-[#121212] text-white pt-20">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="max-w-7xl mx-auto px-6 pb-14 grid md:grid-cols-4 gap-12"
      >
        {/* Brand / Logo */}
        <motion.div variants={itemVariants}>
          <div className="flex items-center gap-2 mb-4">
            <Music className="text-[#f45b69]" size={28} />
            <h2 className="text-xl font-extrabold text-white">
              DJ<span className="text-[#f45b69]">Beats</span>
            </h2>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            Bringing unforgettable vibes to your events with world-class DJ performances.
          </p>
          <div className="flex gap-3">
            <SocialIcon href="#" icon={Facebook} />
            <SocialIcon href="#" icon={Instagram} />
            <SocialIcon href="#" icon={Twitter} />
            <SocialIcon href="#" icon={Youtube} />
          </div>
        </motion.div>

        {/* Quick Links */}
        <motion.div variants={itemVariants}>
          <h3 className="text-lg font-bold mb-5 text-white tracking-wider uppercase">Quick Links</h3>
          <ul className="space-y-4">
            <FooterLink href="#">Home</FooterLink>
            <FooterLink href="#">About</FooterLink>
            <FooterLink href="#">Services</FooterLink>
            <FooterLink href="#">Plans</FooterLink>
          </ul>
        </motion.div>

        {/* Support */}
        <motion.div variants={itemVariants}>
          <h3 className="text-lg font-bold mb-5 text-white tracking-wider uppercase">Support</h3>
          <ul className="space-y-4">
            <FooterLink href="#">FAQs</FooterLink>
            <FooterLink href="#">Terms & Conditions</FooterLink>
            <FooterLink href="#">Privacy Policy</FooterLink>
            <FooterLink href="#">Contact</FooterLink>
          </ul>
        </motion.div>

        {/* Newsletter */}
        <motion.div variants={itemVariants}>
          <h3 className="text-lg font-bold mb-5 text-white tracking-wider uppercase">Stay Updated</h3>
          <p className="text-gray-400 text-sm mb-4">
            Get the latest party updates & offers.
          </p>
          <form className="flex items-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-l-lg bg-gray-800/50 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#f45b69] transition-all duration-300"
            />
            <button
              type="submit"
              className="px-4 py-3 bg-[#f45b69] text-white rounded-r-lg hover:bg-[#e14a58] transition-colors duration-300"
            >
              <Send size={20} />
            </button>
          </form>
        </motion.div>
      </motion.div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 text-center py-6 text-gray-500 text-sm">
        © {new Date().getFullYear()} DJBeats. All rights reserved.
      </div>
    </footer>
  );
}
