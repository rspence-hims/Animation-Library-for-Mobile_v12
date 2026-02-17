# CardExpand — Implementation Guide

A prescription card that expands from a compact preview into a full-screen detail view with smooth spring animations, bounce effects, and staged content reveals.

## Quick Start

1. Add all `.swift` files to your Xcode project
2. Drag `Assets.xcassets` into your project (or merge with your existing asset catalog)
3. Use in any SwiftUI view:

```swift
PhoneFrame {
    CardExpandV2()
}
```

## File Overview

| File | Purpose |
|------|---------|
| `CardExpandView.swift` | Main struct with `@State` vars, animation config, layout constants, body, expand/collapse actions |
| `PhoneFrame.swift` | Reusable phone frame container (375x812, 44pt corners, drop shadow) |
| `PrescriptionCard.swift` | The expanding card ZStack (extension on `CardExpandV2`) |
| `SubComponents.swift` | StatusItem, conversation layer, nav bar, chat bubble, profile/close buttons (extension on `CardExpandV2`) |
| `Color+Hex.swift` | `Color.init(hex:)` convenience initializer |
| `Preview.swift` | Xcode preview wrapping the demo in `PhoneFrame` |

## Animation Details

- **Spring physics**: `response: 0.35, dampingFraction: 0.82`
- **Landing bounce**: Two-stage spring (scale 1.025 then settle to 1.0)
- **Staged reveals**: Close button at 350ms, description text at 700ms
- **Collapse**: Content exits first (200ms), card collapses after 250ms delay

## Requirements

- iOS 17.0+
- SwiftUI
- Xcode 15+
