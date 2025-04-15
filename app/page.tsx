"use client"
import { useState, useEffect } from "react"
import PropertyLanding from "@/components/PropertyLanding"
import AnimatedLogo from "@/components/AnimatedLogo"

export default function Home() {
  const [showIntro, setShowIntro] = useState(true)
  const [showLanding, setShowLanding] = useState(false)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    const fadeOutTimer = setTimeout(() => setFadeOut(true), 4000)
    const completeTimer = setTimeout(() => {
      setShowIntro(false)
      setTimeout(() => setShowLanding(true), 300)
    }, 4500)

    return () => {
      clearTimeout(fadeOutTimer)
      clearTimeout(completeTimer)
    }
  }, [])

  return (
    <div className="overflow-x-hidden">
      {showIntro && (
        <div className={`transition-opacity duration-500 ${fadeOut ? "opacity-0" : "opacity-100"}`}>
          <AnimatedLogo />
        </div>
      )}

      {showLanding && (
        <>
          <PropertyLanding />
        </>
      )}
    </div>
  )
}
