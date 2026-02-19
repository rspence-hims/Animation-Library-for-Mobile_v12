import SwiftUI

// MARK: - Design Tokens

private let primary = Color(hex: "#162B33")
private let primaryDark = Color(hex: "#13262E")
private let accent = Color(hex: "#2DA5A2")
private let accentBar = Color(hex: "#2FA9A6")
private let secondary = Color(hex: "#EBF3ED")

// MARK: - Shared Components

struct AskIvyPill: View {
    var body: some View {
        HStack(spacing: 3) {
            Text("ask")
                .font(.system(size: 12))
                .tracking(-0.73)
                .foregroundColor(accent)
            Image(systemName: "sparkle")
                .font(.system(size: 10))
                .foregroundColor(accent)
        }
        .padding(.horizontal, 16)
        .frame(height: 36)
        .background(RoundedRectangle(cornerRadius: 40).fill(.white))
    }
}

struct CardDivider: View {
    var body: some View {
        Rectangle()
            .fill(primaryDark.opacity(0.08))
            .frame(height: 1)
    }
}

// ───────────────────────────────────────────────
// MARK: - Home Content
// ───────────────────────────────────────────────

struct HomeContentView: View {
    var body: some View {
        ZStack(alignment: .topLeading) {
            Color.white

            headline
            careTeamBadge
            responseChips
            promptBar
        }
        .frame(width: 375, height: 812)
    }

    private var headline: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text("Congrats, Meg")
                .font(.system(size: 20))
                .tracking(-1.05)
                .foregroundColor(accent)

            Text("Your first dose is logged! How are you feeling? ")
                .font(.system(size: 32))
                .tracking(-2.01)
                .lineSpacing(3.3)
                .foregroundColor(primary)
        }
        .frame(width: 335, alignment: .leading)
        .offset(x: 20, y: 199)
    }

    private var careTeamBadge: some View {
        HStack(spacing: 8) {
            ZStack(alignment: .leading) {
                Circle()
                    .fill(secondary.opacity(0.8))
                    .frame(width: 36, height: 36)
                    .overlay(
                        Image(systemName: "person.fill")
                            .font(.system(size: 14))
                            .foregroundColor(accent)
                    )
                    .overlay(Circle().stroke(.white, lineWidth: 1))
                    .offset(x: 28)

                Circle()
                    .fill(secondary.opacity(0.8))
                    .frame(width: 36, height: 36)
                    .overlay(
                        Text("iv")
                            .font(.system(size: 13, weight: .medium, design: .serif))
                            .foregroundColor(accent)
                    )
                    .overlay(Circle().stroke(.white, lineWidth: 1))
            }
            .frame(width: 64, height: 36)

            Text("Your Care Team")
                .font(.system(size: 15))
                .tracking(-0.57)
                .foregroundColor(primary)
        }
        .padding(.leading, 8)
        .padding(.trailing, 16)
        .frame(height: 48)
        .background(
            RoundedRectangle(cornerRadius: 56)
                .fill(secondary.opacity(0.1))
                .overlay(
                    RoundedRectangle(cornerRadius: 56)
                        .stroke(Color(hex: "#9ABDB1").opacity(0.2), lineWidth: 1)
                )
        )
        .offset(x: 21, y: 315)
    }

    private var responseChips: some View {
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
                        .foregroundColor(primaryDark)
                        .padding(.horizontal, 16.32)
                        .frame(height: 52.03)
                        .background(RoundedRectangle(cornerRadius: 16).fill(secondary))
                }
            }
        }
        .frame(width: 335)
        .offset(x: 20, y: 469)
    }

    private var promptBar: some View {
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
                            .foregroundColor(accent)
                        Text("Ask Ivy...")
                            .font(.system(size: 18))
                            .tracking(-0.89)
                            .foregroundColor(primary)
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
            .background(secondary)
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

    private func promptButton(icon: String) -> some View {
        Image(systemName: icon)
            .font(.system(size: 16))
            .foregroundColor(primary)
            .frame(width: 52, height: 48)
            .background(
                RoundedRectangle(cornerRadius: 24)
                    .stroke(primaryDark.opacity(0.08), lineWidth: 1)
            )
    }
}

// ───────────────────────────────────────────────
// MARK: - Progress Content
// ───────────────────────────────────────────────

