import SwiftUI

// MARK: - Menu Item Icons

/// Heart-sparkle icon matching the TSX HeartSparkleIcon component.
/// Person silhouette with a 4-point sparkle star.
struct HeartSparkleIcon: View {
    var body: some View {
        Canvas { context, size in
            let s = min(size.width, size.height) / 19.2

            // Person head (circle)
            let headRect = CGRect(
                x: 6.0 * s, y: 1.6 * s,
                width: 7.2 * s, height: 7.2 * s
            )
            context.fill(Path(ellipseIn: headRect), with: .color(.white))

            // Person body
            var body = Path()
            body.move(to: CGPoint(x: 3.24 * s, y: 14.01 * s))
            body.addCurve(
                to: CGPoint(x: 10.48 * s, y: 16.8 * s),
                control1: CGPoint(x: 2.96 * s, y: 14.75 * s),
                control2: CGPoint(x: 3.15 * s, y: 15.47 * s)
            )
            body.addLine(to: CGPoint(x: 10.48 * s, y: 16.8 * s))
            body.addCurve(
                to: CGPoint(x: 9.6 * s, y: 14.2 * s),
                control1: CGPoint(x: 9.98 * s, y: 16.08 * s),
                control2: CGPoint(x: 9.6 * s, y: 15.19 * s)
            )
            body.addCurve(
                to: CGPoint(x: 12.61 * s, y: 10.27 * s),
                control1: CGPoint(x: 9.6 * s, y: 12.58 * s),
                control2: CGPoint(x: 10.62 * s, y: 10.65 * s)
            )
            body.addCurve(
                to: CGPoint(x: 9.6 * s, y: 9.6 * s),
                control1: CGPoint(x: 11.72 * s, y: 9.84 * s),
                control2: CGPoint(x: 10.71 * s, y: 9.6 * s)
            )
            body.addCurve(
                to: CGPoint(x: 5.36 * s, y: 16.8 * s),
                control1: CGPoint(x: 6.53 * s, y: 9.6 * s),
                control2: CGPoint(x: 4.19 * s, y: 11.44 * s)
            )
            body.addLine(to: CGPoint(x: 10.48 * s, y: 16.8 * s))
            body.closeSubpath()
            context.fill(body, with: .color(.white))

            // Simplified person body fallback — filled oval
            let bodyRect = CGRect(
                x: 3.5 * s, y: 9.6 * s,
                width: 9.0 * s, height: 7.2 * s
            )
            var bodySimple = Path()
            bodySimple.addEllipse(in: bodyRect)
            context.fill(bodySimple, with: .color(.white))

            // 4-point sparkle star
            let cx = 15.13 * s
            let cy = 13.92 * s
            let rx: CGFloat = 3.94 * s
            let ry: CGFloat = 3.94 * s
            let pinch: CGFloat = 0.15

            var star = Path()
            // Top
            star.move(to: CGPoint(x: cx, y: cy - ry))
            // Top → Right
            star.addQuadCurve(
                to: CGPoint(x: cx + rx, y: cy),
                control: CGPoint(x: cx + rx * pinch, y: cy - ry * pinch)
            )
            // Right → Bottom
            star.addQuadCurve(
                to: CGPoint(x: cx, y: cy + ry),
                control: CGPoint(x: cx + rx * pinch, y: cy + ry * pinch)
            )
            // Bottom → Left
            star.addQuadCurve(
                to: CGPoint(x: cx - rx, y: cy),
                control: CGPoint(x: cx - rx * pinch, y: cy + ry * pinch)
            )
            // Left → Top
            star.addQuadCurve(
                to: CGPoint(x: cx, y: cy - ry),
                control: CGPoint(x: cx - rx * pinch, y: cy - ry * pinch)
            )
            context.fill(star, with: .color(.white))
        }
        .frame(width: 19.2, height: 19.2)
    }
}

/// Bar chart icon matching the TSX ChartIcon component.
/// Four vertical bars at different heights.
struct ChartIcon: View {
    var body: some View {
        HStack(alignment: .bottom, spacing: 2) {
            RoundedRectangle(cornerRadius: 1)
                .fill(Color(hex: "#162B33"))
                .frame(width: 2, height: 5)
            RoundedRectangle(cornerRadius: 1)
                .fill(Color(hex: "#162B33"))
                .frame(width: 2, height: 11)
            RoundedRectangle(cornerRadius: 1)
                .fill(Color(hex: "#162B33"))
                .frame(width: 2, height: 8)
            RoundedRectangle(cornerRadius: 1)
                .fill(Color(hex: "#162B33"))
                .frame(width: 2, height: 3)
        }
    }
}

/// Pulse/heartbeat icon matching the TSX PulseIcon component.
/// An ECG-style polyline path.
struct PulseIcon: View {
    var body: some View {
        Canvas { context, size in
            let w = size.width
            let h = size.height

            // Points mapped from the TSX SVG path coordinates (20×20 viewBox)
            var path = Path()
            path.move(to: CGPoint(x: w * 0.147, y: h * 0.48))     // M 2.93, 9.6
            path.addLine(to: CGPoint(x: w * 0.256, y: h * 0.48))   // L 5.11, 9.6
            path.addLine(to: CGPoint(x: w * 0.372, y: h * 0.189))  // L 7.44, 3.77
            path.addLine(to: CGPoint(x: w * 0.572, y: h * 0.772))  // L 11.44, 15.43
            path.addLine(to: CGPoint(x: w * 0.673, y: h * 0.503))  // L 13.45, 10.07
            path.addLine(to: CGPoint(x: w * 0.813, y: h * 0.48))   // L 16.27, 9.6

            context.stroke(
                path,
                with: .color(Color(hex: "#162B33")),
                style: StrokeStyle(lineWidth: 2, lineCap: .round, lineJoin: .round)
            )
        }
        .frame(width: 20, height: 20)
    }
}
