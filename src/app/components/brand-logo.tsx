import logoImg from "figma:asset/d08baf8082f4035ec876e7fbd4dfcfe313372bc3.png";

export function BrandLogo() {
  return (
    <div className="w-[95px] flex-shrink-0">
      <img
        src={logoImg}
        alt="hims & hers"
        className="w-full h-auto block brightness-0 invert"
        style={{ marginTop: -14, marginBottom: -14, clipPath: "inset(14px 0)" }}
      />
    </div>
  );
}