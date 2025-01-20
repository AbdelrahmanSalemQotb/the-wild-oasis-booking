"use client";
import { useState } from "react";
import { useMedia } from "../_hooks/useMedia";

function TextExpander({
  text,
  displayedLength = 40,
}: {
  text: string;
  displayedLength?: number;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isMobile = useMedia("(max-width: 640px)");

  if (!text || isNaN(Number(displayedLength))) return null;

  if (text.length < displayedLength) return <span>{text}</span>;

  const displayText = isExpanded
    ? text
    : text
        .split(" ")
        .slice(0, isMobile ? Math.round(displayedLength / 2) : displayedLength)
        .join(" ") + "...";

  return (
    <span>
      {displayText}{" "}
      <button
        className="border-b border-primary-700 pb-1 leading-3 text-primary-700"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? "Show less" : "Show more"}
      </button>
    </span>
  );
}

export default TextExpander;
