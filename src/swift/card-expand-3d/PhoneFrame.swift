import SwiftUI

// MARK: - PhoneFrame

/// A reusable phone frame container that mimics an iPhone display.
/// Wraps any content in a 375×812 rounded rectangle with a drop shadow
/// and gray-50 background, matching the web app's preview frame.
///
/// Usage:
///   PhoneFrame {
///       CardExpand3D()
///   }

struct PhoneFrame<Content: View>: View {
    let content: Content

    init(@ViewBuilder content: () -> Content) {
        self.content = content()
    }

    var body: some View {
        content
            .frame(width: 375, height: 812)
            .background(Color(UIColor.systemGray6))
            .clipShape(RoundedRectangle(cornerRadius: 44, style: .continuous))
            .shadow(color: .black.opacity(0.25), radius: 40, x: 0, y: 20)
    }
}
