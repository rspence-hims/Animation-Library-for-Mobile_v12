# Animation Library - Project Notes

## Tech Stack

- **Language:** TypeScript (.tsx / .ts)
- **Framework:** React 18
- **Styling:** Tailwind CSS v4
- **Build Tool:** Vite
- **Animation:** Motion (formerly Framer Motion)
- **Icons:** Lucide React
- **Routing:** React Router v7
- **UI Primitives:** Radix UI, shadcn/ui

## Architecture

- **Entry:** `/src/app/App.tsx`
- **Core layout components:**
  - `sidebar.tsx` - Collapsible dark-themed left sidebar (search, sort, tag filtering)
  - `animation-demos.tsx` - Center phone frame (375x812px) with live demos
  - `description-panel.tsx` - Right-side panel toggled via eye icon
- **Data:** `animation-data.tsx` - Demo metadata and categories
- **Demos:** `/src/app/components/demos/` - Individual demo components

## Sidebar Sub-components

- `SearchFilter` - Search input
- `CategorySection` - Category groupings
- `InteractionTypeFilter` - Interaction type filtering
- `SortFilter` - 3-column grid sort (Category, A-Z, Duration), collapsible expander

## Card Expand Demo (`card-expand.tsx`) - Animation Details

- **Duration:** 1.5s
- **3D Transform:** `transformPerspective: 800`, `rotateX` keyframes, `transformOrigin: "50% 50%"`
- **Keyframe structure:** 3-value arrays (collapsed, 20px margins, full screen)
  - `times: [0, 0.35, 1]`
  - First segment ease: `[0.32, 0.5, 0.25, 1]` (gradual arrival at 20px state)
  - Second segment ease: `[0.18, 0.0, 0.25, 1]` (smooth pickup from midpoint)
- **Bottle image expand ease:** `[0.16, 0.85, 0.1, 1]` (aggressive fill to prevent dark bg showing)
- **Inner clip wrapper:** Separate `motion.div` with `overflow-hidden` and animated `borderRadius` isolates clipping from 3D transform
- **Background:** `bg-[#13262e]` on inner wrapper (not outer 3D div) to prevent blue bleed
- **Anticipation squeeze:** On click, card scales to 0.95 via spring (stiffness 500, damping 25) for 180ms before expand triggers
- **Collapse sequence:** Labels stagger out right-to-left, text/X exit 500ms before card collapses
- **Status labels:** Stagger in left-to-right on expand (starting 1.5s delay), stagger out right-to-left on collapse
- **Close button:** `whileTap={{ scale: 1.1 }}` with spring; fade-in delayed 1.3s after mount (at 500ms via `showClose`)
- **Pill toggle indicator:** 52x48px; left button overlay `h-[42px]` / `top-[3px]`
- **Progress bar:** `left`/`right` inset positioning with same 3-keyframe timing; inner white fill static `width: "50%"`

## Pending Work

- [ ] **Ask demo cleanup** (`ask.tsx`): Remove unused `PrescriptionCardCollapsed` component definition, step timer logic (`useState`, `useEffect`, timeout), and unused imports (render already stripped of SuggestionBubbles, chat bubble, AI response text, bottle image, PrescriptionCardCollapsed, and prompt bar content)
