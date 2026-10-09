const sizes = {
  sm: "h-7 w-7 text-[10px]",
  md: "h-9 w-9 text-xs",
  lg: "h-12 w-12 text-sm",
};

export default function Logo({
  size = "sm",
  className,
}: {
  size?: keyof typeof sizes;
  className?: string;
}) {
  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-full bg-[#2b2420] font-mono font-semibold tracking-tight text-[#faf7f2] ${sizes[size]} ${className ?? ""}`}
    >
      BY
    </span>
  );
}
