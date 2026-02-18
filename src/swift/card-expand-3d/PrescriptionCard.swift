import SwiftUI

// MARK: - Prescription Card

extension CardExpand3D {

    var prescriptionCard: some View {
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
}
