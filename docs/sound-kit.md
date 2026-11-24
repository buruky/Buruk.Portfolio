# Step 1.4: Sound kit

Draft to listen to: https://claude.ai/artifact/CddJTRFjsvB55ah7mtaLiA (variation 1, "Original").

## The system

- **One key:** every sound is tuned to D major pentatonic (D E F♯ A B), so any two sounds can overlap and still sound good together.
- **One family: Glass, original.** Clear, bell-like sine tones with two quiet overtones (×2 and ×3), a fast attack (4 ms) and no reverb. It's clean and crisp.
- **Quiet by design:** everything sits below the volume of a notification, and a light compressor keeps peaks even.
- **No music.** Interface sounds only.

## When sounds play

| Moment | Sound | How often |
| --- | --- | --- |
| Enter with sound | three-note rising chord (D, A, D) | once per visit |
| Intro: letter cycling | very quiet high ticks | intro only |
| Intro: letter locks in | single mid note | intro only |
| Intro: BURUK forms | soft low chord swell (~3 s) | intro only |
| Intro: YIMESGEN slides in | soft whoosh + low D | intro only |
| Menu opens / closes | two notes up / two notes down | often |
| Email copied | tiny three-note confirmation | occasionally |
| Sound turned on | single note | rarely |
| Home · sunrise | rising air + ascending run | page change |
| Work · blinds | soft ticks, one per slat | page change |
| Education · paper | three paper swishes | page change |
| About · long shadow | warm falling sweep + low note | page change |
| BK Web Studios · CRT | power-on hum, faint whine, click | page change |
| Contact · sun iris | soft blooming bell | page change |
| Research · dissolve | tiny notes sparkling in | page change |
| 404 · screen tear | static burst dropping in pitch | page change |
| Chapter 07 glitch | crackle + a note bending out of tune | every few seconds on chapter 07 |

## Rules

- Nothing plays unless the visitor chose "Enter with sound."
- The sound toggle is always visible, and the choice is remembered.
- **Silent:** hover, scrolling, keyboard focus, typing.
- Sounds are synced to the visual moment they belong to.
- The site must work equally well muted.

## How it's built

The sounds are generated live in the browser from `src/lib/sound.ts`, using the same Glass recipes as the draft kit. There are no audio files. Each world's arrival sound is mapped in `src/lib/worlds.ts` (`WORLD_SOUND`).

If a sound ever needs to be recorded rather than generated (for example a real paper swish), free CC0 packs ([Kenney Interface Sounds](https://kenney.nl/assets/interface-sounds), [Kenney UI Audio](https://www.kenney.nl/assets/ui-audio)) are the fallback.
