"use client"
import { useEffect, useRef, useState } from "react"
import type React from "react"

import Image from "next/image"
import gsap from "gsap"

interface CardData {
  id: number
  image: string
  label: string
  title: string
  location: string
  price: string
  details: string
}

interface CardStackProps {
  cards: CardData[]
}

const CardStack: React.FC<CardStackProps> = ({ cards }) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const stackContainerRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)

  // Initialize the card stack
  useEffect(() => {
    if (!stackContainerRef.current || cards.length === 0 || isInitialized) return

    // Set initial positions for the cards
    cardRefs.current.forEach((card, index) => {
      if (!card) return

      // Initial stacked position
      gsap.set(card, {
        y: -10 * (cards.length - index - 1),
        rotationZ: (index - cards.length / 2) * 1.5,
        scale: 1 - 0.05 * (cards.length - index - 1),
        opacity: index === cards.length - 1 ? 1 : 0.85 - 0.1 * (cards.length - index - 1),
        zIndex: index,
        transformOrigin: "center bottom",
      })
    })

    setIsInitialized(true)
  }, [cards, isInitialized])

  // Handle tap/touch on the card stack
  const handleCardTap = () => {
    if (isAnimating || activeIndex >= cards.length - 1) return
    setIsAnimating(true)

    // Get current and next card
    const currentCard = cardRefs.current[cards.length - 1 - activeIndex]

    // Create animation timeline
    const tl = gsap.timeline({
      onComplete: () => {
        setActiveIndex(activeIndex + 1)
        setIsAnimating(false)
      },
    })

    // Animate current card out
    tl.to(currentCard, {
      x: activeIndex % 2 === 0 ? "120%" : "-120%",
      y: -100,
      rotation: activeIndex % 2 === 0 ? 15 : -15,
      opacity: 0,
      scale: 0.8,
      duration: 0.7,
      ease: "power2.out",
    })

    // Animate remaining cards to move up in the stack
    for (let i = cards.length - 2 - activeIndex; i >= 0; i--) {
      const card = cardRefs.current[i]
      if (!card) continue

      tl.to(
        card,
        {
          y: -10 * (cards.length - i - 1 - (activeIndex + 1)),
          rotationZ: (i - (cards.length - (activeIndex + 1) - 1) / 2) * 1.5,
          scale: 1 - 0.05 * (cards.length - i - 1 - (activeIndex + 1)),
          opacity: i === cards.length - 2 - activeIndex ? 1 : 0.85 - 0.1 * (cards.length - i - 1 - (activeIndex + 1)),
          duration: 0.5,
          ease: "power1.out",
        },
        "-=0.5",
      )
    }

    timelineRef.current = tl
  }

  // Reset the card stack
  const resetStack = () => {
    if (isAnimating) return
    setIsAnimating(true)

    const tl = gsap.timeline({
      onComplete: () => {
        setActiveIndex(0)
        setIsAnimating(false)
      },
    })

    // Reset all cards to their initial positions
    cardRefs.current.forEach((card, index) => {
      if (!card) return

      tl.to(
        card,
        {
          x: 0,
          y: -10 * (cards.length - index - 1),
          rotationZ: (index - cards.length / 2) * 1.5,
          scale: 1 - 0.05 * (cards.length - index - 1),
          opacity: index === cards.length - 1 ? 1 : 0.85 - 0.1 * (cards.length - index - 1),
          duration: 0.5,
          ease: "power1.inOut",
        },
        index * 0.1,
      )
    })

    timelineRef.current = tl
  }

  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <div
        ref={stackContainerRef}
        className="relative w-full max-w-sm h-[500px] mx-auto cursor-pointer"
        onClick={activeIndex >= cards.length - 1 ? resetStack : handleCardTap}
      >
        {/* Card Stack */}
        {cards.map((card, index) => (
          <div
            key={card.id}
            ref={(el) => (cardRefs.current[index] = el)}
            className="absolute inset-0 bg-white rounded-2xl overflow-hidden shadow-lg"
          >
            <div className="relative h-72 w-full">
              <Image
                src={card.image || "/placeholder.svg"}
                alt={`${card.location} Property`}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute top-4 left-4 bg-white bg-opacity-80 px-3 py-1 text-xs font-medium">
                {card.label}
              </div>
            </div>
            <div className="p-6 bg-white flex-1">
              <h3 className="font-medium text-xl mb-3">{card.title}</h3>
              <div className="flex justify-between items-center mb-4">
                <p className="text-gray-500">{card.location}</p>
                <p className="font-medium text-orange-500">{card.price}</p>
              </div>
              <p className="text-gray-500">{card.details}</p>
            </div>
          </div>
        ))}

        {/* Tap instruction */}
        <div className="absolute inset-x-0 bottom-[-40px] text-center text-sm text-gray-400">
          {activeIndex >= cards.length - 1 ? "Tap to reset stack" : "Tap to reveal next property"}
        </div>

        {/* Progress indicators */}
        <div className="absolute inset-x-0 bottom-[-70px] flex justify-center space-x-2">
          {cards.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                cards.length - 1 - activeIndex <= index ? "bg-orange-500" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default CardStack
