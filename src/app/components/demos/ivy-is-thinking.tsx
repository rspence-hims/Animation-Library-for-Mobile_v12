import { useState } from "react";
import { DemoShell, useReplay } from "./demo-utils";
import imgDoctor from "figma:asset/doctor-photo.png";
import {
  colors,
  font,
  HamburgerIcon,
  ShieldIcon,
  AttachmentIcon,
  MicrophoneIcon,
} from "./nav-page-shared";

/* ─── Static Top Navigation (hamburger only) ─────────────── */

function TopNav({ rightSlot }: { rightSlot?: React.ReactNode }) {
  return (
    <div className="absolute left-0 top-0 w-[375px] flex flex-col items-start z-10">
      <div
        className="h-[112px] overflow-hidden relative shrink-0 w-full"
        style={{ backgroundColor: colors.surfaceStrong }}
      >
        <div className="absolute left-1/2 -translate-x-1/2 top-[63px] h-[48px] w-[335px] flex items-center justify-between">
          <div
            className="w-[52px] h-[48px] rounded-[56px] flex items-center justify-center overflow-hidden p-[2px]"
            style={{
              backgroundColor: colors.badgeBg,
              border: `1px solid ${colors.borderSubtle}`,
            }}
          >
            <HamburgerIcon />
          </div>

          <div className="flex items-center gap-[8px]">
            {rightSlot}
            <div
              className="w-[52px] h-[48px] rounded-[56px] flex items-center justify-center overflow-hidden p-[2px]"
              style={{
                backgroundColor: colors.badgeBg,
                border: `1px solid ${colors.borderSubtle}`,
              }}
            >
              <span
                className="text-[15px] tracking-[-0.57px] leading-[18.2px] font-normal"
                style={{ color: colors.primary, fontFamily: font }}
              >
                M
              </span>
            </div>
          </div>
        </div>
      </div>

      <div
        className="h-[50px] shrink-0 w-full"
        style={{
          background: `linear-gradient(to top, rgba(255,255,255,0), ${colors.surfaceStrong})`,
        }}
      />
    </div>
  );
}

/* ─── Avatars (ivy + doctor) ──────────────────────────────── */

function AvatarPair() {
  return (
    <div className="flex items-start pr-[8px] relative">
      <div
        className="relative rounded-full size-[36px] flex items-center justify-center z-[2] overflow-hidden border border-white"
        style={{ backgroundColor: colors.avatarBg }}
      >
        <span
          className="text-[14.3px] leading-[19.7px] tracking-[-0.65px] italic"
          style={{ color: colors.accent, fontFamily: '"Ivar Soft", serif' }}
        >
          ivy
        </span>
      </div>
      <div
        className="relative rounded-full size-[36px] -ml-[8px] z-[1] overflow-hidden border border-white"
        style={{ backgroundColor: colors.avatarBg }}
      >
        <img
          src={imgDoctor}
          alt="Doctor"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
    </div>
  );
}

/* ─── Care Team Badge (full, clickable) ──────────────────── */

function CareTeamBadge({ onClick }: { onClick: () => void }) {
  return (
    <div
      className="absolute left-[21px] top-[315px] h-[48px] rounded-[56px] flex items-center gap-[8px] overflow-hidden pl-[8px] pr-[16px] py-[2px] cursor-pointer"
      style={{
        backgroundColor: colors.badgeBg,
        border: `1px solid ${colors.borderSubtle}`,
      }}
      onClick={onClick}
    >
      <AvatarPair />
      <p
        className="text-[15px] leading-[18.2px] tracking-[-0.57px] font-normal"
        style={{ color: colors.primary, fontFamily: font }}
      >
        Your Care Team
      </p>
    </div>
  );
}

/* ─── Care Team Badge (compact, in nav) ──────────────────── */

function CareTeamBadgeCompact() {
  return (
    <div
      className="h-[48px] rounded-[56px] flex items-center gap-[8px] overflow-hidden px-[8px] py-[2px]"
      style={{
        backgroundColor: colors.badgeBg,
        border: `1px solid ${colors.borderSubtle}`,
      }}
    >
      <AvatarPair />
    </div>
  );
}

/* ─── Headline ────────────────────────────────────────────── */

function Headline() {
  return (
    <div className="absolute left-1/2 -translate-x-1/2 top-[199px] w-[335px] flex flex-col gap-[8px]">
      <p
        className="text-[20px] leading-[20.1px] tracking-[-1.05px] font-normal"
        style={{ color: colors.accent, fontFamily: font }}
      >
        Congrats, Meg
      </p>
      <p
        className="text-[32px] leading-[35.3px] tracking-[-2.01px] font-normal"
        style={{ color: colors.primary, fontFamily: font }}
      >
        Your first dose is logged! How are you feeling?{" "}
      </p>
    </div>
  );
}

