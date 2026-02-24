# Aryan Hasmi - Portfolio

Welcome to my personal portfolio project! It is a modern, single-page React frontend application built with Vite and TypeScript, featuring a strict Cyberpunk/Futuristic Terminal aesthetic.

## Features
- **AI Persona Integration**: Built-in AI assistant using the `@google/genai` SDK and the `gemini-3-flash-preview` model.
- **Performance Optimized**: Lazy loaded components and `IntersectionObserver` triggered scroll animations.
- **Cyberpunk UI/UX**: Dark themes, neon cyan and deep purple accents, glitch animations, and 3D tilt effects.
- **Micro-interactions**: Custom haptic feedback for a tactile experience on mobile devices.

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   ```bash
   npm install
   ```
2. Set the `GEMINI_API_KEY` in `.env.local` to your Gemini API key:
   ```bash
   GEMINI_API_KEY=your_api_key_here
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
