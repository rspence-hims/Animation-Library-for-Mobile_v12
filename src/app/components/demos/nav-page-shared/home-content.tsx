import { motion } from "motion/react";
import imgDoctor from "figma:asset/doctor-photo.png";
import { colors, font } from "./tokens";
import { exitDuration, easeOutQuad, easeInOutCubic } from "./animations";
import { ShieldIcon, AttachmentIcon, MicrophoneIcon } from "./icons";

export type ExitDirection = "vertical" | "horizontal";

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

const responseChipTexts = [
  "I'm feeling great",
  "I feel a little off",
  "I'm noticing some side effects",
  "I want to talk to a doctor",
];

function ResponseChips({ exitDirection }: { exitDirection: ExitDirection }) {
  const exitAnim = exitDirection === "vertical" ? { y: 300 } : { x: -200 };
  return (
    <motion.div
      exit={exitAnim}
      transition={{ duration: exitDuration, ease: easeOutQuad }}
      className="absolute left-1/2 -translate-x-1/2 top-[469px] w-[335px] flex flex-col gap-[4.08px]"
    >
      {responseChipTexts.map((text) => (
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
              style={{ color: colors.primaryDark, fontFamily: font }}
            >
              {text}
            </span>
          </div>
        </div>
      ))}
    </motion.div>
  );
}

function PromptBar({ exitDirection }: { exitDirection: ExitDirection }) {
  const isVertical = exitDirection === "vertical";
  return (
    <motion.div
      initial={isVertical ? { y: 200 } : { x: 200 }}
      animate={
        isVertical
          ? { y: 0, transition: { duration: exitDuration, ease: easeInOutCubic } }
          : { x: 0, transition: { duration: exitDuration, ease: easeInOutCubic } }
      }
      exit={
        isVertical
          ? { x: 375, y: 200, transition: { duration: exitDuration, ease: easeOutQuad } }
          : { x: -200, transition: { duration: exitDuration, ease: easeOutQuad } }
      }
      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[375px] flex flex-col items-start"
    >
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
    </motion.div>
  );
}

export function HomeContent({ exitDirection = "vertical" }: { exitDirection?: ExitDirection }) {
  return (
    <>
      <Headline />
      <CareTeamBadge />
      <ResponseChips exitDirection={exitDirection} />
      <PromptBar exitDirection={exitDirection} />
    </>
  );
}
