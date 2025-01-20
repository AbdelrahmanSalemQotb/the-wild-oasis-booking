import { useEffect, useState } from "react";

export function useMedia(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia(query);
    const updateMatch = (e: MediaQueryListEvent) => setMatches(e.matches);

    mediaQuery.addEventListener("change", updateMatch);

    setMatches(mediaQuery.matches);

    return () => mediaQuery.removeEventListener("change", updateMatch);
  }, [query]);

  return matches;
}
