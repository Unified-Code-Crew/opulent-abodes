"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
const HeaderSection = () => {
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.from(headerRef.current, {
      y: -100,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
    });
  }, []);
  return (
    <div>
      <header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 md:px-12 py-6 bg-white"
      >
        <h1 className="text-2xl md:text-4xl font-light">
          <span className="text-[#e95c33] font-medium">Opulent</span> Abodes
        </h1>
        <button
          //   ref={menuRef}
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
    </div>
  );
};

export default HeaderSection;
