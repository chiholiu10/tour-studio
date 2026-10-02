import { SVGProps } from "react";

const paths = {
  arrow: "M5 12h14M13 6l6 6-6 6",
  spark: "m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5L12 3Z",
  play: "m8 5 11 7-11 7V5Z",
  pause: "M8 5v14M16 5v14",
  download: "M12 3v12m-5-5 5 5 5-5M5 16v5h14v-5",
  wave: "M3 10v4m4-7v10m5-14v18m5-14v10m4-7v4",
  check: "m5 12 4 4L19 6",
  clock: "M12 8v4l3 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0",
  map: "m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3V6Zm6-3v15m6-12v15",
  close: "m6 6 12 12M6 18 18 6",
} as const;

export default function Icon({ name, ...props }: SVGProps<SVGSVGElement> & { name: keyof typeof paths }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d={paths[name]} />
    </svg>
  );
}
