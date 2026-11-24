const assetPath = "/assets"

const assets = {
  file1: `${assetPath}/dressed-up.jpg`,
  file2: `${assetPath}/me.jpg`,
  file3: `${assetPath}/seattle.jpg`,
  starSticker: `${assetPath}/377c5.png`,
  mushroomSticker: `${assetPath}/ba226.png`,
  ninetiesSticker: `${assetPath}/f8f4d.png`,
  backPanel: `${assetPath}/6008d.svg`,
  starBacking: `${assetPath}/733b1.svg`,
  // frontGlass (35d2a.svg) is drawn inline below: its blur and 3D tilt don't render inside an <img>.
}

// Outline of the front glass, from 35d2a.svg.
const GLASS_PATH =
  "M0 45.6397C0 20.4341 20.4341 0 45.6397 0H244.795C298.732 0 302.881 66.385 356.819 66.385H659.701C684.906 66.385 705.34 86.8191 705.34 112.025V365.117C705.34 390.323 684.906 410.757 659.701 410.757H45.6397C20.4341 410.757 0 390.323 0 365.117V45.6397Z"

type FileCardProps = {
  className: string
  image: string
  title: string
  detail: string
}

// Spans, not divs: a <button> may only contain phrasing content.
function FileCard({ className, image, title, detail }: FileCardProps) {
  return (
    <span className={`file-card ${className}`}>
      <img src={image} alt="" />
      <span className="file-title">{title}</span>
      <span className="file-detail">{detail}</span>
    </span>
  )
}

function FrontGlass({ children }: { children: React.ReactNode }) {
  return (
    <span className="front-glass">
      <span className="glass-blur" />
      <svg className="glass-surface" viewBox="0 0 705.34 410.757" fill="none" aria-hidden="true">
        <defs>
          <linearGradient id="glass-fill" x1="352.67" y1="0" x2="352.67" y2="410.757" gradientUnits="userSpaceOnUse">
            <stop stopColor="white" stopOpacity="0.16" />
            <stop offset="0.42" stopColor="white" stopOpacity="0.5" />
            <stop offset="1" stopColor="#FCFCFC" stopOpacity="0.93" />
          </linearGradient>
          <linearGradient id="glass-stroke" x1="352.67" y1="0" x2="352.67" y2="410.757" gradientUnits="userSpaceOnUse">
            <stop stopColor="white" stopOpacity="0.95" />
            <stop offset="0.35" stopColor="white" stopOpacity="0.35" />
            <stop offset="1" stopColor="white" stopOpacity="0.12" />
          </linearGradient>
        </defs>
        <path d={GLASS_PATH} fill="url(#glass-fill)" stroke="url(#glass-stroke)" strokeWidth="4.97887" />
      </svg>
      {children}
    </span>
  )
}

export default function App() {
  return (
    <main className="showcase">
      <h1 className="sr-only">Buruk Yimesgen</h1>

      {/* No destination yet; wire up onClick (or swap for an <a>) once the about page exists. */}
      <button type="button" className="folder" aria-label="About me">
        <span className="folder-scale" aria-hidden="true">
          <img className="back-panel" src={assets.backPanel} alt="" />

          <span className="files-clip">
            <FileCard className="file-one" image={assets.file1} title="dressed up" detail="JPG · 192 KB" />
            <FileCard className="file-two" image={assets.file2} title="me" detail="JPG · 164 KB" />
            <FileCard className="file-three" image={assets.file3} title="seattle" detail="JPG · 264 KB" />
          </span>

          <FrontGlass>
            <span className="folder-label">
              <span className="label-title">about me</span>
              <span className="label-date">1998–2026</span>
            </span>

            <span className="stickers">
              <span className="star-sticker">
                <img className="star-backing" src={assets.starBacking} alt="" />
                <img className="star-art" src={assets.starSticker} alt="" />
              </span>
              <img className="mushroom-sticker" src={assets.mushroomSticker} alt="" />
              <img className="nineties-sticker" src={assets.ninetiesSticker} alt="" />
            </span>
          </FrontGlass>
        </span>
      </button>
    </main>
  )
}
