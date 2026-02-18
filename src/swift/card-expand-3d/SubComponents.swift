import SwiftUI

// MARK: - Sub Components

extension CardExpand3D {

    // MARK: - Status Items

    struct StatusItem: Identifiable {
        let label: String
        let active: Bool
        var id: String { label }
    }

    var statusItems: [StatusItem] {
        [
            StatusItem(label: "Requested", active: true),
            StatusItem(label: "Reviewed", active: true),
            StatusItem(label: "Shipped", active: false),
            StatusItem(label: "Delivered", active: false),
        ]
    }

    var showLabels: Bool {
        expanded && showText
    }

    // MARK: - Conversation Background

    var conversationLayer: some View {
        VStack(spacing: 0) {
            Spacer().frame(height: 45)
            navBar
            chatBubble(text: "When will it arrive?")
            responseText("I\u{2019}ve been keeping an eye on things while you were away. Your care request has been reviewed and approved, and your prescription is now being prepared for shipment.")
            Spacer()
        }
    }

    var navBar: some View {
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

    func chatBubble(text: String) -> some View {
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

    func responseText(_ text: String) -> some View {
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

    var profileButton: some View {
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

    var closeButton: some View {
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
}
