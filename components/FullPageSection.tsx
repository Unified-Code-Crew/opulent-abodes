"use client"
import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

// Section data
const sections = [
  {
    id: "section1",
    title: "Luxury Living",
    subtitle: "Exclusive Properties",
    description:
      "Experience the epitome of luxury with our handpicked selection of premium properties in the most sought-after locations.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
    stats: [
      { number: "250+", label: "Properties" },
      { number: "15+", label: "Years Experience" },
    ],
  },
  {
    id: "section2",
    title: "Waterfront Estates",
    subtitle: "Ocean View Living",
    description:
      "Wake up to breathtaking ocean views in our exclusive waterfront properties. Private beaches and marina access available.",
    image: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf",
    stats: [
      { number: "45+", label: "Waterfront Homes" },
      { number: "12", label: "Private Beaches" },
    ],
  },
  {
    id: "section3",
    title: "Urban Penthouses",
    subtitle: "City Skyline Views",
    description:
      "Elevate your lifestyle with our premium penthouses offering panoramic city views and unparalleled luxury amenities.",
    image: "https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e",
    stats: [
      { number: "80+", label: "Penthouses" },
      { number: "24/7", label: "Concierge" },
    ],
  },
  {
    id: "section4",
    title: "Country Estates",
    subtitle: "Private Retreats",
    description:
      "Escape to tranquility with our secluded country estates featuring expansive grounds, private lakes, and luxury amenities.",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6",
    stats: [
      { number: "100+", label: "Acres Available" },
      { number: "95%", label: "Client Satisfaction" },
    ],
  },
]

