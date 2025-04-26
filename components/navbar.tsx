"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { ThemeToggle } from "@/components/theme-toggle"

/**
 * SVG path component for the animated hamburger menu
 */
const Path = (props: {
  d?: string
  variants?: any
  transition?: { duration: number }
  [key: string]: any
}) => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    stroke="currentColor"
    strokeLinecap="round"
    d=""
    {...props}
  />
)

/**
 * Props for the MenuToggle component
 */
interface MenuToggleProps {
  toggle: () => void
  isOpen: boolean
}

/**
 * Animated menu toggle button component
 */
const MenuToggle = ({ toggle, isOpen }: MenuToggleProps) => (
  <button 
    onClick={toggle}
    className="outline-none border-none cursor-pointer relative z-[100] p-2"
    aria-label="Toggle menu"
  >
    <svg width="23" height="23" viewBox="0 0 23 23">
      <Path
        variants={{
          closed: { d: "M 2 2.5 L 20 2.5" },
          open: { d: "M 3 16.5 L 17 2.5" },
        }}
        animate={isOpen ? "open" : "closed"}
      />
      <Path
        d="M 2 9.423 L 20 9.423"
        variants={{
          closed: { opacity: 1 },
          open: { opacity: 0 },
        }}
        transition={{ duration: 0.1 }}
        animate={isOpen ? "open" : "closed"}
      />
      <Path
        variants={{
          closed: { d: "M 2 16.346 L 20 16.346" },
          open: { d: "M 3 2.5 L 17 16.346" },
        }}
        animate={isOpen ? "open" : "closed"}
      />
    </svg>
  </button>
)

/**
 * Navigation item properties
 */
interface NavItemProps {
  name: string
  path: string
  isActive: boolean
  onClick?: () => void
}

/**
 * Navigation item component
 */
const NavItem = ({ name, path, isActive, onClick }: NavItemProps) => (
  <Link
    href={path}
    className={`text-sm font-medium transition-colors hover:text-primary ${
      isActive ? "text-primary" : "text-muted-foreground"
    }`}
    onClick={onClick}
  >
    {name}
  </Link>
)

/**
 * Mobile navigation menu component
 */
const MobileMenu = ({ 
  isOpen, 
  navItems, 
  currentPath, 
  onItemClick 
}: { 
  isOpen: boolean
  navItems: Array<{ name: string; path: string }>
  currentPath: string
  onItemClick: () => void
}) => {
  const itemVariants = {
    open: {
      y: 0,
      opacity: 1,
      transition: {
        y: { stiffness: 1000, velocity: -100 },
      },
    },
    closed: {
      y: 30,
      opacity: 0,
      transition: {
        y: { stiffness: 1000 },
      },
    },
  }

  return (
    <motion.div
      className="md:hidden overflow-hidden"
      initial={false}
      animate={isOpen ? "open" : "closed"}
      variants={{
        open: { 
          height: 'auto',
          transition: { 
            staggerChildren: 0.07,
            delayChildren: 0.2 
          }
        },
        closed: { 
          height: 0,
          transition: { 
            staggerChildren: 0.05,
            staggerDirection: -1,
            when: "afterChildren"
          }
        }
      }}
    >
      <div className="container flex flex-col space-y-3 p-4 pb-6">
        {navItems.map((item) => (
          <motion.div key={item.path} variants={itemVariants}>
            <NavItem 
              name={item.name} 
              path={item.path} 
              isActive={currentPath === item.path}
              onClick={onItemClick}
            />
          </motion.div>
        ))}
        <motion.div variants={itemVariants} className="flex flex-col gap-2 pt-2">
          <Button variant="outline" size="sm" asChild>
            <Link href="/login">Log In</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/signup">Sign Up</Link>
          </Button>
        </motion.div>
      </div>
    </motion.div>
  )
}

/**
 * Desktop navigation component
 */
const DesktopNav = ({ 
  navItems, 
  currentPath 
}: { 
  navItems: Array<{ name: string; path: string }>
  currentPath: string
}) => (
  <nav className="hidden md:flex gap-6">
    {navItems.map((item) => (
      <NavItem 
        key={item.path} 
        name={item.name} 
        path={item.path} 
        isActive={currentPath === item.path} 
      />
    ))}
  </nav>
)

/**
 * Desktop auth buttons component
 */
const DesktopAuthButtons = () => (
  <div className="hidden md:flex items-center gap-4">
    <ThemeToggle />
    <Button variant="outline" size="sm" asChild>
      <Link href="/login">Log In</Link>
    </Button>
    <Button size="sm" asChild>
      <Link href="/signup">Sign Up</Link>
    </Button>
  </div>
)

/**
 * Main navbar component
 */
export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  // Navigation items data
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Research", path: "/research" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo and site name */}
        <Link href="/" className="flex items-center gap-2">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <img src="/logo.svg" alt="SAGE Research" className="h-7 w-7" />
          </motion.div>
          <span className="font-bold">SAGE Research</span>
        </Link>

        {/* Desktop navigation */}
        <DesktopNav navItems={navItems} currentPath={pathname} />

        {/* Desktop auth buttons */}
        <DesktopAuthButtons />

        {/* Mobile menu toggle and theme toggle */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <MenuToggle toggle={toggleMenu} isOpen={isMenuOpen} />
        </div>
      </div>

      {/* Mobile menu */}
      <MobileMenu 
        isOpen={isMenuOpen} 
        navItems={navItems} 
        currentPath={pathname}
        onItemClick={() => setIsMenuOpen(false)}
      />
    </header>
  )
}
