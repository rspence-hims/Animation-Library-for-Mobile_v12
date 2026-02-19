import imgBodySilhouette from "figma:asset/body-silhouette.png";
import imgWalkPhoto from "figma:asset/walk-photo.png";
import imgYogurtPhoto from "figma:asset/yogurt-photo.png";
import { colors, font } from "./tokens";
import { Divider } from "./progress-content";
import { UpArrowIcon, ChevronRightIcon, RefreshIcon } from "./icons";

function InsightsAskIvyPill() {
  return (
    <div
      className="inline-flex items-center h-[36px] rounded-[40px] px-[16px] gap-[5px] self-start"
      style={{ backgroundColor: colors.white }}
    >
      <span
        className="text-[12px] leading-[22px] tracking-[-0.73px]"
        style={{ color: colors.accent, fontFamily: font }}
      >
        ask
      </span>
      <svg
        width="13"
        height="13"
        viewBox="11.19 9.98 7.88 7.88"
        fill="none"
        className="shrink-0"
        style={{ transform: "rotate(45deg)" }}
      >
        <path
          d="M15.5041 10.2672C15.4541 10.1006 15.3009 9.98657 15.127 9.98657C14.9531 9.98657 14.7998 10.1006 14.7499 10.2672C14.4667 11.2112 14.0995 11.8845 13.5936 12.3904C13.0877 12.8963 12.4145 13.2634 11.4704 13.5466C11.3039 13.5966 11.1898 13.7499 11.1898 13.9237C11.1898 14.0976 11.3039 14.2509 11.4704 14.3009C12.4145 14.5841 13.0877 14.9512 13.5936 15.4571C14.0995 15.963 14.4667 16.6363 14.7499 17.5803C14.7998 17.7469 14.9531 17.8609 15.127 17.8609C15.3009 17.8609 15.4541 17.7469 15.5041 17.5803C15.7873 16.6363 16.1545 15.963 16.6604 15.4571C17.1663 14.9512 17.8395 14.5841 18.7836 14.3009C18.9501 14.2509 19.0642 14.0976 19.0642 13.9237C19.0642 13.7499 18.9501 13.5966 18.7836 13.5466C17.8395 13.2634 17.1663 12.8963 16.6604 12.3904C16.1545 11.8845 15.7873 11.2112 15.5041 10.2672Z"
          fill={colors.accent}
        />
      </svg>
    </div>
  );
}

function BiologicalAgeCard() {
  return (
    <div
      className="w-[361px] rounded-[16px] overflow-hidden px-[16px] py-[24px] flex flex-col gap-[24px]"
      style={{ backgroundColor: colors.secondary }}
    >
      <div className="flex items-center justify-between" style={{ height: 188 }}>
        <div className="flex flex-col gap-[24px] flex-1">
          <p
            className="text-[20px] leading-[20.1px] tracking-[-1.05px]"
            style={{ color: colors.primary, fontFamily: font, fontWeight: 500 }}
          >
            Biological age
          </p>
          <div className="flex items-end" style={{ height: 150 }}>
            <span
              className="text-[40px] leading-[39.1px] tracking-[-2.65px]"
              style={{ color: colors.primary, fontFamily: font }}
            >
              48
            </span>
          </div>
        </div>
        <div className="relative overflow-hidden" style={{ width: 180, height: 188 }}>
          <img
            src={imgBodySilhouette}
            alt=""
            className="absolute object-cover pointer-events-none"
            style={{ left: 72, top: 0, width: 78, height: 188 }}
          />
          <img
            src={imgBodySilhouette}
            alt=""
            className="absolute object-cover pointer-events-none mix-blend-multiply"
            style={{ left: 72, top: 0, width: 78, height: 188 }}
          />
        </div>
      </div>
      <Divider />
      <div className="flex flex-col gap-[16px]">
        <div className="flex items-center gap-[4px]">
          <UpArrowIcon />
          <span
            className="text-[16px] leading-[20.1px] tracking-[-0.73px]"
            style={{ color: "#CC537A", fontFamily: font }}
          >
            4 yrs older than your peers
          </span>
        </div>
        <p
          className="text-[18px] leading-[27.7px] tracking-[-0.89px]"
          style={{ color: colors.primaryDark, fontFamily: font, opacity: 0.7 }}
        >
          Your biological age runs ~4 years higher, driven by cholesterol and
          A1C—both responsive to steady habits.
        </p>
        <InsightsAskIvyPill />
      </div>
    </div>
  );
}

