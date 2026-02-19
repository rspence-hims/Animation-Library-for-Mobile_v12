import SwiftUI

// MARK: - Sub Components

extension MenuExpandView {

    // MARK: - Page Content

    var pageContent: some View {
        ZStack(alignment: .topLeading) {
            headline
            careTeamBadge
            responseChips
            promptBar
        }
        .frame(width: 375, height: 812)
    }

    // MARK: - Headline

    var headline: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text("Congrats, Meg")
                .font(.system(size: 20))
                .tracking(-1.05)
                .foregroundColor(Color(hex: "#2DA5A2"))

            Text("Your first dose is logged! How are you feeling? ")
                .font(.system(size: 32))
                .tracking(-2.01)
                .lineSpacing(3.3)
                .foregroundColor(Color(hex: "#162B33"))
        }
        .frame(width: 335, alignment: .leading)
        .offset(x: 20, y: 199)
    }

    // MARK: - Care Team Badge

    var careTeamBadge: some View {
        HStack(spacing: 8) {
            ZStack(alignment: .leading) {
                // Doctor avatar (behind)
                Circle()
                    .fill(Color(hex: "#EBF3ED").opacity(0.8))
                    .frame(width: 36, height: 36)
                    .overlay(
                        Image(systemName: "person.fill")
                            .font(.system(size: 14))
                            .foregroundColor(Color(hex: "#2DA5A2"))
                    )
                    .overlay(Circle().stroke(.white, lineWidth: 1))
                    .offset(x: 28)

                // "iv" avatar (front, overlaps)
                Circle()
                    .fill(Color(hex: "#EBF3ED").opacity(0.8))
                    .frame(width: 36, height: 36)
                    .overlay(ivLogoIcon)
                    .overlay(Circle().stroke(.white, lineWidth: 1))
            }
            .frame(width: 64, height: 36)

            Text("Your Care Team")
                .font(.system(size: 15))
                .tracking(-0.57)
                .foregroundColor(Color(hex: "#162B33"))
        }
        .padding(.leading, 8)
        .padding(.trailing, 16)
        .frame(height: 48)
        .background(
            RoundedRectangle(cornerRadius: 56)
                .fill(Color(hex: "#EBF3ED").opacity(0.1))
                .overlay(
                    RoundedRectangle(cornerRadius: 56)
                        .stroke(Color(hex: "#9ABDB1").opacity(0.2), lineWidth: 1)
                )
        )
        .offset(x: 21, y: 315)
    }

    // Stylized "iv" script logo
    var ivLogoIcon: some View {
        Canvas { context, size in
            let s = min(size.width, size.height) / 36.0
            var path = Path()
            // Simplified "iv" cursive stroke
            path.move(to: CGPoint(x: 10 * s, y: 11 * s))
            path.addQuadCurve(
                to: CGPoint(x: 12 * s, y: 25 * s),
                control: CGPoint(x: 8 * s, y: 20 * s)
            )
            path.move(to: CGPoint(x: 10 * s, y: 8 * s))
            path.addEllipse(in: CGRect(x: 9.5 * s, y: 7 * s, width: 2 * s, height: 2 * s))
            path.move(to: CGPoint(x: 17 * s, y: 11 * s))
            path.addLine(to: CGPoint(x: 20 * s, y: 25 * s))
            path.addLine(to: CGPoint(x: 23 * s, y: 11 * s))
            context.stroke(
                path,
                with: .color(Color(hex: "#2DA5A2")),
                style: StrokeStyle(lineWidth: 1.8 * s, lineCap: .round, lineJoin: .round)
            )
        }
        .frame(width: 20, height: 20)
    }

    // MARK: - Response Chips

    var responseChips: some View {
        let chips = [
            "I\u{2019}m feeling great",
            "I feel a little off",
            "I\u{2019}m noticing some side effects",
            "I want to talk to a doctor",
        ]

        return VStack(spacing: 4.08) {
            ForEach(chips, id: \.self) { text in
                HStack {
                    Spacer()
                    Text(text)
                        .font(.system(size: 16.3))
                        .tracking(-0.58)
                        .foregroundColor(Color(hex: "#13262E"))
                        .padding(.horizontal, 16.32)
                        .frame(height: 52.03)
                        .background(
                            RoundedRectangle(cornerRadius: 16)
                                .fill(Color(hex: "#EBF3ED"))
                        )
                }
            }
        }
        .frame(width: 335)
        .offset(x: 20, y: 469)
    }

    // MARK: - Prompt Bar

    var promptBar: some View {
        VStack(spacing: 0) {
            Spacer()

            LinearGradient(
                colors: [.clear, .white.opacity(0.95)],
                startPoint: .top,
                endPoint: .bottom
            )
            .frame(height: 50)

            VStack(spacing: 0) {
                HStack {
                    HStack(spacing: 8) {
                        Image(systemName: "checkmark.shield")
                            .font(.system(size: 14))
                            .foregroundColor(Color(hex: "#2DA5A2"))

                        Text("Ask Ivy...")
                            .font(.system(size: 18))
                            .tracking(-0.89)
                            .foregroundColor(Color(hex: "#162B33"))
                    }

                    Spacer()

                    HStack(spacing: 4) {
                        promptButton(icon: "paperclip")
                        promptButton(icon: "mic")
                    }
                }
                .padding(.horizontal, 22)
                .padding(.top, 24)
                .padding(.bottom, 36)
            }
            .background(Color(hex: "#EBF3ED"))
            .clipShape(
                UnevenRoundedRectangle(
                    topLeadingRadius: 24,
                    bottomLeadingRadius: 45,
                    bottomTrailingRadius: 45,
                    topTrailingRadius: 24
                )
            )
            .background(Color.white.opacity(0.95))
        }
        .frame(width: 375)
    }

    func promptButton(icon: String) -> some View {
        Image(systemName: icon)
            .font(.system(size: 16))
            .foregroundColor(Color(hex: "#162B33"))
            .frame(width: 52, height: 48)
            .background(
                RoundedRectangle(cornerRadius: 24)
                    .stroke(Color(hex: "#13262E").opacity(0.08), lineWidth: 1)
            )
    }
}
