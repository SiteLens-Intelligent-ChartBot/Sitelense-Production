'use client';
import Image from "next/image";
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const blogPosts = [
  {
    img: "https://picsum.photos/400/250?random=1",
    category: "DJ Techniques",
    title: "The Art of Beatmatching: A Beginner's Guide",
    author: "Anshuman Das",
    date: "10 Sep 2025",
    authorImg: "https://picsum.photos/32/32?random=11",
  },
  {
    img: "https://picsum.photos/400/250?random=2",
    category: "Music Curation",
    title: "How to Build a Killer DJ Set for Any Crowd",
    author: "Ananya Behera",
    date: "09 Sep 2025",
    authorImg: "https://picsum.photos/32/32?random=12",
  },
  {
    img: "https://picsum.photos/400/250?random=3",
    category: "Gear & Tech",
    title: "Choosing Your First DJ Controller: 2025 Edition",
    author: "Jignesh Sahu",
    date: "08 Sep 2025",
    authorImg: "https://picsum.photos/32/32?random=13",
  },
  {
    img: "https://picsum.photos/400/250?random=4",
    category: "Event Spotlight",
    title: "Creating Unforgettable Wedding DJ Nights",
    author: "Ishita Jena",
    date: "07 Sep 2025",
    authorImg: "https://picsum.photos/32/32?random=14",
  },
  {
    img: "https://picsum.photos/400/250?random=5",
    category: "DJ Culture",
    title: "The Evolution of DJing: From Turntables to AI",
    author: "Praval Mohanty",
    date: "06 Sep 2025",
    authorImg: "https://picsum.photos/32/32?random=15",
  },
  {
    img: "https://picsum.photos/400/250?random=6",
    category: "Mixing Secrets",
    title: "Harmonic Mixing: The Key to Seamless Transitions",
    author: "Navya Panda",
    date: "05 Sep 2025",
    authorImg: "https://picsum.photos/32/32?random=16",
  },
  {
    img: "https://picsum.photos/400/250?random=7",
    category: "Performance Tips",
    title: "Reading the Crowd: A DJ's Most Important Skill",
    author: "Aaryamani Pradhan",
    date: "04 Sep 2025",
    authorImg: "https://picsum.photos/32/32?random=17",
  },
  {
    img: "https://picsum.photos/400/250?random=8",
    category: "Business of DJing",
    title: "How to Market Yourself as a Professional DJ",
    author: "Sujata Patra",
    date: "03 Sep 2025",
    authorImg: "https://picsum.photos/32/32?random=18",
  },
  {
    img: "https://picsum.photos/400/250?random=9",
    category: "Sound Engineering",
    title: "Mastering Your Sound: EQ and Effects for DJs",
    author: "Uchadev Naik",
    date: "02 Sep 2025",
    authorImg: "https://picsum.photos/32/32?random=19",
  },
  {
    img: "https://picsum.photos/400/250?random=10",
    category: "Music Discovery",
    title: "Where to Find New Music for Your DJ Sets",
    author: "Malati Swain",
    date: "01 Sep 2025",
    authorImg: "https://picsum.photos/32/32?random=20",
  },
];

const BlogCard = ({ blog, i }) => {
    const { ref, inView } = useInView({
        threshold: 0.2,
        triggerOnce: true,
    });

    // 3D card tilt effect
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const rotateX = useTransform(mouseY, [-150, 150], [7, -7]);
    const rotateY = useTransform(mouseX, [-150, 150], [-7, 7]);

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
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30, scale: inView ? 1 : 0.95 }}
            transition={{ delay: i * 0.1, duration: 0.6, ease: 'easeOut' }}
            className="flex-shrink-0 w-80"
            style={{ perspective: 1000 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <motion.div
                style={{ rotateX, rotateY }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden h-full group transition-all duration-300 ease-in-out hover:shadow-2xl"
            >
                <div className="overflow-hidden">
                    <Image
                        src={blog.img}
                        alt={blog.title}
                        width={400}
                        height={250}
                        className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                    />
                </div>
                <div className="p-5">
                    <p className="text-sm text-[#f45b69] font-bold mb-2 uppercase tracking-wider">
                        {blog.category}
                    </p>
                    <h4 className="font-bold text-xl mb-3 text-gray-900">{blog.title}</h4>
                    <div className="flex items-center gap-3 text-sm text-gray-500 border-t border-gray-100 pt-3">
                        <Image
                            src={blog.authorImg}
                            alt={blog.author}
                            width={32}
                            height={32}
                            className="rounded-full"
                        />
                        <div>
                            <span className="font-semibold">{blog.author}</span> • <span>{blog.date}</span>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default function TestimonialsBlogs() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <motion.section
      id="blogs"
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.8, ease: 'easeOut' } },
      }}
      className="bg-[#fefaf6] py-24 px-6"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900">
            From The <span className="text-[#f45b69]">DJ Booth</span>
          </h2>
          <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
            Insights, tutorials, and stories from the world of DJing.
          </p>
        </div>
        <div className="relative">
            <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-[#fefaf6] to-transparent z-10 pointer-events-none"></div>
            <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-[#fefaf6] to-transparent z-10 pointer-events-none"></div>
            <div className="flex overflow-x-auto space-x-8 py-8 scrollbar-hide -mx-6 px-6">
                {blogPosts.map((blog, i) => (
                    <BlogCard key={i} blog={blog} i={i} />
                ))}
            </div>
        </div>
      </div>
    </motion.section>
  );
}
