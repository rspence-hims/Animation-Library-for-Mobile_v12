import SwiftUI

// MARK: - NavPageTransitionView

/// An expanding hamburger menu with tab selection that drives full-page
/// transitions. Tapping the collapsed hamburger widens the pill and reveals
/// three action icons with cascading spring delays. Selecting a tab slides
/// the teal indicator to that position while the page content transitions
/// with a directional slide + fade.
///
/// Animation spec (from Framer Motion):
///   springExpand  – stiffness:400, damping:28  → response≈0.314, dampingFraction≈0.70
///   springItem    – stiffness:500, damping:24  → response≈0.281, dampingFraction≈0.537
///   pageEnter     – 0.55s easeInOutCubic [0.65, 0, 0.35, 1]
///   pageExit      – 0.55s easeOutQuad    [0.25, 0.46, 0.45, 0.94]
///
/// Usage:
///   PhoneFrame { NavPageTransitionView() }

struct NavPageTransitionView: View {
    @State private var isOpen = false
    @State private var selectedTab = 0
    @State private var direction: Int = 1

    @State private var hamburgerVisible = true
    @State private var showItem0 = false
    @State private var showItem1 = false
    @State private var showItem2 = false

    // MARK: - Animation Config

    let springExpand: Animation = .spring(response: 0.314, dampingFraction: 0.7)
    let springItem: Animation = .spring(response: 0.281, dampingFraction: 0.537)
    let pageEnter: Animation = .timingCurve(0.65, 0, 0.35, 1, duration: 0.55)

    // MARK: - Layout Constants

    let closedWidth: CGFloat = 52
    let openWidth: CGFloat = 148
    let menuHeight: CGFloat = 48
    let indicatorPositions: [CGFloat] = [2, 50, 98]

    var body: some View {
        ZStack {
            Color.white

            pageContent

            topNavigation
        }
        .frame(width: 375, height: 812)
        .clipped()
    }

    // MARK: - Tab Selection

    func selectTab(_ tab: Int) {
        guard tab != selectedTab else { return }
        direction = tab > selectedTab ? 1 : -1
        withAnimation(pageEnter) {
            selectedTab = tab
        }
    }

    // MARK: - Menu Open / Close

    func openMenu() {
        withAnimation(springExpand) { isOpen = true }
        withAnimation(.easeOut(duration: 0.2)) { hamburgerVisible = false }
        withAnimation(springItem.delay(0.02)) { showItem0 = true }
        withAnimation(springItem.delay(0.09)) { showItem1 = true }
        withAnimation(springItem.delay(0.16)) { showItem2 = true }
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
                        expandingMenu
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

    // MARK: - Expanding Menu

    var expandingMenu: some View {
        ZStack(alignment: .leading) {
            RoundedRectangle(cornerRadius: 56)
                .fill(Color(hex: "#EBF3ED").opacity(0.1))
                .overlay(
                    RoundedRectangle(cornerRadius: 56)
                        .stroke(Color(hex: "#9ABDB1").opacity(0.2), lineWidth: 1)
                )
                .frame(width: isOpen ? openWidth : closedWidth, height: menuHeight)

            HamburgerIcon()
                .frame(width: closedWidth, height: menuHeight)
                .opacity(hamburgerVisible ? 1 : 0)
                .scaleEffect(hamburgerVisible ? 1 : 0.5)

            // Active indicator (teal pill behind selected icon)
            RoundedRectangle(cornerRadius: 28)
                .fill(Color(hex: "#2DA5A2"))
                .frame(width: 48, height: 44)
                .offset(x: indicatorPositions[selectedTab], y: 0)
                .opacity(showItem0 ? 1 : 0)
                .scaleEffect(showItem0 ? 1 : 0.3)
                .animation(springItem, value: selectedTab)

            iconButton(index: 0, show: showItem0) {
                HeartSparkleIcon(color: selectedTab == 0 ? .white : Color(hex: "#162B33"))
            }
            iconButton(index: 1, show: showItem1) {
                ChartIcon(color: selectedTab == 1 ? .white : Color(hex: "#162B33"))
            }
            iconButton(index: 2, show: showItem2) {
                PulseIcon(color: selectedTab == 2 ? .white : Color(hex: "#162B33"))
            }
        }
        .frame(height: menuHeight)
        .contentShape(Rectangle())
        .onTapGesture {
            if !isOpen { openMenu() }
        }
    }

    func iconButton<Icon: View>(index: Int, show: Bool, @ViewBuilder icon: () -> Icon) -> some View {
        icon()
            .frame(width: 48, height: 44)
            .contentShape(Rectangle())
            .onTapGesture { if isOpen { selectTab(index) } }
            .offset(x: indicatorPositions[index])
            .opacity(show ? 1 : 0)
            .scaleEffect(show ? 1 : 0.3)
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
