import SwiftUI

// MARK: - CardExpand3D

/// A prescription card that expands from a compact preview into a full-screen
/// detail view with 3D perspective rotation, animated clip radius keyframes,
/// squeeze-on-press feedback, and staged content reveals.
///
/// Key differences from CardExpandV2 (flat):
/// - 3D `rotateX` tilt during expand/collapse (keyframed peak at -11°/-14°)
/// - Clip radius animates through keyframes (24→56→44 expand, 44→36→24 collapse)
/// - Squeeze scale on press (0.93) instead of landing bounce
/// - Custom timing curve (0.22, 1, 0.36, 1) at 0.7s duration
///
/// Usage:
///   PhoneFrame { CardExpand3D() }
///
/// Assets required:
///   - "bottle" image in your asset catalog (the prescription bottle photo)

struct CardExpand3D: View {
    @State var expanded = false
    @State var showText = false
    @State var showClose = false
    @State var bounceScale: CGFloat = 1.0
    @State var rotateX: Double = 0
    @State var clipRadius: CGFloat = 24

    // MARK: - Animation Config

    let expandDuration: Double = 0.7

    var expandCurve: Animation {
        .timingCurve(0.22, 1.0, 0.36, 1.0, duration: expandDuration)
    }

    var rotateCurve: Animation {
        .timingCurve(0.22, 0.68, 0.36, 1.0)
    }

    let contentFade: Animation = .easeOut(duration: 0.25)

    // MARK: - Layout Constants (based on 375×812 frame)

    let collapsedFrame = CGRect(x: 21, y: 275, width: 251, height: 303)
    var expandedFrame: CGRect { CGRect(x: 0, y: 0, width: 375, height: 812) }
    var cardFrame: CGRect { expanded ? expandedFrame : collapsedFrame }

    var body: some View {
        ZStack {
            // Conversation background
            conversationLayer
                .opacity(expanded ? 0 : 1)
                .animation(contentFade, value: expanded)

            // M profile button
            profileButton
                .opacity(expanded ? 0 : 1)
                .animation(.easeOut(duration: 0.2), value: expanded)

            // Expanding card with 3D transforms
            prescriptionCard

            // Close button
            if showClose {
                closeButton
                    .transition(.opacity)
            }
        }
        .frame(width: 375, height: 812)
        .clipped()
    }

    // MARK: - Actions

    func expand() {
        // Main card expand (position, size, labels)
        withAnimation(expandCurve) {
            expanded = true
        }

        // Spring back from squeeze
        DispatchQueue.main.asyncAfter(deadline: .now() + 0.08) {
            withAnimation(.easeOut(duration: 0.15)) {
                bounceScale = 1.0
            }
        }

        // RotateX keyframe stage 1: 0 → -11° (first 35% of duration)
        withAnimation(rotateCurve.speed(1.0 / (expandDuration * 0.35))) {
            rotateX = -11
        }
        // RotateX keyframe stage 2: -11° → 0° (remaining 65%)
        DispatchQueue.main.asyncAfter(deadline: .now() + expandDuration * 0.35) {
            withAnimation(rotateCurve.speed(1.0 / (expandDuration * 0.65))) {
                rotateX = 0
            }
        }

        // ClipRadius keyframe stage 1: 24 → 56 (first 30% of duration)
        withAnimation(.timingCurve(0.22, 1.0, 0.36, 1.0, duration: expandDuration * 0.3)) {
            clipRadius = 56
        }
        // ClipRadius keyframe stage 2: 56 → 44 (remaining 70%)
        DispatchQueue.main.asyncAfter(deadline: .now() + expandDuration * 0.3) {
            withAnimation(.timingCurve(0.22, 1.0, 0.36, 1.0, duration: expandDuration * 0.7)) {
                clipRadius = 44
            }
        }

        // Show close button after 350ms
        DispatchQueue.main.asyncAfter(deadline: .now() + 0.35) {
            withAnimation(.easeOut(duration: 0.2)) {
                showClose = true
            }
        }

        // Show description text after 700ms
        DispatchQueue.main.asyncAfter(deadline: .now() + 0.7) {
            withAnimation(.easeOut(duration: 0.35)) {
                showText = true
            }
        }
    }

    func collapse() {
        // Stage 1: hide text + close button
        withAnimation(.easeOut(duration: 0.2)) {
            showText = false
            showClose = false
        }

        // Stage 2: collapse card after content exits (250ms delay)
        DispatchQueue.main.asyncAfter(deadline: .now() + 0.25) {
            // Main card collapse
            withAnimation(expandCurve) {
                expanded = false
            }

            // RotateX keyframe stage 1: 0 → -14° (first 35%)
            withAnimation(rotateCurve.speed(1.0 / (expandDuration * 0.35))) {
                rotateX = -14.01
            }
            // RotateX keyframe stage 2: -14° → 0° (remaining 65%)
            DispatchQueue.main.asyncAfter(deadline: .now() + expandDuration * 0.35) {
                withAnimation(rotateCurve.speed(1.0 / (expandDuration * 0.65))) {
                    rotateX = 0
                }
            }

            // ClipRadius keyframe stage 1: 44 → 36 (first 30%)
            withAnimation(.timingCurve(0.22, 1.0, 0.36, 1.0, duration: expandDuration * 0.3)) {
                clipRadius = 36
            }
            // ClipRadius keyframe stage 2: 36 → 24 (remaining 70%)
            DispatchQueue.main.asyncAfter(deadline: .now() + expandDuration * 0.3) {
                withAnimation(.timingCurve(0.22, 1.0, 0.36, 1.0, duration: expandDuration * 0.7)) {
                    clipRadius = 24
                }
            }
        }
    }
}
