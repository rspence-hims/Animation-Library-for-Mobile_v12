function Frame2() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full">
      <p className="font-['Sofia_Pro:Regular',sans-serif] leading-[18.2px] not-italic relative shrink-0 text-[#162b33] text-[16px] tracking-[-0.57px]">When will it arrive?</p>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0">
      <Frame2 />
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0">
      <Frame3 />
    </div>
  );
}

export default function Frame1() {
  return (
    <div className="bg-[#ebf3ed] content-stretch flex flex-col items-start justify-center overflow-clip p-[16px] relative rounded-[16px] size-full">
      <Frame />
    </div>
  );
}