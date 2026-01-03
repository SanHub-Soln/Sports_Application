import React, { useEffect, useRef, useState } from "react";
import { HeartIcon, XMarkIcon, SpeakerWaveIcon, ArrowsPointingOutIcon } from "@heroicons/react/24/solid";
import { getUserData, toggleFavorite } from "../data/userdata";
import seedVideos from "../data/seed";
import { useLocation, useNavigate } from "react-router-dom";

const PAGE_SIZE = 9;

// New match types data file content (this would normally be in src/data/matchdata.js)
export const MATCH_TYPES = {
  Cricket: ["IPL", "World Cup", "Test Matches", "ODI", "T20I", "TNPL", "Big Bash", "The Hundred", "Women's Cricket"],
  Football: ["Premier League", "La Liga", "Serie A", "Bundesliga", "Champions League", "World Cup", "Euro", "Copa America"],
  Basketball: ["NBA", "EuroLeague", "WNBA", "NCAA", "Olympics", "FIBA World Cup"],
  Tennis: ["ATP Tour", "WTA Tour", "Grand Slams", "Davis Cup", "Billie Jean King Cup", "Olympics"],
  Badminton: ["BWF World Tour", "Thomas Cup", "Uber Cup", "Sudirman Cup", "Olympics", "All England"],
  Chess: ["FIDE World Championship", "Candidates Tournament", "Grand Chess Tour", "Chess Olympiad", "Tata Steel Chess"],
};

const mockMatches = Array.from({ length: 60 }, (_, i) => ({
  id: `mock-${i + 1}`,
  title: `Sports Match ${i + 1}`,
  teams: `Team ${i + 1} vs Team ${i + 2}`,
  sport: ["Cricket", "Football", "Tennis", "Basketball", "Badminton", "Chess"][i % 6],
  league: ["IPL", "EPL", "NBA", "ATP", "BWF", "FIDE"][i % 6],
  type: i % 5 === 0 ? "live" : "match",
  length: "12m",
  posted: "2 days ago",
  video: "https://www.w3schools.com/html/mov_bbb.mp4",
  poster: `https://picsum.photos/500/300?random=${i}`,
}));

const TOPICS = [
  { key: "popular", label: "Popular" },
  { key: "live", label: "Live", filter: v => v.type === "live" },
  { key: "Basketball", label: "Basketball" },
  { key: "Cricket", label: "Cricket" },
  { key: "Football", label: "Football" },
  { key: "Badminton", label: "Badminton" },
  { key: "Tennis", label: "Tennis" },
  { key: "Chess", label: "Chess" },
];

