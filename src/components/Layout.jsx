import { Link, NavLink, Outlet } from "react-router-dom";

const navLinkClass = ({ isActive }) =>
  `rounded-lg px-3 py-2 text-sm font-medium transition ${
    isActive
      ? "bg-teal-900 text-white"
      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
  }`;

export default function Layout() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <Link to="/" className="group flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-900 text-sm font-bold text-white">
              NF
            </span>
            <div>
              <p className="text-sm font-semibold leading-tight text-slate-900 group-hover:text-teal-900">
                Neurofisiologia & Neurofarmacologia
              </p>
              <p className="text-xs text-slate-500">Plataforma de ensino</p>
            </div>
          </Link>
          <nav className="flex items-center gap-1">
            <NavLink to="/" end className={navLinkClass}>
              Início
            </NavLink>
            <NavLink to="/modulos" className={navLinkClass}>
              Módulos
            </NavLink>
          </nav>
        </div>
      </header>
      <Outlet />
      <footer className="border-t border-slate-200 bg-white py-8">
        <div className="mx-auto max-w-6xl px-4 text-center text-sm text-slate-500 sm:px-6">
          Plataforma educacional em neurofisiologia, biofísica celular e
          farmacologia do sistema nervoso.
        </div>
      </footer>
    </div>
  );
}
