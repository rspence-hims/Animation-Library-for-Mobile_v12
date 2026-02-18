export interface SwiftPackage {
  folder: string;
  exportName: string;
  files: string[];
  assets: Record<string, string>;
}

export interface AnimationItem {
  id: string;
  name: string;
  description: string;
  easing: string;
  easingCurve: string;
  duration: string;
  category: string;
  tags: string[];
  useCase: string;
  archived?: boolean;
  swiftFile?: string;
  assetFiles?: string[];
  swiftPackage?: SwiftPackage;
}

export interface AnimationCategory {
  id: string;
  name: string;
  icon: string;
  items: AnimationItem[];
}

export const allTags = [
  "spring",
  "ease-out",
  "ease-in-out",
  "linear",
  "scale",
  "opacity",
  "slide",
  "3d",
  "gesture",
  "drag",
  "swipe",
  "tap",
  "state-change",
  "enter",
  "exit",
  "loop",
  "stagger",
];

export const animationCategories: AnimationCategory[] = [
  {
    id: "cards",
    name: "Cards",
    icon: "cards",
    items: [
      {
        id: "card-expand",
        name: "Card Expand - Perspective",
        description:
          "A content card expands into a full-screen detail view with a shared element transition. The card's image and title morph into the detail layout while the background dims. Common in App Store, news readers, and photo galleries.",
        easing: "spring",
        easingCurve: "cubic-bezier(0.32, 1.12, 0.48, 1)",
        duration: "500ms",
        category: "cards",
        tags: ["spring", "scale", "opacity", "enter", "exit"],
        useCase: "App Store today cards, news article previews, product detail expansion",
        archived: true,
      },
      {
        id: "card-expand_v01",
        name: "Card Expand",
        description:
          "A content card expands into a full-screen detail view with a shared element transition. The card's image and title morph into the detail layout while the background dims. Common in App Store, news readers, and photo galleries.",
        easing: "spring",
        easingCurve: "cubic-bezier(0.32, 1.12, 0.48, 1)",
        duration: "500ms",
        category: "cards",
        tags: ["spring", "scale", "opacity", "enter", "exit"],
        useCase: "App Store today cards, news article previews, product detail expansion",
        swiftFile: "CardExpandV2.swift",
        assetFiles: ["d656ba7ea9c64660e689fc69995f4aee6c3bb579.png"],
        swiftPackage: {
          folder: "card-expand-v2",
          exportName: "CardExpand",
          files: [
            "CardExpandView.swift",
            "PhoneFrame.swift",
            "PrescriptionCard.swift",
            "SubComponents.swift",
            "Color+Hex.swift",
            "Preview.swift",
          ],
          assets: {
            bottle: "d656ba7ea9c64660e689fc69995f4aee6c3bb579.png",
          },
        },
      },
      {
        id: "card-expand_v02",
        name: "Card Expand 3D",
        description:
          "A content card expands into a full-screen detail view with a shared element transition. The card's image and title morph into the detail layout while the background dims. Common in App Store, news readers, and photo galleries.",
        easing: "spring",
        easingCurve: "cubic-bezier(0.32, 1.12, 0.48, 1)",
        duration: "500ms",
        category: "cards",
        tags: ["spring", "scale", "opacity", "enter", "exit"],
        useCase: "App Store today cards, news article previews, product detail expansion",
        swiftFile: "CardExpand3D.swift",
        assetFiles: ["d656ba7ea9c64660e689fc69995f4aee6c3bb579.png"],
        swiftPackage: {
          folder: "card-expand-3d",
          exportName: "CardExpand3D",
          files: [
            "CardExpand3DView.swift",
            "PhoneFrame.swift",
            "PrescriptionCard.swift",
            "SubComponents.swift",
            "Color+Hex.swift",
            "Preview.swift",
          ],
          assets: {
            bottle: "d656ba7ea9c64660e689fc69995f4aee6c3bb579.png",
          },
        },
      },
      {
        id: "card-flip",
        name: "Card Flip Reveal",
        description:
          "A 3D perspective rotation that reveals the back face of a card. The card rotates 180° around the Y axis with preserved 3D depth. Use for payment card CVV reveal, flashcard apps, or settings toggles that expose hidden info.",
        easing: "ease-in-out",
        easingCurve: "cubic-bezier(0.42, 0, 0.58, 1)",
        duration: "600ms",
        category: "cards",
        tags: ["3d", "ease-in-out", "state-change"],
        useCase: "Credit card flip, flashcard learning, reveal hidden info",
      },
      {
        id: "card-swipe",
        name: "Card Swipe Dismiss",
        description:
          "Cards in a stack that can be swiped left or right to dismiss. The top card follows the touch position, rotates proportionally to drag distance, and flies off on release. Below cards shift up to fill the gap with spring physics.",
        easing: "spring",
        easingCurve: "cubic-bezier(0.34, 1.56, 0.64, 1)",
        duration: "500ms",
        category: "cards",
        tags: ["spring", "gesture", "drag", "swipe", "exit"],
        useCase: "Dating apps, decision UIs, triaging content queues",
      },
      {
        id: "ask",
        name: "Ask",
        description:
          "A conversational AI interface where user queries trigger staggered response animations. The chat bubble enters, followed by streaming AI text, an expanding prescription card, and cascading suggestion pills — each element timed in sequence to create a natural dialogue rhythm.",
        easing: "ease-out",
        easingCurve: "cubic-bezier(0, 0, 0.58, 1)",
        duration: "350ms + stagger",
        category: "cards",
        tags: ["ease-out", "opacity", "slide", "enter", "stagger"],
        useCase: "AI chat interfaces, health assistant conversations, guided support flows",
      },
    ],
  },
  {
    id: "navigation",
    name: "Navigation",
    icon: "navigation",
    items: [
      {
        id: "nav-menu-expand",
        name: "Menu Expand",
        description:
          "A hamburger icon morphs into an expanded menu overlay. The three bars animate — top and bottom rotate into an X while menu items stagger in from below with spring physics. The background scales up from the icon origin point, creating a spatial connection between trigger and content.",
        easing: "spring",
        easingCurve: "cubic-bezier(0.25, 1.2, 0.4, 1)",
        duration: "400ms + stagger",
        category: "navigation",
        tags: ["spring", "scale", "opacity", "enter", "exit", "stagger"],
        useCase: "Hamburger menus, overflow menus, contextual action lists",
      },
      {
        id: "nav-page-transition",
        name: "Page Transition",
        description:
          "An expanding menu with tab selection drives a full-page transition. Clicking a tab slides the teal indicator to the selected item while the current page content slides out left and the new page slides in from the right with spring physics. The navigation bar stays fixed while only the page body animates.",
        easing: "spring",
        easingCurve: "cubic-bezier(0.25, 1.0, 0.4, 1)",
        duration: "400ms + spring",
        category: "navigation",
        tags: ["spring", "slide", "enter", "exit", "state-change"],
        useCase: "Tab-driven page switching, dashboard navigation, multi-view apps",
      },
      {
        id: "nav-tabs",
        name: "Tab Bar Switch",
        description:
          "An active indicator pill slides between tab positions using spring physics. The content area crossfades between views. The indicator width and position interpolate simultaneously, creating a fluid connected feel.",
        easing: "spring",
        easingCurve: "cubic-bezier(0.28, 1.15, 0.42, 1)",
        duration: "300ms",
        category: "navigation",
        tags: ["spring", "slide", "state-change"],
        useCase: "Bottom tab bars, top tab navigation, category selectors",
      },
      {
        id: "nav-page-push",
        name: "Page Push",
        description:
          "iOS-style hierarchical navigation. The new view slides in from the right at full speed while the current view shifts left at 30% speed, creating a parallax depth effect. The back gesture reverses this with matched timing.",
        easing: "ease-out",
        easingCurve: "cubic-bezier(0.25, 0.1, 0.25, 1)",
        duration: "350ms",
        category: "navigation",
        tags: ["ease-out", "slide", "enter", "exit"],
        useCase: "Drill-down navigation, settings hierarchies, multi-step flows",
      },
      {
        id: "nav-drawer",
        name: "Drawer Menu",
        description:
          "A side drawer slides in from the left edge, pushing the main content to the right. The main content also scales slightly to create depth. A dimming overlay fades in synchronously. Swipe-to-close gesture supported.",
        easing: "ease-out",
        easingCurve: "cubic-bezier(0, 0, 0.58, 1)",
        duration: "300ms",
        category: "navigation",
        tags: ["ease-out", "slide", "gesture", "enter", "exit"],
        useCase: "Hamburger menus, app-level navigation, settings access",
      },
      {
        id: "nav-segmented",
        name: "Segmented Control",
        description:
          "A pill-shaped indicator slides between segments with spring physics. The selected text transitions from muted to active weight/color. Tapping any segment triggers a smooth horizontal translation of the background pill.",
        easing: "spring",
        easingCurve: "cubic-bezier(0.28, 1.15, 0.42, 1)",
        duration: "300ms",
        category: "navigation",
        tags: ["spring", "slide", "state-change", "tap"],
        useCase: "View mode toggles, filter controls, preference selectors",
      },
    ],
  },
  {
    id: "buttons",
    name: "Buttons",
    icon: "buttons",
    items: [
      {
        id: "button-tap",
        name: "Tap Scale",
        description:
          "On press, the button scales down to 95% with spring physics, then bounces back on release. The overshoot gives a tactile, physical feel. Apply to any tappable surface — CTA buttons, icon buttons, or card actions.",
        easing: "spring",
        easingCurve: "cubic-bezier(0.34, 1.56, 0.64, 1)",
        duration: "150ms",
        category: "buttons",
        tags: ["spring", "scale", "tap"],
        useCase: "Primary/secondary CTAs, icon actions, any tappable surface",
      },
      {
        id: "button-loading",
        name: "Loading → Success",
        description:
          "A multi-state button that transitions through idle → loading → success. The label fades out, a spinner fades in, then collapses into a checkmark with a color shift to green. Width smoothly adjusts between states.",
        easing: "ease-in-out",
        easingCurve: "cubic-bezier(0.42, 0, 0.58, 1)",
        duration: "300ms per state",
        category: "buttons",
        tags: ["ease-in-out", "opacity", "scale", "state-change"],
        useCase: "Form submissions, payment processing, async actions",
      },
      {
        id: "button-ripple",
        name: "Ripple Touch",
        description:
          "A circular ripple expands from the exact touch point. The ripple scales outward while fading, creating a material design-inspired touch response. Layer it under any tappable surface for visual input confirmation.",
        easing: "ease-out",
        easingCurve: "cubic-bezier(0, 0, 0.58, 1)",
        duration: "500ms",
        category: "buttons",
        tags: ["ease-out", "scale", "opacity", "tap"],
        useCase: "Material design buttons, list items, surface touch feedback",
      },
    ],
  },
  {
    id: "lists",
    name: "Lists",
    icon: "lists",
    items: [
      {
        id: "list-stagger",
        name: "Staggered Enter",
        description:
          "List items appear in sequence with a cascading delay. Each row fades in and slides up from 20px below, with a 50ms stagger between items. The effect creates a smooth waterfall entrance that guides the eye downward.",
        easing: "ease-out",
        easingCurve: "cubic-bezier(0, 0, 0.58, 1)",
        duration: "300ms + 50ms stagger",
        category: "lists",
        tags: ["ease-out", "opacity", "slide", "enter", "stagger"],
        useCase: "Feed loading, search results, settings menus, any vertical list",
      },
      {
        id: "list-pull-refresh",
        name: "Pull to Refresh",
        description:
          "An overscroll gesture at the top of a list triggers a refresh. The content translates down with elastic resistance revealing a spinner. On release above threshold, the spinner animates while data loads, then springs back.",
        easing: "spring",
        easingCurve: "cubic-bezier(0.28, 1.2, 0.42, 1)",
        duration: "400ms",
        category: "lists",
        tags: ["spring", "gesture", "drag", "slide", "loop"],
        useCase: "Social feeds, email inboxes, any refreshable content list",
      },
      {
        id: "list-reorder",
        name: "Drag to Reorder",
        description:
          "Long-press activates drag mode. The held item lifts with a subtle scale and shadow increase. As it moves, neighboring items smoothly reposition with spring animations to make room, providing real-time spatial feedback.",
        easing: "spring",
        easingCurve: "cubic-bezier(0.25, 1.3, 0.4, 1)",
        duration: "250ms",
        category: "lists",
        tags: ["spring", "gesture", "drag", "scale"],
        useCase: "Todo reordering, playlist management, priority queues",
      },
    ],
  },
  {
    id: "modals",
    name: "Modals & Sheets",
    icon: "modals",
    items: [
      {
        id: "sheet-bottom",
        name: "Bottom Sheet",
        description:
          "A panel slides up from the bottom screen edge with spring physics. Includes a drag handle for gesture dismissal — drag down past 40% to dismiss, otherwise it snaps back. The background dims with a synchronized fade.",
        easing: "spring",
        easingCurve: "cubic-bezier(0.28, 1.2, 0.42, 1)",
        duration: "450ms",
        category: "modals",
        tags: ["spring", "slide", "gesture", "enter", "exit"],
        useCase: "Share sheets, action menus, filters, map detail panels",
      },
      {
        id: "modal-center",
        name: "Center Modal",
        description:
          "A dialog scales in from 80% with a slight spring overshoot while the background overlay fades to 40% black. The spring gives the entrance weight without feeling sluggish. Dismiss reverses the animation.",
        easing: "spring",
        easingCurve: "cubic-bezier(0.23, 1.38, 0.38, 1)",
        duration: "350ms",
        category: "modals",
        tags: ["spring", "scale", "opacity", "enter", "exit"],
        useCase: "Confirmations, alerts, success states, permission requests",
      },
      {
        id: "modal-toast",
        name: "Toast Notification",
        description:
          "A compact notification slides down from the top edge, pauses, then slides back up to dismiss. Uses spring physics for the enter to feel snappy, and ease-out for the exit to feel natural. Auto-dismisses after 3 seconds.",
        easing: "spring",
        easingCurve: "cubic-bezier(0.25, 1.3, 0.4, 1)",
        duration: "400ms enter / 250ms exit",
        category: "modals",
        tags: ["spring", "slide", "enter", "exit"],
        useCase: "Success messages, error alerts, push notification banners",
      },
    ],
  },
  {
    id: "inputs",
    name: "Inputs & Controls",
    icon: "inputs",
    items: [
      {
        id: "input-toggle",
        name: "Toggle Switch",
        description:
          "The thumb slides from left to right with spring physics while the track color interpolates between off (gray) and on (brand). The thumb slightly squishes horizontally during movement for a playful, physical feel.",
        easing: "spring",
        easingCurve: "cubic-bezier(0.25, 1.2, 0.4, 1)",
        duration: "250ms",
        category: "inputs",
        tags: ["spring", "slide", "state-change", "tap"],
        useCase: "Settings toggles, feature flags, on/off preferences",
      },
      {
        id: "input-like",
        name: "Like / Favorite",
        description:
          "Tapping triggers a scale bounce with spring overshoot. The heart fills with color while particle effects radiate outward from center. A second tap reverses the fill with a gentler ease-out. Provides delightful feedback.",
        easing: "spring",
        easingCurve: "cubic-bezier(0.34, 1.56, 0.64, 1)",
        duration: "400ms",
        category: "inputs",
        tags: ["spring", "scale", "tap", "state-change"],
        useCase: "Social likes, favorites, bookmarks, wishlists",
      },
      {
        id: "input-checkbox",
        name: "Checkbox Bounce",
        description:
          "On check, a stroke-dashoffset animation draws the checkmark path from start to end. The checkbox container briefly scales down then bounces past 100% with spring physics. The fill color fades in simultaneously.",
        easing: "spring",
        easingCurve: "cubic-bezier(0.34, 1.56, 0.64, 1)",
        duration: "350ms",
        category: "inputs",
        tags: ["spring", "scale", "opacity", "tap", "state-change"],
        useCase: "Todo items, form selections, multi-select lists",
      },
    ],
  },
  {
    id: "feedback",
    name: "Feedback & Loading",
    icon: "feedback",
    items: [
      {
        id: "feedback-skeleton",
        name: "Skeleton Screen",
        description:
          "Placeholder shapes match the final content layout. A shimmer gradient sweeps left-to-right on loop, creating a subtle loading pulse. When content arrives, it crossfades over the skeleton. Reduces perceived load time.",
        easing: "ease-in-out",
        easingCurve: "cubic-bezier(0.42, 0, 0.58, 1)",
        duration: "1500ms loop",
        category: "feedback",
        tags: ["ease-in-out", "opacity", "loop"],
        useCase: "Content feeds, profile pages, any data-dependent UI",
      },
      {
        id: "feedback-progress",
        name: "Progress Bar",
        description:
          "A determinate progress indicator with smooth width transitions. The filled portion uses ease-out for organic deceleration at each step. A subtle shimmer overlay moves across the fill for visual activity during pauses.",
        easing: "ease-out",
        easingCurve: "cubic-bezier(0, 0, 0.58, 1)",
        duration: "600ms per step",
        category: "feedback",
        tags: ["ease-out", "scale", "loop"],
        useCase: "File uploads, onboarding steps, download progress, form completion",
      },
      {
        id: "feedback-spinner",
        name: "Loading Spinner",
        description:
          "Multiple spinner variants: a rotating ring with variable dash length, bouncing dots with staggered timing, and an equalizer-style bar animation. All use perpetual loops with carefully tuned offsets for rhythm.",
        easing: "linear / spring",
        easingCurve: "cubic-bezier(0, 0, 1, 1)",
        duration: "600–1000ms loop",
        category: "feedback",
        tags: ["linear", "loop", "scale"],
        useCase: "API loading, content processing, indeterminate waits",
      },
    ],
  },
];