struct ProgressContentView: View {
    var body: some View {
        ZStack(alignment: .topLeading) {
            Color.white

            ScrollView(.vertical, showsIndicators: false) {
                VStack(alignment: .leading, spacing: 36) {
                    progressHeader
                    VStack(spacing: 4) {
                        WeightCard()
                        DosesCard()
                        ActivityCard()
                        NutritionCard()
                        addConnectionsLink
                    }
                }
                .padding(.bottom, 40)
            }
            .frame(width: 375)
            .padding(.top, 147)
        }
        .frame(width: 375, height: 812)
    }

    private var progressHeader: some View {
        VStack(alignment: .leading, spacing: 4) {
            Text("Progress")
                .font(.system(size: 32))
                .tracking(-2.01)
                .foregroundColor(primary)
            Text("On track")
                .font(.system(size: 16))
                .tracking(-0.57)
                .foregroundColor(accent)
        }
        .padding(.horizontal, 23)
    }

    private var addConnectionsLink: some View {
        HStack(spacing: 2) {
            Spacer()
            Text("Add more connections")
                .font(.system(size: 16, weight: .medium))
                .tracking(-0.73)
                .foregroundColor(accent)
            Image(systemName: "chevron.right")
                .font(.system(size: 12, weight: .semibold))
                .foregroundColor(accent)
            Spacer()
        }
        .padding(.vertical, 16)
    }
}

// MARK: - Weight Card

private struct WeightCard: View {
    var body: some View {
        VStack(alignment: .leading, spacing: 24) {
            Text("Weight")
                .font(.system(size: 20, weight: .medium))
                .tracking(-1.05)
                .foregroundColor(primary)

            HStack(alignment: .bottom) {
                HStack(alignment: .firstTextBaseline, spacing: 2) {
                    Text("172")
                        .font(.system(size: 40))
                        .tracking(-2.65)
                        .foregroundColor(primary)
                    Text("lbs")
                        .font(.system(size: 16))
                        .tracking(-0.73)
                        .foregroundColor(primary.opacity(0.5))
                }
                Spacer()
                WeightChart()
            }

            CardDivider()

            VStack(alignment: .leading, spacing: 8) {
                HStack(spacing: 4) {
                    Image(systemName: "arrow.down")
                        .font(.system(size: 11, weight: .semibold))
                        .foregroundColor(accent)
                    Text("20 lbs so far")
                        .font(.system(size: 16))
                        .tracking(-0.73)
                        .foregroundColor(accent)
                }
                Text("Your weight trend reflects real metabolic change, supporting better energy, blood sugar, and heart health.")
                    .font(.system(size: 18))
                    .tracking(-0.89)
                    .lineSpacing(4)
                    .foregroundColor(primaryDark.opacity(0.8))
                AskIvyPill()
            }
        }
        .padding(16)
        .padding(.vertical, 8)
        .frame(width: 361)
        .background(RoundedRectangle(cornerRadius: 16).fill(secondary))
        .padding(.horizontal, 7)
    }
}

private struct WeightChart: View {
    var body: some View {
        Canvas { context, size in
            let w = size.width, h = size.height - 18
            var line = Path()
            line.move(to: CGPoint(x: 0, y: h * 0.6))
            line.addCurve(
                to: CGPoint(x: w * 0.35, y: h * 0.55),
                control1: CGPoint(x: w * 0.1, y: h * 0.65),
                control2: CGPoint(x: w * 0.2, y: h * 0.6)
            )
            line.addCurve(
                to: CGPoint(x: w * 0.75, y: h * 0.15),
                control1: CGPoint(x: w * 0.5, y: h * 0.45),
                control2: CGPoint(x: w * 0.65, y: h * 0.2)
            )
            line.addCurve(
                to: CGPoint(x: w, y: h * 0.22),
                control1: CGPoint(x: w * 0.85, y: h * 0.12),
                control2: CGPoint(x: w * 0.95, y: h * 0.18)
            )
            context.stroke(line, with: .color(accent), style: StrokeStyle(lineWidth: 3, lineCap: .round))

            var fill = line
            fill.addLine(to: CGPoint(x: w, y: h))
            fill.addLine(to: CGPoint(x: 0, y: h))
            fill.closeSubpath()
            context.fill(fill, with: .linearGradient(
                Gradient(colors: [accent.opacity(0.25), accent.opacity(0)]),
                startPoint: CGPoint(x: w / 2, y: 0),
                endPoint: CGPoint(x: w / 2, y: h)
            ))
        }
        .frame(width: 180, height: 100)
    }
}

// MARK: - Doses Card

