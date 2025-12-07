# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Fault Reporter is a React Native mobile application built with Expo. The app uses file-based routing via Expo Router and supports iOS, Android, and web platforms.

## Key Commands

- `npm install` - Install dependencies
- `npm start` or `npx expo start` - Start the development server
- `npm run android` - Run on Android emulator
- `npm run ios` - Run on iOS simulator
- `npm run web` - Run on web
- `npm run lint` - Run ESLint
- `npm run reset-project` - Move starter code to app-example and create blank app directory

## Architecture

### Routing

Uses Expo Router with file-based routing. Routes are defined in the `app/` directory:

- `app/_layout.tsx` - Root layout with theme provider and navigation stack
- `app/(tabs)/` - Tab-based navigation group
- `app/(tabs)/_layout.tsx` - Tab bar configuration
- `app/(tabs)/index.tsx` - Home screen (tab route)
- `app/(tabs)/explore.tsx` - Explore screen (tab route)
- `app/modal.tsx` - Modal screen

The root layout uses `unstable_settings.anchor: '(tabs)'` to set the default anchor route.

### Theming System

The app has a complete dark/light mode theming system:

- `constants/theme.ts` - Color and font definitions for light/dark modes
- `hooks/use-color-scheme.ts` - Platform-specific color scheme detection (has separate web implementation)
- `hooks/use-theme-color.ts` - Hook for accessing theme colors
- `components/themed-text.tsx` - Themed text component with type variants (default, title, subtitle, link, defaultSemiBold)
- `components/themed-view.tsx` - Themed view component

Theme colors are managed centrally in `Colors` object with light/dark variants.

### Component Organization

- `components/` - Shared components (themed wrappers, haptic feedback, parallax scroll)
- `components/ui/` - UI primitives (icon symbols, collapsible)
- Platform-specific components use `.ios.tsx` and `.web.tsx` extensions (e.g., `icon-symbol.ios.tsx`, `use-color-scheme.web.ts`)

### Path Aliases

TypeScript is configured with `@/*` path alias that maps to the root directory, used throughout for imports.

## Expo Configuration

- **New Architecture**: Enabled (`newArchEnabled: true`)
- **React Compiler**: Enabled in experiments
- **Typed Routes**: Enabled in experiments
- **Scheme**: `faultreporter://`
- **Splash Screen**: Custom splash with color `#5EBAB0`
- **Edge-to-edge**: Disabled on Android
- **Predictive Back**: Disabled on Android
