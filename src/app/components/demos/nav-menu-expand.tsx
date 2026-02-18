import { useReplay, DemoShell } from "./demo-utils";
import { motion } from "motion/react";
import { useState } from "react";
import svgPaths from "../../../imports/svg-c25idma1sm";
import imgDoctor from "figma:asset/doctor-photo.png";

/* ─── Design Tokens (from design-system.json) ────────────── */

const colors = {
  primary: "#162B33",
  primaryDark: "#13262E",
  secondary: "#EBF3ED",
  accent: "#2DA5A2",
  white: "#FFFFFF",
  surface: "rgba(255, 255, 255, 0.95)",
  surfaceStrong: "rgba(255, 255, 255, 0.97)",
  badgeBg: "rgba(235, 243, 237, 0.1)",
  avatarBg: "rgba(235, 243, 237, 0.8)",
  borderSubtle: "rgba(154, 189, 177, 0.2)",
  borderInput: "rgba(19, 38, 46, 0.08)",
};

/* ─── Page Icons (SVG) ────────────────────────────────────── */

function ShieldIcon() {
  return (
    <div className="relative shrink-0 size-[16px]">
      <svg className="block size-full" fill="none" viewBox="0 0 16 16">
        <path
          clipRule="evenodd"
          d={svgPaths.p1386b880}
          fill={colors.accent}
          fillRule="evenodd"
        />
      </svg>
    </div>
  );
}

function AttachmentIcon() {
  return (
    <div className="relative shrink-0 size-[20px]">
      <svg className="block size-full" fill="none" viewBox="0 0 20 20">
        <path d={svgPaths.p2f1be100} fill={colors.primary} />
      </svg>
    </div>
  );
}

function MicrophoneIcon() {
  return (
    <div className="relative shrink-0 size-[20px]">
      <svg className="block size-full" fill="none" viewBox="0 0 20 20">
        <path
          d={svgPaths.p288a7d00}
          stroke={colors.primary}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.66667"
        />
      </svg>
    </div>
  );
}

/* ─── Menu Expand Icons ───────────────────────────────────── */

function HeartSparkleIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_8_6624)">
        <path
          d="M5.99998 5.19961C5.99998 3.21138 7.61175 1.59961 9.59998 1.59961C11.5882 1.59961 13.2 3.21138 13.2 5.19961C13.2 7.18783 11.5882 8.79961 9.59998 8.79961C7.61175 8.79961 5.99998 7.18783 5.99998 5.19961Z"
          fill="white"
        />
        <path
          d="M9.5996 9.59961C6.53408 9.59961 4.1879 11.4366 3.23525 14.0124C2.96291 14.7488 3.14937 15.4747 3.58229 15.9906C4.00419 16.4934 4.65547 16.7996 5.35707 16.7996H10.4785C9.97676 16.0822 9.59959 15.1929 9.59959 14.1996C9.59959 12.5753 10.6217 10.6478 12.6081 10.2668C11.7203 9.83927 10.7069 9.59961 9.5996 9.59961Z"
          fill="white"
        />
        <path
          d="M15.5041 10.2672C15.4541 10.1006 15.3009 9.98657 15.127 9.98657C14.9531 9.98657 14.7998 10.1006 14.7499 10.2672C14.4667 11.2112 14.0995 11.8845 13.5936 12.3904C13.0877 12.8963 12.4145 13.2634 11.4704 13.5466C11.3039 13.5966 11.1898 13.7499 11.1898 13.9237C11.1898 14.0976 11.3039 14.2509 11.4704 14.3009C12.4145 14.5841 13.0877 14.9512 13.5936 15.4571C14.0995 15.963 14.4667 16.6363 14.7499 17.5803C14.7998 17.7469 14.9531 17.8609 15.127 17.8609C15.3009 17.8609 15.4541 17.7469 15.5041 17.5803C15.7873 16.6363 16.1545 15.963 16.6604 15.4571C17.1663 14.9512 17.8395 14.5841 18.7836 14.3009C18.9501 14.2509 19.0642 14.0976 19.0642 13.9237C19.0642 13.7499 18.9501 13.5966 18.7836 13.5466C17.8395 13.2634 17.1663 12.8963 16.6604 12.3904C16.1545 11.8845 15.7873 11.2112 15.5041 10.2672Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_8_6624">
          <rect width="19.2" height="19.2" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