private struct DosesCard: View {
    var body: some View {
        VStack(alignment: .leading, spacing: 24) {
            HStack {
                Text("Doses")
                    .font(.system(size: 20, weight: .medium))
                    .tracking(-1.05)
                    .foregroundColor(primary)
                Spacer()
                Text("Next injection: Feb 25")
                    .font(.system(size: 16))
                    .tracking(-0.57)
                    .foregroundColor(primary.opacity(0.5))
            }

            HStack(alignment: .bottom) {
                Text("2")
                    .font(.system(size: 40))
                    .tracking(-2.65)
                    .foregroundColor(primary)
                Spacer()
                HStack(spacing: 8) {
                    ForEach(0..<8, id: \.self) { i in
                        Circle()
                            .fill(i < 2 ? accent : .clear)
                            .frame(width: 8, height: 8)
                            .overlay(
                                Circle().stroke(i < 2 ? accent : primary.opacity(0.2), lineWidth: 1.5)
                            )
                    }
                }
                .padding(.bottom, 6)
            }

            CardDivider()

            VStack(alignment: .leading, spacing: 8) {
                Text("This consistency supports your body\u{2019}s response while easing decision fatigue around food.")
                    .font(.system(size: 18))
                    .tracking(-0.89)
                    .lineSpacing(4)
                    .foregroundColor(primaryDark.opacity(0.8))
                AskIvyPill()
            }
        }
        .padding(16)
        .padding(.vertical, 8)
        .frame(width: 361)
        .background(RoundedRectangle(cornerRadius: 16).fill(secondary))
        .padding(.horizontal, 7)
    }
}

// MARK: - Activity Card

private struct ActivityCard: View {
    private let bars: [(h: CGFloat, faded: Bool)] = [
        (59, false), (54, false), (54, false),
        (46, false), (50, false), (33, true),
    ]

    var body: some View {
        VStack(alignment: .leading, spacing: 24) {
            Text("Activity")
                .font(.system(size: 20, weight: .medium))
                .tracking(-1.05)
                .foregroundColor(primary)

            HStack(alignment: .bottom) {
                VStack(alignment: .leading, spacing: 10) {
                    HStack(alignment: .firstTextBaseline, spacing: 2) {
                        Text("1200")
                            .font(.system(size: 40))
                            .tracking(-2.65)
                            .foregroundColor(primary)
                        Text("steps")
                            .font(.system(size: 16))
                            .tracking(-0.73)
                            .foregroundColor(primary.opacity(0.5))
                    }
                    Text("800 steps to go")
                        .font(.system(size: 16))
                        .tracking(-0.73)
                        .foregroundColor(accent)
                }
                Spacer()
                HStack(alignment: .bottom, spacing: 25) {
                    ForEach(0..<bars.count, id: \.self) { i in
                        RoundedRectangle(cornerRadius: 7)
                            .fill(accentBar.opacity(bars[i].faded ? 0.2 : 1))
                            .frame(width: 6, height: bars[i].h)
                    }
                }
                .frame(height: 64)
            }

            CardDivider()

            VStack(alignment: .leading, spacing: 8) {
                Text("That soreness means your body is adapting and getting stronger through consistent movement.")
                    .font(.system(size: 16))
                    .tracking(-0.73)
                    .lineSpacing(3)
                    .foregroundColor(primaryDark.opacity(0.5))
                AskIvyPill()
            }
        }
        .padding(16)
        .padding(.vertical, 8)
        .frame(width: 361)
        .background(RoundedRectangle(cornerRadius: 16).fill(secondary))
        .padding(.horizontal, 7)
    }
}

// MARK: - Nutrition Card

private struct NutritionCard: View {
    private let macros: [(label: String, pct: CGFloat)] = [
        ("Protein", 0.65), ("Carbs", 0.45), ("Fats", 0.35),
    ]

