import svgPaths from "./svg-c25idma1sm";

function Frame3() {
  return <div className="bg-gradient-to-b from-[rgba(255,255,255,0)] h-[50px] overflow-clip shrink-0 to-[rgba(255,255,255,0.95)] w-full" />;
}

function ShieldCheckSecurityProtection() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="shield check, security, protection">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="shield check, security, protection">
          <path clipRule="evenodd" d={svgPaths.p1386b880} fill="var(--fill-0, #2DA5A2)" fillRule="evenodd" id="Icons" />
        </g>
      </svg>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <ShieldCheckSecurityProtection />
      <p className="font-['Sofia_Pro:Regular',sans-serif] leading-[24.85px] not-italic relative shrink-0 text-[#162b33] text-[18px] tracking-[-0.89px]">Ask Ivy...</p>
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <Frame />
    </div>
  );
}

function Attachment2AttachPaperClip() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[20px] top-1/2" data-name="attachment 2, attach, paper clip">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="attachment 2, attach, paper clip">
          <path d={svgPaths.p2f1be100} fill="var(--fill-0, #162B33)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Frame8() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative rounded-[24px]">
      <div aria-hidden="true" className="absolute border border-[rgba(19,38,46,0.08)] border-solid inset-0 pointer-events-none rounded-[24px]" />
      <Attachment2AttachPaperClip />
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center justify-end min-h-px min-w-px relative w-full">
      <Frame8 />
    </div>
  );
}

function Frame11() {
  return (
    <div className="content-stretch flex flex-col h-full items-start relative shrink-0 w-[52px]">
      <Frame5 />
    </div>
  );
}

function MicrophoneMicSoundPodcast() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="microphone, mic, sound, podcast">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="microphone, mic, sound, podcast">
          <path d={svgPaths.p288a7d00} id="vector" stroke="var(--stroke-0, #162B33)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex h-full items-center justify-center relative rounded-[24px] shrink-0 w-[52px]">
      <div aria-hidden="true" className="absolute border border-[rgba(19,38,46,0.08)] border-solid inset-0 pointer-events-none rounded-[24px]" />
      <MicrophoneMicSoundPodcast />
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex gap-[4px] h-full items-center justify-end relative shrink-0">
      <Frame11 />
      <Frame9 />
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex gap-[10px] h-[48px] items-start justify-end relative shrink-0">
      <Frame6 />
    </div>
  );
}

function Frame10() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <Frame4 />
      <Frame7 />
    </div>
  );
}

function Frame1() {
  return (
    <div className="bg-[#ebf3ed] content-stretch flex flex-col items-start overflow-clip pb-[36px] pt-[24px] px-[22px] relative rounded-bl-[45px] rounded-br-[45px] rounded-tl-[24px] rounded-tr-[24px] shrink-0 w-[375px]">
      <Frame10 />
    </div>
  );
}

function Frame2() {
  return (
    <div className="bg-[rgba(255,255,255,0.95)] content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full">
      <Frame1 />
    </div>
  );
}

export default function BottomArea() {
  return (
    <div className="content-stretch flex flex-col items-start relative size-full" data-name="Bottom area">
      <Frame3 />
      <Frame2 />
    </div>
  );
}