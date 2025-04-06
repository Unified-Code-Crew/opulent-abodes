"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ApartmentSelection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const wheelRef = useRef<HTMLDivElement>(null);
  const textItemsRef = useRef<HTMLDivElement[]>([]);
  const [hasMounted, setHasMounted] = useState(false);

  const apartments = [
    {
      title: "MICRO APARTMENT",
      description:
        "With its convenient location and attractive features, this apartment is the perfect place to call home. An open-concept living and dining area, perfect for entertaining guests or relaxing after a long day.",
      image:
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=300&h=300&q=80",
    },
    {
      title: "STUDIO APARTMENT",
      description:
        "Bright and airy studio with large windows that let in plenty of natural light. The efficient layout maximizes space while providing all the comforts of home in a compact footprint.",
      image:
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=300&h=300&q=80",
    },
    {
      title: "ONE BEDROOM",
      description:
        "This one-bedroom apartment offers the perfect balance of privacy and open space. The separate bedroom provides a quiet retreat, while the living area is ideal for both relaxation and entertaining.",
      image:
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=300&h=300&q=80",
    },
    {
      title: "TWO BEDROOM",
      description:
        "Perfect for roommates or small families, this two-bedroom apartment provides ample space and privacy. Each bedroom is thoughtfully designed with comfort and functionality in mind.",
      image:
        "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=300&h=300&q=80",
    },
    {
      title: "PENTHOUSE",
      description:
        "Experience luxury living at its finest in our penthouse apartment. Featuring premium finishes, expansive living spaces, and breathtaking views, this is truly the pinnacle of urban living.",
      image:
        "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=300&h=300&q=80",
    },
  ];

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (!hasMounted || !sectionRef.current || !wheelRef.current) return;

    const totalSteps = apartments.length;
    const scrollLength = totalSteps * 500; // scroll distance in px
    const anglePerCard = 360 / totalSteps;

    const currentIndex = { value: 0 };

    const snapToStep = (progress: number) => {
      const newIndex = Math.round(progress * (totalSteps - 1));
      if (newIndex !== currentIndex.value) {
        currentIndex.value = newIndex;

        // Rotate the wheel
        gsap.to(wheelRef.current, {
          rotation: -anglePerCard * newIndex,
          duration: 0.5,
          ease: "power2.out",
        });

        // Animate text
        textItemsRef.current.forEach((el, i) => {
          gsap.to(el, {
            opacity: i === newIndex ? 1 : 0,
            y: i === newIndex ? 0 : 50,
            duration: 0.5,
            ease: "power2.out",
          });
        });
      }
    };

    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: `+=${scrollLength}`,
      scrub: true,
      pin: true,
      onUpdate: (self) => {
        snapToStep(self.progress);
      },
      markers: true,
    });

    // Initial show of first text
    gsap.set(textItemsRef.current[0], { opacity: 1, y: 0 });

    return () => {
      st.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [hasMounted, apartments.length]);

  return (
    <div
      ref={sectionRef}
      className="w-screen h-screen overflow-hidden relative font-sans"
    >
      <div className="w-full h-full flex overflow-hidden">
        {/* Left - Text */}
        <div className="w-1/2 h-full flex items-center px-[5%] relative">
          <div className="relative w-full max-w-[500px]">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-8 tracking-tight">
              CHOOSE AN
              <br />
              APARTMENT
            </h1>

            {apartments.map((apartment, i) => (
              <div
                key={i}
                ref={(el) => {
                  if (el) textItemsRef.current[i] = el;
                }}
                className="absolute w-full mt-8 opacity-0"
              >
                <h2 className="text-xl font-semibold mb-4 text-gray-800">
                  {apartment.title}
                </h2>
                <p className="text-base leading-relaxed text-gray-600 mb-8">
                  {apartment.description}
                </p>
                <div className="text-sm text-gray-400">
                  {(i + 1).toString().padStart(2, "0")}:
                  {apartments.length.toString().padStart(2, "0")}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right - Wheel */}
        <div className="w-1/2 h-full relative overflow-hidden">
          {hasMounted && (
            <div
              ref={wheelRef}
              className="absolute origin-center"
              style={{
                top: "50%",
                left: "120%",
                transform: "translate(-50%, -50%)",
                width: 0,
                height: 0,
              }}
            >
              {apartments.map((apartment, i) => {
                const angle = (360 / apartments.length) * i;
                const radius = 450;
                const x = -radius * Math.cos((angle * Math.PI) / 180);
                const y = -radius * Math.sin((angle * Math.PI) / 180);

                return (
                  <div
                    key={i}
                    className="absolute w-[300px] h-[400px] flex justify-center items-center"
                    style={{
                      left: `${x}px`,
                      top: `${y}px`,
                      transform: `translate(-50%, -50%) rotate(${angle}deg)`,
                    }}
                  >
                    <div className="w-full h-full rounded-2xl overflow-hidden shadow-md relative bg-white">
                      <div className="absolute top-2.5 left-2.5 bg-white/80 px-2 py-1 rounded text-xs font-semibold z-10">
                        {apartment.title}
                      </div>
                      <Image
                        src={apartment.image}
                        alt={apartment.title}
                        width={200}
                        height={300}
                        className="rounded-lg object-cover w-full h-full"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