function BiomarkerBar() {
  return (
    <div className="flex items-center gap-[2px] w-full">
      <div
        className="flex-1 h-[7px] rounded-[8px]"
        style={{ backgroundColor: colors.accentBar }}
      />
      <div
        className="h-[7px] rounded-[8px]"
        style={{ width: 39, backgroundColor: "rgba(235,194,70,0.79)" }}
      />
      <div
        className="h-[7px] rounded-[8px]"
        style={{ width: 16, backgroundColor: "#CC537A" }}
      />
    </div>
  );
}

const biomarkerStats = [
  { value: "75", label: "total" },
  { value: "67", label: "optimal" },
  { value: "6", label: "in range" },
  { value: "2", label: "out of range" },
];

function BiomarkerStats() {
  return (
    <div className="flex flex-col gap-[8px] w-full">
      <div className="flex items-center justify-between w-full">
        {biomarkerStats.map((s) => (
          <div key={s.label} className="flex flex-col">
            <span
              className="text-[18px] leading-[18.2px] tracking-[-0.89px]"
              style={{ color: colors.primary, fontFamily: font, fontWeight: 500 }}
            >
              {s.value}
            </span>
            <span
              className="text-[12px] leading-[16.3px] tracking-[-0.73px]"
              style={{ color: "rgba(22,43,51,0.5)", fontFamily: font }}
            >
              {s.label}
            </span>
          </div>
        ))}
      </div>
      <BiomarkerBar />
    </div>
  );
}

function BiomarkersCard() {
  return (
    <div
      className="w-[361px] rounded-[16px] overflow-hidden px-[16px] py-[24px] flex flex-col gap-[24px]"
      style={{ backgroundColor: colors.secondary }}
    >
      <div className="flex items-center gap-[10px]">
        <p
          className="text-[20px] leading-[20.1px] tracking-[-1.05px] flex-1"
          style={{ color: colors.primary, fontFamily: font, fontWeight: 500 }}
        >
          Biomarkers
        </p>
      </div>
      <BiomarkerStats />
      <Divider />
      <div className="flex flex-col gap-[8px]">
        <p
          className="text-[16px] leading-[22px] tracking-[-0.73px]"
          style={{ color: colors.primaryDark, fontFamily: font }}
        >
          This consistency supports your body's response while easing decision
          fatigue around food.
        </p>
        <InsightsAskIvyPill />
      </div>
    </div>
  );
}

function BiomarkersSummaryCard() {
  return (
    <div
      className="w-[361px] rounded-[16px] overflow-hidden px-[16px] py-[24px] flex flex-col"
      style={{ backgroundColor: colors.secondary }}
    >
      <BiomarkerStats />
    </div>
  );
}

function MoreDiagnosticLink() {
  return (
    <div className="flex items-center justify-center py-[16px]">
      <span
        className="text-[16px] leading-[16.3px] tracking-[-0.73px]"
        style={{ color: colors.accent, fontFamily: font, fontWeight: 500 }}
      >
        More diagnostic test
      </span>
      <ChevronRightIcon color={colors.accent} />
    </div>
  );
}

