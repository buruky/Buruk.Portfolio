export default function SkillsMarquee({ skills }: { skills: string[] }) {
  return (
    <div
      className="relative overflow-hidden py-2"
      style={{ maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)" }}
    >
      <div className="marquee-track flex w-max items-center gap-3">
        {[...skills, ...skills].map((skill, i) => (
          <span
            key={`${skill}-${i}`}
            className="shrink-0 rounded-sm border border-border px-3 py-1.5 font-mono text-xs text-muted"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}
