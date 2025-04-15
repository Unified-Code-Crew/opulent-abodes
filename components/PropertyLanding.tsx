"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CardStack from "./CardStack";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import FeatureSection from "@/components/FeatureSection";
import FullPageSection from "@/components/FullPageSection";
import Footer from "@/components/Footer";

// Register the ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}

const PropertyLanding = () => {
  const [isMobile, setIsMobile] = useState(false);
  // Add a new state to control the visibility of the component
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);
  const sectionRef = useRef(null);
  const contentWrapperRef = useRef(null);
  const innovationRef = useRef(null);
  const needsSpaceRef = useRef(null);
  const paragraphRef = useRef(null);
  const imageRef = useRef(null);

  // New content refs
  const newContentRef = useRef(null);
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);
  const card3Ref = useRef(null);
  const scrollTriggerRef = useRef(null);
  const animationStateRef = useRef("initial"); // 'initial', 'forwards', 'backwards'

  // Desktop line animation
  const cardsLineRef = useRef(null);

  // Card data for easy rendering
  const cardData = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      label: "RESIDENTIAL",
      title: "Echo Park",
      location: "Los Angeles",
      price: "$750/month",
      details: "1200 sq ft • 2022-2023",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1585100957757-999f791c98ba?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      label: "COMMERCIAL",
      title: "Mid-Century",
      location: "New York",
      price: "$2000/month",
      details: "3500 sq ft • 2023",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1483366774565-c783b9f70e2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      label: "INDUSTRIAL",
      title: "Canary Wharf",
      location: "London",
      price: "£1,800/month",
      details: "5000 sq ft • 2023",
    },
  ];

  // Check if mobile on mount and on resize
  useEffect(() => {
    const checkIfMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  useEffect(() => {
    // Skip animations during server-side rendering
    if (typeof window === "undefined") return;

    // Set initial states immediately before anything is visible
    if (innovationRef.current) {
      gsap.set(innovationRef.current, { x: "-100%", opacity: 0 });
    }
    if (needsSpaceRef.current) {
      gsap.set(needsSpaceRef.current, { x: "100%", opacity: 0 });
    }
    if (paragraphRef.current) {
      gsap.set(paragraphRef.current, { x: 800, opacity: 0 });
    }
    if (imageRef.current) {
      gsap.set(imageRef.current, { y: "100%", opacity: 0 });
    }
    if (newContentRef.current) {
      gsap.set(newContentRef.current, { autoAlpha: 0, display: "none" });
    }

    // Make component visible after initial states are set
    setIsVisible(true);

    // Force a small delay to ensure animations start properly after component mount
    const startDelay = setTimeout(() => {
      const container = containerRef.current;
      const section = sectionRef.current;
      const initialContent = contentWrapperRef.current;
      const innovationText = innovationRef.current;
      const needsSpaceText = needsSpaceRef.current;
      const paragraph = paragraphRef.current;
      const image = imageRef.current;
      const newContent = newContentRef.current;
      const cards = [card1Ref.current, card2Ref.current, card3Ref.current];

      // Desktop elements
      const cardsLine = cardsLineRef.current;

      // Animation speeds
      const initialAnimationSpeed = 1.2; // Original animation speed for first section
      const transitionSpeed = 0.8; // Faster animations for transitions

      // Reset any existing animations
      gsap.set([innovationText, needsSpaceText, paragraph, image], {
        clearProps: "all",
      });

      // Main timeline for the initial animation
      const tl = gsap.timeline();

      // Initial animations - restored to original speed
      tl.fromTo(
        innovationText,
        { x: "-100%", opacity: 0 },
        {
          x: "0%",
          opacity: 1,
          duration: initialAnimationSpeed,
          ease: "power3.out",
        }
      )
        .fromTo(
          needsSpaceText,
          { x: "100%", opacity: 0 },
          {
            x: "0%",
            opacity: 1,
            duration: initialAnimationSpeed,
            ease: "power3.out",
          },
          "-=0.6" // Original overlap
        )
        .fromTo(
          paragraph,
          { x: 800, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
          "-=0.4"
        )
        .fromTo(
          image,
          { y: "100%", opacity: 0 },
          {
            y: "0%",
            opacity: 1,
            duration: initialAnimationSpeed + 0.3,
            ease: "power2.out",
          },
          "-=0.5" // Original overlap
        );

      // Setup initial states for cards and animations
      gsap.set(newContent, { autoAlpha: 0, display: "none" });

      if (!isMobile) {
        // Desktop initial states
        gsap.set(cards, { opacity: 0, y: 100 }); // Start cards below their final position

        // Set up desktop line animation
        if (cardsLine) {
          const pathLength = cardsLine.getTotalLength();
          gsap.set(cardsLine, {
            strokeDasharray: pathLength,
            strokeDashoffset: pathLength,
            opacity: 1,
          });
        }
      }

      // Create forward animation timeline (first section -> cards)
      const forwardTl = gsap.timeline({
        paused: true,
        onComplete: () => {
          console.log("Forward animation complete");
          animationStateRef.current = "completed-forward";
          document.body.style.overflow = ""; // Resume scrolling
        },
      });

      // Common animation for both mobile and desktop - first section exit
      forwardTl
        .to(innovationText, {
          x: "-100%",
          opacity: 0,
          duration: transitionSpeed,
          ease: "power2.in",
        })
        .to(
          needsSpaceText,
          {
            x: "100%",
            opacity: 0,
            duration: transitionSpeed,
            ease: "power2.in",
          },
          "<" // Start at the same time
        )
        .to(
          paragraph,
          { x: 800, opacity: 0, duration: transitionSpeed, ease: "power2.in" },
          "<"
        )
        .to(
          image,
          {
            y: "100%",
            opacity: 0,
            duration: transitionSpeed,
            ease: "power2.in",
          },
          "<" // Start at the same time
        )
        // IMPORTANT: Use set to immediately change display property
        .set(initialContent, { display: "none" })
        .set(newContent, { display: "flex", visibility: "visible" })
        // Then animate in the new content - faster transition
        .to(newContent, { autoAlpha: 1, duration: 0.3, ease: "power2.out" })
        // No pause before starting card animations
        .addLabel("startCardAnimations");

      // Different animations for desktop
      if (!isMobile) {
        // Desktop animation - horizontal line between cards
        forwardTl
          .to(
            cards,
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power2.out",
            },
            "startCardAnimations"
          )
          // Animate the line at the same time as the cards
          .to(
            cardsLine,
            {
              strokeDashoffset: 0,
              duration: 0.8, // Same duration as cards
              ease: "power2.inOut",
            },
            "startCardAnimations" // Start at the same time as cards
          );
      }
      // For mobile, we don't need to add animations here as the CardStack component handles its own animations

      // Create backward animation timeline (cards -> first section)
      const backwardTl = gsap.timeline({
        paused: true,
        onComplete: () => {
          console.log("Backward animation complete");
          animationStateRef.current = "initial";
          document.body.style.overflow = ""; // Resume scrolling
        },
      });

      // Start of backward animation - different for desktop
      if (!isMobile) {
        // Desktop backward animation
        backwardTl
          // Animate all cards back down in sync
          .to(cards, {
            opacity: 0,
            y: 100,
            duration: transitionSpeed,
            ease: "power2.in",
          })
          // Reset the line animation
          .to(
            cardsLine,
            {
              strokeDashoffset: cardsLine ? cardsLine.getTotalLength() : 0,
              duration: transitionSpeed,
              ease: "power2.in",
            },
            "<" // Start at the same time as cards
          );
      }

      // Continue with common backward animation
      backwardTl
        .to(newContent, {
          autoAlpha: 0,
          duration: transitionSpeed,
          ease: "power2.in",
        })
        // IMPORTANT: Use set to immediately change display property
        .set(newContent, { display: "none" })
        .set(initialContent, { display: "block" })
        // Set initial states for first section
        .set(innovationText, { x: "-100%", opacity: 0 })
        .set(needsSpaceText, { x: "100%", opacity: 0 })
        .set(paragraph, { x: 800, opacity: 0 })
        .set(image, { y: "100%", opacity: 0 })
        // Animate first section back in - original speeds
        .to(innovationText, {
          x: "0%",
          opacity: 1,
          duration: initialAnimationSpeed,
          ease: "power3.out",
        })
        .to(
          needsSpaceText,
          {
            x: "0%",
            opacity: 1,
            duration: initialAnimationSpeed,
            ease: "power3.out",
          },
          "-=0.6"
        )
        .to(
          paragraph,
          { x: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
          "-=0.4"
        )
        .to(
          image,
          {
            y: "0%",
            opacity: 1,
            duration: initialAnimationSpeed + 0.3,
            ease: "power2.out",
          },
          "-=0.5"
        );

      // Create the scroll-triggered animation with fixed pinning
      const scrollTrigger = ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: "+=200%", // Longer scroll area to handle both sections
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        scrub: false,

        onUpdate: (self) => {
          // Track scroll direction and position
          const scrollDirection = self.direction;
          const progress = self.progress;

          // Forward animation (first section to cards)
          if (
            scrollDirection > 0 &&
            progress > 0.1 &&
            animationStateRef.current === "initial"
          ) {
            console.log("Triggering forward animation");
            animationStateRef.current = "animating-forward";
            document.body.style.overflow = "hidden"; // Pause scrolling
            forwardTl.play(0);
          }

          // Backward animation (cards to first section)
          if (
            scrollDirection < 0 &&
            progress < 0.9 &&
            animationStateRef.current === "completed-forward"
          ) {
            console.log("Triggering backward animation");
            animationStateRef.current = "animating-backward";
            document.body.style.overflow = "hidden"; // Pause scrolling
            backwardTl.play(0);
          }
        },
      });

      // Store the scrollTrigger reference
      scrollTriggerRef.current = scrollTrigger;

      // Handle window resize for responsive animations
      const handleResize = () => {
        // Refresh ScrollTrigger to account for changes in element dimensions
        if (scrollTriggerRef.current) {
          scrollTriggerRef.current.refresh();
        }
      };

      window.addEventListener("resize", handleResize);

      // Return cleanup function
      return () => {
        if (scrollTrigger) scrollTrigger.kill();
        forwardTl.kill();
        backwardTl.kill();
        tl.kill();
        window.removeEventListener("resize", handleResize);
        document.body.style.overflow = ""; // Ensure scroll is restored
      };
    }, 100); // Small delay to ensure component is fully mounted

    // Clean up the timeout
    return () => {
      clearTimeout(startDelay);
    };
  }, [isMobile]); // Re-run when isMobile changes

  return (
    <>
      <div
        ref={containerRef}
        className={`w-full h-screen relative overflow-hidden transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Initial Content */}
        <div ref={sectionRef} className="w-full h-screen absolute top-0 left-0">
          {/* Content Wrapper - helps with pinning */}
          <div ref={contentWrapperRef} className="w-full h-screen relative">
            {/* Top 50% */}
            <div className="h-1/2 flex flex-col">
              <div className="flex flex-col justify-end px-6 sm:px-10 flex-1">
                <h1
                  ref={innovationRef}
                  className="text-[10vw] sm:text-[5.5vw] font-medium text-black leading-tight font-sans"
                >
                  INNOVATION
                </h1>
              </div>

              <div className="flex flex-col sm:flex-row px-6 sm:px-10 flex-1">
                <div className="w-full sm:w-1/2 flex items-start justify-start pl-2 sm:pl-[5.5vw] mt-2 sm:mt-0">
                  <h1
                    ref={needsSpaceRef}
                    className="text-[10vw] sm:text-[5.5vw] font-medium text-orange-500 leading-tight font-sans"
                  >
                    NEEDS SPACE
                  </h1>
                </div>

                <div className="w-full sm:w-1/2 flex justify-start sm:justify-end mt-4 sm:mt-0">
                  <p
                    ref={paragraphRef}
                    className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-full sm:max-w-[80%] text-left sm:text-right"
                  >
                    Loom is a real estate agency that specializes in buying,
                    selling, renting, and leasing properties.
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom 50%: Image */}
            <div className="h-1/2 w-full relative" ref={imageRef}>
              <Image
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="Architecture"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* New Content (Cards) - Different layouts for mobile and desktop */}
        <div
          ref={newContentRef}
          className="w-full h-screen absolute top-0 left-0 flex justify-center items-center bg-white px-4 py-8"
          style={{ display: "none", visibility: "hidden" }}
        >
          {/* Desktop Layout */}
          {!isMobile && (
            <div className="hidden md:grid grid-cols-3 gap-8 w-full relative items-end px-6 max-w-7xl mx-auto">
              {/* SVG line that weaves between cards - Desktop Only */}
              <div
                className="absolute inset-0 pointer-events-none overflow-visible"
                style={{ zIndex: 5 }}
              >
                <svg
                  className="w-full h-full"
                  viewBox="0 0 1200 400"
                  preserveAspectRatio="none"
                >
                  <path
                    ref={cardsLineRef}
                    d="M0,200 C100,100 200,300 400,200 C600,100 800,300 1200,200"
                    stroke="#E85432"
                    strokeWidth="3"
                    fill="none"
                  />
                </svg>
              </div>

              {/* Card 1 - Above the line */}
              <div
                ref={card1Ref}
                className="flex flex-col bg-gray-100 rounded-2xl overflow-hidden relative"
                style={{ zIndex: 1 }}
              >
                <div className="relative h-80 w-full">
                  <Image
                    src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                    alt="Los Angeles Property"
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute top-4 left-4 bg-white bg-opacity-80 px-3 py-1 text-xs font-medium">
                    RESIDENTIAL
                  </div>
                </div>
                <div className="p-4 bg-white">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-gray-500">
                        Location: Los Angeles
                      </p>
                      <p className="text-sm font-medium">Project: Echo Park</p>
                      <p className="text-sm text-gray-500">
                        Square Footage: 1200 sq ft
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Price: $750/month</p>
                      <p className="text-sm text-gray-500">Year: 2022-2023</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2 - Below the line and taller than other cards */}
              <div
                ref={card2Ref}
                className="flex flex-col bg-gray-100 rounded-2xl overflow-hidden relative"
                style={{ zIndex: 10 }}
              >
                <div className="relative h-[400px] w-full">
                  <Image
                    src="https://images.unsplash.com/photo-1585100957757-999f791c98ba?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="New York Property"
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute top-4 left-4 bg-white bg-opacity-80 px-3 py-1 text-xs font-medium">
                    COMMERCIAL
                  </div>
                </div>
                <div className="p-4 bg-white">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-gray-500">
                        Location: New York
                      </p>
                      <p className="text-sm font-medium">
                        Project: Mid-Century
                      </p>
                      <p className="text-sm text-gray-500">
                        Square Footage: 3500 sq ft
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">
                        Price: $2000/month
                      </p>
                      <p className="text-sm text-gray-500">Year: 2023</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 3 - Above the line */}
              <div
                ref={card3Ref}
                className="flex flex-col bg-gray-100 rounded-2xl overflow-hidden relative"
                style={{ zIndex: 1 }}
              >
                <div className="relative h-80 w-full">
                  <Image
                    src="https://images.unsplash.com/photo-1483366774565-c783b9f70e2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                    alt="London Property"
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute top-4 left-4 bg-white bg-opacity-80 px-3 py-1 text-xs font-medium">
                    INDUSTRIAL
                  </div>
                </div>
                <div className="p-4 bg-white">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-gray-500">Location: London</p>
                      <p className="text-sm font-medium">
                        Project: Canary Wharf
                      </p>
                      <p className="text-sm text-gray-500">
                        Square Footage: 5000 sq ft
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">
                        Price: £1,800/month
                      </p>
                      <p className="text-sm text-gray-500">Year: 2023</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Mobile Layout - Card Stack */}
          {isMobile && (
            <div className="md:hidden flex flex-col w-full h-full justify-center items-center">
              {/* Use the CardStack component for mobile */}
              <CardStack cards={cardData} />
            </div>
          )}
        </div>
      </div>
      <div className="relative">
        <FeatureSection />
        <FullPageSection />
        <Footer />
      </div>
    </>
  );
};

export default PropertyLanding;
