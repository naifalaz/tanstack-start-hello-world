// src/components/Header.tsx
import React from 'react'
import { Link } from '@tanstack/react-router'
import { Home, Package, Mail, Search } from 'lucide-react'

type NavItem = {
  to: string
  label: string
  icon: React.ReactNode
}

export function Header(): React.JSX.Element {
  // ✅ Feature flag (should match main.tsx)
  const aiSearchEnabled = true

  const navItems: NavItem[] = [
    { to: '/', label: 'Home', icon: <Home className="h-4 w-4" /> },
    { to: '/products', label: 'Products', icon: <Package className="h-4 w-4" /> },
    { to: '/contact', label: 'Contact', icon: <Mail className="h-4 w-4" /> },

    // ✅ Conditional search routes
    ...(aiSearchEnabled
      ? [
          { to: '/search', label: 'Search', icon: <Search className="h-4 w-4" /> },
          { to: '/hybrid-search', label: 'Hybrid Search', icon: <Search className="h-4 w-4" /> },
          { to: '/ai-search', label: 'AI Search', icon: <Search className="h-4 w-4" /> },
        ]
      : []),
  ]

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <div className="text-sm font-semibold">SkyLaunch</div>

        <nav className="flex items-center gap-2">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-100"
              activeProps={{ className: 'bg-slate-100 text-slate-900' }}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}