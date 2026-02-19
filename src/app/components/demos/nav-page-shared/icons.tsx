import svgPaths from "../../../../imports/svg-c25idma1sm";
import { colors } from "./tokens";

export function ShieldIcon() {
  return (
    <div className="relative shrink-0 size-[16px]">
      <svg className="block size-full" fill="none" viewBox="0 0 16 16">
        <path
          clipRule="evenodd"
          d={svgPaths.p1386b880}
          fill={colors.accent}
          fillRule="evenodd"
        />
      </svg>
    </div>
  );
}

export function AttachmentIcon() {
  return (
    <div className="relative shrink-0 size-[20px]">
      <svg className="block size-full" fill="none" viewBox="0 0 20 20">
        <path d={svgPaths.p2f1be100} fill={colors.primary} />
      </svg>
    </div>
  );
}

export function MicrophoneIcon() {
  return (
    <div className="relative shrink-0 size-[20px]">
      <svg className="block size-full" fill="none" viewBox="0 0 20 20">
        <path
          d={svgPaths.p288a7d00}
          stroke={colors.primary}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.66667"
        />
      </svg>
    </div>
  );
}

export function HeartSparkleIcon({ color = "#FFFFFF" }: { color?: string }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_8_6624)">
        <path
          d="M5.99998 5.19961C5.99998 3.21138 7.61175 1.59961 9.59998 1.59961C11.5882 1.59961 13.2 3.21138 13.2 5.19961C13.2 7.18783 11.5882 8.79961 9.59998 8.79961C7.61175 8.79961 5.99998 7.18783 5.99998 5.19961Z"
          fill={color}
        />
        <path
          d="M9.5996 9.59961C6.53408 9.59961 4.1879 11.4366 3.23525 14.0124C2.96291 14.7488 3.14937 15.4747 3.58229 15.9906C4.00419 16.4934 4.65547 16.7996 5.35707 16.7996H10.4785C9.97676 16.0822 9.59959 15.1929 9.59959 14.1996C9.59959 12.5753 10.6217 10.6478 12.6081 10.2668C11.7203 9.83927 10.7069 9.59961 9.5996 9.59961Z"
          fill={color}
        />
        <path
          d="M15.5041 10.2672C15.4541 10.1006 15.3009 9.98657 15.127 9.98657C14.9531 9.98657 14.7998 10.1006 14.7499 10.2672C14.4667 11.2112 14.0995 11.8845 13.5936 12.3904C13.0877 12.8963 12.4145 13.2634 11.4704 13.5466C11.3039 13.5966 11.1898 13.7499 11.1898 13.9237C11.1898 14.0976 11.3039 14.2509 11.4704 14.3009C12.4145 14.5841 13.0877 14.9512 13.5936 15.4571C14.0995 15.963 14.4667 16.6363 14.7499 17.5803C14.7998 17.7469 14.9531 17.8609 15.127 17.8609C15.3009 17.8609 15.4541 17.7469 15.5041 17.5803C15.7873 16.6363 16.1545 15.963 16.6604 15.4571C17.1663 14.9512 17.8395 14.5841 18.7836 14.3009C18.9501 14.2509 19.0642 14.0976 19.0642 13.9237C19.0642 13.7499 18.9501 13.5966 18.7836 13.5466C17.8395 13.2634 17.1663 12.8963 16.6604 12.3904C16.1545 11.8845 15.7873 11.2112 15.5041 10.2672Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_8_6624">
          <rect width="19.2" height="19.2" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

export function ChartIcon({ color = colors.primary }: { color?: string }) {
  return (
    <div className="flex items-end" style={{ gap: 2 }}>
      <svg
        width="14"
        height="11"
        viewBox="0 0 14 11"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect y="6" width="2" height="5" rx="1" fill={color} />
        <rect x="4" width="2" height="11" rx="1" fill={color} />
        <rect x="8" y="3" width="2" height="8" rx="1" fill={color} />
        <rect x="12" y="8" width="2" height="3" rx="1" fill={color} />
      </svg>
    </div>
  );
}

export function PulseIcon({ color = colors.primary }: { color?: string }) {
  return (
    <div
      className="flex items-center justify-center shrink-0"
      style={{ width: 19.2, height: 19.2 }}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2.93335 9.6001H5.11142C5.40228 9.6001 5.65956 9.41154 5.74715 9.13418L7.44109 3.77004C7.49013 3.61474 7.7099 3.61474 7.75895 3.77004L11.4411 15.4302C11.4901 15.5855 11.7099 15.5855 11.7589 15.4302L13.4529 10.066C13.5405 9.78866 13.7978 9.6001 14.0886 9.6001H16.2667"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export function HamburgerIcon() {
  return (
    <div className="flex flex-col gap-[2px] items-start w-[19px]">
      <div className="bg-[#162b33] h-[2px] rounded-[100px] w-full" />
      <div className="bg-[#162b33] h-[2px] rounded-[100px] w-[14px]" />
      <div className="bg-[#162b33] h-[2px] rounded-[100px] w-[16px]" />
    </div>
  );
}

export function UpArrowIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <path
        d="M6.5 11L6.5 2M6.5 2L3 5.5M6.5 2L10 5.5"
        stroke="#CC537A"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ChevronRightIcon({ color = colors.accent }: { color?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        d="M8 6L12 10L8 14"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function RefreshIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M1.33 8A6.67 6.67 0 0 1 12.44 3.56M14.67 8A6.67 6.67 0 0 1 3.56 12.44"
        stroke="rgba(22,43,51,0.5)"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.44 1.33v2.23h-2.22M3.56 14.67v-2.23h2.22"
        stroke="rgba(22,43,51,0.5)"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
