// The sign-off's buttons, shared by the footer (SiteFooter) and the Contact page: click-to-copy email, replay the intro,
// back to top. Binds every one on the page once.
import { play } from "@/lib/sound";

export function bindSignOff() {
  document.querySelectorAll<HTMLButtonElement>("[data-copy-email]").forEach((btn) => {
    if (btn.dataset.bound) return;
    btn.dataset.bound = "1";
    const hint = btn.querySelector<HTMLElement>("[data-copy-hint]")!;
    let timer = 0;
    btn.addEventListener("click", async () => {
      const email = btn.dataset.copyEmail!;
      try {
        await navigator.clipboard.writeText(email);
        hint.textContent = "Copied";
        btn.classList.add("copied");
        play("copy");
      } catch {
        location.href = `mailto:${email}`; // no clipboard access: fall back to the mail app
        return;
      }
      clearTimeout(timer);
      timer = window.setTimeout(() => { hint.textContent = "Click to copy"; btn.classList.remove("copied"); }, 2200);
    });
  });
  // the intro only runs on a fresh load of Home, so this skips the page transition and reloads
  document.querySelectorAll<HTMLAnchorElement>("[data-replay-intro]").forEach((a) => {
    if (a.dataset.bound) return;
    a.dataset.bound = "1";
    a.addEventListener("click", (e) => {
      e.preventDefault();
      try { sessionStorage.removeItem("bk-entered"); } catch { /* private mode */ }
      location.href = "/?intro";
    });
  });
  document.querySelectorAll<HTMLAnchorElement>("[data-to-top]").forEach((a) => {
    if (a.dataset.bound) return;
    a.dataset.bound = "1";
    a.addEventListener("click", (e) => {
      e.preventDefault();
      scrollTo({ top: 0, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
    });
  });
}
