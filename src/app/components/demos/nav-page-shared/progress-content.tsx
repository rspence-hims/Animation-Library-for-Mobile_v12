import { colors, font } from "./tokens";

export function Divider() {
  return (
    <div
      className="w-full"
      style={{ height: 1, backgroundColor: "rgba(19, 38, 46, 0.08)" }}
    />
  );
}

export function AskIvyPill() {
  return (
    <div
      className="inline-flex items-center h-[36px] rounded-[40px] px-[16px] gap-[3px] self-start"
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
        height="11"
        viewBox="0 0 15 13"
        fill="none"
        className="shrink-0"
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
  );
}

function WeightChart() {
  return (
    <div className="relative overflow-hidden" style={{ width: 180, height: 100 }}>
      <svg
        width="180"
        height="80"
        viewBox="0 0 180 80"
        fill="none"
        className="absolute bottom-[20px] right-0"
      >
        <defs>
          <linearGradient id="weightGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={colors.accent} stopOpacity="0.25" />
            <stop offset="100%" stopColor={colors.accent} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M-20 45 C10 48, 30 52, 50 50 C70 48, 85 38, 105 30 C120 24, 140 18, 155 15 C165 13, 175 15, 185 18"
          fill="none"
          stroke={colors.accent}
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M-20 45 C10 48, 30 52, 50 50 C70 48, 85 38, 105 30 C120 24, 140 18, 155 15 C165 13, 175 15, 185 18 L185 80 L-20 80 Z"
          fill="url(#weightGrad)"
        />
      </svg>
      <div
        className="absolute"
        style={{
          right: 43,
          top: 0,
          bottom: 20,
          width: 1,
          backgroundImage:
            "repeating-linear-gradient(to bottom, rgba(19,38,46,0.15) 0px, rgba(19,38,46,0.15) 3px, transparent 3px, transparent 6px)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 flex items-center justify-between"
        style={{ height: 18 }}
      >
        {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
          <span
            key={i}
            className="text-[12px] text-center tracking-[-0.57px]"
            style={{
              color: colors.primaryDark,
              fontFamily: font,
              width: 25,
              opacity: i === 6 ? 0.2 : 1,
            }}
          >
            {d}
          </span>
        ))}
      </div>
    </div>
  );
}

function WeightCard() {
  return (
    <div
      className="w-[361px] rounded-[16px] overflow-hidden px-[16px] py-[24px] flex flex-col gap-[24px]"
      style={{ backgroundColor: colors.secondary }}
    >
      <p
        className="text-[20px] leading-[20.1px] tracking-[-1.05px]"
        style={{ color: colors.primary, fontFamily: font, fontWeight: 500 }}
      >
        Weight
      </p>
      <div className="flex items-end justify-between">
        <div>
          <span
            className="text-[40px] leading-[39.1px] tracking-[-2.65px]"
            style={{ color: colors.primary, fontFamily: font }}
          >
            172
          </span>
          <span
            className="text-[16px] leading-[20.1px] tracking-[-0.73px] ml-[2px]"
            style={{ color: "rgba(19,38,46,0.5)", fontFamily: font }}
          >
            lbs
          </span>
        </div>
        <WeightChart />
      </div>
      <Divider />
      <div className="flex flex-col gap-[8px]">
        <div className="flex items-center gap-[4px]">
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <path
              d="M6.5 2L6.5 11M6.5 11L3 7.5M6.5 11L10 7.5"
              stroke={colors.accent}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span
            className="text-[16px] leading-[20.1px] tracking-[-0.73px]"
            style={{ color: colors.accent, fontFamily: font }}
          >
            20 lbs as far
          </span>
        </div>
        <p
          className="text-[18px] leading-[27.7px] tracking-[-0.89px]"
          style={{
            color: colors.primaryDark,
            fontFamily: font,
            opacity: 0.8,
          }}
        >
          Your weight trend reflects real metabolic change, supporting better
          energy, blood sugar, and heart health.
        </p>
        <AskIvyPill />
      </div>
    </div>
  );
}

