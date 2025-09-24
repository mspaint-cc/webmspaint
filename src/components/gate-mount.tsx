"use client";

import { useEffect, useState, type ReactNode } from "react";
import EpilepsyGate from "@/components/epilepsy-gate";
import FortniteMarquee from "@/components/fortnite-marquee";
import ChaosEngine from "@/components/chaos-engine";

export default function GateMount({ children }: { children: ReactNode }) {
  const [accepted, setAccepted] = useState(false);

  // Bypass via query params (?chaos=1 or ?deepfry=1)
  useEffect(() => {
    try {
      const url = new URL(window.location.href);
      const bypassVals = ["1", "true", "on", "yes"];
      const bypass = bypassVals.includes((url.searchParams.get("chaos") || "").toLowerCase()) ||
        bypassVals.includes((url.searchParams.get("deepfry") || "").toLowerCase());
      if (bypass) {
        document.documentElement.classList.add("deep-fry");
        setAccepted(true);
      }
    } catch {}
  }, []);

  if (!accepted) {
    return (
      <EpilsepsyWrapper onProceed={() => {
        try { document.documentElement.classList.add("deep-fry"); } catch {}
        setAccepted(true);
      }} />
    );
  }

  return (
    <>
      {children}
      <FortniteMarquee />
      <ChaosEngine />
    </>
  );
}

function EpilsepsyWrapper({ onProceed }: { onProceed: () => void }) {
  return (
    <>
      <EpilepsyGate onProceed={onProceed} />
    </>
  );
}

