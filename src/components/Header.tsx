"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { NAV_ITEMS, GROUP_NAME } from "./siteConfig";
import { classNames } from "./utils";
import { useMusic } from "./MusicProvider";

type HeaderProps = {
  currentPath?: string;
};

export function Header({ currentPath = "" }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [currentPath]);

  // Header controls menu and music via MusicProvider
  const { isMusicOpen, toggleMusic } = useMusic();

  return (
    <header className="sticky top-0 z-50">
      <div className="relative isolate">
        <div className="absolute inset-0 bg-[#1a1510]/85 backdrop-blur-md" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-[#f3c554]/60 via-transparent to-[#f3c554]/60" />
        <div className="relative mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:h-24 sm:px-6 lg:px-8">
          <Link href="/" className="group flex items-center gap-3">
            <span className="flex flex-col">
              <span className="font-inter text-xs uppercase tracking-[0.2em] text-white/55">
                MLN131
              </span>
              <span className="font-quicksand text-lg font-semibold text-white transition-colors group-hover:text-[#f3c554]">
                {GROUP_NAME}
              </span>
            </span>
          </Link>
          <nav className="hidden items-center gap-1 rounded-full bg-white/5 px-1 py-1 shadow-inner shadow-black/20 ring-1 ring-white/10 lg:flex">
            {NAV_ITEMS.map((item) => {
              const isActive =
                currentPath === item.href ||
                currentPath.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={classNames(
                    "font-inter inline-flex items-center rounded-full px-4 py-2 text-sm font-medium transition-all",
                    isActive
                      ? "bg-linear-to-r from-[#f3c554] to-[#e3a645] text-black shadow-lg shadow-[#f3c554]/30"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="flex items-center gap-3">
            {/* Music toggle button - mobile */}
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white outline-none transition hover:border-[#f3c554]/40 hover:text-[#f3c554]"
              onClick={() => toggleMusic()}
              aria-pressed={isMusicOpen}
              aria-label={isMusicOpen ? "Tắt nhạc" : "Bật nhạc"}
              title={isMusicOpen ? "Tắt nhạc" : "Bật nhạc"}
            >
              {isMusicOpen ? (
                // Speaker / music-on icon
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5v14l-5-4H2V9h2l5-4z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.54 8.46a5 5 0 010 7.07M19.07 5.93a9 9 0 010 12.73"
                  />
                </svg>
              ) : (
                // Music off / muted icon
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5v14l-5-4H2V9h2l5-4z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M23 9l-6 6M17 9l6 6"
                  />
                </svg>
              )}
            </button>

            {/* Mobile menu toggle */}
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white outline-none transition hover:border-[#f3c554]/40 hover:text-[#f3c554] lg:hidden"
              onClick={() => setIsMenuOpen((value) => !value)}
              aria-expanded={isMenuOpen}
              aria-label="Toggle navigation"
            >
              {isMenuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 7h16M4 12h16M4 17h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
        {isMenuOpen ? (
          <div className="border-t border-white/10 bg-[#1a1510]/95 backdrop-blur lg:hidden">
            <nav className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 sm:px-6 lg:px-8">
              {NAV_ITEMS.map((item) => {
                const isActive =
                  currentPath === item.href ||
                  currentPath.startsWith(`${item.href}/`);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={classNames(
                      "rounded-xl px-4 py-3 text-base font-semibold transition",
                      isActive
                        ? "bg-white/10 text-white"
                        : "text-white/70 hover:bg-white/5 hover:text-white"
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        ) : null}
      </div>
    </header>
  );
}