const FullPageSection = () => {
  const [activeSection, setActiveSection] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isPinned, setIsPinned] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const sectionsContainerRef = useRef<HTMLDivElement>(null)
  const indicatorsRef = useRef<(HTMLDivElement | null)[]>([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [imagesLoaded, setImagesLoaded] = useState(0)
  const scrollTriggerRef = useRef<any>(null)
  const lastScrollTime = useRef<number>(0)
  const scrollThreshold = 800 // ms between scroll events
  const contentRefs = useRef<(HTMLDivElement | null)[]>([])
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([])
  const observersRef = useRef<(MutationObserver | null)[]>([])

  // Track image loading
  useEffect(() => {
    if (imagesLoaded === sections.length) {
      setIsLoaded(true)
    }
  }, [imagesLoaded])

  const handleImageLoaded = () => {
    setImagesLoaded((prev) => prev + 1)
  }

  // Update indicators when active section changes
  useEffect(() => {
    if (!isLoaded) return

    const indicators = indicatorsRef.current.filter(Boolean)

    // Update all indicators based on active section
    indicators.forEach((indicator, i) => {
      gsap.to(indicator, {
        backgroundColor: i === activeSection ? "#e95c33" : "#ffffff",
        scale: i === activeSection ? 2.5 : 1,
        duration: 0.3,
      })
    })

    // Force all content elements to their correct state
    contentRefs.current.forEach((content, i) => {
      if (!content) return

      // Use GSAP for more reliable animation control
      gsap.to(content, {
        opacity: i === activeSection ? 1 : 0,
        visibility: i === activeSection ? "visible" : "hidden",
        y: i === activeSection ? 0 : 30,
        duration: 0.6,
        ease: "power2.out",
        overwrite: "auto", // This ensures this animation takes precedence
      })
    })
  }, [activeSection, isLoaded])

  // Function to navigate to a specific section with improved animations
  const navigateToSection = (index: number, animate = true) => {
    if (
      (isAnimating && animate) ||
      index === activeSection ||
      index < 0 ||
      index >= sections.length ||
      !sectionsContainerRef.current
    )
      return

    if (animate) {
      setIsAnimating(true)
    }

    // Use GSAP for the outgoing content
    if (contentRefs.current[activeSection]) {
      gsap.to(contentRefs.current[activeSection], {
        opacity: 0,
        y: index > activeSection ? -30 : 30,
        duration: 0.4,
        ease: "power2.in",
        overwrite: "auto",
      })
    }

    // Move the sections container
    gsap.to(sectionsContainerRef.current, {
      y: `-${index * 100}vh`,
      duration: animate ? 1.0 : 0,
      ease: "sine.inOut",
      onComplete: () => {
        // Update active section
        setActiveSection(index)

        // Use GSAP for the incoming content
        if (contentRefs.current[index]) {
          gsap.to(contentRefs.current[index], {
            opacity: 1,
            visibility: "visible",
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            overwrite: "auto",
          })
        }

        // Allow new animations after a delay
        setTimeout(() => {
          setIsAnimating(false)
        }, 100)
      },
    })
  }

  // Handle click on indicators
  const handleIndicatorClick = (index: number) => {
    if (!isAnimating && index !== activeSection) {
      navigateToSection(index)
    }
  }

  // Initialize component
  useEffect(() => {
    if (!isLoaded) return

    // Clean up any existing observers
    observersRef.current.forEach((observer) => observer?.disconnect())
    observersRef.current = []

    // We don't need to set up new observers with our improved GSAP approach

    return () => {
      observersRef.current.forEach((observer) => observer?.disconnect())
    }
  }, [activeSection, isLoaded])

  // Initialize component
  useEffect(() => {
    if (!isLoaded || !containerRef.current || !sectionsContainerRef.current) return

    const container = containerRef.current

    // Set initial content states with GSAP
    contentRefs.current.forEach((content, i) => {
      if (!content) return

      gsap.set(content, {
        opacity: i === 0 ? 1 : 0,
        visibility: i === 0 ? "visible" : "hidden",
        y: i === 0 ? 0 : 30,
      })
    })

    // Create a ScrollTrigger to detect when the section is pinned at the top
    scrollTriggerRef.current = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: "+=400%",
      pin: true,
      onEnter: () => {
        setIsPinned(true)
      },
      onLeaveBack: () => {
        setIsPinned(false)
        // Reset to first section when leaving back
        if (activeSection !== 0) {
          navigateToSection(0, false)
        }
      },
    })

    // Handle wheel events for section navigation with improved handling
    const handleWheel = (e: WheelEvent) => {
      // Only process if we're within the container's bounds
      const containerRect = container.getBoundingClientRect()
      const isInViewport = containerRect.top <= 0 && containerRect.bottom >= 0

      if (!isInViewport || !isPinned) return

      // Throttle scroll events for smoother transitions
      const now = Date.now()
      if (now - lastScrollTime.current < scrollThreshold) {
        e.preventDefault()
        return
      }

      // If already animating, prevent default and return
      if (isAnimating) {
        e.preventDefault()
        return
      }

      // Determine scroll direction
      const direction = e.deltaY > 0 ? 1 : -1

      // If we're at the first section and trying to scroll up, allow normal page scrolling
      if (activeSection === 0 && direction < 0) {
        return
      }

      // If we're at the last section and trying to scroll down, allow normal page scrolling
      if (activeSection === sections.length - 1 && direction > 0) {
        return
      }

      // Otherwise handle our custom section navigation
      e.preventDefault()
      lastScrollTime.current = now

      const nextSection = Math.min(Math.max(activeSection + direction, 0), sections.length - 1)
      if (nextSection !== activeSection) {
        navigateToSection(nextSection)
      }
    }

    // Handle touch events for mobile with improved handling
    let touchStartY = 0
    let touchEndY = 0
    let touchStartTime = 0

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY
      touchStartTime = Date.now()
    }

    const handleTouchMove = (e: TouchEvent) => {
      // Store current touch position
      touchEndY = e.touches[0].clientY
    }

    const handleTouchEnd = () => {
      // Only process if we're within the container's bounds
      const containerRect = container.getBoundingClientRect()
      const isInViewport = containerRect.top <= 0 && containerRect.bottom >= 0

      if (!isInViewport || !isPinned || isAnimating) return

      const touchDuration = Date.now() - touchStartTime
      const direction = touchStartY - touchEndY > 0 ? 1 : -1

      // If at the first section and swiping up, allow normal scrolling
      if (activeSection === 0 && direction < 0) {
        return
      }

      // If at the last section and swiping down, allow normal scrolling to footer
      if (activeSection === sections.length - 1 && direction > 0) {
        return
      }

      // Only trigger if the swipe is significant enough and fast enough
      if (Math.abs(touchStartY - touchEndY) > 50 && touchDuration < 300) {
        const nextSection = Math.min(Math.max(activeSection + direction, 0), sections.length - 1)
        if (nextSection !== activeSection) {
          navigateToSection(nextSection)
        }
      }
    }

    // Add event listeners
    window.addEventListener("wheel", handleWheel, { passive: false })
    container.addEventListener("touchstart", handleTouchStart, { passive: true })
    container.addEventListener("touchmove", handleTouchMove, { passive: true })
    container.addEventListener("touchend", handleTouchEnd, { passive: true })

    return () => {
      window.removeEventListener("wheel", handleWheel)
      container.removeEventListener("touchstart", handleTouchStart)
      container.removeEventListener("touchmove", handleTouchMove)
      container.removeEventListener("touchend", handleTouchEnd)

      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill()
      }

      // Clean up observers
      observersRef.current.forEach((observer) => observer?.disconnect())
    }
  }, [isLoaded, activeSection, isAnimating, isPinned])

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-black" style={{ height: "100vh" }}>
      {/* Loading indicator */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center z-50 bg-black">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Sections container - this will move up/down */}
      <div
        ref={sectionsContainerRef}
        className="absolute left-0 w-full"
        style={{ height: `${sections.length * 100}vh` }}
      >
        {/* All sections stacked vertically */}
        {sections.map((section, index) => (
          <div
            key={section.id}
            ref={(el) => (sectionRefs.current[index] = el)}
            className="relative w-full h-screen"
            style={{ position: "absolute", top: `${index * 100}vh`, left: 0, right: 0 }}
          >
            {/* Background image */}
            <Image
              src={section.image || "/placeholder.svg"}
              alt={section.title}
              fill
              priority
              className="object-cover"
              onLoadingComplete={handleImageLoaded}
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black opacity-60"></div>

            {/* Content */}
            <div
              ref={(el) => (contentRefs.current[index] = el)}
              className="absolute inset-0 flex items-center justify-center z-10"
              style={{
                opacity: index === 0 ? 1 : 0,
                visibility: index === 0 ? "visible" : "hidden",
              }}
            >
              <div className="container mx-auto px-6 md:px-12 text-center">
                <h2 className="text-4xl md:text-6xl font-medium text-white mb-4">{section.title}</h2>
                <h3 className="text-xl md:text-2xl font-medium text-orange-500 mb-6">{section.subtitle}</h3>
                <p className="text-white text-base md:text-lg max-w-2xl mx-auto mb-8 opacity-90">
                  {section.description}
                </p>
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-md transition-colors duration-300 font-medium">
                  Explore Properties
                </button>

                {/* Stats section */}
                <div className="mt-16 grid grid-cols-2 gap-6 md:gap-12 w-full max-w-md mx-auto">
                  {section.stats.map((stat, statIndex) => (
                    <div key={statIndex} className="flex flex-col items-center">
                      <span className="text-3xl md:text-4xl font-bold text-orange-500 mb-2">{stat.number}</span>
                      <span className="text-sm md:text-base text-white opacity-80">{stat.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Section indicators - fixed position for better visibility */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 flex flex-col gap-4 z-20">
        {sections.map((_, index) => (
          <div
            key={`indicator-${index}`}
            ref={(el) => (indicatorsRef.current[index] = el)}
            className="w-1 h-1 rounded-full bg-white cursor-pointer transition-all duration-300"
            onClick={() => handleIndicatorClick(index)}
          ></div>
        ))}
      </div>

      {/* Scroll indicator - show on all sections */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-white z-20">
        <span className="text-sm mb-2">Scroll to explore</span>
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
          className="animate-bounce"
        >
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>
    </div>
  )
}

export default FullPageSection
