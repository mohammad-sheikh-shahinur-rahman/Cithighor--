"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { TypewriterSound } from "./typewriter-sound"

interface TypewriterEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
  paperStyle?: string
  inkColor?: string
  fontStyle?: string
}

export function TypewriterEditor({
  value,
  onChange,
  placeholder = "আপনার চিঠি লিখুন...",
  className = "",
  paperStyle = "classic",
  inkColor = "black",
  fontStyle = "handwritten",
}: TypewriterEditorProps) {
  const [isTyping, setIsTyping] = useState(false)
  const [lastTypedTime, setLastTypedTime] = useState(0)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const cursorRef = useRef<HTMLDivElement>(null)
  const [cursorPosition, setCursorPosition] = useState({ top: 0, left: 0 })
  const [showCursor, setShowCursor] = useState(false)

  // Handle typing sound effect
  useEffect(() => {
    const typingTimeout = setTimeout(() => {
      if (isTyping && Date.now() - lastTypedTime > 500) {
        setIsTyping(false)
      }
    }, 500)

    return () => clearTimeout(typingTimeout)
  }, [isTyping, lastTypedTime])

  // Update cursor position when textarea changes
  useEffect(() => {
    if (textareaRef.current && document.activeElement === textareaRef.current) {
      const textarea = textareaRef.current
      const selectionStart = textarea.selectionStart

      // Create a temporary element to measure text
      const temp = document.createElement("div")
      temp.style.position = "absolute"
      temp.style.visibility = "hidden"
      temp.style.whiteSpace = "pre-wrap"
      temp.style.wordBreak = "break-word"
      temp.style.width = getComputedStyle(textarea).width
      temp.style.fontSize = getComputedStyle(textarea).fontSize
      temp.style.fontFamily = getComputedStyle(textarea).fontFamily
      temp.style.lineHeight = getComputedStyle(textarea).lineHeight
      temp.style.padding = getComputedStyle(textarea).padding

      // Get text before cursor
      const textBeforeCursor = textarea.value.substring(0, selectionStart)

      // Calculate position
      document.body.appendChild(temp)
      temp.textContent = textBeforeCursor

      // Add a span to get the exact position
      const span = document.createElement("span")
      span.textContent = "|"
      temp.appendChild(span)

      const spanRect = span.getBoundingClientRect()
      const textareaRect = textarea.getBoundingClientRect()

      document.body.removeChild(temp)

      // Set cursor position relative to textarea
      setCursorPosition({
        top: spanRect.top - textareaRect.top + textarea.scrollTop,
        left: spanRect.left - textareaRect.left,
      })

      setShowCursor(true)
    } else {
      setShowCursor(false)
    }
  }, [value])

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value)
    setIsTyping(true)
    setLastTypedTime(Date.now())
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    setIsTyping(true)
    setLastTypedTime(Date.now())

    // Add typewriter carriage return sound for Enter key
    if (e.key === "Enter") {
      const carriageReturnSound = new Audio("/typewriter-carriage-return.mp3")
      carriageReturnSound.volume = 0.4
      carriageReturnSound.play().catch((e) => console.error("Audio playback failed:", e))
    }
  }

  const getFontFamily = () => {
    switch (fontStyle) {
      case "handwritten":
        return "cursive, 'Noto Sans Bengali', sans-serif"
      case "typewriter":
        return "monospace, 'Noto Sans Bengali', sans-serif"
      case "elegant":
        return "serif, 'Noto Sans Bengali', sans-serif"
      case "bengali-classic":
        return "'Noto Sans Bengali', sans-serif"
      default:
        return "'Noto Sans Bengali', sans-serif"
    }
  }

  const getTextColor = () => {
    return inkColor === "black" ? "text-amber-900" : `text-${inkColor}`
  }

  return (
    <div className="relative">
      <textarea
        ref={textareaRef}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className={`
          w-full min-h-52 border-none bg-transparent resize-none focus-visible:ring-0 focus-visible:ring-offset-0
          ${getTextColor()} ${className}
        `}
        style={{
          fontFamily: getFontFamily(),
          backgroundImage: `url('/paper-texture-${paperStyle}.png')`,
          backgroundRepeat: "repeat",
        }}
      />

      {showCursor && (
        <div
          ref={cursorRef}
          className="absolute w-0.5 h-5 bg-current animate-blink pointer-events-none"
          style={{
            top: `${cursorPosition.top}px`,
            left: `${cursorPosition.left}px`,
            color: inkColor === "black" ? "#78350f" : inkColor.replace("-", "-"),
          }}
        />
      )}

      <TypewriterSound isTyping={isTyping} />
    </div>
  )
}