export default function Matches() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.tab === "favorites") {
      setActiveTab("favorites");
    }
  }, [location.state]);

  const user = JSON.parse(localStorage.getItem("user"));
  const email = user?.email;

  const [favorites, setFavorites] = useState([]);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [sectionView, setSectionView] = useState(null); // e.g., "Cricket"
  const [selectedLeague, setSelectedLeague] = useState(""); // selected match type/league
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [loading, setLoading] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [showControls, setShowControls] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const loaderRef = useRef(null);
  const videoHeroRef = useRef(null);

  useEffect(() => {
    if (email) setFavorites(getUserData(email).favorites || []);
  }, [email]);

  useEffect(() => {
    if (selectedVideo && !email && videoHeroRef.current) {
      videoHeroRef.current.play();
      const timer = setTimeout(() => {
        if (videoHeroRef.current) {
          videoHeroRef.current.pause();
        }
        setShowLoginModal(true);
      }, 10000);
      return () => clearTimeout(timer);
    } else if (selectedVideo && email && videoHeroRef.current) {
      videoHeroRef.current.play();
    }
  }, [selectedVideo, email]);

  const allVideos = [...seedVideos, ...mockMatches];

  /* FILTERED LIST */
  const filtered = allVideos.filter(v => {
    if (sectionView && v.sport !== sectionView && sectionView !== "popular") return false;
    if (selectedLeague && v.league !== selectedLeague) return false;
    if (activeTab === "favorites" && !favorites.includes(v.id)) return false;
    if (activeTab === "live" && v.type !== "live") return false;
    if (activeTab === "leagues" && !v.league) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        v.title.toLowerCase().includes(q) ||
        v.teams.toLowerCase().includes(q) ||
        v.sport.toLowerCase().includes(q) ||
        v.league?.toLowerCase().includes(q)
      );
    }
    return true;
  });

  useEffect(() => {
    if (sectionView || search || activeTab !== "all" || selectedLeague) {
      const observer = new IntersectionObserver(
        e => e[0].isIntersecting && loadMore(),
        { threshold: 1 }
      );
      if (loaderRef.current) observer.observe(loaderRef.current);
      return () => observer.disconnect();
    }
  }, [visible, filtered, selectedLeague]);

  const loadMore = () => {
    if (loading || visible >= filtered.length) return;
    setLoading(true);
    setTimeout(() => {
      setVisible(v => v + PAGE_SIZE);
      setLoading(false);
    }, 700);
  };

  const handleFavorite = (id) => {
    if (!email) return alert("Login required");
    setFavorites(toggleFavorite(email, id));
  };

  const handleVideoClick = (match) => {
    setSelectedVideo(match);
    window.scrollTo(0, 0);
  };

  const handleSectionView = (key) => {
    setSectionView(key);
    setSelectedLeague(""); // reset league when entering new section
    setVisible(PAGE_SIZE);
  };

  const showSectionLayout = !search && activeTab === "all" && !sectionView;

  return (
    <div className="min-h-screen bg-black text-white">
      <section className="relative h-[45vh] flex items-end px-8 pb-10">
        {selectedVideo ? (
          <>
            <video
              ref={videoHeroRef}
              className="absolute inset-0 w-full h-full object-cover"
              poster={selectedVideo.poster}
            >
              <source src={selectedVideo.video} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30" />
            <div
              className={`absolute inset-0 transition-opacity ${showControls ? 'opacity-100' : 'opacity-0'}`}
              onMouseEnter={() => setShowControls(true)}
              onMouseLeave={() => setShowControls(false)}
            >
              <div className="absolute bottom-0 left-0 right-0 flex justify-between items-center p-4">
                <div className="flex items-center">
                  <SpeakerWaveIcon className="h-6 w-6 text-white" />
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.01}
                    defaultValue={1}
                    onChange={e => videoHeroRef.current.volume = e.target.value}
                    className="w-20 ml-2"
                  />
                </div>
                <button onClick={() => videoHeroRef.current.requestFullscreen()}>
                  <ArrowsPointingOutIcon className="h-6 w-6 text-white" />
                </button>
              </div>
              <button
                className="absolute top-2 right-2 text-white"
                onClick={() => setSelectedVideo(null)}
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <div className="relative z-10 max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold">{selectedVideo.title}</h1>
              <p className="mt-2 text-gray-300">{selectedVideo.teams}</p>
            </div>
          </>
        ) : (
          <>
            <img
              src="../src/assets/hero_bg.png"
              className="absolute inset-0 w-full h-full object-cover"
              alt=""
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30" />
            <div className="relative z-10 max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold">Sports Highlights</h1>
              <p className="mt-2 text-gray-300">
                Live streams, highlights, replays & the best moments from sports
              </p>
            </div>
          </>
        )}
      </section>

      <div className="sticky top-0 z-30 bg-black px-6 py-4">
        {sectionView && sectionView !== "popular" && sectionView !== "live" && (
          <div className="flex items-center gap-4 mb-3">
            <div className="text-sm text-gray-400">
              Browsing: <span className="text-white font-medium">{sectionView}</span>
            </div>
            <select
              value={selectedLeague}
              onChange={(e) => setSelectedLeague(e.target.value)}
              className="px-4 py-2 rounded-full bg-transparent border border-red-900 text-sm outline-none"
            >
              <option value="" className="text-black">All Leagues/Tournaments</option>
              {MATCH_TYPES[sectionView]?.map(league => (
                <option key={league} value={league} className="text-black">{league}</option>
              ))}
            </select>
            <button
              onClick={() => {
                setSectionView(null);
                setSelectedLeague("");
              }}
              className="text-sm text-red-400 hover:underline"
            >
              ← Back
            </button>
          </div>
        )}

        <div className="flex justify-center gap-3">
          <input
            placeholder="What are you looking for?"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-[40%] px-5 py-3 rounded-full border border-red-900 bg-transparent outline-none"
          />
          <button
            onClick={() => setShowFilters(true)}
            className="px-4 py-2 border border-red-900 rounded-full hover:bg-red-900"
          >
            Filters
          </button>
        </div>

        <div className="mt-4 flex gap-3 justify-center">
          {["all", "leagues", "live", "favorites"].map(tab => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setSectionView(null);
                setSelectedLeague("");
              }}
              className={`px-4 py-1.5 rounded-full text-sm transition-all ${
                activeTab === tab
                  ? "scale-105 text-white [background:linear-gradient(120deg,#000,#dc2626,#b91c1c)]"
                  : "border border-red-900 hover:bg-red-900"
              }`}
            >
              {tab.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {showSectionLayout && (
        <div className="space-y-14 py-10">
          {TOPICS.map(topic => {
            const list =
              topic.key === "popular"
                ? allVideos.slice(0, 12)
                : topic.filter
                ? allVideos.filter(topic.filter).slice(0, 12)
                : allVideos.filter(v => v.sport === topic.key).slice(0, 12);
            if (!list.length) return null;
            return (
              <section key={topic.key} className="px-6 group">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">{topic.label}</h2>
                  <button
                    onClick={() => handleSectionView(topic.key)}
                    className="opacity-0 group-hover:opacity-100 transition text-sm text-red-400"
                  >
                    Show more
                  </button>
                </div>
                <div
                  className="flex gap-4 overflow-x-scroll scroll-smooth"
                  style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                  {list.map(v => (
                    <div key={v.id} className="min-w-[280px]">
                      <VideoCard
                        match={v}
                        liked={favorites.includes(v.id)}
                        onLike={handleFavorite}
                        onClick={handleVideoClick}
                      />
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      )}

      {!showSectionLayout && (
        <>
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
            {filtered.slice(0, visible).map(v => (
              <VideoCard
                key={v.id}
                match={v}
                liked={favorites.includes(v.id)}
                onLike={handleFavorite}
                onClick={handleVideoClick}
              />
            ))}
          </div>
          <div ref={loaderRef} className="h-20 flex justify-center items-center">
            {loading && <span className="text-gray-400">Loading more…</span>}
          </div>
        </>
      )}

      {showFilters && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white/20 backdrop-blur-md border border-red-900 rounded-lg p-6 w-full max-w-3xl text-white relative">
            <button onClick={() => setShowFilters(false)} className="absolute top-3 right-4">
              ✕
            </button>
            <h3 className="mb-4 text-lg font-semibold">Search filters</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-sm">
              <div>
                <p className="font-light mb-2">UPLOAD DATE</p>
                <p>Today</p>
                <p>This week</p>
                <p>This month</p>
              </div>
              <div>
                <p className="font-light mb-2">TYPE</p>
                <p>Live</p>
                <p>Match</p>
              </div>
              <div>
                <p className="font-light mb-2">SORT BY</p>
                <p>Relevance</p>
                <p>Upload date</p>
                <p>View count</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {showLoginModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white/20 backdrop-blur-md border border-red-900 rounded-lg p-6 w-full max-w-md text-white relative">
            <button onClick={() => setShowLoginModal(false)} className="absolute top-3 right-4">
              ✕
            </button>
            <h3 className="mb-4 text-lg font-semibold">To continue watching, please login</h3>
            <button
              onClick={() => navigate('/Auth', { state: { from: location.pathname } })}
              className="px-4 py-2 bg-red-600 rounded"
            >
              Login
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function VideoCard({ match, liked, onLike, onClick }) {
  const videoRef = useRef(null);
  return (
    <div
      className="relative rounded-lg overflow-hidden bg-black transition hover:scale-105"
      onMouseEnter={() => videoRef.current?.play()}
      onMouseLeave={() => {
        videoRef.current?.pause();
        videoRef.current.currentTime = 0;
      }}
      onClick={() => onClick(match)}
    >
      <img src={match.poster} className="w-full h-48 object-cover" alt="" />
      <video
        ref={videoRef}
        src={match.video}
        muted
        className="absolute inset-0 w-full h-48 object-cover opacity-0 hover:opacity-100 transition"
      />
      <div className="p-3 bg-gradient-to-t from-black">
        <h3 className="text-sm font-semibold">{match.title}</h3>
        <p className="text-xs text-gray-400">{match.league}</p>
        <p className="text-xs text-gray-500">Watch highlights & replays</p>
      </div>
      <span className="absolute bottom-2 right-2 text-[10px] text-gray-500">
        {match.posted}
      </span>
      <button onClick={(e) => { e.stopPropagation(); onLike(match.id); }} className="absolute top-2 right-2">
        <HeartIcon className={`h-6 w-6 ${liked ? "text-red-500" : "text-white"}`} />
      </button>
    </div>
  );
}
