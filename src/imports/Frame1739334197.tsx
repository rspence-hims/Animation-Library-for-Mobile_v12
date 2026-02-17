import imgFloraImageReplacementTask134034B391 from "figma:asset/d656ba7ea9c64660e689fc69995f4aee6c3bb579.png";

function Frame14() {
  return <div className="absolute bg-gradient-to-b bottom-0 from-[rgba(54,101,42,0)] h-[99px] left-0 to-[#36652a] w-[260px]" />;
}

function Frame5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <p className="font-['Sofia_Pro:Regular',sans-serif] leading-[0] not-italic relative shrink-0 text-[0px] text-[16px] text-[rgba(255,255,255,0.5)] tracking-[-0.57px] tracking-[-0.89px] w-full whitespace-pre-wrap">
        <span className="leading-[18.2px] text-[rgba(255,255,255,0.4)]">Arrives:</span>
        <span className="font-['Sofia_Pro:Semi_Bold',sans-serif] leading-[18.2px] text-white">{` Monday`}</span>
      </p>
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Frame5 />
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Frame4 />
    </div>
  );
}

function Frame11() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Frame1 />
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
      <p className="font-['Sofia_Pro:Medium',sans-serif] leading-[20.1px] not-italic relative shrink-0 text-[20px] text-white tracking-[-1.05px] w-full whitespace-pre-wrap">Approved</p>
      <Frame11 />
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Frame3 />
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Frame2 />
    </div>
  );
}

function Frame6() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[16px] top-[16px] w-[224px]">
      <Frame />
    </div>
  );
}

function Frame10() {
  return <div className="absolute h-[169px] left-[16px] top-[70px] w-[224px]" />;
}

function Frame8() {
  return <div className="bg-white h-[6px] rounded-[30px] shrink-0 w-[120px]" />;
}

function Frame9() {
  return <div className="bg-white flex-[1_0_0] h-[6px] min-h-px min-w-px opacity-20 rounded-[30px]" />;
}

function Frame7() {
  return (
    <div className="content-stretch flex gap-[2px] h-[6px] items-center justify-center overflow-clip relative rounded-[30px] shrink-0 w-full">
      <Frame8 />
      <Frame9 />
    </div>
  );
}

function Frame13() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[16px] top-[269px] w-[224px]">
      <Frame7 />
    </div>
  );
}

export default function Frame12() {
  return (
    <div className="bg-[#13262e] overflow-clip relative rounded-[24px] size-full">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[564px] left-[calc(50%-4px)] top-[calc(50%+30.5px)] w-[376px]" data-name="FLORA-Image Replacement Task 1-34034b39 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgFloraImageReplacementTask134034B391} />
      </div>
      <Frame14 />
      <Frame6 />
      <Frame10 />
      <Frame13 />
    </div>
  );
}