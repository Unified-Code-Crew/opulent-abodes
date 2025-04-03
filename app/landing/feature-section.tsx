"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Image from "next/image";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

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

const FeatureSection = () => {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLButtonElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftSectionRef = useRef<HTMLDivElement>(null);
  const rightSectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const textSectionsRef = useRef<(HTMLDivElement | null)[]>([]);
  const loadedImagesCount = useRef(0);
  const totalImages = properties.length;
  const customLineRef = useRef<SVGPathElement>(null);
  const customLineAnimated = useRef(false);
  const svgContainerRef = useRef<HTMLDivElement>(null);

  // Handle image loading to prevent FOUC (Flash of Unstyled Content)
  const handleImageLoaded = useCallback(() => {
    loadedImagesCount.current += 1;
    if (loadedImagesCount.current === properties.length) {
      setImagesLoaded(true);
    }
  }, []);

  // Initialize animations after all images are loaded
  useEffect(() => {
    if (!imagesLoaded) return;

    const mm = gsap.matchMedia(); // Initialize matchMedia

    mm.add(
      {
        isDesktop: "(min-width: 768px)", // Define a media query for medium and larger screens
        isMobile: "(max-width: 767px)", // Define a media query for mobile screens
      },
      (context) => {
        const { isDesktop, isMobile } = context.conditions;
        const navbarHeight = headerRef.current
          ? headerRef.current.offsetHeight
          : 0;

        const ctx = gsap.context(() => {
          if (isDesktop) {
            // Set up the custom line initial state
            if (customLineRef.current) {
              gsap.set(customLineRef.current, {
                strokeDasharray: customLineRef.current.getTotalLength(),
                strokeDashoffset: customLineRef.current.getTotalLength(),
                opacity: 0,
              });
            }

            // Desktop-specific animations
            gsap.from(headerRef.current, {
              y: -100,
              opacity: 0,
              duration: 1.2,
              ease: "power3.out",
            });

            gsap.set(cardsRef.current, { autoAlpha: 0, yPercent: 101 });
            gsap.set(textSectionsRef.current, { autoAlpha: 0, y: 0 });

            // Animate the first card
            gsap.to(cardsRef.current[0], {
              autoAlpha: 1,
              yPercent: 0,
              rotation: -5,
              duration: 1.5,
              ease: "power2.out",
            });

            // Animate the custom line with the first card
            if (customLineRef.current && !customLineAnimated.current) {
              gsap.to(customLineRef.current, {
                strokeDashoffset: 0,
                opacity: 1,
                duration: 2,
                ease: "power2.inOut",
                onComplete: () => {
                  customLineAnimated.current = true;
                },
              });
            }

            gsap.to(textSectionsRef.current[0], {
              autoAlpha: 1,
              y: 0,
              duration: 1.5,
              delay: 0.2,
              ease: "power2.out",
            });

            properties.forEach((_, index) => {
              const scrollStart = `${index * 15}%`;
              const scrollEnd = `${(index + 1) * 15}%`;

              ScrollTrigger.create({
                trigger: sectionRef.current,
                start: scrollStart,
                end: scrollEnd,
                scrub: 0.5,
                onEnter: () => {
                  if (index === 0) return;
                  const rotation = index % 2 === 0 ? -5 : 5;
                  gsap.to(cardsRef.current[index], {
                    autoAlpha: 1,
                    yPercent: 0,
                    rotation,
                    duration: 0.8,
                    ease: "power2.out",
                  });

                  gsap.to(textSectionsRef.current[index], {
                    autoAlpha: 1,
                    yPercent: -100 * index,
                    duration: 0.8,
                    ease: "power2.out",
                  });

                  if (index > 0) {
                    gsap.to(textSectionsRef.current[index - 1], {
                      autoAlpha: 0,
                      yPercent: -100 * (index + 1),
                      duration: 0.8,
                      ease: "power2.in",
                    });
                  }
                },
                onLeaveBack: () => {
                  const reverserotation = 2 * (index % 2 === 0 ? 5 : -5);

                  if (index === 0) return;

                  gsap.to(cardsRef.current[index], {
                    autoAlpha: 0,
                    yPercent: 101,
                    rotation: reverserotation,
                    duration: 0.8,
                    ease: "power2.in",
                  });

                  gsap.to(textSectionsRef.current[index], {
                    autoAlpha: 0,
                    yPercent: 100 * index,
                    duration: 0.8,
                    ease: "power2.in",
                  });

                  if (index > 0) {
                    gsap.to(textSectionsRef.current[index - 1], {
                      autoAlpha: 1,
                      yPercent: 100 * (-index + 1),
                      duration: 0.8,
                      ease: "power2.out",
                    });
                  }
                },
              });
            });

            ScrollTrigger.create({
              trigger: sectionRef.current,
              start: "top top",
              end: "bottom bottom",
              pin: leftSectionRef.current,
            });

            ScrollTrigger.create({
              trigger: sectionRef.current,
              start: "top top",
              end: "bottom bottom",
              pin: rightSectionRef.current,
            });

            // Pin the SVG container with the section
            if (svgContainerRef.current) {
              ScrollTrigger.create({
                trigger: sectionRef.current,
                start: "top top",
                end: "bottom bottom",
                pin: svgContainerRef.current,
              });
            }
          } else if (isMobile) {
            // Mobile-specific animations
            gsap.from(headerRef.current, {
              y: -100,
              opacity: 0,
              duration: 1.2,
              ease: "power3.out",
            });

            // Set initial states for mobile animations (right to left)
            properties.forEach((_, index) => {
              // Even index = card comes from the right, text from the left
              // Odd index  = card comes from the left,  text from the right
              const cardFrom = index % 2 === 0 ? 101 : -101;
              const textFrom = index % 2 === 0 ? -101 : 101;

              gsap.set(cardsRef.current[index], {
                autoAlpha: 0,
                xPercent: cardFrom,
                display: "none", // Hide initially
              });
              gsap.set(textSectionsRef.current[index], {
                autoAlpha: 0,
                xPercent: textFrom,
                display: "none",
              });
            });
            // 2. Animate first card and text in
            gsap.set(cardsRef.current[0], { display: "flex" });
            gsap.to(cardsRef.current[0], {
              autoAlpha: 1,
              xPercent: 0,
              rotation: -5,
              duration: 1.5,
              ease: "power2.out",
            });
            gsap.set(textSectionsRef.current[0], { display: "block" });
            gsap.to(textSectionsRef.current[0], {
              autoAlpha: 1,
              xPercent: 0,
              duration: 1.5,
              delay: 0.2,
              ease: "power2.out",
            });

            // Set up scroll animations for each property
            properties.forEach((_, index) => {
              const scrollStart = `${index * 15}%`;
              const scrollEnd = `${(index + 1) * 15}%`;

              ScrollTrigger.create({
                trigger: sectionRef.current,
                start: scrollStart,
                end: scrollEnd,
                scrub: 0.5,
                onEnter: () => {
                  const rotation = index % 2 === 0 ? -5 : 5;

                  if (index === 0) return;

                  // Current card in (from left/right depending on index)
                  gsap.set(cardsRef.current[index], { display: "flex" });
                  gsap.to(cardsRef.current[index], {
                    autoAlpha: 1,
                    xPercent: 0,
                    rotation,
                    duration: 0.8,
                    ease: "power2.out",
                  });
                  gsap.set(textSectionsRef.current[index], {
                    display: "block",
                  });
                  gsap.to(textSectionsRef.current[index], {
                    autoAlpha: 1,
                    xPercent: 0,
                    duration: 0.8,
                    ease: "power2.out",
                    delay: 0.4,
                  });
                  if (index > 0) {
                    gsap.to(textSectionsRef.current[index - 1], {
                      autoAlpha: 0,
                      xPercent: (index - 1) % 2 === 0 ? -101 : 101,
                      duration: 0.8,
                      ease: "power2.in",
                      onComplete: () => {
                        gsap.set(textSectionsRef.current[index - 1], {
                          display: "none",
                        });
                      },
                    });
                  }
                },
                onLeaveBack: () => {
                  if (index === 0) return;
                  const reverseRotation = 2 * (index % 2 === 0 ? 5 : -5);

                  // Animate current card out to right
                  gsap.to(cardsRef.current[index], {
                    autoAlpha: 0,
                    xPercent: index % 2 === 0 ? 101 : -101,
                    rotation: reverseRotation,
                    duration: 0.8,
                    ease: "power2.in",
                    onComplete: () => {
                      gsap.set(cardsRef.current[index], { display: "none" });
                    },
                  });

                  // Animate current text out to left
                  gsap.to(textSectionsRef.current[index], {
                    autoAlpha: 0,
                    xPercent: index % 2 === 0 ? -101 : 101,
                    duration: 0.8,
                    ease: "power2.in",
                    onComplete: () => {
                      gsap.set(textSectionsRef.current[index], {
                        display: "none",
                      });
                    },
                  });

                  if (index > 0) {
                    // Show previous text and animate it back in from left
                    gsap.set(textSectionsRef.current[index - 1], {
                      display: "block",
                    });
                    gsap.to(textSectionsRef.current[index - 1], {
                      autoAlpha: 1,
                      xPercent: 0,
                      duration: 0.8,
                      ease: "power2.out",
                      delay: 0.4,
                    });
                  }
                },
              });
            });

            // Pin sections for mobile
            ScrollTrigger.create({
              trigger: sectionRef.current,
              start: `top-=${navbarHeight}px top`,
              end: `bottom-=${navbarHeight} bottom`,
              pin: leftSectionRef.current,
            });

            ScrollTrigger.create({
              trigger: sectionRef.current,
              start: `top-=${navbarHeight} top`,
              end: `bottom-=${navbarHeight} bottom`,
              pin: rightSectionRef.current,
            });
          }
        });

        return () => ctx.revert();
      }
    );

    return () => {
      mm.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [imagesLoaded]);

  // Generate tilt angles for the cards
  const tiltAngles = useMemo(
    () => properties.map((_, i) => (i % 2 === 0 ? 5 : -5)),
    [properties]
  );

  return (
    <div className="relative bg-white text-black">
      {/* Header */}
      <header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 md:px-12 py-6 bg-white"
      >
        <h1 className="text-2xl md:text-4xl font-light">
          <span className="text-[#e95c33] font-medium">Opulent</span> Abodes
        </h1>
        <button
          ref={menuRef}
          className="p-2 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-all"
          aria-label="Menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24px"
            height="24px"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-[1.5rem] h-[1.5rem] md:w-[2rem] md:h-[2rem]"
          >
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </header>

      {/* Main Content */}
      <main className="relative h-screen mt-[65px] md:mt-0">
        {/* Properties Section */}
        <div
          className="sectionRef flex w-full md:h-auto flex-col md:flex-row h-[400vh] min-h-[400vh] max-h-[400vh] relative"
          ref={sectionRef}
        >
          {/* Custom SVG Line - Desktop Only - Inside the section */}
          <div
            ref={svgContainerRef}
            className={`absolute top-0 left-0 w-full h-80vh z-20 pointer-events-none hidden md:block mt-[100px] ${
              !imagesLoaded
                ? "opacity-0"
                : "opacity-100 transition-opacity duration-500"
            }`}
            style={{ height: "80vh" }}
          >
            <svg
              className="w-full h-full"
              viewBox="0 0 1433 785"
              preserveAspectRatio="none"
              fill="none"
            >
              <path
                ref={customLineRef}
                d="M1.37674 179.558C272.335 -15.2288 393.385 152.317 420.04 260.438C449.601 392.026 412.067 639.341 366.609 727.764C309.787 838.294 283.963 762.596 295 694C304.632 634.137 382.639 210.76 802.879 77.5545C1014.56 10.4561 1382.74 -12.7566 1537.04 12.2127"
                stroke="#E85432"
                strokeWidth="3"
                opacity="0"
              />
            </svg>
          </div>

          {/* Left Section - Images */}
          <div
            className="leftSectionRef w-full md:w-1/2 relative h-[50vh] md:h-screen"
            ref={leftSectionRef}
          >
            {/* Initial loading state - hide all cards until images load */}
            {!imagesLoaded && (
              <div
                className={`absolute inset-0 flex items-center justify-center z-10 transition-opacity duration-500 ${
                  imagesLoaded ? "opacity-0 pointer-events-none" : "opacity-100"
                }`}
              >
                <div className="w-16 h-16 border-4 border-[#e95c33] border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}

            {/* Property Cards */}
            {properties.map((property, index) => (
              <div
                key={property.id}
                className="cardsRef absolute flex justify-center w-full h-full"
                ref={(el) => (cardsRef.current[index] = el)}
                style={{
                  visibility: imagesLoaded ? "visible" : "hidden",
                  transform: `rotate(${
                    tiltAngles[index] + (index % 2 === 0 ? 1 : -1) * 5
                  }deg)`,
                  zIndex: index === 0 ? 10 : 30 + index, // First card z-index 10, line is 20, second card is 32, etc.
                }}
              >
                <Image
                  src={property.image || "/placeholder.svg"}
                  alt={property.title}
                  className="w-auto h-[90%] md:h-[70%] object-cover self-center rounded-3xl border-8 border-white aspect-[3/4]"
                  width={280}
                  height={600}
                  onLoadingComplete={handleImageLoaded}
                />
              </div>
            ))}
          </div>

          {/* Right Section - Text */}
          <div
            className="w-full md:w-1/2 md:h-full relative h-[50vh] "
            ref={rightSectionRef}
          >
            {properties.map((property, index) => (
              <div
                key={property.id}
                className="absolute inset-0 h-[50vh] min-h-[50vh] max-w-[50vh] md:relative md:h-screen w-screen min-w-screen md:w-auto md:min-w-max"
                ref={(el) => (textSectionsRef.current[index] = el)}
                style={{ visibility: imagesLoaded ? "visible" : "hidden" }}
              >
                <div className="h-full flex flex-col items-center justify-start px-6 md:px-12 md:justify-center md:items-start mb-30 md:mb-0">
                  <h2 className="text-3xl md:text-4xl font-medium mb-4">
                    {property.title}
                  </h2>
                  <p className="text-sm md:text-lg font-light max-w-md text-gray-500 text-center md:text-left">
                    {property.description}
                    {property.description}
                    {property.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative py-24 px-6 md:px-12 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black/40 z-10"></div>
            <img
              className="w-full h-full object-cover"
              src="https://images.unsplash.com/photo-1540541338287-41700207dee6"
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
        {/* Scroll Indicator */}
        <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 z-50 flex flex-col items-center">
          <div className="w-8 h-14 rounded-full border-2 border-[#e95c33] flex justify-center overflow-hidden mb-2">
            <div
              className="w-1 h-1 bg-[#e95c33] rounded-full mt-3"
              ref={(el) => {
                if (el && imagesLoaded) {
                  gsap.to(el, {
                    height: 15,
                    duration: 0.6,
                    repeat: -1,
                    yoyo: true,
                    ease: "power1.inOut",
                  });
                }
              }}
            />
          </div>
          <span className="text-1xl text-[#e95c33]">Scroll</span>
        </div>
      </main>
    </div>
  );
};

export default FeatureSection;
