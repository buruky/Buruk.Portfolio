export default function CornerBrackets({
  inset = "inset-3",
  color = "currentColor",
}: {
  inset?: string;
  color?: string;
}) {
  const corner = "absolute h-4 w-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100";
  return (
    <div className={`pointer-events-none absolute ${inset}`} aria-hidden="true">
      <svg className={`${corner} left-0 top-0`} viewBox="0 0 16 16" fill="none">
        <path d="M0 6V1.5A1.5 1.5 0 0 1 1.5 0H6" stroke={color} strokeWidth="1.5" />
      </svg>
      <svg className={`${corner} right-0 top-0`} viewBox="0 0 16 16" fill="none">
        <path d="M16 6V1.5A1.5 1.5 0 0 0 14.5 0H10" stroke={color} strokeWidth="1.5" />
      </svg>
      <svg className={`${corner} bottom-0 left-0`} viewBox="0 0 16 16" fill="none">
        <path d="M0 10v4.5A1.5 1.5 0 0 0 1.5 16H6" stroke={color} strokeWidth="1.5" />
      </svg>
      <svg className={`${corner} bottom-0 right-0`} viewBox="0 0 16 16" fill="none">
        <path d="M16 10v4.5a1.5 1.5 0 0 1-1.5 1.5H10" stroke={color} strokeWidth="1.5" />
      </svg>
    </div>
  );
}