    var body: some View {
        VStack(alignment: .leading, spacing: 24) {
            Text("Nutrition")
                .font(.system(size: 20, weight: .medium))
                .tracking(-1.05)
                .foregroundColor(primary)

            HStack(alignment: .bottom) {
                VStack(alignment: .leading, spacing: 10) {
                    HStack(alignment: .firstTextBaseline, spacing: 2) {
                        Text("1403")
                            .font(.system(size: 40))
                            .tracking(-2.65)
                            .foregroundColor(primary)
                        Text("kcals")
                            .font(.system(size: 16))
                            .tracking(-0.73)
                            .foregroundColor(primary.opacity(0.5))
                    }
                    Text("800 kcals to go")
                        .font(.system(size: 16))
                        .tracking(-0.73)
                        .foregroundColor(accent)
                }
                Spacer()
                HStack(spacing: 16) {
                    ForEach(macros, id: \.label) { m in
                        VStack(spacing: 6) {
                            ZStack(alignment: .bottom) {
                                RoundedRectangle(cornerRadius: 12)
                                    .fill(primaryDark.opacity(0.08))
                                    .frame(width: 24, height: 56)
                                RoundedRectangle(cornerRadius: 12)
                                    .fill(accentBar)
                                    .frame(width: 24, height: 56 * m.pct)
                            }
                            Text(m.label)
                                .font(.system(size: 12))
                                .tracking(-0.57)
                                .foregroundColor(primaryDark)
                        }
                    }
                }
            }

            CardDivider()

            VStack(alignment: .leading, spacing: 8) {
                Text("These choices reinforce fullness cues, helping your body settle into smaller, satisfying meals.")
                    .font(.system(size: 16))
                    .tracking(-0.73)
                    .lineSpacing(3)
                    .foregroundColor(primaryDark.opacity(0.5))
                AskIvyPill()
            }
        }
        .padding(16)
        .padding(.vertical, 8)
        .frame(width: 361)
        .background(RoundedRectangle(cornerRadius: 16).fill(secondary))
        .padding(.horizontal, 7)
    }
}

// ───────────────────────────────────────────────
// MARK: - Insights Content
// ───────────────────────────────────────────────

struct InsightsContentView: View {
    var body: some View {
        ZStack(alignment: .topLeading) {
            Color.white

            ScrollView(.vertical, showsIndicators: false) {
                VStack(alignment: .leading, spacing: 36) {
                    insightsHeader

                    VStack(spacing: 4) {
                        BiologicalAgeCard()
                        BiomarkersCard()
                        moreDiagnosticLink
                    }

                    VStack(alignment: .leading, spacing: 16) {
                        actionsHeader
                        VStack(spacing: 4) {
                            ActionCard(title: "Walk", subtitle: "30 mins", color: accent)
                            ActionCard(title: "Greek Yogurt Breakfast", subtitle: "354 Kcal", color: Color(hex: "#3B7A57"))
                        }
                    }
                }
                .padding(.bottom, 40)
            }
            .frame(width: 375)
            .padding(.top, 147)
        }
        .frame(width: 375, height: 812)
    }

    private var insightsHeader: some View {
        VStack(alignment: .leading, spacing: 4) {
            Text("Insights")
                .font(.system(size: 32))
                .tracking(-2.01)
                .foregroundColor(primary)
            HStack(spacing: 4) {
                Text("Health risk:")
                    .font(.system(size: 16))
                    .tracking(-0.57)
                    .foregroundColor(primary)
                Text("Low")
                    .font(.system(size: 16))
                    .tracking(-0.57)
                    .foregroundColor(accent)
            }
        }
        .padding(.horizontal, 23)
    }

    private var actionsHeader: some View {
        VStack(alignment: .leading, spacing: 4) {
            Text("Actions")
                .font(.system(size: 32))
                .tracking(-2.01)
                .foregroundColor(primary)
            Text("If you\u{2019}d like to start gently")
                .font(.system(size: 16))
                .tracking(-0.57)
                .foregroundColor(primary.opacity(0.4))
        }
        .padding(.horizontal, 23)
    }

    private var moreDiagnosticLink: some View {
        HStack(spacing: 2) {
            Spacer()
            Text("More diagnostic test")
                .font(.system(size: 16, weight: .medium))
                .tracking(-0.73)
                .foregroundColor(accent)
            Image(systemName: "chevron.right")
                .font(.system(size: 12, weight: .semibold))
                .foregroundColor(accent)
            Spacer()
        }
        .padding(.vertical, 16)
    }
}

// MARK: - Biological Age Card