function DosesCard() {
  return (
    <div
      className="w-[361px] rounded-[16px] overflow-hidden px-[16px] py-[24px] flex flex-col gap-[24px]"
      style={{ backgroundColor: colors.secondary }}
    >
      <div className="flex items-center justify-between">
        <p
          className="text-[20px] leading-[20.1px] tracking-[-1.05px]"
          style={{ color: colors.primary, fontFamily: font, fontWeight: 500 }}
        >
          Doses
        </p>
        <span
          className="text-[16px] leading-[18.2px] tracking-[-0.57px]"
          style={{ color: "rgba(22,43,51,0.5)", fontFamily: font }}
        >
          Next injection: Feb 25
        </span>
      </div>
      <div className="flex items-end justify-between">
        <span
          className="text-[40px] leading-[39.1px] tracking-[-2.65px]"
          style={{ color: colors.primary, fontFamily: font }}
        >
          2
        </span>
        <div className="flex items-center gap-[8px] pb-[6px]">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="rounded-full"
              style={{
                width: 8,
                height: 8,
                backgroundColor: i < 2 ? colors.accent : "transparent",
                border:
                  i >= 2
                    ? `1.5px solid rgba(19,38,46,0.2)`
                    : `1.5px solid ${colors.accent}`,
              }}
            />
          ))}
        </div>
      </div>
      <Divider />
      <div className="flex flex-col gap-[8px]">
        <p
          className="text-[18px] leading-[27.7px] tracking-[-0.89px]"
          style={{
            color: colors.primaryDark,
            fontFamily: font,
            opacity: 0.8,
          }}
        >
          This consistency supports your body's response while easing decision
          fatigue around food.
        </p>
        <AskIvyPill />
      </div>
    </div>
  );
}

function ActivityCard() {
  const bars = [
    { h: 59, top: 5 },
    { h: 54, top: 10 },
    { h: 54, top: 10 },
    { h: 46, top: 18 },
    { h: 50, top: 14 },
    { h: 33, top: 31, faded: true },
  ];
  return (
    <div
      className="w-[361px] rounded-[16px] overflow-hidden px-[16px] py-[24px] flex flex-col gap-[24px]"
      style={{ backgroundColor: colors.secondary }}
    >
      <p
        className="text-[20px] leading-[20.1px] tracking-[-1.05px]"
        style={{ color: colors.primary, fontFamily: font, fontWeight: 500 }}
      >
        Activity
      </p>
      <div className="flex items-end justify-between">
        <div className="flex flex-col gap-[10px]">
          <div>
            <span
              className="text-[40px] leading-[39.1px] tracking-[-2.65px]"
              style={{ color: colors.primary, fontFamily: font }}
            >
              1200
            </span>
            <span
              className="text-[16px] leading-[20.1px] tracking-[-0.73px] ml-[2px]"
              style={{ color: "rgba(19,38,46,0.5)", fontFamily: font }}
            >
              steps
            </span>
          </div>
          <span
            className="text-[16px] leading-[20.1px] tracking-[-0.73px]"
            style={{ color: colors.accent, fontFamily: font }}
          >
            800 steps to go
          </span>
        </div>
        <div className="relative overflow-hidden" style={{ width: 180, height: 100 }}>
          <div
            className="absolute left-0 right-0"
            style={{
              top: 18,
              height: 1,
              backgroundImage:
                "repeating-linear-gradient(to right, rgba(19,38,46,0.12) 0px, rgba(19,38,46,0.12) 4px, transparent 4px, transparent 8px)",
            }}
          />
          {bars.map((b, i) => (
            <div
              key={i}
              className="absolute rounded-[7px]"
              style={{
                left: 10 + i * 31,
                top: b.top,
                width: 6,
                height: b.h,
                backgroundColor: colors.accentBar,
                opacity: b.faded ? 0.2 : 1,
              }}
            />
          ))}
          <div
            className="absolute bottom-0 left-0 right-0 flex items-center justify-between"
            style={{ height: 18 }}
          >
            {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
              <span
                key={i}
                className="text-[12px] text-center tracking-[-0.57px]"
                style={{
                  color: colors.primaryDark,
                  fontFamily: font,
                  width: 25,
                  opacity: i === 6 ? 0.2 : 1,
                }}
              >
                {d}
              </span>
            ))}
          </div>
        </div>
      </div>
      <Divider />
      <div className="flex flex-col gap-[8px]">
        <p
          className="text-[16px] leading-[22px] tracking-[-0.73px]"
          style={{
            color: colors.primaryDark,
            fontFamily: font,
            opacity: 0.5,
          }}
        >
          That soreness means your body is adapting and getting stronger through
          consistent movement.
        </p>
        <AskIvyPill />
      </div>
    </div>
  );
}

