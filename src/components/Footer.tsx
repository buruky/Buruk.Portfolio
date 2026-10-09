import { profile } from "@/lib/site-config";
import CopyEmailButton from "@/components/CopyEmailButton";

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-3xl flex-col gap-3 px-6 py-10 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>&copy; {new Date().getFullYear()} {profile.name}</p>
        <CopyEmailButton email={profile.email} />
      </div>
    </footer>
  );
}
