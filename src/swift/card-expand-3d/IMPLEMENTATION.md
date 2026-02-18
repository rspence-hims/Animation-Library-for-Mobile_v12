# CardExpand 3D — Implementation Guide

A prescription card that expands from a compact preview into a full-screen detail view with **3D perspective rotation**, animated clip radius keyframes, squeeze-on-press feedback, and staged content reveals.

## Quick Start

1. Add all `.swift` files to your Xcode project
2. Drag `Assets.xcassets` into your project (or merge with your existing asset catalog)
3. Use in any SwiftUI view:

```swift
PhoneFrame {
    CardExpand3D()
}
```

## File Overview

| File | Purpose |
|------|---------|
| `CardExpand3DView.swift` | Main struct with `@State` vars, animation config, layout constants, body, expand/collapse actions |
| `PhoneFrame.swift` | Reusable phone frame container (375×812, 44pt corners, drop shadow) |
| `PrescriptionCard.swift` | The expanding card ZStack with 3D rotation and clip radius (extension on `CardExpand3D`) |
| `SubComponents.swift` | StatusItem, conversation layer, nav bar, chat bubble, profile/close buttons (extension on `CardExpand3D`) |
| `Color+Hex.swift` | `Color.init(hex:)` convenience initializer |
| `Preview.swift` | Xcode preview wrapping the demo in `PhoneFrame` |

## Animation Details

### 3D Perspective Rotation
- **Expand**: Card tilts forward (rotateX 0° → -11° → 0°) with keyframed timing
- **Collapse**: Card tilts forward more aggressively (rotateX 0° → -14° → 0°)
- **Perspective**: 0.4 (moderate depth, matching CSS `transformPerspective: 550`)
- **Timing**: Peak rotation at 35% of duration, ease `(0.22, 0.68, 0.36, 1)`

### Clip Radius Keyframes
- **Expand**: Corner radius 24pt → 56pt → 44pt (peaks at 30% of duration)
- **Collapse**: Corner radius 44pt → 36pt → 24pt (peaks at 30% of duration)
- Uses `clipShape` with animated corner radius instead of `cornerRadius` modifier to avoid GPU compositing artifacts during 3D transforms

### Squeeze-on-Press
- Card squeezes to 93% scale on tap (110ms ease-out)
- After 140ms delay, expand begins and scale springs back to 100%
- No landing bounce (unlike the flat v01 variant)

### Staged Content Reveals
- **Close button**: Fades in at 350ms after expand
- **Description text**: Fades in + slides up at 700ms after expand
- **Status labels**: Stagger in with 100ms delays after text appears

### Staged Collapse
- **Stage 1**: Text and close button fade out (200ms ease-out)
- **Stage 2**: Card collapses after 250ms delay with 3D rotation

### Timing Curve
- Main expand/collapse: `(0.22, 1.0, 0.36, 1.0)` at 0.7s — fast ease-out with strong initial acceleration
- Rotation: `(0.22, 0.68, 0.36, 1.0)` — slightly softer for natural tilt feel

## Differences from CardExpandV2 (Flat)

| Feature | V2 Flat | V3 3D |
|---------|---------|-------|
| 3D rotation | None | rotateX keyframes (-11°/-14°) |
| Corner animation | Static `cornerRadius` | Keyframed `clipRadius` (24→56→44) |
| Press feedback | Scale 0.97 + landing bounce | Scale 0.93 squeeze only |
| Animation curve | Spring (response: 0.35) | Timing curve (0.22, 1, 0.36, 1) |
| Duration | ~350ms (spring) | 700ms |
| Collapse bounce | Yes (0.96 → 1.0) | No |

## Requirements

- iOS 17.0+
- SwiftUI
- Xcode 15+
