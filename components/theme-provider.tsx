'use client'

import * as React from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import type { ThemeProviderProps } from 'next-themes'

/**
 * ThemeProvider component
 * 
 * Wraps the application with next-themes provider to enable theme switching functionality
 * Handles theme detection, persistence, and switching between light and dark modes
 * 
 * @param props - ThemeProviderProps from next-themes
 * @param props.children - React children to be wrapped
 * @returns React component with theme context
 */
export function ThemeProvider({ 
  children, 
  ...props 
}: ThemeProviderProps): React.ReactElement {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
