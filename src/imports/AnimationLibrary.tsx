function PhoneFrame() {
  return <div className="-translate-x-1/2 -translate-y-1/2 absolute backdrop-blur-[68.785px] bg-white h-[812px] left-[calc(50%-0.5px)] rounded-[45px] top-1/2 w-[375px]" data-name="Phone Frame" />;
}

function Section() {
  return (
    <div className="content-stretch flex flex-col gap-[28px] items-start relative shrink-0" data-name="Section 1">
      <p className="relative shrink-0 w-[164px]">Section 1</p>
      <p className="relative shrink-0 w-[164px]">item</p>
      <p className="relative shrink-0 w-[164px]">item</p>
      <p className="relative shrink-0 w-[164px]">item</p>
      <p className="relative shrink-0 w-[164px]">item</p>
    </div>
  );
}

function Section1() {
  return (
    <div className="content-stretch flex flex-col gap-[28px] items-start relative shrink-0" data-name="Section 2">
      <p className="relative shrink-0 w-[164px]">Section 2</p>
      <p className="relative shrink-0 w-[164px]">item</p>
      <p className="relative shrink-0 w-[164px]">item</p>
      <p className="relative shrink-0 w-[164px]">item</p>
      <p className="relative shrink-0 w-[164px]">item</p>
    </div>
  );
}

function Frame() {
  return (
    <div className="absolute content-stretch flex flex-col font-['SF_Pro_Display:Regular',sans-serif] gap-[28px] items-start leading-none left-[43px] not-italic text-[14px] text-black top-[42px] w-[164px] whitespace-pre-wrap">
      <p className="min-w-full relative shrink-0 w-[min-content]">App Title</p>
      <p className="min-w-full relative shrink-0 w-[min-content]">(Left nave with open / close)</p>
      <Section />
      <Section1 />
    </div>
  );
}

export default function AnimationLibrary() {
  return (
    <div className="bg-[#444] relative size-full" data-name="Animation Library">
      <PhoneFrame />
      <div className="absolute bg-[#d9d9d9] h-[1672px] left-0 top-0 w-[264px]" />
      <Frame />
    </div>
  );
}