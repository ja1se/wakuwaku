import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'

const imgWakUwAku = "/assets/logo.svg";
const imgSearchIcon = "/assets/icon-search.svg";
const imgMypageIcon = "/assets/icon-mypage.svg";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    if (query.trim()) {
      navigate(`/?search=${encodeURIComponent(query.trim())}`)
      setSearchOpen(false)
      setQuery('')
    }
  }

  const navLinks = [
    { label: '홈', to: '/' },
    { label: '인기 차트', to: '/?category=popular' },
    { label: '따끈 신작', to: '/?category=onair' },
    { label: '와쿠와쿠 AI', to: '/?category=ai' },
  ]

return (
    <header
      className={twMerge(
        'fixed top-0 inset-x-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-surface/80 backdrop-blur-[var(--blur-scrolled)] shadow-nav border-b border-white/5'
          : 'bg-transparent backdrop-blur-[var(--blur-nav)]'
      )}
    >
      <div className="flex max-w-7xl w-full px-6 py-4 justify-between items-center mx-auto">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center">
            <img src={imgWakUwAku} alt="WAKUWAKU" className="h-4 w-auto object-contain" />
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map(({ label, to }) => {
              const isActive = location.pathname + location.search === to || (to === '/' && location.pathname === '/' && !location.search);
              return (
                <Link
                  key={label}
                  to={to}
                  className={twMerge(
                    "text-base font-medium transition-colors duration-200",
                    isActive ? "text-primary" : "text-slate-300 hover:text-white"
                  )}
                >
                  {label}
                </Link>
              )
            })}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex items-center">
            {searchOpen && (
              <form onSubmit={handleSearch} className="absolute right-10">
                <input
                  autoFocus
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="검색..."
                  className="w-40 bg-slate-800 text-white text-sm px-3 py-1.5 rounded-lg border border-slate-700"
                />
              </form>
            )}
            <button onClick={() => setSearchOpen(!searchOpen)} className="p-1">
              <img src={imgSearchIcon} alt="Search" className="w-7 h-7" />
            </button>
          </div>

          <button className="p-1">
            <img src={imgMypageIcon} alt="My Page" className="w-7 h-7" />
          </button>
        </div>
      </div>
    </header>
  )
}
