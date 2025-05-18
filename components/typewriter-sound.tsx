"use client"

import { useState, useEffect, useRef } from "react"

interface TypewriterSoundProps {
  isTyping: boolean
  volume?: number
}

export function TypewriterSound({ isTyping, volume = 0.3 }: TypewriterSoundProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    // Create audio element if it doesn't exist
    if (!audioRef.current) {
      audioRef.current = new Audio("/sounds/typewriter-sound.mp3")
      audioRef.current.loop = true
      audioRef.current.volume = volume
    }

    // Update volume if it changes
    if (audioRef.current.volume !== volume) {
      audioRef.current.volume = volume
    }

    // Play or pause based on isTyping
    if (isTyping && !isPlaying) {
      audioRef.current.play().catch((e) => console.error("Audio playback failed:", e))
      setIsPlaying(true)
    } else if (!isTyping && isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    }

    // Cleanup
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [isTyping, volume, isPlaying])

  return null // This component doesn't render anything
}
