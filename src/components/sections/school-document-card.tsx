import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import type { SanityImage, SchoolPolicyDocument } from "@/types/sanity";

type SchoolDocumentCardProps = {
  document: SchoolPolicyDocument;
  index: number;
  fallbackCover: SanityImage;
  fallbackTitle: string;
};

function getDocumentViewerUrl(documentUrl: string, title: string) {
  const cleanUrl = documentUrl.split(/[?#]/)[0].toLowerCase();

  if (cleanUrl.endsWith(".pdf")) {
    return `/api/policy-viewer?url=${encodeURIComponent(documentUrl)}`;
  }

  if (/\.(doc|docx|xls|xlsx|ppt|pptx)$/.test(cleanUrl)) {
    return `/school-policies/view?url=${encodeURIComponent(documentUrl)}&title=${encodeURIComponent(title)}`;
  }

  return documentUrl;
}

/** A document cover with its title and download link (School Policies, School Reports). */
export function SchoolDocumentCard({ document, index, fallbackCover, fallbackTitle }: SchoolDocumentCardProps) {
  const cover = document.coverImage || fallbackCover;
  const title = document.title || fallbackTitle;
  const downloadLabel = document.downloadLabel || "Download PDF";
  const documentUrl = document.documentUrl || null;
  const viewerUrl = documentUrl ? getDocumentViewerUrl(documentUrl, title) : null;

  return (
    <Reveal
      as="article"
      className="school-policy-card academics-card-reveal"
      delay={100 + index * 110}
      threshold={0.1}
    >
      {documentUrl ? (
        <a
          href={viewerUrl || documentUrl || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="school-policy-card__cover"
          aria-label={`Open ${title}`}
        >
          {cover.url ? (
            <Image
              src={cover.url}
              alt={cover.alt || title}
              fill
              sizes="(max-width: 767px) 72vw, 21vw"
              className="school-policy-card__image"
            />
          ) : null}
        </a>
      ) : (
        <div className="school-policy-card__cover" aria-label={title}>
          {cover.url ? (
            <Image
              src={cover.url}
              alt={cover.alt || title}
              fill
              sizes="(max-width: 767px) 72vw, 21vw"
              className="school-policy-card__image"
            />
          ) : null}
        </div>
      )}

      <h3 className="school-policy-card__title">{title}</h3>

      {documentUrl ? (
        <a href={documentUrl} download className="school-policy-card__download">
          {downloadLabel}
        </a>
      ) : (
        <span className="school-policy-card__download school-policy-card__download--disabled">
          {downloadLabel}
        </span>
      )}
    </Reveal>
  );
}
