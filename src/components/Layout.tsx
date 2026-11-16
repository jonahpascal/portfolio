import { useState, useEffect } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Grid, Menu, X, ArrowUpRight } from 'lucide-react';
import { PROFILE } from '../data/profile';
import { BlueprintBackdrop } from './BlueprintBackdrop';

const NAV_ITEMS = [
  { to: '/', label: 'Accueil', code: '00' },
  { to: '/projets', label: 'Projets', code: '01' },
  { to: '/competences', label: 'Compétences', code: '02' },
  { to: '/parcours', label: 'Parcours', code: '03' },
  { to: '/cv', label: 'CV', code: '04' },
  { to: '/contact', label: 'Contact', code: '05' },
];

export function Layout() {
  const [showGrid, setShowGrid] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [location.pathname]);

  return (
    <div
      className={`relative min-h-screen flex flex-col transition-colors duration-300 ${
        showGrid ? 'blueprint-grid' : 'blueprint-grid-off'
      }`}
    >
      {/* Animated Blueprint Backdrop Lines & Scroll Compass */}
      <BlueprintBackdrop enabled={showGrid} />

      {/* Top Architectural Header */}
      <header className="no-print sticky top-0 z-40 border-b hairline bg-[#F5F0E6]/92 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <Link
            to="/"
            className="group flex items-center gap-3 text-[#1C1B18] focus:outline-none"
          >
            <span className="flex h-9 w-9 items-center justify-center border border-[#1E4D7B]/45 bg-[#FAF7F0] font-mono text-sm font-semibold text-[#1E4D7B] transition-colors group-hover:bg-[#1E4D7B] group-hover:text-[#FAF7F0]">
              JP
            </span>
            <div className="flex flex-col leading-tight">
              <span className="font-serif text-lg font-medium tracking-tight">
                {PROFILE.name}
              </span>
              <span className="font-mono text-[10px] tracking-[0.18em] text-[#8C8578] uppercase">
                BUT 3 INFO // FOLIO
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav
            className="hidden items-center gap-1.5 md:flex"
            aria-label="Navigation principale"
          >
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `relative px-3.5 py-2 font-mono text-[13px] tracking-wide transition-colors ${
                    isActive
                      ? 'text-[#1E4D7B] font-semibold'
                      : 'text-[#5C574E] hover:text-[#1C1B18]'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span className="mr-1.5 text-[11px] text-[#8C8578]">
                      {item.code}
                    </span>
                    {item.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute right-3.5 bottom-0 left-3.5 h-[2px] bg-[#1E4D7B]"
                        transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Right Controls */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => setShowGrid((v) => !v)}
              title="Afficher ou masquer la grille et les tracés blueprint"
              className={`inline-flex items-center gap-2 border px-3 py-2 font-mono text-xs transition-colors cursor-pointer ${
                showGrid
                  ? 'border-[#1E4D7B]/45 bg-[#1E4D7B]/10 text-[#1E4D7B]'
                  : 'hairline bg-[#FAF7F0] text-[#5C574E] hover:text-[#1C1B18]'
              }`}
            >
              <Grid className="h-4 w-4" />
              <span className="hidden sm:inline">Blueprint</span>
            </button>

            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Ouvrir le menu"
              className="inline-flex items-center justify-center border hairline bg-[#FAF7F0] p-2 text-[#1C1B18] md:hidden cursor-pointer"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden border-t hairline bg-[#FAF7F0] md:hidden"
            >
              <nav className="flex flex-col px-5 py-3">
                {NAV_ITEMS.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.to === '/'}
                    className={({ isActive }) =>
                      `flex items-center justify-between border-b hairline py-3 font-mono text-sm last:border-b-0 ${
                        isActive ? 'text-[#1E4D7B] font-semibold' : 'text-[#5C574E]'
                      }`
                    }
                  >
                    <span>
                      <span className="mr-2.5 text-[#8C8578]">{item.code}</span>
                      {item.label}
                    </span>
                    <ArrowUpRight className="h-4 w-4 opacity-50" />
                  </NavLink>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Footer */}
      <footer className="no-print relative z-10 border-t hairline bg-[#FAF7F0]/85">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 px-5 py-7 sm:flex-row sm:items-center sm:px-8">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1 font-mono text-xs text-[#5C574E]">
            <span className="text-[#1E4D7B] font-medium">REF // FOLIO-BUT3</span>
            <span>{PROFILE.name}</span>
            <span className="text-[#8C8578]">© {new Date().getFullYear()}</span>
          </div>

          <div className="flex items-center gap-5 font-mono text-xs">
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noreferrer"
              className="text-[#5C574E] underline decoration-[#1E4D7B]/40 underline-offset-4 hover:text-[#1E4D7B]"
            >
              GitHub
            </a>
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noreferrer"
              className="text-[#5C574E] underline decoration-[#1E4D7B]/40 underline-offset-4 hover:text-[#1E4D7B]"
            >
              LinkedIn
            </a>
            <Link
              to="/contact"
              className="text-[#B84A2E] underline decoration-[#B84A2E]/40 underline-offset-4 hover:text-[#1C1B18]"
            >
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
