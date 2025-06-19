import * as React from "react"

const MOBILE_BREAKPOINT = 768

/**
 * Custom hook to detect mobile viewport
 * @param breakpoint - Optional custom breakpoint (default: 768px)
 * @returns boolean indicating if current viewport is mobile
 */
export function useIsMobile(breakpoint: number = MOBILE_BREAKPOINT): boolean {
  const [isMobile, setIsMobile] = React.useState<boolean>(() => {
    // Only run this check on the client side
    if (typeof window !== "undefined") {
      return window.innerWidth < breakpoint
    }
    return false
  })

  React.useEffect(() => {
    // Early return if window is not available (SSR)
    if (typeof window === "undefined") return

    const mediaQuery = `(max-width: ${breakpoint - 1}px)`
    
    const handleResize = () => {
      setIsMobile(window.innerWidth < breakpoint)
    }

    // Initialize with current value
    handleResize()

    // Modern event listener with cleanup
    const mediaQueryList = window.matchMedia(mediaQuery)
    const listener = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    
    // Add both resize and media query listeners for better reliability
    window.addEventListener('resize', handleResize)
    mediaQueryList.addEventListener('change', listener)

    return () => {
      window.removeEventListener('resize', handleResize)
      mediaQueryList.removeEventListener('change', listener)
    }
  }, [breakpoint])

  return isMobile
}

// Usage example:
// const isMobile = useIsMobile() // uses default 768px breakpoint
// const isMobile = useIsMobile(1024) // custom breakpoint
