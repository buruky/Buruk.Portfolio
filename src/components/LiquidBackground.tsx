export default function LiquidBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#1c1712]">
      <div className="liquid-blob-a absolute left-[10%] top-[15%] h-[55vmax] w-[55vmax] rounded-full bg-[#e8b98e] opacity-30 blur-[110px]" />
      <div className="liquid-blob-b absolute right-[5%] top-[40%] h-[45vmax] w-[45vmax] rounded-full bg-[#faf7f2] opacity-[0.12] blur-[110px]" />
      <div className="liquid-blob-c absolute bottom-[-10%] left-[30%] h-[50vmax] w-[50vmax] rounded-full bg-[#8a5a3a] opacity-25 blur-[120px]" />
    </div>
  );
}
