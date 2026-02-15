# Product Store — Frontend

## Tech Stack
Built with **React**, **TypeScript**, and **Vite**, styled using **Tailwind CSS**. The app fetches product data from a backend REST API and manages cart state locally with React hooks.

## Layout Approach
The product listing uses a responsive CSS Grid layout (`grid-cols-2` on mobile, `grid-cols-3` on tablet, `grid-cols-4` on desktop) to display product cards. Each card is a self-contained component with image, name, price, variant selector, and an Add to Cart button that dynamically shows "Out of Stock" based on product availability from the API.

## Responsiveness
The layout adapts across breakpoints using Tailwind's responsive utilities. Cards stretch uniformly with `items-stretch`, and the cart drawer overlays the full screen on mobile while anchoring to the right on wider viewports. All interactive elements (buttons, dropdowns) use appropriate touch-friendly sizing.

## How to Run

```bash
npm install
npm run dev
```

The frontend runs at `http://localhost:5173` and expects the backend API at `http://localhost:3000`.
