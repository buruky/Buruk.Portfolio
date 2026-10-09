import { skillGroups } from "@/lib/site-config";
import CornerBrackets from "@/components/CornerBrackets";

export default function SkillsGrid() {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {skillGroups.map((group) => (
        <div
          key={group.category}
          className="group relative rounded-2xl border border-border p-6 transition-colors duration-300 hover:border-accent/40"
        >
          <CornerBrackets color="var(--accent)" />
          <p className="font-mono text-xs uppercase tracking-widest text-foreground/60">
            {group.category}
          </p>
          <ul className="mt-4 flex flex-wrap gap-1.5">
            {group.skills.map((skill) => (
              <li
                key={skill}
                className="rounded-sm border border-border px-2 py-0.5 font-mono text-[11px] text-muted"
              >
                {skill}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