/* ─── Response Chips ──────────────────────────────────────── */

const chipTexts = [
  "I'm feeling great",
  "I feel a little off",
  "I'm noticing some side effects",
  "I want to talk to a doctor",
];

function ResponseChips() {
  return (
    <div className="absolute left-1/2 -translate-x-1/2 top-[484px] w-[335px] flex flex-col gap-[4.08px]">
      {chipTexts.map((text) => (
        <div key={text} className="flex flex-col items-end justify-center w-full">
          <div
            className="flex items-center h-[52.03px] rounded-[16px] overflow-hidden px-[16.32px]"
            style={{ backgroundColor: colors.secondary }}
          >
            <span
              className="text-[16.32px] leading-[18.57px] tracking-[-0.57px] font-normal"
              style={{ color: colors.primaryDark, fontFamily: font }}
            >
              {text}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── Selected Chip (with checkmark) ─────────────────────── */

function CheckIcon() {
  return (
    <svg width="7" height="5" viewBox="0 0 7 5" fill="none">
      <path
        d="M1 2.5L2.8 4L6 1"
        stroke={colors.accent}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SelectedChip() {
  return (
    <div className="absolute left-1/2 -translate-x-1/2 top-[146px] w-[335px] flex flex-col items-end justify-center">
      <div
        className="flex items-center gap-[12px] h-[52.03px] rounded-[16px] overflow-hidden px-[16.32px]"
        style={{ backgroundColor: colors.secondary }}
      >
        <CheckIcon />
        <span
          className="text-[16.32px] leading-[18.57px] tracking-[-0.57px] font-normal"
          style={{ color: colors.primaryDark, fontFamily: font }}
        >
          I'm noticing some side effects
        </span>
      </div>
    </div>
  );
}

/* ─── Prompt Bar ──────────────────────────────────────────── */

function PromptBar() {
  return (
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[375px] flex flex-col items-start">
      <div
        className="h-[50px] shrink-0 w-full overflow-hidden"
        style={{
          background:
            "linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0.95))",
        }}
      />
      <div
        className="w-full flex flex-col items-start overflow-hidden shrink-0"
        style={{ backgroundColor: colors.surface }}
      >
        <div
          className="w-[375px] shrink-0 overflow-hidden rounded-tl-[24px] rounded-tr-[24px] rounded-bl-[45px] rounded-br-[45px] pt-[24px] pb-[36px] px-[22px]"
          style={{ backgroundColor: colors.secondary }}
        >
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-[8px]">
              <ShieldIcon />
              <span
                className="text-[18px] leading-[24.85px] tracking-[-0.89px] font-normal"
                style={{ color: colors.primary, fontFamily: font }}
              >
                Ask Ivy...
              </span>
            </div>

            <div className="flex gap-[4px] h-[48px] items-center">
              <div
                className="w-[52px] h-full rounded-[24px] flex items-center justify-center"
                style={{ border: `1px solid ${colors.borderInput}` }}
              >
                <AttachmentIcon />
              </div>
              <div
                className="w-[52px] h-full rounded-[24px] flex items-center justify-center"
                style={{ border: `1px solid ${colors.borderInput}` }}
              >
                <MicrophoneIcon />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Frame Contents ──────────────────────────────────────── */

function Frame1Content({ onOpenCareTeam }: { onOpenCareTeam: () => void }) {
  return (
    <>
      <Headline />
      <CareTeamBadge onClick={onOpenCareTeam} />
      <ResponseChips />
      <PromptBar />
    </>
  );
}

function Frame2Content() {
  return (
    <>
      <SelectedChip />
      <PromptBar />
    </>
  );
}

/* ─── Main Demo ───────────────────────────────────────────── */

export function IvyIsThinkingDemo({ replayCount = 0 }: { replayCount?: number }) {
  const { key, replay } = useReplay();
  const [frame, setFrame] = useState<"home" | "detail">("home");

  const handleReplay = () => {
    setFrame("home");
    replay();
  };

  return (
    <DemoShell onReplay={handleReplay}>
      <div key={key} className="absolute inset-0 overflow-hidden bg-white">
        {frame === "home" && (
          <Frame1Content onOpenCareTeam={() => setFrame("detail")} />
        )}
        {frame === "detail" && <Frame2Content />}

        <TopNav
          rightSlot={frame === "detail" ? <CareTeamBadgeCompact /> : undefined}
        />
      </div>
    </DemoShell>
  );
}
