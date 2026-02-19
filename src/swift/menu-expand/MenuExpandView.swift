import SwiftUI

// MARK: - MenuExpandView

/// A hamburger menu that expands into a pill-shaped toolbar with staggered
/// spring animations. Tapping the collapsed hamburger icon widens the pill
/// and reveals three action icons (heart-sparkle, chart, pulse) with
/// cascading delays. Tapping again or the background collapses everything.
///
/// Usage:
///   PhoneFrame { MenuExpandView() }

struct MenuExpandView: View {
    @State private var isOpen = false
    @State private var hamburgerVisible = true
    @State private var showItem0 = false
    @State private var showItem1 = false
    @State private var showItem2 = false

    // MARK: - Animation Config
    // Framer Motion spring(stiffness:400, damping:28) → response≈0.314, dampingFraction≈0.7
    // Framer Motion spring(stiffness:500, damping:24) → response≈0.281, dampingFraction≈0.537

    let springExpand: Animation = .spring(response: 0.314, dampingFraction: 0.7)
    let springItem: Animation = .spring(response: 0.281, dampingFraction: 0.537)

    // MARK: - Layout Constants (375×812 frame)

    let closedWidth: CGFloat = 52
    let openWidth: CGFloat = 148
    let menuHeight: CGFloat = 48

    var body: some View {
        ZStack {
            Color.white
                .onTapGesture { if isOpen { closeMenu() } }

            pageContent
                .allowsHitTesting(!isOpen)

            topNavigation
        }
        .frame(width: 375, height: 812)
        .clipped()
    }

    // MARK: - Open / Close

    func openMenu() {
        withAnimation(springExpand) { isOpen = true }
        withAnimation(.easeOut(duration: 0.2)) { hamburgerVisible = false }
        withAnimation(springItem.delay(0.02)) { showItem0 = true }
        withAnimation(springItem.delay(0.08)) { showItem1 = true }
        withAnimation(springItem.delay(0.15)) { showItem2 = true }
    }

    func closeMenu() {
        withAnimation(springExpand) { isOpen = false }
        withAnimation(.easeOut(duration: 0.2)) { hamburgerVisible = true }
        withAnimation(springItem) {
            showItem0 = false
            showItem1 = false
            showItem2 = false
        }
    }

    func toggleMenu() {
        if isOpen { closeMenu() } else { openMenu() }
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
            // Pill container — width animates with springExpand
            RoundedRectangle(cornerRadius: 56)
                .fill(Color(hex: "#EBF3ED").opacity(0.1))
                .overlay(
                    RoundedRectangle(cornerRadius: 56)
                        .stroke(Color(hex: "#9ABDB1").opacity(0.2), lineWidth: 1)
                )
                .frame(width: isOpen ? openWidth : closedWidth, height: menuHeight)

            // Hamburger lines — visible when collapsed
            VStack(alignment: .leading, spacing: 2) {
                RoundedRectangle(cornerRadius: 100)
                    .fill(Color(hex: "#162B33"))
                    .frame(width: 19, height: 2)
                RoundedRectangle(cornerRadius: 100)
                    .fill(Color(hex: "#162B33"))
                    .frame(width: 14, height: 2)
                RoundedRectangle(cornerRadius: 100)
                    .fill(Color(hex: "#162B33"))
                    .frame(width: 16, height: 2)
            }
            .frame(width: closedWidth, height: menuHeight)
            .opacity(hamburgerVisible ? 1 : 0)
            .scaleEffect(hamburgerVisible ? 1 : 0.5)

            // Item 0: Teal circle + heart sparkle icon (delay 0.02s)
            RoundedRectangle(cornerRadius: 28)
                .fill(Color(hex: "#2DA5A2"))
                .frame(width: 48, height: 44)
                .overlay(HeartSparkleIcon())
                .offset(x: 0)
                .opacity(showItem0 ? 1 : 0)
                .scaleEffect(showItem0 ? 1 : 0.3)

            // Item 1: Chart icon (delay 0.08s)
            RoundedRectangle(cornerRadius: 28)
                .fill(.clear)
                .frame(width: 44, height: 44)
                .overlay(ChartIcon())
                .offset(x: 50)
                .opacity(showItem1 ? 1 : 0)
                .scaleEffect(showItem1 ? 1 : 0.3)

            // Item 2: Pulse icon (delay 0.15s)
            RoundedRectangle(cornerRadius: 28)
                .fill(.clear)
                .frame(width: 44, height: 44)
                .overlay(PulseIcon())
                .offset(x: 98)
                .opacity(showItem2 ? 1 : 0)
                .scaleEffect(showItem2 ? 1 : 0.3)
        }
        .frame(height: menuHeight)
        .contentShape(Rectangle())
        .onTapGesture { toggleMenu() }
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
