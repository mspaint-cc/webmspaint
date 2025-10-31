"use client";

import { useEffect, useState } from "react";

export default function EpilepsyGate({ onProceed }: { onProceed?: () => void }) {
  const [show, setShow] = useState(true);
  // Overlay covers the page and locks scroll while visible
  
  useEffect(() => {
    if (show) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [show]);

  if (!show) return null;

  return (
    <div
      className="no-fry"
      role="dialog"
      aria-modal="true"
      aria-labelledby="epilepsy-title"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 2147483647,
        background: "#000",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
      }}
    >
      <div
        style={{
          width: "min(820px, 92vw)",
          border: "3px solid #fff",
          borderRadius: 12,
          padding: 24,
          boxShadow: "0 0 24px rgba(255,255,255,0.25)",
          background:
            "linear-gradient(180deg, rgba(20,20,20,0.95), rgba(10,10,10,0.95))",
        }}
      >
        <h1 id="epilepsy-title" style={{ fontSize: 28, marginBottom: 12 }}>
          Epilepsy Warning
        </h1>
        <p style={{ opacity: 0.9, lineHeight: 1.5 }}>
          This site contains rapidly flashing colors, high-contrast animations,
          and visual effects that may trigger seizures in individuals with
          photosensitive epilepsy. Viewer discretion is advised.
        </p>
        <div style={{ height: 16 }} />
        <p style={{ opacity: 0.9, lineHeight: 1.5 }}>
          Disclaimer: This is a parody site for entertainment. It is not the
          official mspaint website. For the real site, visit
          {" "}
          <a
            href="https://mspaint.cc"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#00ffee", textDecoration: "underline" }}
          >
            mspaint.cc
          </a>
          .
        </p>
        <div style={{ height: 20 }} />
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <a
            href="https://mspaint.cc"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: "10px 14px",
              borderRadius: 8,
              border: "2px solid #fff",
              background: "#111",
              color: "#fff",
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            Leave (go to mspaint.cc)
          </a>
          <button
            type="button"
            onClick={() => {
              try { document.documentElement.classList.remove("gate-pending"); } catch {}
              try { onProceed?.(); } catch {}
              setShow(false);
            }}
            style={{
              padding: "10px 14px",
              borderRadius: 8,
              border: "2px solid #000",
              background:
                "linear-gradient(90deg, #ff0044, #ffee00, #00ff99, #00ccff, #9933ff)",
              color: "#000",
              fontWeight: 900,
              cursor: "pointer",
            }}
          >
            I understand — proceed
          </button>
        </div>
      </div>
    </div>
  );
}
