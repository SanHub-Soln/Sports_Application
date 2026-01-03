import { useEffect, useRef, useState } from "react"

export default function ScrollVideo() {
  const videoRef = useRef(null)
  const [scale, setScale] = useState(0.25)

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY
      const maxScroll = window.innerHeight * 1.2

      const progress = Math.min(scrollY / maxScroll, 1)

      // Scale from small → fullscreen
      const newScale = 0.25 + progress * 0.75
      setScale(newScale)
    }

    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <div
  className="sticky max-w-screen bottom-6 left-12 z-50 origin-bottom-left transition-transform duration-75 ease-out"
  style={{
    transform: `scale(${scale})`,
    width: "calc(100% - 100px)",
    height: "80vh",
  }}
>

      <video
        ref={videoRef}
        src="https://serious.business/wp-content/uploads/2024/07/Showreel_2024_Final-1.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-full object-cover rounded-xl shadow-xl"
      />
    </div>
  )
}
