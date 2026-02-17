import svgPaths from "./svg-opvduewcva";

function Frame3() {
  return <div className="absolute bg-[#2da5a2] h-[44px] left-[2px] rounded-[24px] top-[2px] w-[57.5px]" />;
}

function PeopleLikeLoveHeart() {
  return (
    <div className="relative shrink-0 size-[19.2px]" data-name="people like, love, heart">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.2 19.2">
        <g clipPath="url(#clip0_6_1593)" id="people like, love, heart">
          <g id="Icon">
            <path d={svgPaths.p29540300} fill="var(--fill-0, white)" />
            <path d={svgPaths.p26e8c600} fill="var(--fill-0, white)" />
          </g>
          <g clipPath="url(#clip1_6_1593)" id="star 2, magic sparkle">
            <path d={svgPaths.p3dc5be80} fill="var(--fill-0, white)" id="Icon_2" />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_6_1593">
            <rect fill="white" height="19.2" width="19.2" />
          </clipPath>
          <clipPath id="clip1_6_1593">
            <rect fill="white" height="9.44922" transform="translate(10.4023 9.19922)" width="9.44922" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame() {
  return (
    <div className="absolute content-stretch flex gap-[19.2px] h-[44px] items-center justify-center left-[2px] px-[14.4px] rounded-[24px] top-[2px] w-[57.5px]">
      <PeopleLikeLoveHeart />
    </div>
  );
}

function ActivityNotificationPulseHeartbeatBeat() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="activity, notification, pulse, heartbeat, beat">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="activity, notification, pulse, heartbeat, beat">
          <path d={svgPaths.p1f40e280} id="Icon" stroke="var(--stroke-0, #162B33)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 size-[19.2px]">
      <ActivityNotificationPulseHeartbeatBeat />
    </div>
  );
}

function Frame1() {
  return (
    <div className="absolute content-stretch flex h-[44px] items-center justify-center left-[59.5px] px-[19.2px] rounded-[72px] top-[2px] w-[57.5px]">
      <Frame4 />
    </div>
  );
}

export default function Frame2() {
  return (
    <div className="bg-[rgba(235,243,237,0.1)] relative rounded-[56px] size-full">
      <div aria-hidden="true" className="absolute border border-[rgba(154,189,177,0.2)] border-solid inset-[-1px] pointer-events-none rounded-[57px]" />
      <Frame3 />
      <Frame />
      <Frame1 />
    </div>
  );
}