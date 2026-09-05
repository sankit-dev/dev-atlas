import { useEffect, useRef, useState } from 'react'

type WaterWaveEffectProps = {
  isWaving: boolean
  origin: { x: number; y: number } | null
  onWaveEnd?: () => void
}

export function WaterWaveEffect({ isWaving, origin, onWaveEnd }: WaterWaveEffectProps) {
  const [filterValues, setFilterValues] = useState({ scale: 0, freqX: 0.012, freqY: 0.024 })
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animFrameRef = useRef<number | null>(null)

  useEffect(() => {
    if (!isWaving || !origin) {
      return
    }

    const startTime = performance.now()
    const duration = 1500 // ms

    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    
    if (canvas) {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const animate = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Fluid water wave amplitude (sine wave decay)
      const waveAmplitude = Math.sin(progress * Math.PI * 3.5) * Math.pow(1 - progress, 1.1)
      const currentScale = waveAmplitude * 52 // Max pixel displacement

      // Dynamic frequency shift simulates water surface currents flowing
      const freqX = 0.009 + Math.sin(progress * 10) * 0.007
      const freqY = 0.018 + Math.cos(progress * 12) * 0.011

      setFilterValues({ scale: currentScale, freqX, freqY })

      // Render liquid ripple shockwave on canvas
      if (ctx && canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        const maxRadius = Math.sqrt(
          Math.max(origin.x, canvas.width - origin.x) ** 2 +
          Math.max(origin.y, canvas.height - origin.y) ** 2
        ) * 1.05

        const currentRadius = progress * maxRadius
        const alpha = Math.sin(progress * Math.PI) * 0.7

        ctx.save()
        
        // Primary water wave ring
        ctx.beginPath()
        ctx.arc(origin.x, origin.y, Math.max(0, currentRadius), 0, Math.PI * 2)
        ctx.lineWidth = 32 * (1 - progress * 0.4)
        ctx.strokeStyle = `rgba(120, 190, 255, ${alpha * 0.35})`
        ctx.stroke()

        // Caustic highlight ring (water sheen)
        ctx.beginPath()
        ctx.arc(origin.x, origin.y, Math.max(0, currentRadius * 0.88), 0, Math.PI * 2)
        ctx.lineWidth = 14 * (1 - progress * 0.3)
        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.55})`
        ctx.stroke()

        // Secondary ripple trail
        if (progress > 0.12) {
          const r2 = (progress - 0.12) * maxRadius * 0.85
          ctx.beginPath()
          ctx.arc(origin.x, origin.y, Math.max(0, r2), 0, Math.PI * 2)
          ctx.lineWidth = 18
          ctx.strokeStyle = `rgba(60, 215, 200, ${alpha * 0.3})`
          ctx.stroke()
        }

        // Tertiary fine ripple trail
        if (progress > 0.28) {
          const r3 = (progress - 0.28) * maxRadius * 0.7
          ctx.beginPath()
          ctx.arc(origin.x, origin.y, Math.max(0, r3), 0, Math.PI * 2)
          ctx.lineWidth = 10
          ctx.strokeStyle = `rgba(180, 235, 255, ${alpha * 0.25})`
          ctx.stroke()
        }

        ctx.restore()
      }

      if (progress < 1) {
        animFrameRef.current = requestAnimationFrame(animate)
      } else {
        setFilterValues({ scale: 0, freqX: 0.012, freqY: 0.024 })
        if (ctx && canvas) {
          ctx.clearRect(0, 0, canvas.width, canvas.height)
        }
        onWaveEnd?.()
      }
    }

    animFrameRef.current = requestAnimationFrame(animate)

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current)
      }
    }
  }, [isWaving, origin, onWaveEnd])

  return (
    <>
      <svg
        style={{ position: 'fixed', width: 0, height: 0, pointerEvents: 'none', top: 0, left: 0 }}
        aria-hidden="true"
      >
        <filter id="page-water-wave-filter" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency={`${filterValues.freqX} ${filterValues.freqY}`}
            numOctaves="2"
            result="turbulence"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="turbulence"
            scale={filterValues.scale}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>
      {isWaving && (
        <canvas
          ref={canvasRef}
          style={{
            position: 'fixed',
            inset: 0,
            pointerEvents: 'none',
            zIndex: 9999,
          }}
        />
      )}
    </>
  )
}