function WalkActionCard() {
  return (
    <div
      className="w-[361px] h-[400px] rounded-[24px] overflow-hidden relative flex flex-col"
      style={{ backgroundColor: colors.secondary }}
    >
      <img
        src={imgWalkPhoto}
        alt=""
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        style={{ objectPosition: "center top" }}
      />
      <div
        className="absolute bottom-0 left-0 w-full"
        style={{
          height: 275,
          background: "linear-gradient(to bottom, rgba(22,43,51,0), #162B33)",
        }}
      />
      <div className="relative flex-1 flex flex-col justify-between px-[16px] py-[24px] z-[1]">
        <div>
          <p
            className="text-[18px] leading-[22px] tracking-[-0.89px]"
            style={{ color: colors.white, fontFamily: font, fontWeight: 500 }}
          >
            Walk
          </p>
          <p
            className="text-[18px] leading-[22px] tracking-[-0.89px]"
            style={{ color: "rgba(255,255,255,0.7)", fontFamily: font, fontWeight: 500 }}
          >
            30 mins
          </p>
        </div>
        <div className="flex flex-col gap-[8px]">
          <p
            className="text-[16px] leading-[18.2px] tracking-[-0.57px]"
            style={{ color: colors.white, fontFamily: font }}
          >
            Heart rate:
          </p>
          <div className="flex items-center gap-[4px] h-[16px] w-full">
            <div className="h-[6px] rounded-[30px]" style={{ width: "42%", backgroundColor: colors.white }} />
            <div className="h-[6px] rounded-[30px]" style={{ width: "19%", backgroundColor: colors.white, opacity: 0.8 }} />
            <div className="h-[6px] rounded-[30px]" style={{ width: "19%", backgroundColor: colors.white, opacity: 0.6 }} />
            <div className="h-[6px] rounded-[30px] flex-1" style={{ backgroundColor: colors.white, opacity: 0.4 }} />
          </div>
          <div
            className="flex items-center justify-between text-[16px] leading-[18.2px] tracking-[-0.57px]"
            style={{ color: colors.white, fontFamily: font }}
          >
            <span style={{ width: 144 }}>Zone 1</span>
            <span style={{ width: 65 }}>Zone 2</span>
            <span className="flex-1">Zone 3</span>
            <span style={{ width: 54 }}>Zone 4</span>
          </div>
          <div
            className="flex items-center justify-between text-[14px] leading-[18.2px] tracking-[-0.57px]"
            style={{ color: colors.white, fontFamily: font, opacity: 0.7 }}
          >
            <span style={{ width: 144 }}>13 mins</span>
            <span className="flex-1">9 mins</span>
            <span style={{ width: 67 }}>6 mins</span>
            <span style={{ width: 54 }}>6 mins</span>
          </div>
          <div
            className="w-full h-[48px] rounded-[67px] flex items-center justify-center"
            style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
          >
            <span
              className="text-[14px] leading-[18.2px] tracking-[-0.57px]"
              style={{ color: colors.white, fontFamily: font }}
            >
              Let's try it
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function YogurtActionCard() {
  return (
    <div
      className="w-[361px] h-[400px] rounded-[24px] overflow-hidden relative flex flex-col"
      style={{ backgroundColor: colors.secondary }}
    >
      <img
        src={imgYogurtPhoto}
        alt=""
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />
      <div
        className="absolute bottom-0 left-0 w-full"
        style={{
          height: 213,
          background: "linear-gradient(to bottom, rgba(22,43,51,0), rgba(22,43,51,0.8))",
        }}
      />
      <div
        className="absolute top-0 left-0 w-full"
        style={{
          height: 91,
          background: "linear-gradient(to top, rgba(22,43,51,0), rgba(22,43,51,0.7))",
        }}
      />
      <div className="relative flex-1 flex flex-col justify-between px-[16px] py-[24px] z-[1]">
        <div>
          <p
            className="text-[18px] leading-[22px] tracking-[-0.89px]"
            style={{ color: colors.white, fontFamily: font, fontWeight: 500 }}
          >
            Greek Yogurt Breakfast
          </p>
          <p
            className="text-[18px] leading-[22px] tracking-[-0.89px]"
            style={{ color: "rgba(255,255,255,0.7)", fontFamily: font, fontWeight: 500 }}
          >
            354 Kcal
          </p>
        </div>
        <div className="flex flex-col gap-[8px]">
          <div className="flex items-center gap-[4px] w-full">
            {[
              { val: "26g", label: "fat" },
              { val: "45g", label: "carbs" },
              { val: "9g", label: "protein" },
              { val: "1g", label: "fiber" },
            ].map((m, i, arr) => (
              <div key={m.label} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1 py-[8px]">
                  <span
                    className="text-[18px] leading-[22px] tracking-[-0.89px]"
                    style={{ color: colors.white, fontFamily: font, fontWeight: 500 }}
                  >
                    {m.val}
                  </span>
                  <span
                    className="text-[14px] leading-[18.2px] tracking-[-0.57px]"
                    style={{ color: colors.white, fontFamily: font }}
                  >
                    {m.label}
                  </span>
                </div>
                {i < arr.length - 1 && (
                  <div
                    style={{
                      width: 1,
                      height: 39,
                      backgroundColor: "rgba(255,255,255,0.2)",
                    }}
                  />
                )}
              </div>
            ))}
          </div>
          <div
            className="w-full h-[48px] rounded-[67px] flex items-center justify-center"
            style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
          >
            <span
              className="text-[14px] leading-[18.2px] tracking-[-0.57px]"
              style={{ color: colors.white, fontFamily: font }}
            >
              Mmm sounds good
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function GenerateAlternativesLink() {
  return (
    <div className="flex items-center justify-center h-[52px]">
      <span
        className="text-[16px] leading-[16.3px] tracking-[-0.73px]"
        style={{ color: "rgba(22,43,51,0.5)", fontFamily: font }}
      >
        Generate alternatives
      </span>
      <RefreshIcon />
    </div>
  );
}

export function InsightsContent() {
  return (
    <div
      className="absolute left-0 right-0 top-[147px] bottom-0 overflow-y-auto"
      style={{ scrollbarWidth: "none" }}
    >
      <div className="flex flex-col items-center pb-[40px]">
        <div className="w-[361px] flex flex-col gap-[36px]">
          <div className="flex flex-col gap-[16px]">
            <div className="flex flex-col gap-[4px] px-[16px]">
              <p
                className="text-[32px] leading-[35.3px] tracking-[-2.01px]"
                style={{ color: colors.primary, fontFamily: font }}
              >
                Insights
              </p>
              <p className="text-[16px] leading-[18.2px] tracking-[-0.57px]">
                <span style={{ color: colors.primary, fontFamily: font }}>
                  Health risk:{" "}
                </span>
                <span style={{ color: colors.accent, fontFamily: font }}>
                  Low
                </span>
              </p>
            </div>
            <div className="flex flex-col gap-[4px]">
              <BiologicalAgeCard />
              <BiomarkersCard />
              <BiomarkersSummaryCard />
              <MoreDiagnosticLink />
            </div>
          </div>
          <div className="flex flex-col gap-[16px]">
            <div className="flex flex-col gap-[4px] px-[16px]">
              <p
                className="text-[32px] leading-[35.3px] tracking-[-2.01px]"
                style={{ color: colors.primary, fontFamily: font }}
              >
                Actions
              </p>
              <p
                className="text-[16px] leading-[18.2px] tracking-[-0.57px]"
                style={{ color: "rgba(19,38,46,0.4)", fontFamily: font }}
              >
                If you'd like to start gently
              </p>
            </div>
            <div className="flex flex-col gap-[4px]">
              <WalkActionCard />
              <GenerateAlternativesLink />
            </div>
            <div className="flex flex-col gap-[4px]">
              <YogurtActionCard />
              <GenerateAlternativesLink />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
