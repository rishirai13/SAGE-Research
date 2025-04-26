"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { RiMoonFill, RiSunFill } from "@remixicon/react"

/**
 * ThemeToggle component
 * Allows users to toggle between light and dark themes
 * Includes transitions for a smooth visual experience
 * Follows accessibility best practices
 */
export function ThemeToggle(): React.ReactElement {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  
  // Only show the toggle after mounting to avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true)
  }, [])
  
  // Handle theme toggle with keyboard support for accessibility
  const toggleTheme = React.useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark")
  }, [theme, setTheme])
  
  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="sm"
        className="px-2 opacity-0"
        aria-hidden="true"
        tabIndex={-1}
      >
        <span className="h-5 w-5" />
      </Button>
    )
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      aria-label={`Change to ${theme === "dark" ? "light" : "dark"} theme`}
      title={`Change to ${theme === "dark" ? "light" : "dark"} theme`}
      className="px-2 focus-visible:ring-2 focus-visible:ring-offset-2"
    >
      <RiSunFill className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <RiMoonFill className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">
        {`Change to ${theme === "dark" ? "light" : "dark"} theme`}
      </span>
    </Button>
  )
} 