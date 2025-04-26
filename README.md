# SAGE Research Platform

A modern educational research platform built with Next.js, TypeScript, and Tailwind CSS.

## Project Overview

SAGE Research is a platform that provides educators, researchers, and students with access to high-quality educational research papers and resources.

## Code Structure and Organization

This codebase follows the SOLID principles for clean, maintainable code:

### S - Single Responsibility Principle
- Components are divided into smaller, focused components with a single responsibility
- For example, the Navbar is split into `DesktopNav`, `MobileMenu`, and other sub-components
- The Footer has separate components for sections, branding, and copyright

### O - Open/Closed Principle
- Components are designed to be extended without modification
- Utility functions in `utils.ts` can be used across the application without changing them

### L - Liskov Substitution Principle
- Components that implement the same interface can be substituted for each other
- For example, all UI components follow consistent patterns

### I - Interface Segregation Principle
- Small, focused interfaces are used (TypeScript types/interfaces)
- Props interfaces are specific to each component's needs

### D - Dependency Inversion Principle
- High-level components don't depend on low-level components
- Dependencies are passed through props and contexts

## Key Code Features

1. **Type Safety**
   - Proper TypeScript typing for all components and functions
   - Interface definitions for props and state
   - Return type declarations for functions

2. **Component Structure**
   - Clear component hierarchy
   - Separation of concerns between UI and business logic
   - Reusable UI components in the `/components/ui` directory

3. **Performance Optimizations**
   - React hooks for efficient state management
   - Memoization where appropriate
   - Proper cleanup of effects and event listeners

4. **Accessibility**
   - ARIA attributes for interactive elements
   - Keyboard navigation support
   - Screen reader friendly markup

5. **Code Documentation**
   - Clear comments explaining component purpose and functionality
   - JSDoc style comments for functions
   - Inline comments for complex logic

## Utility Functions

The `utils.ts` file contains several helpful utility functions:

- `cn`: Combines Tailwind CSS classes with conflict resolution
- `formatDate`: Formats dates in a readable format
- `truncateString`: Safely truncates strings with ellipsis
- `debounce`: Limits function call frequency
- `generateId`: Creates random string IDs

## Theme Support

The application supports light and dark themes:

- `ThemeProvider`: Context provider for theme state
- `ThemeToggle`: UI component for switching themes
- Smooth transitions between themes

## Responsive Design

The application is fully responsive with:

- Mobile-first approach
- Different layouts for mobile and desktop
- `useIsMobile` hook for responsive logic 