function NutritionCard() {
  const macros = [
    { label: "Protein", pct: 0.65 },
    { label: "Carbs", pct: 0.45 },
    { label: "Fats", pct: 0.35 },
  ];
  return (
    <div
      className="w-[361px] rounded-[16px] overflow-hidden px-[16px] py-[24px] flex flex-col gap-[24px]"
      style={{ backgroundColor: colors.secondary }}
    >
      <p
        className="text-[20px] leading-[20.1px] tracking-[-1.05px]"
        style={{ color: colors.primary, fontFamily: font, fontWeight: 500 }}
      >
        Nutrition
      </p>
      <div className="flex items-end justify-between">
        <div className="flex flex-col gap-[10px]">
          <div>
            <span
              className="text-[40px] leading-[39.1px] tracking-[-2.65px]"
              style={{ color: colors.primary, fontFamily: font }}
            >
              1403
            </span>
            <span
              className="text-[16px] leading-[20.1px] tracking-[-0.73px] ml-[2px]"
              style={{ color: "rgba(19,38,46,0.5)", fontFamily: font }}
            >
              kcals
            </span>
          </div>
          <span
            className="text-[16px] leading-[20.1px] tracking-[-0.73px]"
            style={{ color: colors.accent, fontFamily: font }}
          >
            800 kcals to go
          </span>
        </div>
        <div
          className="flex items-center justify-center gap-[16px]"
          style={{ width: 180, height: 100 }}
        >
          {macros.map((m) => (
            <div
              key={m.label}
              className="flex flex-col items-center justify-between"
              style={{ height: 84 }}
            >
              <div
                className="relative rounded-full overflow-hidden"
                style={{ width: 24, height: 56, backgroundColor: "rgba(19,38,46,0.08)" }}
              >
                <div
                  className="absolute bottom-0 left-0 right-0 rounded-full"
                  style={{
                    height: `${m.pct * 100}%`,
                    backgroundColor: colors.accentBar,
                  }}
                />
              </div>
              <span
                className="text-[12px] tracking-[-0.57px] text-center"
                style={{ color: colors.primaryDark, fontFamily: font }}
              >
                {m.label}
              </span>
            </div>
          ))}
        </div>
      </div>
      <Divider />
      <div className="flex flex-col gap-[8px]">
        <p
          className="text-[16px] leading-[22px] tracking-[-0.73px]"
          style={{
            color: colors.primaryDark,
            fontFamily: font,
            opacity: 0.5,
          }}
        >
          These choices reinforce fullness cues, helping your body settle into
          smaller, satisfying meals.
        </p>
        <AskIvyPill />
      </div>
    </div>
  );
}

function AddConnectionsLink() {
  return (
    <div className="flex items-center justify-center py-[16px]">
      <span
        className="text-[16px] leading-[16.3px] tracking-[-0.73px]"
        style={{ color: colors.accent, fontFamily: font, fontWeight: 500 }}
      >
        Add more connections
      </span>
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        className="ml-[2px]"
      >
        <path
          d="M8 6L12 10L8 14"
          stroke={colors.accent}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export function ProgressContent() {
  return (
    <div
      className="absolute left-0 right-0 top-[147px] bottom-0 overflow-y-auto"
      style={{ scrollbarWidth: "none" }}
    >
      <div className="flex flex-col items-center pb-[40px]">
        <div className="w-[361px] flex flex-col gap-[36px]">
          <div className="flex flex-col gap-[4px] px-[16px]">
            <p
              className="text-[32px] leading-[35.3px] tracking-[-2.01px]"
              style={{ color: colors.primary, fontFamily: font }}
            >
              Progress
            </p>
            <p
              className="text-[16px] leading-[18.2px] tracking-[-0.57px]"
              style={{ color: colors.accent, fontFamily: font }}
            >
              On track
            </p>
          </div>
          <div className="flex flex-col gap-[4px]">
            <WeightCard />
            <DosesCard />
            <ActivityCard />
            <NutritionCard />
            <AddConnectionsLink />
          </div>
        </div>
      </div>
    </div>
  );
}
