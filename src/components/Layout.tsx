import { useState, useEffect } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Grid, Menu, X, ArrowUpRight } from 'lucide-react';
import { PROFILE } from '../data/profile';

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
      className={`min-h-screen flex flex-col transition-colors duration-300 ${
        showGrid ? 'blueprint-grid' : 'blueprint-grid-off'
      }`}
    >
      {/* Top Architectural Header */}
      <header className="no-print sticky top-0 z-40 border-b hairline bg-[#F5F0E6]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5 sm:px-6">
          <Link
            to="/"
            className="group flex items-center gap-2.5 text-[#1C1B18] focus:outline-none"
          >
            <span className="flex h-7 w-7 items-center justify-center border border-[#1E4D7B]/45 bg-[#FAF7F0] font-mono text-xs font-semibold text-[#1E4D7B] transition-colors group-hover:bg-[#1E4D7B] group-hover:text-[#FAF7F0]">
              JP
            </span>
            <div className="flex flex-col leading-none">
              <span className="font-serif text-base font-medium tracking-tight">
                {PROFILE.name}
              </span>
              <span className="font-mono text-[9px] tracking-[0.18em] text-[#8C8578] uppercase">
                BUT 3 INFO // FOLIO
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 md:flex" aria-label="Navigation principale">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `relative px-3 py-1.5 font-mono text-xs tracking-wide transition-colors ${
                    isActive
                      ? 'text-[#1E4D7B] font-medium'
                      : 'text-[#5C574E] hover:text-[#1C1B18]'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span className="mr-1 text-[10px] text-[#8C8578]">
                      {item.code}
                    </span>
                    {item.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute right-3 bottom-0 left-3 h-[2px] bg-[#1E4D7B]"
                        transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Right Controls */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowGrid((v) => !v)}
              title="Afficher ou masquer la grille blueprint"
              className={`inline-flex items-center gap-1.5 border px-2.5 py-1.5 font-mono text-[11px] transition-colors cursor-pointer ${
                showGrid
                  ? 'border-[#1E4D7B]/40 bg-[#1E4D7B]/8 text-[#1E4D7B]'
                  : 'hairline bg-[#FAF7F0] text-[#5C574E] hover:text-[#1C1B18]'
              }`}
            >
              <Grid className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Grille</span>
            </button>

            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Ouvrir le menu"
              className="inline-flex items-center justify-center border hairline bg-[#FAF7F0] p-1.5 text-[#1C1B18] md:hidden cursor-pointer"
            >
              {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
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
              <nav className="flex flex-col px-4 py-3">
                {NAV_ITEMS.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.to === '/'}
                    className={({ isActive }) =>
                      `flex items-center justify-between border-b hairline py-2.5 font-mono text-xs last:border-b-0 ${
                        isActive ? 'text-[#1E4D7B] font-semibold' : 'text-[#5C574E]'
                      }`
                    }
                  >
                    <span>
                      <span className="mr-2 text-[#8C8578]">{item.code}</span>
                      {item.label}
                    </span>
                    <ArrowUpRight className="h-3.5 w-3.5 opacity-50" />
                  </NavLink>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Footer */}
      <footer className="no-print border-t hairline bg-[#FAF7F0]/80">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-4 px-4 py-6 sm:flex-row sm:items-center sm:px-6">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11px] text-[#5C574E]">
            <span className="text-[#1E4D7B]">REF // FOLIO-BUT3</span>
            <span>{PROFILE.name}</span>
            <span className="text-[#8C8578]">© {new Date().getFullYear()}</span>
          </div>

          <div className="flex items-center gap-4 font-mono text-[11px]">
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
