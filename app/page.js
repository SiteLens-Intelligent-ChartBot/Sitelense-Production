'use client';
import Hero from "@/component/Hero";
import About from "@/component/About";
// import Services from "@/component/Services";
import TestimonialsBlogs from "@/component/TestimonialsBlogs";
import Footer from "@/component/Footer";
import Navbar from "@/component/Navbar"; 
import ChatBot from "@/component/ChatBot";

export default function Home() {
  return (
    <>
      <Navbar /> 
      <Hero />
      <About />
      <TestimonialsBlogs />
      <ChatBot />
      <Footer />
    </>
  );
}
