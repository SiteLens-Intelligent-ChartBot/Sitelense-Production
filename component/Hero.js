'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { FaInstagram, FaLinkedin, FaArrowRight, FaTimes, FaDownload } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

// ✅ Animated text stays same
const AnimatedText = ({ text, el: Wrapper = 'p', className, stagger = 0.03 }) => {
  const textVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: stagger } },
  };
  const charVariants = {
    hidden: { opacity: 0, y: '100%' },
    visible: {
      opacity: 1,
      y: '0%',
      transition: { type: 'spring', damping: 15, stiffness: 200 },
    },
  };

  return (
    <Wrapper className={className}>
      {text.split(' ').map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block whitespace-nowrap mr-4">
          {word.split('').map((char, charIndex) => (
            <span key={charIndex} className="inline-block overflow-hidden">
              <motion.span variants={charVariants} className="inline-block">
                {char}
              </motion.span>
            </span>
          ))}
        </span>
      ))}
    </Wrapper>
  );
};

// ✅ New Popup for bookings by phone number
const BookingsPopup = ({ onClose }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

  const handleCheckBookings = async () => {
    if (!phoneNumber.trim()) return;
    setLoading(true);
    setErrorMsg('');
    try {
      const res = await axios.post(`${API_BASE}/api/receipts`, { phoneNumber });
      setBookings(res.data || []);
    } catch (err) {
      console.error('Error fetching bookings:', err);
      setErrorMsg('No bookings found for this number.');
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  const backdropVariants = { hidden: { opacity: 0 }, visible: { opacity: 1 } };
  const modalVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 30 } },
    exit: { opacity: 0, y: 50, scale: 0.9, transition: { duration: 0.2 } },
  };

  const handleDownload = async (url) => {
  try {
    const response = await fetch(url, { mode: "cors" }); // fetch file
    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);

    // Create hidden link and click
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = "receipt.pdf"; // 👈 set default file name
    document.body.appendChild(link);
    link.click();

    // Cleanup
    link.remove();
    window.URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error("Download failed:", error);
    alert("Unable to download file.");
  }
};

  return (
    <motion.div
      className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      onClick={onClose}
    >
      <motion.div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col"
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">Check Your Bookings</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            <FaTimes size={24} />
          </button>
        </div>

        {/* Phone input */}
        <div className="p-6 flex gap-3">
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Enter your phone number"
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#f45b69]"
          />
          <button
            onClick={handleCheckBookings}
            disabled={loading}
            className={`px-4 py-2 rounded-lg font-semibold text-white ${
              loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#f45b69] hover:bg-[#d94655]'
            }`}
          >
            {loading ? 'Checking...' : 'Check'}
          </button>
        </div>

        {/* Bookings List */}
        <div className="overflow-y-auto p-6">
          {errorMsg && <p className="text-center text-red-500">{errorMsg}</p>}
          {!loading && bookings.length > 0 && (
            <ul className="space-y-4">
              {bookings.map((booking, index) => (
                <li key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                  <p className="font-bold text-lg text-gray-900">Booking ID: {booking.bookingId._id}</p>
                  <p className="text-gray-600">Phone: {booking.phoneNumber}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Date: {new Date(booking.createdAt).toLocaleDateString()}
                  </p>
                  <a
                    href={`${booking.receiptUrl.replace("/upload/", "/upload/fl_attachment:receipt/")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm rounded-lg"
                  >
                    <FaDownload /> Download Receipt
                  </a>
                </li>
              ))}
            </ul>
          )}
          {!loading && !errorMsg && bookings.length === 0 && (
            <p className="text-center text-gray-500">Enter your phone number to check bookings.</p>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function Hero() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const router = useRouter();

  const heroVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8, ease: 'easeOut', staggerChildren: 0.3 } },
  };
  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] } },
  };

  return (
    <motion.section
      id="home"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      variants={heroVariants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
    >
      {/* Background video */}
      <video autoPlay loop muted playsInline className="absolute top-0 left-0 w-full h-full object-cover z-0">
        <source src="/HeroVideo.mp4" type="video/mp4" />
      </video>
      <div
        className="absolute top-0 left-0 w-full h-full bg-black/60 z-10"
        style={{ background: 'radial-gradient(circle, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 100%)' }}
      ></div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-6 lg:px-20 flex flex-col items-center text-center">
        <motion.div variants={heroVariants} className="max-w-3xl">
          <AnimatedText text="Feel The Beat." el="h1" className="text-5xl lg:text-7xl font-extrabold mb-4 text-white drop-shadow-lg" />
          <AnimatedText text="Live The Night." el="h1" className="text-5xl lg:text-7xl font-extrabold mb-8 text-white drop-shadow-lg" stagger={0.05} />
          <motion.p variants={itemVariants} className="text-lg text-gray-200 mb-12 max-w-2xl mx-auto">
            Turn Up The Energy With Electrifying Mixes, Non-Stop Beats, And Unforgettable Nights. Book The DJ Who Brings The Dancefloor Alive.
          </motion.p>
          <motion.div variants={itemVariants} className="flex flex-wrap justify-center items-center gap-4">
            <motion.button
              onClick={() => router.push('/booking')}
              className="bg-[#f45b69] text-white font-bold text-lg py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out flex items-center gap-3"
              whileHover={{ scale: 1.05, y: -5, boxShadow: '0px 15px 30px rgba(244, 91, 105, 0.4)' }}
              whileTap={{ scale: 0.95 }}
            >
              Book Now <FaArrowRight />
            </motion.button>
            <motion.button
              onClick={() => setIsPopupOpen(true)}
              className="bg-white/20 backdrop-blur-sm text-white font-bold text-lg py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out"
              whileHover={{ scale: 1.05, y: -5, backgroundColor: 'rgba(255, 255, 255, 0.3)' }}
              whileTap={{ scale: 0.95 }}
            >
              View Bookings
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Social Icons */}
      <motion.div className="absolute bottom-8 left-8 flex gap-5 text-white text-3xl z-20" variants={itemVariants}>
        {[FaInstagram, FaLinkedin].map((Icon, i) => (
          <motion.a
            key={i}
            href="#"
            className="hover:text-[#f45b69] transition-colors"
            whileHover={{ y: -6, scale: 1.2, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Icon />
          </motion.a>
        ))}
      </motion.div>

      {/* Popup */}
      <AnimatePresence>{isPopupOpen && <BookingsPopup onClose={() => setIsPopupOpen(false)} />}</AnimatePresence>
    </motion.section>
  );
}
