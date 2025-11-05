"use client";

import { useEffect, useState } from "react";

export default function SoundToggle() {
  const [on, setOn] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    try {
      const pref = localStorage.getItem("strion-sound") === "on";
      setOn(pref);
    } catch {}
  }, []);

  useEffect(() => {
    // Try to preload—safe even if file is missing
    const a = new Audio("/sounds/click.mp3");
    a.volume = 0.2;
    setAudio(a);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("strion-sound", on ? "on" : "off");
    } catch {}
  }, [on]);

  // helper for other buttons to call (window global)
  useEffect(() => {
    (window as any).__strionChime = () => {
      if (on && audio) audio.play().catch(() => {});
    };
  }, [on, audio]);

  return (
    <button
      onClick={() => setOn((v) => !v)}
      className={`ml-2 rounded px-3 py-1.5 text-xs border transition
        ${on ? "border-[#E8C987] text-[#E8C987]" : "border-white/20 text-white/70 hover:text-white"}
      `}
      title="Toggle subtle UI chime"
    >
      {on ? "Sound: On" : "Sound: Off"}
    </button>
  );
}
