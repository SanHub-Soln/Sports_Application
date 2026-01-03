import ScrollVideo from "../components/ScrollVideo"
import heroBg from "../assets/hero_bg.png"
import ThreeDCarousel from "../components/ThreeDCarousel"


export default function Home() {
  return (
    <div className="bg-pinkBg relative">

      {/* ===== MARQUEE ANIMATION CSS (LOCAL) ===== */}
      <style>{`
        @keyframes marquee-ltr {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0%);
          }
        }
        .animate-marquee-ltr {
          animation: marquee-ltr 30s linear infinite;
        }
      `}</style>

      {/* HERO */}
      <section
        className="h-[100vh] flex flex-col items-center justify-center text-center px-6 bg-cover bg-center bg-no-repeat relative"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/100 via-black/70 to-black/70" />

        <h1 className="absolute top-[30%] text-5xl md:text-7xl font-black">
          Make Your Time
        </h1>

        <h1
          className="
            absolute top-[40%]
            text-5xl md:text-7xl font-black
            bg-[linear-gradient(120deg,#ff0080,#7928ca,#2afadf)]
            bg-[length:200%_200%]
            animate-gradient
            bg-clip-text text-transparent
          "
        >
          Entertainment
        </h1>

        <p className="mt-4 text-lg max-w-xl relative z-10">
          Branding and Digital Design for Startups & Scaleups
        </p>
      </section>

      <div className="sticky max-w-full h-[120vh] top-[30%]" />

      <ScrollVideo />

      <section className="min-h-screen text-white flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-5xl md:text-7xl font-black">
          SERIOUS.BUSINESS
        </h1>
        <p className="mt-4 text-lg max-w-xl">
          Branding and Digital Design for Startups & Scaleups
        </p>
        <ThreeDCarousel />
      </section>

         <section className="w-full bg-black py-24 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* LEFT IMAGE / VISUAL */}
        <div className="flex justify-center">
          <div className="bg-gray-100 rounded-3xl p-10 shadow-sm">
            <img
              src="/assets/your-image-here.pnghttps://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBiabvxFAuorEO18Cgk-otVIc0tq2AHLvZfw&s" // 🔁 replace with your image
              alt="Analytics preview"
              className="w-full max-w-md rounded-2xl"
            />
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div>
          {/* Badge */}
          <div className="flex items-center gap-2 text-white font-medium mb-4">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-400">
        
            </span>
            Entertainment Full
          </div>

          {/* Heading */}
          <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
            Analytics that power<br />smarter decisions
          </h2>

          {/* Description */}
          <p className="mt-6 text-lg text-white-900 max-w-xl">
            Our cutting-edge analytics deliver detailed trends, patterns,
            and actionable intelligence to help you make informed decisions
            and stay ahead of the competition.
          </p>

          {/* CTA */}
          <button
            className="mt-8 inline-flex items-center gap-2 px-6 py-3
                       rounded-full border border-gray-300
                       text-white-900 font-medium
                       hover:bg-gray-100 transition"
          >
            Learn more
            <span>→</span>
          </button>
        </div>
      </div>
    </section>

      {/* PARTNERS */}
      <h1 className="text-5xl text-center md:text-7xl font-black">
          Partner
        </h1>
      <section className="bg-[#1a1a1a] mt-20 text-pink-200 py-24 px-6">
      
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-14 items-start">
          <h2 className="text-2xl leading-snug">
            Our serious<br />relationships:
          </h2>

          <div className="md:col-span-3 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-12 opacity-80 text-center">
            {[
              "NBA",
              "IBBC",
              "FIFA",
              "JIO",
              "SONY",
              "NETFLIX",
              "APPLE",
              "CRICBUS",
            ].map((brand) => (
              <div
                key={brand}
                className="text-lg tracking-wide hover:opacity-100 transition"
              >
                {brand}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INFINITE TESTIMONIAL CAROUSEL */}
      <section className="relative bg-black py-16 overflow-hidden">
        {/* LEFT FADE */}
        <div className="absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-black to-transparent z-10" />
        {/* RIGHT FADE */}
        <div className="absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-black to-transparent z-10" />
     

        <div className="flex gap-16 whitespace-nowrap animate-marquee-ltr text-lg text-gray-300">
          {[
            "🔥 Best sports entertainment platform",
            "⚡ Ultra smooth live streaming",
            "❤️ Clean UI and premium feel",
            "🏏 Perfect for cricket lovers",
            "⚽ Football matches never lag",
            "🎾 Design feels next-level",
            "🔥 Best sports entertainment platform",
            "⚡ Ultra smooth live streaming",
            "❤️ Clean UI and premium feel",
            "🏏 Perfect for cricket lovers",
            "⚽ Football matches never lag",
            "🎾 Design feels next-level",
          ].map((text, i) => (
            <span
              key={i}
              className="opacity-80 hover:opacity-100 transition"
            >
              {text}
            </span>
          ))}
        </div>
      </section>

      {/* TESTIMONIAL CARDS */}
      <section className="bg-black py-24 px-6">
        <h1 className="text-5xl md:text-7xl text-center font-black">
          FeedBack
        </h1>
        <div className="max-w-6xl mt-20 mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            { name: "Rahul", text: "Streaming is insanely smooth 🔥" },
            { name: "Ananya", text: "Feels like a premium sports app" },
            { name: "David", text: "Best UI + performance combo" },
          ].map((review, i) => (
            <div
              key={i}
              className="bg-[#1f1f1f] p-8 rounded-xl text-gray-300 hover:scale-105 transition"
            >
              <p className="mb-6">“{review.text}”</p>
              <span className="text-sm text-pink-400">— {review.name}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
