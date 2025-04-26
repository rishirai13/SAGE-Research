import * as React from "react"

/**
 * Mobile breakpoint value in pixels
 * Used to determine if the current viewport is considered mobile
 */
const MOBILE_BREAKPOINT = 768

/**
 * Custom hook to detect if the current viewport is mobile
 * 
 * @returns boolean - true if viewport width is below the mobile breakpoint
 */
export function useIsMobile(): boolean {
  // Using null as initial state to indicate it hasn't been determined yet
  // This prevents hydration issues by not rendering with assumed state
  const [isMobile, setIsMobile] = React.useState<boolean | null>(null)
  
  React.useEffect(() => {
    // Function to check and update mobile state
    const checkMobile = (): void => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    
    // Using both matchMedia and resize event for better coverage
    // matchMedia is more efficient but resize gives us immediate updates
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    
    // Modern event listener pattern
    const onChange = (): void => {
      checkMobile()
    }
    
    // Add event listeners
    if (mql.addEventListener) {
      mql.addEventListener("change", onChange)
    } else {
      // Fallback for older browsers
      window.addEventListener("resize", onChange)
    }
    
    // Initial check
    checkMobile()
    
    // Cleanup event listeners
    return () => {
      if (mql.removeEventListener) {
        mql.removeEventListener("change", onChange)
      } else {
        window.removeEventListener("resize", onChange)
      }
    }
  }, [])
  
  // Return false during SSR, true/false after hydration
  return isMobile ?? false
}
