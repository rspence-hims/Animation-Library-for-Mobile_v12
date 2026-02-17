import imgFloraImageReplacementTask134034B391 from "figma:asset/d656ba7ea9c64660e689fc69995f4aee6c3bb579.png";

function Frame16() {
  return <div className="-translate-x-1/2 absolute bg-gradient-to-b bottom-0 from-[rgba(54,101,42,0)] h-[363px] left-1/2 to-[#36652a] w-[375px]" />;
}

function Frame17() {
  return (
    <div className="absolute h-[174px] left-[22px] top-[525px] w-[331px]">
      <div className="absolute bottom-[174px] font-['Sofia_Pro:Regular',sans-serif] leading-[24.85px] left-[calc(50%-165.5px)] not-italic text-[16px] text-white tracking-[-0.89px] translate-y-full w-[331px] whitespace-pre-wrap">
        <p className="mb-0">{`A licensed provider has approved your care plan, and your prescription is now being prepared by the Hers pharmacy. `}</p>
        <p className="mb-0">&nbsp;</p>
        <p>This step includes safety checks and careful preparation. You don’t need to do anything right now—we’ll keep you updated.</p>
      </div>
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <p className="font-['Sofia_Pro:Regular',sans-serif] leading-[0] not-italic relative shrink-0 text-[0px] text-[16px] text-[rgba(255,255,255,0.5)] tracking-[-0.89px] w-full whitespace-pre-wrap">
        <span className="leading-[18.2px] text-[rgba(255,255,255,0.4)] tracking-[-0.57px]">Arrives:</span>
        <span className="font-['Sofia_Pro:Semi_Bold',sans-serif] leading-[0px] text-white">{` Monday`}</span>
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

function Frame13() {
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
      <Frame13 />
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
    <div className="absolute content-stretch flex flex-col items-start left-[23px] top-[66px] w-[224px]">
      <Frame />
    </div>
  );
}

function Frame12() {
  return <div className="absolute h-[169px] left-[16px] top-[70px] w-[224px]" />;
}

function Frame8() {
  return <div className="bg-white h-[6px] rounded-[30px] shrink-0 w-[172px]" />;
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

function Frame15() {
  return (
    <div className="-translate-x-1/2 absolute bottom-[64px] content-stretch flex flex-col items-start left-1/2 w-[331px]">
      <Frame7 />
    </div>
  );
}

function Frame10() {
  return (
    <div className="content-stretch flex items-center justify-between leading-[12.5px] not-italic relative shrink-0 text-[14px] tracking-[-0.41px] w-full">
      <p className="font-['Sofia_Pro:Semi_Bold',sans-serif] relative shrink-0 text-white">Requested</p>
      <p className="font-['Sofia_Pro:Semi_Bold',sans-serif] relative shrink-0 text-white">Reviewed</p>
      <p className="font-['Sofia_Pro:Regular',sans-serif] relative shrink-0 text-[rgba(255,255,255,0.5)] text-center">Shipped</p>
      <p className="font-['Sofia_Pro:Regular',sans-serif] relative shrink-0 text-[rgba(255,255,255,0.5)] text-right">Delivered</p>
    </div>
  );
}

function Frame11() {
  return (
    <div className="-translate-x-1/2 absolute bottom-[36px] content-stretch flex flex-col items-start left-1/2 w-[331px]">
      <Frame10 />
    </div>
  );
}

export default function Frame14() {
  return (
    <div className="bg-[#13262e] overflow-clip relative rounded-[24px] size-full">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[1014px] left-[calc(50%-5.5px)] top-[calc(50%-1px)] w-[676px]" data-name="FLORA-Image Replacement Task 1-34034b39 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgFloraImageReplacementTask134034B391} />
      </div>
      <Frame16 />
      <Frame17 />
      <Frame6 />
      <Frame12 />
      <Frame15 />
      <Frame11 />
    </div>
  );
}