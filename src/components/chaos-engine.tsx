"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    webkitAudioContext?: typeof AudioContext;
  }
}

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export default function ChaosEngine() {
  const layerRef = useRef<HTMLDivElement | null>(null);
  const crtRef = useRef<HTMLDivElement | null>(null);
  // track timers locally inside effect to satisfy lint and ensure cleanup
  const audioStarted = useRef(false);
  const audioCtx = useRef<AudioContext | null>(null);
  const gainNode = useRef<GainNode | null>(null); // entry to the FX chain (bus)
  const masterGain = useRef<GainNode | null>(null); // final master gain for mute/tweak

  useEffect(() => {
    const localTimers: number[] = [];
    const layer = document.createElement("div");
    layer.style.position = "fixed";
    layer.style.inset = "0";
    layer.style.pointerEvents = "none";
    layer.style.zIndex = "2147483645"; // Below gate, above scanlines
    document.body.appendChild(layer);
    layerRef.current = layer;

    // CRT overlay layer
    const crt = document.createElement("div");
    crt.style.position = "fixed";
    crt.style.inset = "0";
    crt.style.pointerEvents = "none";
    crt.style.zIndex = "2147483643";
    crt.style.mixBlendMode = "overlay";
    crt.style.background =
      "radial-gradient(ellipse at center, rgba(255,255,255,0.05), rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.85) 100%)," +
      "repeating-linear-gradient(to bottom, rgba(255,255,255,0.04) 0 2px, rgba(0,0,0,0) 2px 4px)";
    crt.style.animation = "crt-warp 3s ease-in-out infinite alternate";
    document.body.appendChild(crt);
    crtRef.current = crt;

    const onMove = (e: MouseEvent) => {
      for (let i = 0; i < 3; i++) {
        spawnSticker(e.clientX + rand(-6, 6), e.clientY + rand(-6, 6));
      }
    };
    const startAudio = () => {
      if (audioStarted.current) return;
      audioStarted.current = true;
      try {
        const AC = window.AudioContext || window.webkitAudioContext;
        const ctx = new AC();
        // Build a small FX chain to make things harsh
        const bus = ctx.createGain(); // pre-master bus
        const distortion = ctx.createWaveShaper();
        const compressor = ctx.createDynamicsCompressor();
        const master = ctx.createGain();

        // Louder by default – this will be intense
        master.gain.value = 0.3; // overall loudness

        // Distortion curve
        const makeDistortionCurve = (amount: number) => {
          const n_samples = 44100;
          const curve = new Float32Array(n_samples);
          const deg = Math.PI / 180;
          for (let i = 0; i < n_samples; ++i) {
            const x = (i * 2) / n_samples - 1;
            curve[i] = ((3 + amount) * x * 20 * deg) / (Math.PI + amount * Math.abs(x));
          }
          return curve;
        };
        distortion.curve = makeDistortionCurve(1200);
        distortion.oversample = "4x";

        // Slight compression to tame clipping while staying aggressive
        compressor.threshold.value = -6;
        compressor.knee.value = 2;
        compressor.ratio.value = 16;
        compressor.attack.value = 0.003;
        compressor.release.value = 0.08;

        // Chain: sources -> bus -> distortion -> compressor -> master -> destination
        bus.connect(distortion);
        distortion.connect(compressor);
        compressor.connect(master);
        master.connect(ctx.destination);

        audioCtx.current = ctx;
        gainNode.current = bus;
        masterGain.current = master;

        const beep = () => {
          if (!audioCtx.current || !gainNode.current) return;
          const osc = audioCtx.current.createOscillator();
          osc.type = Math.random() < 0.5 ? "square" : "sawtooth";
          const now = audioCtx.current.currentTime;
          const startFreq = 400 + Math.random() * 2200;
          const endFreq = 60 + Math.random() * 240;
          osc.frequency.setValueAtTime(startFreq, now);
          osc.frequency.exponentialRampToValueAtTime(endFreq, now + 0.18);
          const g = audioCtx.current.createGain();
          g.gain.setValueAtTime(0, now);
          g.gain.linearRampToValueAtTime(0.35, now + 0.01);
          g.gain.exponentialRampToValueAtTime(0.0001, now + 0.25);
          osc.connect(g);
          g.connect(gainNode.current);
          osc.start();
          osc.stop(now + 0.25);
        };
        const id = window.setInterval(beep, 1100);
        localTimers.push(id);

        const noiseBlast = () => {
          if (!audioCtx.current || !gainNode.current) return;
          const now = audioCtx.current.currentTime;
          const buffer = audioCtx.current.createBuffer(1, audioCtx.current.sampleRate * 0.3, audioCtx.current.sampleRate);
          const data = buffer.getChannelData(0);
          for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1; // white noise
          const src = audioCtx.current.createBufferSource();
          src.buffer = buffer;
          const bp = audioCtx.current.createBiquadFilter();
          bp.type = "bandpass";
          bp.frequency.value = 1200 + Math.random() * 2400;
          bp.Q.value = 0.7;
          const g = audioCtx.current.createGain();
          g.gain.setValueAtTime(0.0001, now);
          g.gain.exponentialRampToValueAtTime(0.7, now + 0.01);
          g.gain.exponentialRampToValueAtTime(0.0001, now + 0.28);
          src.connect(bp);
          bp.connect(g);
          g.connect(gainNode.current);
          src.start();
          src.stop(now + 0.3);
        };

        const screech = () => {
          if (!audioCtx.current || !gainNode.current) return;
          const now = audioCtx.current.currentTime;
          const osc = audioCtx.current.createOscillator();
          osc.type = "sawtooth";
          const g = audioCtx.current.createGain();
          osc.frequency.setValueAtTime(3000, now);
          osc.frequency.exponentialRampToValueAtTime(80, now + 0.35);
          g.gain.setValueAtTime(0.0001, now);
          g.gain.exponentialRampToValueAtTime(0.9, now + 0.03);
          g.gain.exponentialRampToValueAtTime(0.0001, now + 0.36);
          osc.connect(g);
          g.connect(gainNode.current);
          osc.start();
          osc.stop(now + 0.4);
        };

        // Random blasts layered with beeps
        const nb = window.setInterval(() => {
          if (Math.random() < 0.7) noiseBlast();
        }, 1600);
        localTimers.push(nb);

        // Make clicks extra aggressive
        window.addEventListener("click", screech);
        localTimers.push(-1); // marker so we know to remove listener on cleanup
      } catch {}
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("click", startAudio, { once: true });
    window.addEventListener("keydown", startAudio, { once: true });

    // Confetti on click
    const onClick = async (e: MouseEvent) => {
      try {
        const confetti = (await import("canvas-confetti")).default;
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight },
          colors: ["#ff0044", "#ffee00", "#00ff99", "#00ccff", "#9933ff"],
          zIndex: 2147483644,
        });
      } catch {}
    };
    window.addEventListener("click", onClick);

    // Periodic chaos pulses
    const pulse = window.setInterval(() => {
      // Screen shake
      document.body.classList.add("chaos-shake");
      window.setTimeout(() => document.body.classList.remove("chaos-shake"), 300);

      // Strobe
      document.documentElement.classList.add("chaos-strobe");
      window.setTimeout(() => document.documentElement.classList.remove("chaos-strobe"), 160);

      // Glitch random elements
      const candidates = Array.from(
        document.querySelectorAll<HTMLElement>("h1, h2, h3, h4, a, button, img, video")
      );
      for (let i = 0; i < 8; i++) {
        const el = candidates[Math.floor(Math.random() * candidates.length)];
        if (!el) continue;
        el.classList.add("chaos-glitch");
        if (el.tagName !== "IMG" && el.tagName !== "VIDEO") el.classList.add("chaos-rainbow-text");
        window.setTimeout(() => {
          el.classList.remove("chaos-glitch");
          el.classList.remove("chaos-rainbow-text");
        }, 600);
      }
      // Random invert blast
      if (Math.random() < 0.5) {
        document.documentElement.classList.add("chaos-invert");
        window.setTimeout(() => document.documentElement.classList.remove("chaos-invert"), 180);
      }
      // Spawn falling stickers
      for (let i = 0; i < 6; i++) spawnFalling();
    }, 1800);
    localTimers.push(pulse);

    // Persistent tilt vibe
    document.body.classList.add("chaos-tilt");

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("click", onClick);
      window.removeEventListener("click", startAudio);
      window.removeEventListener("keydown", startAudio);
      localTimers.forEach((t) => window.clearInterval(t));
      if (layerRef.current) document.body.removeChild(layerRef.current);
      if (crtRef.current) document.body.removeChild(crtRef.current);
      try { audioCtx.current?.close(); } catch {}
    };
  }, []);

  // Mute/unmute with 'M'
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.key || "").toLowerCase() === "m") {
        const mg = masterGain.current;
        if (!mg || !audioCtx.current) return;
        const now = audioCtx.current.currentTime;
        const current = mg.gain.value;
        const target = current > 0.001 ? 0.0001 : 0.3;
        mg.gain.cancelScheduledValues(now);
        mg.gain.setValueAtTime(current, now);
        mg.gain.exponentialRampToValueAtTime(target, now + 0.05);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function spawnSticker(x: number, y: number) {
    if (!layerRef.current) return;
    const s = document.createElement("span");
    s.textContent = Math.random() < 0.25 ? "FORTNITE" : "FN";
    s.style.position = "absolute";
    s.style.left = `${x}px`;
    s.style.top = `${y}px`;
    s.style.fontWeight = "900";
    s.style.fontSize = `${rand(10, 18)}px`;
    s.style.color = `hsl(${Math.floor(rand(0, 360))} 90% 60%)`;
    s.style.transform = `translate(-50%, -50%) rotate(${rand(-25, 25)}deg)`;
    s.style.textShadow = "0 0 6px #fff, 1px 0 0 #ff0044, -1px 0 0 #00ffee";
    s.style.opacity = "0.95";
    s.style.filter = "drop-shadow(0 0 6px rgba(255,255,255,0.8))";
    s.style.transition = "transform 600ms linear, opacity 600ms linear";
    layerRef.current.appendChild(s);
    // Drift then fade
    requestAnimationFrame(() => {
      s.style.transform += ` translate(${rand(-20, 20)}px, ${rand(-28, -8)}px)`;
      s.style.opacity = "0";
    });
    window.setTimeout(() => s.remove(), 700);
  }

  function spawnFalling() {
    if (!layerRef.current) return;
    const s = document.createElement("span");
    s.textContent = Math.random() < 0.5 ? "FORTNITE" : "FN";
    s.style.position = "absolute";
    s.style.left = `${Math.floor(rand(0, window.innerWidth))}px`;
    s.style.top = `-10vh`;
    s.style.fontWeight = "900";
    s.style.fontSize = `${rand(12, 22)}px`;
    s.style.color = `hsl(${Math.floor(rand(0, 360))} 95% 60%)`;
    s.style.textShadow = "0 0 6px #fff, 1px 0 0 #ff0044, -1px 0 0 #00ffee";
    s.style.animation = `chaos-fall ${rand(2.5, 5)}s linear 1`;
    s.style.pointerEvents = "none";
    layerRef.current.appendChild(s);
    window.setTimeout(() => s.remove(), 6000);
  }

  return null;
}
