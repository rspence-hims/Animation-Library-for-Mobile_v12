import SwiftUI

// MARK: - Card3DGlass2

/// A prescription card that expands from a compact preview into a full-screen
/// detail view with 3D perspective rotation, animated clip radius keyframes,
/// squeeze-on-press feedback, staged content reveals, and a glass distortion
/// effect (chromatic aberration + blur + brightness) that fires during transitions.
///
/// Key additions over CardExpand3D:
/// - Glass distortion effect during expand/collapse with skewed bell-curve timing
/// - Chromatic aberration via RGB channel splitting with vertical offset
/// - Gaussian blur and brightness boost peak at 35% of transition duration
///
/// Usage:
///   PhoneFrame { Card3DGlass2() }
///
/// Assets required:
///   - "bottle" image in your asset catalog (the prescription bottle photo)

struct Card3DGlass2: View {
    @State var expanded = false
    @State var showText = false
    @State var showClose = false
    @State var bounceScale: CGFloat = 1.0
    @State var rotateX: Double = 0
    @State var clipRadius: CGFloat = 24
    @State var glassIntensity: CGFloat = 0

    // MARK: - Animation Config

    let expandDuration: Double = 0.7

    var expandCurve: Animation {
        .timingCurve(0.22, 1.0, 0.36, 1.0, duration: expandDuration)
    }

    var rotateCurve: Animation {
        .timingCurve(0.22, 0.68, 0.36, 1.0)
    }

    let contentFade: Animation = .easeOut(duration: 0.25)

    // MARK: - Glass Effect Config

    let maxBlur: CGFloat = 10
    let maxBrightness: Double = 0.4
    let maxChromaOffset: CGFloat = 20

    // MARK: - Layout Constants (based on 375×812 frame)

    let collapsedFrame = CGRect(x: 21, y: 275, width: 251, height: 303)
    var expandedFrame: CGRect { CGRect(x: 0, y: 0, width: 375, height: 812) }
    var cardFrame: CGRect { expanded ? expandedFrame : collapsedFrame }

    var body: some View {
        ZStack {
            conversationLayer
                .opacity(expanded ? 0 : 1)
                .animation(contentFade, value: expanded)

            profileButton
                .opacity(expanded ? 0 : 1)
                .animation(.easeOut(duration: 0.2), value: expanded)

            prescriptionCard

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
        fireGlassEffect()

        withAnimation(expandCurve) {
            expanded = true
        }

        DispatchQueue.main.asyncAfter(deadline: .now() + 0.08) {
            withAnimation(.easeOut(duration: 0.15)) {
                bounceScale = 1.0
            }
        }

        withAnimation(rotateCurve.speed(1.0 / (expandDuration * 0.35))) {
            rotateX = -11
        }
        DispatchQueue.main.asyncAfter(deadline: .now() + expandDuration * 0.35) {
            withAnimation(rotateCurve.speed(1.0 / (expandDuration * 0.65))) {
                rotateX = 0
            }
        }

        withAnimation(.timingCurve(0.22, 1.0, 0.36, 1.0, duration: expandDuration * 0.3)) {
            clipRadius = 56
        }
        DispatchQueue.main.asyncAfter(deadline: .now() + expandDuration * 0.3) {
            withAnimation(.timingCurve(0.22, 1.0, 0.36, 1.0, duration: expandDuration * 0.7)) {
                clipRadius = 44
            }
        }

        DispatchQueue.main.asyncAfter(deadline: .now() + 0.35) {
            withAnimation(.easeOut(duration: 0.2)) {
                showClose = true
            }
        }

        DispatchQueue.main.asyncAfter(deadline: .now() + 0.7) {
            withAnimation(.easeOut(duration: 0.35)) {
                showText = true
            }
        }
    }

    func collapse() {
        withAnimation(.easeOut(duration: 0.2)) {
            showText = false
            showClose = false
        }

        DispatchQueue.main.asyncAfter(deadline: .now() + 0.25) {
            fireGlassEffect()

            withAnimation(expandCurve) {
                expanded = false
            }

            withAnimation(rotateCurve.speed(1.0 / (expandDuration * 0.35))) {
                rotateX = -14.01
            }
            DispatchQueue.main.asyncAfter(deadline: .now() + expandDuration * 0.35) {
                withAnimation(rotateCurve.speed(1.0 / (expandDuration * 0.65))) {
                    rotateX = 0
                }
            }

            withAnimation(.timingCurve(0.22, 1.0, 0.36, 1.0, duration: expandDuration * 0.3)) {
                clipRadius = 36
            }
            DispatchQueue.main.asyncAfter(deadline: .now() + expandDuration * 0.3) {
                withAnimation(.timingCurve(0.22, 1.0, 0.36, 1.0, duration: expandDuration * 0.7)) {
                    clipRadius = 24
                }
            }
        }
    }

    /// Two-phase animation matching the React skewed bell curve:
    /// fast ramp to peak at 35%, smooth resolve over remaining 65%.
    func fireGlassEffect() {
        withAnimation(.easeOut(duration: expandDuration * 0.35)) {
            glassIntensity = 1.0
        }
        DispatchQueue.main.asyncAfter(deadline: .now() + expandDuration * 0.35) {
            withAnimation(.easeIn(duration: expandDuration * 0.65)) {
                glassIntensity = 0.0
            }
        }
    }
}
