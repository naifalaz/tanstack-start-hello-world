// src/components/Header.tsx
import React from 'react'
import { Link } from '@tanstack/react-router'
import { Home, Package, Mail } from 'lucide-react'

type NavItem = {
  to: string
  label: string
  icon: React.ReactNode
}

export function Header(): React.JSX.Element {
  const navItems: NavItem[] = [
    { to: '/', label: 'Home', icon: <Home className="h-4 w-4" /> },
    { to: '/product', label: 'Product', icon: <Package className="h-4 w-4" /> },
    { to: '/contact', label: 'Contact', icon: <Mail className="h-4 w-4" /> },
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


// import { Link } from '@tanstack/react-router'

// import { useState } from 'react'
// import { Home, Menu, X } from 'lucide-react'

// export default function Header() {
//   const [isOpen, setIsOpen] = useState(false)

//   return (
//     <>
//       <header className="p-4 flex items-center bg-gray-800 text-white shadow-lg">
//         <button
//           onClick={() => setIsOpen(true)}
//           className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
//           aria-label="Open menu"
//         >
//           <Menu size={24} />
//         </button>
//         <h1 className="ml-4 text-xl font-semibold">
//           <Link to="/">
//             <img
//               src="/tanstack-word-logo-white.svg"
//               alt="TanStack Logo"
//               className="h-10"
//             />
//           </Link>
//         </h1>
//       </header>

//       <aside
//         className={`fixed top-0 left-0 h-full w-80 bg-gray-900 text-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${
//           isOpen ? 'translate-x-0' : '-translate-x-full'
//         }`}
//       >
//         <div className="flex items-center justify-between p-4 border-b border-gray-700">
//           <h2 className="text-xl font-bold">Navigation</h2>
//           <button
//             onClick={() => setIsOpen(false)}
//             className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
//             aria-label="Close menu"
//           >
//             <X size={24} />
//           </button>
//         </div>

//         <nav className="flex-1 p-4 overflow-y-auto">
//           <Link
//             to="/"
//             onClick={() => setIsOpen(false)}
//             className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors mb-2"
//             activeProps={{
//               className:
//                 'flex items-center gap-3 p-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 transition-colors mb-2',
//             }}
//           >
//             <Home size={20} />
//             <span className="font-medium">Home</span>
//           </Link>


//         </nav>
//       </aside>
//     </>
//   )
// }
