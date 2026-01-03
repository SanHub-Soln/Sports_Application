import { useEffect, useState } from "react"

// Sports videos for each frame
const videos = [
  "https://www.w3schools.com/html/mov_bbb.mp4",
  "https://www.w3schools.com/html/movie.mp4",
  "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
  "https://media.w3.org/2010/05/sintel/trailer.mp4",
]

export default function ThreeDCarousel({
  radius = 320,
  autoRotate = true,
  interval = 2500,
}) {
  const [angle, setAngle] = useState(0)

  useEffect(() => {
    if (!autoRotate) return

    const timer = setInterval(() => {
      setAngle((prev) => prev + 360 / videos.length)
    }, interval)

    return () => clearInterval(timer)
  }, [autoRotate, interval])

  return (
    <div
      className="w-full h-[420px] flex items-center justify-center overflow-hidden"
      style={{
        perspective: "1200px",
      }}
    >
      <div
        className="relative"
        style={{
          width: "320px",
          height: "200px",
          transformStyle: "preserve-3d",
          transform: `translateZ(-${radius}px) rotateY(${angle}deg)`,
          transition: "transform 1s ease",
        }}
      >
        {videos.map((src, i) => (
          <div
            key={i}
            className="absolute rounded-xl overflow-hidden shadow-2xl bg-black"
            style={{
              width: "260px",
              height: "160px",
              transform: `rotateY(${
                (360 / videos.length) * i
              }deg) translateZ(${radius}px)`,
            }}
          >
            <video
              src={src}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
