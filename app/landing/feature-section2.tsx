"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  useInView,
} from "framer-motion";
import Image from "next/image";

const properties = [
  {
    id: "waterfront",
    title: "Waterfront",
    description:
      "Take a swim on the brim of the rooftop pools, tan closer to the sun",
    image: "https://images.unsplash.com/photo-1540541338287-41700207dee6",
    color: "#e95c33",
  },
  {
    id: "penthouse",
    title: "Penthouse",
    description:
      "Experience luxury living at the highest level with panoramic city views",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
    color: "#3366cc",
  },
  {
    id: "villa",
    title: "Villa",
    description:
      "Secluded privacy with expansive grounds and elegant architecture",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    color: "#6b8e23",
  },
  {
    id: "estate",
    title: "Estate",
    description: "Sprawling luxury compounds with every amenity imaginable",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
    color: "#9932cc",
  },
];

const FeatureSection2 = () => {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const leftSectionRef = useRef<HTMLDivElement>(null);
  const rightSectionRef = useRef<HTMLDivElement>(null);

  const loadedImagesCount = useRef(0);
  const totalImages = properties.length;

  // Handle image loading to prevent FOUC (Flash of Unstyled Content)
  const handleImageLoaded = useCallback(() => {
    loadedImagesCount.current += 1;
    if (loadedImagesCount.current === totalImages) {
      setImagesLoaded(true);
    }
  }, [totalImages]);

  // Check if mobile on mount and on resize
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  // Scroll animation setup
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Generate tilt angles for the cards
  const tiltAngles = properties.map((_, i) => (i % 2 === 0 ? 5 : -5));

  // Update active index based on scroll position
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Calculate which property should be active based on scroll position
    const newIndex = Math.min(
      properties.length - 1,
      Math.max(0, Math.floor(latest * properties.length))
    );

    if (newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  });
  const isInView = useInView(sectionRef, { amount: 0.1 }); // Triggers when 10% is visible

  return (
    <div className="relative bg-white text-black">
      {/* Header */}
      <motion.header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 md:px-12 py-6"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <h1 className="text-3xl md:text-4xl font-light">
          <span className="text-[#e95c33] font-medium">Opulent</span> Abodes
        </h1>
        <button
          className="p-2 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-all"
          aria-label="Menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </motion.header>

      {/* Main Content */}
      <main className="relative mt-[88px] md:mt-0">
        {/* <div className="h-screen"></div> */}
        {/* Properties Section */}
        <div
          ref={sectionRef}
          className="flex w-full flex-col md:flex-row"
          style={{
            height: isMobile ? `${properties.length * 100}vh` : "400vh",
          }}
        >
          {/* Left Section - Images */}
          <motion.div
            ref={leftSectionRef}
            className="w-full md:w-1/2 relative h-[40vh] md:h-screen"
            style={{
              position: "sticky",
              top: isMobile ? "88px" : 0,
              height: isMobile ? "40vh" : "100vh",
            }}
          >
            {/* Loading state */}
            {!imagesLoaded && (
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="w-16 h-16 border-4 border-[#e95c33] border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}

            {/* Property Cards */}
            {properties.map((property, index) => (
              <motion.div
                key={property.id}
                className="absolute flex justify-center w-full h-full"
                initial={{
                  opacity: 0,
                  //scale: 0.9,
                  zIndex: index,
                  y: index === 0 ? 200 : -200 * (index - activeIndex),
                }}
                animate={
                  !isInView
                    ? {}
                    : {
                        opacity: index <= activeIndex ? 1 : 0,
                        //scale: index === activeIndex ? 1 : 0.9,
                        //x:
                        //index === activeIndex
                        // ? 0
                        // : index < activeIndex
                        //   ? -10 * (activeIndex - index)
                        //   : 10 * (index - activeIndex),
                        y:
                          index === activeIndex
                            ? 0
                            : index < activeIndex
                            ? 0
                            : //-0 * (activeIndex - index)
                              200 * (index - activeIndex),
                        //zIndex: properties.length - Math.abs(activeIndex - index),
                      }
                }
                transition={{
                  duration: 0.8,
                  ease: "easeInOut",
                }}
                style={{
                  visibility: imagesLoaded ? "visible" : "hidden",
                  pointerEvents: index === activeIndex ? "auto" : "none",
                }}
              >
                <Image
                  src={property.image || "/placeholder.svg"}
                  alt={property.title}
                  className="w-auto h-full object-cover self-center rounded-3xl border-8 border-white aspect-[3/4] md:h-[60%]"
                  style={{
                    transform: `rotate(${tiltAngles[index]}deg)`,
                  }}
                  width={280}
                  height={600}
                  onLoadingComplete={handleImageLoaded}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Right Section - Text */}
          <motion.div
            ref={rightSectionRef}
            className="w-full md:w-1/2 h-full"
            style={{
              position: "sticky",
              top: isMobile ? "calc(40vh + 88px)" : 0,
              height: isMobile ? "40vh" : "100vh",
            }}
          >
            {properties.map((property, index) => (
              <motion.div
                key={property.id}
                className="absolute w-full h-full"
                initial={{
                  opacity: 0,
                  [isMobile ? "x" : "y"]: isMobile ? "100%" : "50px",
                }}
                animate={{
                  opacity: activeIndex === index ? 1 : 0,
                  [isMobile ? "x" : "y"]:
                    activeIndex === index
                      ? 0
                      : index < activeIndex
                      ? isMobile
                        ? "-100%"
                        : "-50px"
                      : isMobile
                      ? "100%"
                      : "50px",
                }}
                transition={{
                  duration: 0.8,
                  ease: "easeInOut",
                  delay: 0.1,
                }}
              >
                <div className="h-full flex flex-col items-start justify-center px-6 md:px-12">
                  <div
                    className="w-full h-1 mb-6 rounded"
                    style={{ backgroundColor: property.color }}
                  ></div>
                  <h2 className="text-5xl md:text-6xl font-medium mb-4">
                    {property.title}
                  </h2>
                  <p className="text-xl md:text-2xl font-light max-w-md text-gray-500">
                    {property.description}
                  </p>
                  <button
                    className="mt-8 px-6 py-3 rounded-full border-2 hover:bg-white hover:text-black transition-colors duration-300"
                    style={{ borderColor: property.color }}
                  >
                    Explore {property.title} Properties
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Dream Home Section */}
        <div className="relative py-24 px-6 md:px-12 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black/40 z-10"></div>
            <img
              className="w-full h-full object-cover"
              src="https://images.unsplash.com/photo-1616760270512-4a9a4a2d9b2d"
              alt="Luxury estate background"
            />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-5xl md:text-7xl font-bold mb-6">
                  Find Your <span className="text-[#e95c33]">Dream Home</span>
                </h2>
                <p className="text-xl mb-8 max-w-lg">
                  Our exclusive portfolio features only the most prestigious
                  properties in the world's most coveted locations. Let our
                  luxury specialists guide you to your perfect residence.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button className="px-8 py-4 bg-[#e95c33] text-white rounded-full hover:bg-[#d44a22] transition-colors">
                    Schedule Consultation
                  </button>
                  <button className="px-8 py-4 border-2 border-white rounded-full hover:bg-white hover:text-black transition-colors">
                    Browse All Properties
                  </button>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -top-6 -left-6 w-24 h-24 border-t-4 border-l-4 border-[#e95c33]"></div>
                <div className="bg-white/10 backdrop-blur-md p-8 rounded-lg">
                  <h3 className="text-2xl font-medium mb-4">Property Search</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block mb-2 text-sm">Location</label>
                      <select className="w-full p-3 bg-black/50 border border-white/30 rounded-md">
                        <option>Any Location</option>
                        <option>Miami</option>
                        <option>Los Angeles</option>
                        <option>New York</option>
                      </select>
                    </div>
                    <div>
                      <label className="block mb-2 text-sm">
                        Property Type
                      </label>
                      <select className="w-full p-3 bg-black/50 border border-white/30 rounded-md">
                        <option>Any Type</option>
                        <option>Waterfront</option>
                        <option>Penthouse</option>
                        <option>Villa</option>
                        <option>Estate</option>
                      </select>
                    </div>
                    <div>
                      <label className="block mb-2 text-sm">Price Range</label>
                      <select className="w-full p-3 bg-black/50 border border-white/30 rounded-md">
                        <option>Any Price</option>
                        <option>$1M - $5M</option>
                        <option>$5M - $10M</option>
                        <option>$10M+</option>
                      </select>
                    </div>
                    <button className="w-full py-3 bg-[#e95c33] text-white rounded-md hover:bg-[#d44a22] transition-colors">
                      Search Properties
                    </button>
                  </div>
                </div>
                <div className="absolute -bottom-6 -right-6 w-24 h-24 border-b-4 border-r-4 border-[#e95c33]"></div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FeatureSection2;
