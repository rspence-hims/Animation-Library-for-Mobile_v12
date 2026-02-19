import SwiftUI

// MARK: - Icons

/// Heart-sparkle icon — person silhouette with a 4-point sparkle star.
/// Accepts a fill color so it can switch between white (selected) and primary (unselected).
struct HeartSparkleIcon: View {
    var color: Color = .white

    var body: some View {
        Canvas { context, size in
            let s = min(size.width, size.height) / 19.2

            let headRect = CGRect(x: 6.0 * s, y: 1.6 * s, width: 7.2 * s, height: 7.2 * s)
            context.fill(Path(ellipseIn: headRect), with: .color(color))

            let bodyRect = CGRect(x: 3.5 * s, y: 9.6 * s, width: 9.0 * s, height: 7.2 * s)
            context.fill(Path(ellipseIn: bodyRect), with: .color(color))

            let cx = 15.13 * s, cy = 13.92 * s
            let rx: CGFloat = 3.94 * s, ry: CGFloat = 3.94 * s
            let p: CGFloat = 0.15

            var star = Path()
            star.move(to: CGPoint(x: cx, y: cy - ry))
            star.addQuadCurve(to: CGPoint(x: cx + rx, y: cy), control: CGPoint(x: cx + rx * p, y: cy - ry * p))
            star.addQuadCurve(to: CGPoint(x: cx, y: cy + ry), control: CGPoint(x: cx + rx * p, y: cy + ry * p))
            star.addQuadCurve(to: CGPoint(x: cx - rx, y: cy), control: CGPoint(x: cx - rx * p, y: cy + ry * p))
            star.addQuadCurve(to: CGPoint(x: cx, y: cy - ry), control: CGPoint(x: cx - rx * p, y: cy - ry * p))
            context.fill(star, with: .color(color))
        }
        .frame(width: 19.2, height: 19.2)
    }
}

/// Bar chart icon — four vertical bars at different heights.
struct ChartIcon: View {
    var color: Color = Color(hex: "#162B33")

    var body: some View {
        HStack(alignment: .bottom, spacing: 2) {
            RoundedRectangle(cornerRadius: 1).fill(color).frame(width: 2, height: 5)
            RoundedRectangle(cornerRadius: 1).fill(color).frame(width: 2, height: 11)
            RoundedRectangle(cornerRadius: 1).fill(color).frame(width: 2, height: 8)
            RoundedRectangle(cornerRadius: 1).fill(color).frame(width: 2, height: 3)
        }
    }
}

/// Pulse/heartbeat icon — an ECG-style polyline path.
struct PulseIcon: View {
    var color: Color = Color(hex: "#162B33")

    var body: some View {
        Canvas { context, size in
            let w = size.width, h = size.height
            var path = Path()
            path.move(to: CGPoint(x: w * 0.147, y: h * 0.48))
            path.addLine(to: CGPoint(x: w * 0.256, y: h * 0.48))
            path.addLine(to: CGPoint(x: w * 0.372, y: h * 0.189))
            path.addLine(to: CGPoint(x: w * 0.572, y: h * 0.772))
            path.addLine(to: CGPoint(x: w * 0.673, y: h * 0.503))
            path.addLine(to: CGPoint(x: w * 0.813, y: h * 0.48))
            context.stroke(path, with: .color(color),
                           style: StrokeStyle(lineWidth: 2, lineCap: .round, lineJoin: .round))
        }
        .frame(width: 20, height: 20)
    }
}

/// Hamburger menu icon — three horizontal bars.
struct HamburgerIcon: View {
    var body: some View {
        VStack(alignment: .leading, spacing: 2) {
            RoundedRectangle(cornerRadius: 100).fill(Color(hex: "#162B33")).frame(width: 19, height: 2)
            RoundedRectangle(cornerRadius: 100).fill(Color(hex: "#162B33")).frame(width: 14, height: 2)
            RoundedRectangle(cornerRadius: 100).fill(Color(hex: "#162B33")).frame(width: 16, height: 2)
        }
    }
}