function ChartIcon() {
  return (
    <div className="flex items-end" style={{ gap: 2 }}>
      <svg
        width="14"
        height="11"
        viewBox="0 0 14 11"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect y="6" width="2" height="5" rx="1" fill={colors.primary} />
        <rect x="4" width="2" height="11" rx="1" fill={colors.primary} />
        <rect x="8" y="3" width="2" height="8" rx="1" fill={colors.primary} />
        <rect x="12" y="8" width="2" height="3" rx="1" fill={colors.primary} />
      </svg>
    </div>
  );
}

function PulseIcon() {
  return (
    <div
      className="flex items-center justify-center shrink-0"
      style={{ width: 19.2, height: 19.2 }}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2.93335 9.6001H5.11142C5.40228 9.6001 5.65956 9.41154 5.74715 9.13418L7.44109 3.77004C7.49013 3.61474 7.7099 3.61474 7.75895 3.77004L11.4411 15.4302C11.4901 15.5855 11.7099 15.5855 11.7589 15.4302L13.4529 10.066C13.5405 9.78866 13.7978 9.6001 14.0886 9.6001H16.2667"
          stroke={colors.primary}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

function HamburgerIcon() {
  return (
    <div className="flex flex-col gap-[2px] items-start w-[19px]">
      <div className="bg-[#162b33] h-[2px] rounded-[100px] w-full" />
      <div className="bg-[#162b33] h-[2px] rounded-[100px] w-[14px]" />
      <div className="bg-[#162b33] h-[2px] rounded-[100px] w-[16px]" />
    </div>
  );
}

/* ─── Animation Constants ─────────────────────────────────── */

const CLOSED_W = 52;
const OPEN_W = 148;

const springExpand = { type: "spring" as const, stiffness: 400, damping: 28 };
const springItem = { type: "spring" as const, stiffness: 500, damping: 24 };

const expandingItems = [
  { id: "chart", icon: <ChartIcon />, left: 50 },
  { id: "pulse", icon: <PulseIcon />, left: 98 },
];

/* ─── Expanding Menu Component ────────────────────────────── */

function ExpandingMenu({
  isOpen,
  onToggle,
}: {
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      className="absolute left-0 top-0 cursor-pointer"
      onClick={onToggle}
      initial={false}
      style={{
        height: 48,
        borderRadius: 56,
        backgroundColor: colors.badgeBg,
        border: `1px solid ${colors.borderSubtle}`,
        overflow: "hidden",
      }}
      animate={{ width: isOpen ? OPEN_W : CLOSED_W }}
      transition={springExpand}
    >
      {/* Hamburger lines — visible when collapsed */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={false}
        animate={{
          opacity: isOpen ? 0 : 1,
          scale: isOpen ? 0.5 : 1,
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        style={{ pointerEvents: isOpen ? "none" : "auto" }}
      >
        <HamburgerIcon />
      </motion.div>

      {/* First item (teal circle + heart) — fades in replacing hamburger */}
      <motion.div
        className="absolute flex items-center justify-center"
        initial={false}
        style={{
          width: 48,
          height: 44,
          left: 0,
          top: 2,
          borderRadius: 28,
          backgroundColor: colors.accent,
          padding: "0 14.4px",
          gap: 19.2,
        }}
        animate={
          isOpen
            ? { opacity: 1, scale: 1 }
            : { opacity: 0, scale: 0.3 }
        }
        transition={{
          ...springItem,
          delay: isOpen ? 0.02 : 0,
          opacity: { duration: 0.2, delay: isOpen ? 0.02 : 0 },
        }}
      >
        <HeartSparkleIcon />
      </motion.div>

      {/* Second & third items — stagger in */}
      {expandingItems.map((item, i) => (
        <motion.div
          key={item.id}
          className="absolute flex items-center justify-center"
          initial={false}
          style={{
            width: 44,
            height: 44,
            left: item.left,
            top: 2,
            borderRadius: 28,
          }}
          animate={
            isOpen
              ? { opacity: 1, scale: 1 }
              : { opacity: 0, scale: 0.3 }
          }
          transition={{
            ...springItem,
            delay: isOpen ? 0.08 + i * 0.07 : 0,
            opacity: {
              duration: 0.2,
              delay: isOpen ? 0.08 + i * 0.07 : 0,
            },
          }}
        >
          {item.icon}
        </motion.div>
      ))}
    </motion.div>
  );
}

/* ─── Page Sub-components ─────────────────────────────────── */

function TopNavigation({
  isOpen,
  onToggle,
}: {
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="absolute left-0 top-0 w-[375px] flex flex-col items-start z-10">
      <div
        className="h-[112px] overflow-hidden relative shrink-0 w-full"
        style={{ backgroundColor: colors.surfaceStrong }}
      >
        <div className="absolute left-1/2 -translate-x-1/2 top-[63px] h-[48px] w-[335px]">
          {/* Animated expanding menu */}
          <ExpandingMenu isOpen={isOpen} onToggle={onToggle} />

          {/* M avatar button */}
          <div className="absolute right-0 top-0 h-[48px] w-[52px] flex items-center justify-center">
            <div
              className="w-full h-full rounded-[56px] flex items-center justify-center overflow-hidden p-[2px]"
              style={{
                backgroundColor: colors.badgeBg,
                border: `1px solid ${colors.borderSubtle}`,
              }}
            >
              <span
                className="text-[15px] tracking-[-0.57px] leading-[18.2px] font-normal"
                style={{
                  color: colors.primary,
                  fontFamily: '"Sofia Pro", sans-serif',
                }}
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

function Headline() {
  return (
    <div className="absolute left-1/2 -translate-x-1/2 top-[199px] w-[335px] flex flex-col gap-[8px]">
      <p
        className="text-[20px] leading-[20.1px] tracking-[-1.05px] font-normal"
        style={{
          color: colors.accent,
          fontFamily: '"Sofia Pro", sans-serif',
        }}
      >
        Congrats, Meg
      </p>
      <p
        className="text-[32px] leading-[35.3px] tracking-[-2.01px] font-normal"
        style={{
          color: colors.primary,
          fontFamily: '"Sofia Pro", sans-serif',
        }}
      >
        Your first dose is logged! How are you feeling?{" "}
      </p>
    </div>
  );
}

function CareTeamBadge() {
  return (
    <div
      className="absolute left-[21px] top-[315px] h-[48px] rounded-[56px] flex items-center gap-[8px] overflow-hidden pl-[8px] pr-[16px] py-[2px]"
      style={{
        backgroundColor: colors.badgeBg,
        border: `1px solid ${colors.borderSubtle}`,
      }}
    >
      <div className="flex items-start pr-[8px] relative">
        <div
          className="relative rounded-full size-[36px] flex items-center justify-center z-[2] overflow-hidden border border-white"
          style={{ backgroundColor: colors.avatarBg }}
        >
          <svg
            width="17"
            height="14.45"
            viewBox="0 0 15 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.44138 12.8005C7.02615 12.8005 6.71115 12.6573 6.51069 12.4998C6.41047 12.4139 6.39615 12.3136 6.45342 12.1991C6.65387 11.8555 6.89728 11.6264 7.29819 11.6264C7.71342 11.6264 7.94251 11.8411 8.40069 11.8411C8.93047 11.8411 9.38865 11.3973 9.94706 10.8389C10.1332 10.6527 10.3193 10.4523 10.5055 10.2375L9.25978 4.78228C9.08797 4.02341 8.98774 3.73705 8.47228 3.63682C8.3291 3.60819 8.27183 3.56523 8.27183 3.47932C8.27183 3.40773 8.34342 3.35046 8.45797 3.3075L9.77524 2.79205C9.9041 2.73478 10.033 2.7491 10.0616 2.9066L11.4075 9.07773C12.3525 7.73182 13.1257 6.18546 13.1257 5.04C13.1257 4.12364 12.4241 3.9375 12.4241 3.43637C12.4241 3.12137 12.6961 2.84932 13.1543 2.73478C13.2546 2.70614 13.3405 2.72046 13.4264 2.77773C13.8559 3.0641 14.0277 3.56523 14.0277 4.08069C14.0277 5.67 12.1377 9.23523 10.1761 11.1968C9.07365 12.2993 8.35774 12.8005 7.44138 12.8005Z"
              fill={colors.accent}
            />
            <path
              d="M4.564 9.86507C4.49241 9.86507 4.42082 9.82212 4.4065 9.69326L3.60468 4.6103C3.50445 3.9803 3.40423 3.72257 2.90309 3.63666C2.75991 3.60803 2.70264 3.56507 2.70264 3.47916C2.70264 3.39326 2.78855 3.3503 2.88877 3.30735L4.22036 2.79189C4.37786 2.73462 4.47809 2.77757 4.50673 2.93507L5.36582 8.61939C6.26786 7.61712 7.49923 5.98485 7.49923 4.89666C7.49923 4.10916 6.82627 3.90871 6.82627 3.42189C6.82627 3.12121 7.09832 2.86348 7.5565 2.74894C7.65673 2.7203 7.74264 2.73462 7.82855 2.79189C8.24377 3.06394 8.41559 3.52212 8.41559 4.02326C8.41559 5.94189 5.69514 8.84848 4.86468 9.67894C4.7215 9.82212 4.64991 9.86507 4.57832 9.86507H4.564Z"
              fill={colors.accent}
            />
            <path
              d="M0.828519 9.93682C0.0123825 9.93682 -0.130799 9.20659 0.0982916 8.20432L0.928746 4.63909C1.07193 4.03773 1.01466 3.82296 0.470564 3.66546C0.327383 3.6225 0.284428 3.56523 0.284428 3.49364C0.284428 3.42205 0.341701 3.35045 0.456246 3.32182L2.27466 2.80636C2.43216 2.76341 2.53238 2.84932 2.50375 2.9925L1.30102 8.20432C1.15784 8.84864 1.10056 9.20659 1.41556 9.20659C1.68761 9.20659 2.00261 8.87727 2.43216 8.37614C2.53238 8.26159 2.61829 8.24727 2.68988 8.29023C2.79011 8.3475 2.73284 8.505 2.53238 8.77705C1.84511 9.70773 1.34397 9.93682 0.828519 9.93682ZM1.38693 0.816137C1.38693 0.372273 1.77352 0 2.21738 0C2.66125 0 3.04784 0.372273 3.04784 0.816137C3.04784 1.24568 2.64693 1.61795 2.21738 1.61795C1.77352 1.61795 1.38693 1.24568 1.38693 0.816137Z"
              fill={colors.accent}
            />
          </svg>
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

      <p
        className="font-['Sofia_Pro:Regular',sans-serif] text-[15px] leading-[18.2px] tracking-[-0.57px]"
        style={{ color: colors.primary }}
      >
        Your Care Team
      </p>
    </div>
  );
}

const responseChips = [
  "I'm feeling great",
  "I feel a little off",
  "I'm noticing some side effects",
  "I want to talk to a doctor",
];

function ResponseChips() {
  return (
    <div className="absolute left-1/2 -translate-x-1/2 top-[469px] w-[335px] flex flex-col gap-[4.08px]">
      {responseChips.map((text) => (
        <div
          key={text}
          className="flex flex-col items-end justify-center w-full"
        >
          <div
            className="flex items-center h-[52.03px] rounded-[16px] overflow-hidden px-[16.32px]"
            style={{ backgroundColor: colors.secondary }}
          >
            <span
              className="text-[16.323px] leading-[18.568px] tracking-[-0.582px] font-normal"
              style={{
                color: colors.primaryDark,
                fontFamily: '"Sofia Pro", sans-serif',
              }}
            >
              {text}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

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
                className="font-['Sofia_Pro:Regular',sans-serif] text-[18px] leading-[24.85px] tracking-[-0.89px]"
                style={{ color: colors.primary }}
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

/* ─── Main Demo ───────────────────────────────────────────── */

export function NavMenuExpandDemo({
  replayCount = 0,
}: {
  replayCount?: number;
}) {
  const { key, replay } = useReplay();
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen((o) => !o);
  };

  return (
    <DemoShell onReplay={replay}>
      <div
        className="absolute inset-0 overflow-hidden bg-white"
        onClick={() => {
          if (isOpen) setIsOpen(false);
        }}
      >
        <TopNavigation isOpen={isOpen} onToggle={handleToggle} />
        <Headline />
        <CareTeamBadge />
        <ResponseChips />
        <PromptBar />
      </div>
    </DemoShell>
  );
}