private struct BiologicalAgeCard: View {
    var body: some View {
        VStack(alignment: .leading, spacing: 24) {
            HStack(alignment: .top) {
                VStack(alignment: .leading, spacing: 24) {
                    Text("Biological age")
                        .font(.system(size: 20, weight: .medium))
                        .tracking(-1.05)
                        .foregroundColor(primary)
                    Spacer()
                    Text("48")
                        .font(.system(size: 40))
                        .tracking(-2.65)
                        .foregroundColor(primary)
                }
                Spacer()
                Image(systemName: "figure.stand")
                    .font(.system(size: 80))
                    .foregroundColor(primary.opacity(0.08))
                    .frame(width: 80, height: 188)
            }
            .frame(height: 188)

            CardDivider()

            VStack(alignment: .leading, spacing: 16) {
                HStack(spacing: 4) {
                    Image(systemName: "arrow.up")
                        .font(.system(size: 11, weight: .semibold))
                        .foregroundColor(Color(hex: "#CC537A"))
                    Text("4 yrs older than your peers")
                        .font(.system(size: 16))
                        .tracking(-0.73)
                        .foregroundColor(Color(hex: "#CC537A"))
                }
                Text("Your biological age runs ~4 years higher, driven by cholesterol and A1C\u{2014}both responsive to steady habits.")
                    .font(.system(size: 18))
                    .tracking(-0.89)
                    .lineSpacing(4)
                    .foregroundColor(primaryDark.opacity(0.7))
                AskIvyPill()
            }
        }
        .padding(16)
        .padding(.vertical, 8)
        .frame(width: 361)
        .background(RoundedRectangle(cornerRadius: 16).fill(secondary))
        .padding(.horizontal, 7)
    }
}

// MARK: - Biomarkers Card

private struct BiomarkersCard: View {
    private let stats: [(value: String, label: String)] = [
        ("75", "total"), ("67", "optimal"), ("6", "in range"), ("2", "out of range"),
    ]

    var body: some View {
        VStack(alignment: .leading, spacing: 24) {
            Text("Biomarkers")
                .font(.system(size: 20, weight: .medium))
                .tracking(-1.05)
                .foregroundColor(primary)

            VStack(spacing: 8) {
                HStack {
                    ForEach(stats, id: \.label) { s in
                        VStack(alignment: .leading, spacing: 2) {
                            Text(s.value)
                                .font(.system(size: 18, weight: .medium))
                                .tracking(-0.89)
                                .foregroundColor(primary)
                            Text(s.label)
                                .font(.system(size: 12))
                                .tracking(-0.73)
                                .foregroundColor(primary.opacity(0.5))
                        }
                        if s.label != "out of range" { Spacer() }
                    }
                }
                HStack(spacing: 2) {
                    RoundedRectangle(cornerRadius: 8).fill(accentBar).frame(height: 7)
                    RoundedRectangle(cornerRadius: 8).fill(Color(hex: "#EBC246").opacity(0.79)).frame(width: 39, height: 7)
                    RoundedRectangle(cornerRadius: 8).fill(Color(hex: "#CC537A")).frame(width: 16, height: 7)
                }
            }

            CardDivider()

            VStack(alignment: .leading, spacing: 8) {
                Text("This consistency supports your body\u{2019}s response while easing decision fatigue around food.")
                    .font(.system(size: 16))
                    .tracking(-0.73)
                    .foregroundColor(primaryDark)
                AskIvyPill()
            }
        }
        .padding(16)
        .padding(.vertical, 8)
        .frame(width: 361)
        .background(RoundedRectangle(cornerRadius: 16).fill(secondary))
        .padding(.horizontal, 7)
    }
}

// MARK: - Action Card

private struct ActionCard: View {
    let title: String
    let subtitle: String
    let color: Color

    var body: some View {
        VStack(alignment: .leading) {
            VStack(alignment: .leading, spacing: 2) {
                Text(title)
                    .font(.system(size: 18, weight: .medium))
                    .tracking(-0.89)
                    .foregroundColor(.white)
                Text(subtitle)
                    .font(.system(size: 18, weight: .medium))
                    .tracking(-0.89)
                    .foregroundColor(.white.opacity(0.7))
            }
            .padding(.top, 24)

            Spacer()

            Text("Let\u{2019}s try it")
                .font(.system(size: 14))
                .tracking(-0.57)
                .foregroundColor(.white)
                .frame(maxWidth: .infinity)
                .frame(height: 48)
                .background(RoundedRectangle(cornerRadius: 67).fill(.white.opacity(0.1)))
                .padding(.bottom, 24)
        }
        .padding(.horizontal, 16)
        .frame(width: 361, height: 260)
        .background(
            RoundedRectangle(cornerRadius: 24)
                .fill(LinearGradient(
                    colors: [color.opacity(0.7), primary],
                    startPoint: .top,
                    endPoint: .bottom
                ))
        )
        .padding(.horizontal, 7)
    }
}
