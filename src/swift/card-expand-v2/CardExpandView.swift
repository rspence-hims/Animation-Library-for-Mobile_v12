import SwiftUI

// MARK: - CardExpandV2

/// A prescription card that expands from a compact preview into a full-screen
/// detail view with smooth spring animations, bounce effects, and staged
/// content reveals.
///
/// Usage:
///   PhoneFrame { CardExpandV2() }
///
/// Assets required:
///   - "bottle" image in your asset catalog (the prescription bottle photo)

struct CardExpandV2: View {
    @State var expanded = false
    @State var showText = false
    @State var showClose = false
    @State var bounceScale: CGFloat = 1.0
    @State var anticipateCollapse = false

    // MARK: - Animation Config

    let expandAnimation: Animation = .spring(response: 0.35, dampingFraction: 0.82)
    let contentFade: Animation = .easeOut(duration: 0.25)

    // MARK: - Layout Constants (based on 375x812 frame)

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

            // Expanding card
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
        withAnimation(expandAnimation) {
            expanded = true
            bounceScale = 1.0
        }
        // Landing bounce
        DispatchQueue.main.asyncAfter(deadline: .now() + 0.25) {
            withAnimation(.spring(response: 0.3, dampingFraction: 0.6)) {
                bounceScale = 1.025
            }
            DispatchQueue.main.asyncAfter(deadline: .now() + 0.15) {
                withAnimation(.spring(response: 0.25, dampingFraction: 0.7)) {
                    bounceScale = 1.0
                }
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
            anticipateCollapse = true
            showText = false
            showClose = false
        }
        // Stage 2: collapse card after content exits
        DispatchQueue.main.asyncAfter(deadline: .now() + 0.25) {
            withAnimation(expandAnimation) {
                anticipateCollapse = false
                expanded = false
            }
            // Landing bounce
            DispatchQueue.main.asyncAfter(deadline: .now() + 0.25) {
                withAnimation(.spring(response: 0.3, dampingFraction: 0.6)) {
                    bounceScale = 0.96
                }
                DispatchQueue.main.asyncAfter(deadline: .now() + 0.15) {
                    withAnimation(.spring(response: 0.25, dampingFraction: 0.7)) {
                        bounceScale = 1.0
                    }
                }
            }
        }
    }
}
