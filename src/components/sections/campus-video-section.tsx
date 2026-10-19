"use client";

import Image from "next/image";
import { Play } from "lucide-react";
import { useState } from "react";
import type { CampusVideoSection as CampusVideoSectionData } from "@/types/sanity";

type CampusVideoSectionProps = {
  section?: CampusVideoSectionData;
  /** Show the poster with a large play button; the video starts when it is pressed. */
  coverPlay?: boolean;
};

function PlayRing() {
  return (
    <svg viewBox="0 0 160 160" aria-hidden="true" focusable="false">
      <circle cx="80" cy="80" r="73" fill="none" stroke="currentColor" strokeWidth="11" />
      <path d="M64 50 L114 80 L64 110 Z" fill="currentColor" stroke="currentColor" strokeWidth="6" strokeLinejoin="round" />
    </svg>
  );
}

export function CampusVideoSection({ section, coverPlay = false }: CampusVideoSectionProps) {
  const poster = section?.poster;
  const videoUrl = section?.videoFileUrl || section?.videoUrl;
  const [isPlaying, setIsPlaying] = useState(false);

  if (!poster?.url && !videoUrl) {
    return null;
  }

  const showCover = coverPlay && Boolean(videoUrl) && Boolean(poster?.url) && !isPlaying;

  return (
    <section className={`campus-video${coverPlay ? " campus-video--cover" : ""}`} aria-label="Campus video">
      <div className="campus-video__inner">
        <div className="campus-video__frame">
          {showCover && poster?.url ? (
            <>
              <Image
                src={poster.url}
                alt={poster.alt || "SAIS - Abu Dhabi campus video"}
                fill
                sizes="(max-width: 767px) 92vw, 82vw"
                className="campus-video__poster"
              />
              <button type="button" className="campus-video__play-button" onClick={() => setIsPlaying(true)} aria-label="Play the campus video">
                <PlayRing />
              </button>
            </>
          ) : videoUrl ? (
            <video
              className="campus-video__media"
              controls
              preload="metadata"
              poster={poster?.url}
              autoPlay={coverPlay && isPlaying}
              playsInline
            >
              <source src={videoUrl} />
            </video>
          ) : poster?.url ? (
            <Image
              src={poster.url}
              alt={poster.alt || "SAIS - Abu Dhabi campus video"}
              fill
              sizes="(max-width: 767px) 92vw, 78vw"
              className="campus-video__poster"
            />
          ) : null}

          {!videoUrl ? (
            <span className="campus-video__play" aria-hidden="true">
              <Play size={48} strokeWidth={2.2} fill="currentColor" />
            </span>
          ) : null}
        </div>
      </div>
    </section>
  );
}
