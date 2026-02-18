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
///   CardExpand3D()
///
/// Assets required:
///   - "bottle" image in your asset catalog (the prescription bottle photo)

struct CardExpand3D: View {
    @State private var expanded = false
    @State private var showText = false
    @State private var showClose = false
    @State private var bounceScale: CGFloat = 1.0
    @State private var rotateX: Double = 0
    @State private var clipRadius: CGFloat = 24

    // MARK: - Animation Config

    private let expandDuration: Double = 0.7

    private var expandCurve: Animation {
        .timingCurve(0.22, 1.0, 0.36, 1.0, duration: expandDuration)
    }

    private var rotateCurve: Animation {
        .timingCurve(0.22, 0.68, 0.36, 1.0)
    }

    private let contentFade: Animation = .easeOut(duration: 0.25)

    // MARK: - Layout Constants (based on 375×812 frame)

    private let collapsedFrame = CGRect(x: 21, y: 275, width: 251, height: 303)
    private var expandedFrame: CGRect { CGRect(x: 0, y: 0, width: 375, height: 812) }
    private var cardFrame: CGRect { expanded ? expandedFrame : collapsedFrame }

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

    // MARK: - Prescription Card

    private var prescriptionCard: some View {
        ZStack {
            // Dark card background
            Color(hex: "#13262e")

            // Bottle image
            Image("bottle")
                .resizable()
                .aspectRatio(contentMode: .fill)
                .frame(
                    width: expanded ? 676 : 376,
                    height: expanded ? 1014 : 564
                )
                .offset(
                    x: -(expanded ? 676 : 376) * 0.01,
                    y: expanded ? (1014 * 0.02) : (564 * 0.06)
                )

            // Bottom gradient overlay
            VStack {
                Spacer()
                LinearGradient(
                    colors: [Color(hex: "#36652a"), .clear],
                    startPoint: .bottom,
                    endPoint: .top
                )
                .frame(height: showText ? 363 : 99)
                .animation(.easeOut(duration: 0.4), value: showText)
            }

            // Description text (fades in + slides up)
            if showText {
                VStack(alignment: .leading, spacing: 16) {
                    Text("A licensed provider has approved your care plan, and your prescription is now being prepared by the Hers pharmacy.")
                    Text("This step includes safety checks and careful preparation. You don\u{2019}t need to do anything right now\u{2014}we\u{2019}ll keep you updated.")
                }
                .font(.system(size: 16))
                .tracking(-0.89)
                .lineSpacing(4)
                .foregroundColor(.white)
                .padding(.horizontal, 22)
                .frame(maxWidth: .infinity, alignment: .leading)
                .offset(y: 150)
                .transition(.opacity.combined(with: .offset(y: 20)))
            }

            // Approved + Arrives labels
            VStack(alignment: .leading, spacing: 4) {
                Text("Approved")
                    .font(.system(size: 20, weight: .medium))
                    .tracking(-1)
                    .foregroundColor(.white)
                HStack(spacing: 0) {
                    Text("Arrives: ")
                        .foregroundColor(.white.opacity(0.4))
                    Text("Monday")
                        .foregroundColor(.white)
                }
                .font(.system(size: 16))
                .tracking(-0.5)
            }
            .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .topLeading)
            .padding(.leading, expanded ? 23 : 16)
            .padding(.top, expanded ? 66 : 16)

            // Progress bar + status labels
            VStack {
                Spacer()
                HStack(spacing: 2) {
                    RoundedRectangle(cornerRadius: 30)
                        .fill(Color.white)
                        .frame(width: nil, height: 6)
                        .layoutPriority(1)
                    RoundedRectangle(cornerRadius: 30)
                        .fill(Color.white.opacity(0.2))
                        .frame(height: 6)
                }
                .padding(.horizontal, expanded ? 22 : 13)
                .padding(.bottom, expanded ? 64 : 28)

                // Status labels (expanded only)
                if expanded && showLabels {
                    HStack {
                        ForEach(Array(statusItems.enumerated()), id: \.element.label) { index, item in
                            Text(item.label)
                                .font(.system(size: 13))
                                .tracking(-0.3)
                                .foregroundColor(item.active ? .white : .white.opacity(0.5))
                                .transition(.opacity.combined(with: .offset(x: -8)))
                                .animation(
                                    .easeOut(duration: 0.25).delay(0.7 + Double(index) * 0.1),
                                    value: showLabels
                                )
                            if index < statusItems.count - 1 {
                                Spacer()
                            }
                        }
                    }
                    .padding(.horizontal, 22)
                    .padding(.bottom, 16)
                    .transition(.opacity)
                }
            }
        }
        .frame(
            width: cardFrame.width,
            height: cardFrame.height
        )
        .clipShape(RoundedRectangle(cornerRadius: clipRadius, style: .continuous))
        .scaleEffect(bounceScale)
        .rotation3DEffect(
            .degrees(rotateX),
            axis: (x: 1, y: 0, z: 0),
            perspective: 0.4
        )
        .position(
            x: cardFrame.midX,
            y: cardFrame.midY
        )
        .animation(expandCurve, value: expanded)
        .onTapGesture {
            guard !expanded else { return }
            // Squeeze on press
            withAnimation(.easeOut(duration: 0.11)) {
                bounceScale = 0.93
            }
            DispatchQueue.main.asyncAfter(deadline: .now() + 0.14) {
                expand()
            }
        }
    }

    // MARK: - Status Items

    private struct StatusItem: Identifiable {
        let label: String
        let active: Bool
        var id: String { label }
    }

    private var statusItems: [StatusItem] {
        [
            StatusItem(label: "Requested", active: true),
            StatusItem(label: "Reviewed", active: true),
            StatusItem(label: "Shipped", active: false),
            StatusItem(label: "Delivered", active: false),
        ]
    }

    private var showLabels: Bool {
        expanded && showText
    }

    // MARK: - Conversation Background

    private var conversationLayer: some View {
        VStack(spacing: 0) {
            Spacer().frame(height: 45)
            navBar
            chatBubble(text: "When will it arrive?")
            responseText("I\u{2019}ve been keeping an eye on things while you were away. Your care request has been reviewed and approved, and your prescription is now being prepared for shipment.")
            Spacer()
        }
    }

    private var navBar: some View {
        HStack {
            ZStack {
                RoundedRectangle(cornerRadius: 56)
                    .stroke(Color(hex: "#9abdb1").opacity(0.2), lineWidth: 1)
                    .background(Color(hex: "#ebf3ed").opacity(0.1).clipShape(RoundedRectangle(cornerRadius: 56)))
                    .frame(width: 119, height: 48)

                // Teal indicator
                HStack {
                    RoundedRectangle(cornerRadius: 24)
                        .fill(Color(hex: "#2da5a2"))
                        .frame(width: 57.5, height: 44)
                    Spacer()
                }
                .padding(.leading, 2)
                .frame(width: 119)

                // Icons
                HStack(spacing: 0) {
                    Image(systemName: "person.fill")
                        .font(.system(size: 14))
                        .foregroundColor(.white)
                        .frame(width: 57.5, height: 44)
                    Image(systemName: "waveform.path.ecg")
                        .font(.system(size: 12))
                        .foregroundColor(Color(hex: "#162B33"))
                        .frame(width: 57.5, height: 44)
                }
                .frame(width: 119)
            }
            Spacer()
        }
        .padding(.horizontal, 20)
        .padding(.top, 16)
        .padding(.bottom, 8)
    }

    private func chatBubble(text: String) -> some View {
        HStack {
            Spacer()
            Text(text)
                .font(.system(size: 14))
                .tracking(-0.4)
                .foregroundColor(Color(hex: "#162b33"))
                .padding(.horizontal, 16)
                .padding(.vertical, 12)
                .background(Color(hex: "#ebf3ed"))
                .clipShape(RoundedRectangle(cornerRadius: 16))
        }
        .padding(.horizontal, 20)
        .padding(.bottom, 12)
    }

    private func responseText(_ text: String) -> some View {
        Text(text)
            .font(.system(size: 14))
            .tracking(-0.5)
            .lineSpacing(4)
            .foregroundColor(Color(hex: "#13262e"))
            .padding(.horizontal, 20)
            .padding(.top, 8)
            .padding(.bottom, 12)
    }

    // MARK: - Profile & Close Buttons

    private var profileButton: some View {
        Text("M")
            .font(.system(size: 18))
            .foregroundColor(Color(hex: "#162b33"))
            .frame(width: 52, height: 48)
            .background(
                RoundedRectangle(cornerRadius: 56)
                    .stroke(Color(hex: "#9abdb1").opacity(0.2), lineWidth: 1)
                    .background(Color(hex: "#ebf3ed").opacity(0.1).clipShape(RoundedRectangle(cornerRadius: 56)))
            )
            .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .topTrailing)
            .padding(.top, 63)
            .padding(.trailing, 20)
    }

    private var closeButton: some View {
        Button {
            collapse()
        } label: {
            Image(systemName: "xmark")
                .font(.system(size: 16, weight: .medium))
                .foregroundColor(.white)
                .frame(width: 48, height: 48)
                .background(
                    Circle()
                        .stroke(Color(hex: "#ebf3ed").opacity(0.2), lineWidth: 1)
                )
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .topTrailing)
        .padding(.top, 63)
        .padding(.trailing, 20)
        .zIndex(20)
    }

    // MARK: - Actions

    private func expand() {
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

    private func collapse() {
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

// MARK: - Color Extension

extension Color {
    init(hex: String) {
        let hex = hex.trimmingCharacters(in: CharacterSet(charactersIn: "#"))
        let scanner = Scanner(string: hex)
        var rgbValue: UInt64 = 0
        scanner.scanHexInt64(&rgbValue)
        let r = Double((rgbValue & 0xFF0000) >> 16) / 255.0
        let g = Double((rgbValue & 0x00FF00) >> 8) / 255.0
        let b = Double(rgbValue & 0x0000FF) / 255.0
        self.init(red: r, green: g, blue: b)
    }
}

// MARK: - Preview

#Preview {
    CardExpand3D()
        .preferredColorScheme(.light)
}
