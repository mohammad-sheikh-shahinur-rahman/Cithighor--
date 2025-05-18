"use client"

import type React from "react"

import { useRef, useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

interface SignatureCanvasProps {
  onSave: (dataURL: string) => void
}

export function SignatureCanvas({ onSave }: SignatureCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null)
  const [canvasSize, setCanvasSize] = useState({ width: 300, height: 150 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Set canvas size
    const container = canvas.parentElement
    if (container) {
      const width = container.clientWidth - 4 // Account for padding
      setCanvasSize({ width, height: 150 })
    }

    // Get context
    const context = canvas.getContext("2d")
    if (context) {
      setCtx(context)
      context.lineWidth = 2
      context.lineCap = "round"
      context.strokeStyle = "#78350f" // amber-900
    }
  }, [])

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true)

    if (!ctx) return

    ctx.beginPath()

    // Get coordinates
    let x, y
    if ("touches" in e) {
      // Touch event
      const rect = canvasRef.current?.getBoundingClientRect()
      if (!rect) return
      x = e.touches[0].clientX - rect.left
      y = e.touches[0].clientY - rect.top
    } else {
      // Mouse event
      x = e.nativeEvent.offsetX
      y = e.nativeEvent.offsetY
    }

    ctx.moveTo(x, y)
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !ctx) return

    // Get coordinates
    let x, y
    if ("touches" in e) {
      // Touch event
      const rect = canvasRef.current?.getBoundingClientRect()
      if (!rect) return
      x = e.touches[0].clientX - rect.left
      y = e.touches[0].clientY - rect.top
    } else {
      // Mouse event
      x = e.nativeEvent.offsetX
      y = e.nativeEvent.offsetY
    }

    ctx.lineTo(x, y)
    ctx.stroke()
  }

  const stopDrawing = () => {
    setIsDrawing(false)
    if (ctx) {
      ctx.closePath()
    }
  }

  const clearCanvas = () => {
    if (!ctx || !canvasRef.current) return
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
  }

  const saveSignature = () => {
    if (!canvasRef.current) return
    const dataURL = canvasRef.current.toDataURL("image/png")
    onSave(dataURL)
  }

  return (
    <div className="flex flex-col space-y-2">
      <div className="border border-amber-200 rounded-md bg-white">
        <canvas
          ref={canvasRef}
          width={canvasSize.width}
          height={canvasSize.height}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className="touch-none"
        />
      </div>
      <div className="flex gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={clearCanvas}
          className="border-amber-200 text-amber-800 hover:bg-amber-100"
        >
          মুছুন
        </Button>
        <Button
          type="button"
          size="sm"
          onClick={saveSignature}
          className="bg-amber-800 hover:bg-amber-900 text-amber-50"
        >
          সেভ করুন
        </Button>
      </div>
    </div>
  )
}
