import SwiftUI

// MARK: - NavPageTransition3View

/// A resizing pill nav with swipe-driven page transitions. The pill morphs
/// to fit the active tab's icon + label, and horizontal swipe gestures
/// navigate between pages with directional slide + fade transitions.
///
/// Animation spec (from Framer Motion):
///   pillSpring – stiffness:200, damping:25  → response≈0.444, dampingFraction≈0.884
///   pageEnter  – 0.55s easeInOutCubic [0.65, 0, 0.35, 1]
///   pageExit   – 0.55s easeOutQuad    [0.25, 0.46, 0.45, 0.94]
///
/// Swipe thresholds: 50pt offset or predicted 250pt end translation.
///
/// Usage:
///   PhoneFrame { NavPageTransition3View() }

struct NavPageTransition3View: View {
    @State private var selectedTab = 0
    @State private var direction: Int = 1

    // MARK: - Animation Config

    let pillSpring: Animation = .spring(response: 0.444, dampingFraction: 0.884)
    let pageEnter: Animation = .timingCurve(0.65, 0, 0.35, 1, duration: 0.55)

    // MARK: - Tab Config

    static let tabLabels = ["Ask", "Progress", "Insights"]
    static let pillWidths: [CGFloat] = [82, 122, 114]
    static let pillOffsets: [CGFloat] = [0, -82, -(82 + 122)]
    let numTabs = 3

    var body: some View {
        ZStack {
            Color.white

            pageContent

            topNavigation
        }
        .frame(width: 375, height: 812)
        .clipped()
        .gesture(swipeGesture)
    }

    // MARK: - Tab Selection

    func selectTab(_ tab: Int) {
        guard tab != selectedTab, tab >= 0, tab < numTabs else { return }
        direction = tab > selectedTab ? 1 : -1
        withAnimation(pageEnter) {
            selectedTab = tab
        }
    }

    // MARK: - Swipe Gesture

    var swipeGesture: some Gesture {
        DragGesture(minimumDistance: 20)
            .onEnded { value in
                let horizontal = abs(value.translation.width)
                let vertical = abs(value.translation.height)
                guard horizontal > vertical else { return }

                if value.translation.width < -50
                    || value.predictedEndTranslation.width < -250 {
                    selectTab(selectedTab + 1)
                } else if value.translation.width > 50
                    || value.predictedEndTranslation.width > 250 {
                    selectTab(selectedTab - 1)
                }
            }
    }

    // MARK: - Page Content

    var pageContent: some View {
        ZStack {
            Group {
                switch selectedTab {
                case 0:  HomeContentView()
                case 1:  ProgressContentView()
                default: InsightsContentView()
                }
            }
            .id(selectedTab)
            .transition(.asymmetric(
                insertion: .offset(x: CGFloat(direction) * 375).combined(with: .opacity),
                removal:   .offset(x: CGFloat(-direction) * 375).combined(with: .opacity)
            ))
        }
        .frame(width: 375, height: 812)
        .clipped()
    }

    // MARK: - Top Navigation

    var topNavigation: some View {
        VStack(spacing: 0) {
            Color.white.opacity(0.97)
                .frame(height: 112)
                .overlay(alignment: .bottom) {
                    HStack {
                        menuPill
                        Spacer()
                        avatarButton
                    }
                    .padding(.horizontal, 20)
                    .frame(height: 48)
                    .offset(y: -1)
                }

            LinearGradient(
                colors: [Color.white.opacity(0.97), .clear],
                startPoint: .top,
                endPoint: .bottom
            )
            .frame(height: 50)

            Spacer()
        }
    }

    // MARK: - Menu Pill

    /// A clipped pill that shows icon + label for the active tab. The pill
    /// resizes and the inner content strip offsets to reveal the selected tab.
    var menuPill: some View {
        ZStack(alignment: .leading) {
            RoundedRectangle(cornerRadius: 56)
                .fill(Color(hex: "#EBF3ED").opacity(0.1))
                .overlay(
                    RoundedRectangle(cornerRadius: 56)
                        .stroke(Color(hex: "#9ABDB1").opacity(0.2), lineWidth: 1)
                )

            HStack(spacing: 0) {
                tabContent(index: 0) { HeartSparkleIcon(color: Color(hex: "#162B33")) }
                tabContent(index: 1) { ChartIcon(color: Color(hex: "#162B33")) }
                tabContent(index: 2) { PulseIcon(color: Color(hex: "#162B33")) }
            }
            .offset(x: Self.pillOffsets[selectedTab])
        }
        .frame(width: Self.pillWidths[selectedTab], height: 48)
        .clipShape(RoundedRectangle(cornerRadius: 56))
        .animation(pillSpring, value: selectedTab)
        .contentShape(Rectangle())
    }

    func tabContent<Icon: View>(index: Int, @ViewBuilder icon: () -> Icon) -> some View {
        HStack(spacing: 8) {
            icon()
            Text(Self.tabLabels[index])
                .font(.system(size: 15))
                .tracking(-0.57)
                .foregroundColor(Color(hex: "#162B33"))
                .offset(y: 2)
        }
        .frame(width: Self.pillWidths[index], height: 48)
        .contentShape(Rectangle())
        .onTapGesture { selectTab(index) }
    }

    // MARK: - Avatar Button

    var avatarButton: some View {
        Text("M")
            .font(.system(size: 15))
            .tracking(-0.57)
            .foregroundColor(Color(hex: "#162B33"))
            .frame(width: 52, height: 48)
            .background(
                RoundedRectangle(cornerRadius: 56)
                    .fill(Color(hex: "#EBF3ED").opacity(0.1))
                    .overlay(
                        RoundedRectangle(cornerRadius: 56)
                            .stroke(Color(hex: "#9ABDB1").opacity(0.2), lineWidth: 1)
                    )
            )
    }
}
