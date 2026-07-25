import fs from "fs";
import path from "path";
import FrameSequencePlayer from "@/components/FrameSequencePlayer";
import { captions } from "@/data/captions";
import { settings } from "@/data/settings";
import { seo } from "@/data/seo";
import { naturalSort } from "@/lib/utils";

const IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif"];

function getImages(): string[] {
  const dir = path.join(process.cwd(), "public", "images");
  try {
    const files = fs
      .readdirSync(dir)
      .filter((f) => IMAGE_EXTENSIONS.includes(path.extname(f).toLowerCase()))
      .sort(naturalSort);
    return files.map((f) => `/images/${f}`);
  } catch {
    return [];
  }
}

export default function Page() {
  const images = getImages();

  return (
    <>
      {images[0] && (
        <link
          rel="preload"
          as="image"
          href={images[0]}
          fetchPriority="high"
        />
      )}
      <FrameSequencePlayer
        images={images}
        captions={captions}
        settings={settings}
        siteName={seo.siteName}
      />
    </>
  );
}

export const dynamic = "force-dynamic";
