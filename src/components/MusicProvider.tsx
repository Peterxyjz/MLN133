"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

type MusicContextType = {
  isMusicOpen: boolean;
  toggleMusic: () => void;
};

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export function useMusic() {
  const ctx = useContext(MusicContext);
  if (!ctx) throw new Error("useMusic must be used within MusicProvider");
  return ctx;
}

export function MusicProvider({ children }: { children: React.ReactNode }) {
  const [isMusicOpen, setIsMusicOpen] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // initialize from localStorage (client only)
  useEffect(() => {
    try {
      const saved = localStorage.getItem("mln133-music-open");
      if (saved === "true") setIsMusicOpen(true);
    } catch (e) {
      // ignore
    }
  }, []);

  // persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("mln133-music-open", isMusicOpen ? "true" : "false");
    } catch (e) {
      // ignore
    }
  }, [isMusicOpen]);

  // play/pause audio when state changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isMusicOpen) {
      const p = audio.play();
      if (p && typeof (p as Promise<void>).then === "function") {
        (p as Promise<void>).catch(() => {
          // autoplay blocked; user must interact
        });
      }
    } else {
      try {
        audio.pause();
        audio.currentTime = 0;
      } catch (e) {
        /* ignore */
      }
    }

    return () => {
      try {
        audio?.pause();
      } catch (e) {
        /* ignore */
      }
    };
  }, [isMusicOpen]);

  const toggleMusic = () => setIsMusicOpen((v) => !v);

  return (
    <MusicContext.Provider value={{ isMusicOpen, toggleMusic }}>
      {children}
      {/* audio element mounted once at top-level so it survives navigation */}
      <div style={{ display: "none" }} aria-hidden>
        <audio
          ref={audioRef}
          src="/assets/music/Vững%20Bước%20Tương%20Lai.mp3"
          loop
          preload="auto"
        />
      </div>
    </MusicContext.Provider>
  );
}

export default MusicProvider;
