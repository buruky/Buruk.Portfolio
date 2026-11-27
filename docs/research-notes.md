# Step 0.1: Research notes

Sources: `content/media/resume.pdf`, bkwebstudios.com (its HTML and CSS), and your public GitHub repos. Read only. Nothing on the site was changed.

---

## 1. Things that don't match (please confirm)

| What | Resume says | Site content says |
| --- | --- | --- |
| GPA | \| 3.6 (and the "3.60 GPA" stat) |
| School name | University of Washington (have tacoma but not as a main info)|
| Fabriq placing | "3rd among "10+ teams"\|

Also: "125% lower MSE" can't be literally true, because nothing can be more than 100% lower. It probably means the error was 2.25× smaller, or 55% lower. Worth fixing on the resume too, since a technical reader might notice(fix to 2.25x)

---

## 2. Resume → material for the site

**Stats you could use (beyond 6 projects / 2 majors / GPA):**
- **10 staff** use your ECC app every day, across **3 roles**
- Case intake cut from **hours to minutes**
- **8-stage** case lifecycle (plus two side exits; corrected 2026-11-26 from the repo) over **4** custom Salesforce objects
- **70+ students** taught as a course facilitator, across **5 quarters**
- **+10%** exam scores above course average, **+35%** student engagement
- **15+ years / 10,000+ data points** of NASA GRACE satellite data
- **5 ML models** benchmarked
- Led a team of **4** to **3rd place** at a hackathon
- **ICPC** competitor

**Things on the resume that aren't on the site at all:**
- **Course Facilitator** at UW (Jan 2025 – Mar 2026). Teaching is a strong story beat.
- **NCA&T Data Science Research Program** in Greensboro, North Carolina (summer 2024). That's where the NASA GRACE research happened, and it could be a place on the story map.
- **ICPC** (competitive programming).
-add these

**For your story:** ECC is **Eritrean Community Connections**, a nonprofit serving immigrants. So your first professional client connects straight back to chapter 1 (born in Asmara). That's a strong thread: the story starts in Eritrea, and your first real software serves the Eritrean community here.

---

## 3. BK Web Studios brand

**Feel:** warm paper, ember orange and deep teal, with **retro computer details**: pixel fonts, bevelled window edges and hard drop shadows, like an old operating system.

**Colours (from the site's CSS):**

| Name | Hex | Role |
| --- | --- | --- |
| paper | `#ede7dd` | main background |
| bone | `#f4efe8` | light surface |
| linen | `#e8e0d4` | panels |
| ink | `#1d1a18` | text |
| dune | `#2a2f33` | lines, shadows |
| night | `#0f0d0c` | dark |
| ember | `#d57d3b` / `#e8955a` | main accent |
| teal | `#2e6170` | second accent |
| dusk | `#8b5a3e` | warm brown |
| glow | `#fde98a` | highlight |

**Fonts:** Clash Display (headings), JetBrains Mono (body), plus pixel and retro faces: Pixelify Sans, Silkscreen, VT323. Also Big Shoulders Display, Instrument Serif, Schibsted Grotesk and Jost.

**Built with:** React 19 + Vite on Vercel. Tagline: "Custom websites for small businesses in Seattle."

**Two design notes:**
- **The bridge.** BKWS's retro computer look matches the old CRT monitors in your *Ctrl* references. Entering the BKWS world could literally go through one of those screens. The calm grassy portfolio world leads into the retro screen world of BKWS.
- **Keep the two worlds apart.** BKWS already uses JetBrains Mono, and I used it in the prototypes. For the portfolio, I'll pick a different mono so the BKWS world feels distinct when you enter it.

---

## 4. GitHub → material for case studies

**ECC (full case study)**
- The `ECC` repo has a strong README: impact numbers, roles, the multi-program framework (WAMAS, PRIME). The Apex/LWC source can be used for code excerpts and a diagram of the 8-stage lifecycle.
- There's also **`ECCManager`**: a React Native + Expo + Firebase mobile app for the same nonprofit, with role-based access and a long `HOW_IT_WORKS.md`. **Question:** was this an earlier version before Salesforce? If so, "I built it twice and here's why we moved to Salesforce" is a great case-study story.

**Fabriq (full case study)**
- Live demo, a README, and `fabriq_project_spec.md` in the repo.
- **`FabriqAWS`**, a rebuild with AWS practices for security and data handling, has a design brief and inspiration folder. That could be the "what's next" part of the case study.
- There are few visual assets in the repo, so we'll take screenshots from the live demo.

**Research papers (full case studies)**
- The PDFs are already in `content/media/papers/`. I'll go through them properly at step 5.4.

**Lighter pages**
- **Between Worlds:** `poster.png` and an assets folder (sprites) in the repo, plus a playable live link.
- **Beaches-N-Barrels:** the repo description is great copy as-is ("a chain of magical, slightly rude islands that love messing with adventurers").

**Not on the portfolio yet:**
- **OutTheGC:** a mobile app that turns the TikToks and Reels friends send each other into a shared trip map (Expo, Supabase/PostGIS, an LLM worker). It's recent and ambitious. **Question:** should it be a project, or could it be part of chapter 07, "what I'm building now"?
- **Client site repos:** Happy-Family-AFH, galileeAFH, BlueTouchAFH, CFHome, isaiah-cafe-website, SimretConsultingCoaching, WeddingSite. `site.json` only lists one client site (Always With Compassion). **Question:** which client sites can be shown in the BKWS world?
- BKSchedule (Astro) and BuildsByBuruk: what are these?

---

## 5. Decisions (confirmed 2026-11-24)

1. **GPA: 3.6.** School shown as **University of Washington**. Tacoma is kept only as a secondary detail (`education.campus`).
2. **Fabriq: 3rd of 10+ teams.**
3. **MSE:** write it as **"2.25× lower MSE."** The resume PDF still says "125% lower," so update the resume's source document and re-export it.
4. **Added to `content/site.json`:** a new `experience` list (ECC, Course Facilitator, NCA&T research) and `activities` (ICPC).
5. **ECCManager was the earlier version** of the ECC app. Use the "built it twice" story in the ECC case study.
6. **OutTheGC: leave it off for now.** Maybe a hidden easter egg inside the chapter 07 glitch.
7. **Client sites:** any can appear in the BKWS world, but **never link to them**.
8. **BKSchedule and BuildsByBuruk:** ignore.
