'use client';
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from 'framer-motion';

const NavLink = ({ href, children, onClick }) => (
  <li>
    <Link
      href={href}
      onClick={onClick}
      className="relative text-gray-300 hover:text-white transition-colors duration-300 group text-lg font-semibold"
    >
      {children}
      <span className="absolute bottom-[-2px] left-0 w-0 h-0.5 bg-[#f45b69] transition-all duration-300 ease-out group-hover:w-full"></span>
    </Link>
  </li>
);

const MobileNavLink = ({ href, children, onClick }) => (
    <li>
        <Link
            href={href}
            onClick={onClick}
            className="text-2xl font-semibold text-gray-200 hover:text-white transition-colors duration-300"
        >
            {children}
        </Link>
    </li>
);


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const links = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Blogs", href: "#blogs" },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <nav className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-11/12 sm:w-auto">
        {/* Desktop Navbar */}
        <motion.ul 
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.5 }}
          className="hidden sm:flex items-center space-x-8 bg-black/70 text-white px-8 py-3 rounded-full shadow-xl border border-white/10 backdrop-blur-md"
        >
          {links.map((link, i) => (
            <NavLink key={i} href={link.href}>
              {link.name}
            </NavLink>
          ))}
          <li>
            <motion.a
              href="/booking"
              className="bg-[#f45b69] text-white font-bold py-2 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Book Now
            </motion.a>
          </li>
        </motion.ul>

        {/* Mobile Navbar Toggle */}
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.5 }}
          className="sm:hidden flex justify-between items-center bg-black/70 text-white px-6 py-3 rounded-full shadow-xl border border-white/10 backdrop-blur-md"
        >
          <Link href="/" className="font-bold text-lg">
            DJ Beats
          </Link>
          <button onClick={toggleMenu} className="focus:outline-none z-50">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16"}></path>
            </svg>
          </button>
        </motion.div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black/80 backdrop-blur-lg sm:hidden"
          >
            <motion.ul
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="h-full flex flex-col justify-center items-center space-y-8"
            >
              {links.map((link, i) => (
                <MobileNavLink key={i} href={link.href} onClick={closeMenu}>
                  {link.name}
                </MobileNavLink>
              ))}
              <li>
                <motion.a
                  href="/booking"
                  onClick={closeMenu}
                  className="bg-[#f45b69] text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out text-xl"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Book Now
                </motion.a>
              </li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
