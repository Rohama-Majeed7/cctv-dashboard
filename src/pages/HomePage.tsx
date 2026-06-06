"use client";

import { Video } from "lucide-react";
import { Link } from "react-router";

function HomePage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-900 px-4 sm:px-6">

      {/* Grid Background */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, white 1px, transparent 1px),
              linear-gradient(to bottom, white 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 opacity-90" />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-lg text-center">

        {/* Logo */}
        <div className="mb-6 flex justify-center sm:mb-8">
          <div className="relative">

            <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-blue-500/30 sm:h-24 sm:w-24">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-blue-500/50 bg-blue-500/10 sm:h-20 sm:w-20">
                <Video className="h-8 w-8 text-blue-400 sm:h-10 sm:w-10 stroke-[1.5]" />
              </div>
            </div>

            {/* Corners */}
            <div className="absolute -left-1 -top-1 h-4 w-4 border-l-2 border-t-2 border-blue-400" />
            <div className="absolute -right-1 -top-1 h-4 w-4 border-r-2 border-t-2 border-blue-400" />
            <div className="absolute -bottom-1 -left-1 h-4 w-4 border-b-2 border-l-2 border-blue-400" />
            <div className="absolute -bottom-1 -right-1 h-4 w-4 border-b-2 border-r-2 border-blue-400" />
          </div>
        </div>

        {/* Title */}
        <h1 className="mb-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl md:text-4xl">
          Intelligent CCTV Video
          <br />
          Monitoring System
        </h1>

        {/* Subtitle */}
        <p className="mb-6 text-xs text-slate-400 tracking-wide sm:text-sm sm:mb-8">
          AI-Based Smart Surveillance & Event Detection
        </p>

        {/* Divider */}
        <div className="mb-6 flex items-center justify-center sm:mb-8">
          <div className="h-px w-12 bg-gradient-to-r from-transparent via-slate-600 to-transparent sm:w-16" />
        </div>

        {/* Status */}
        <div className="mb-6 flex items-center justify-center gap-2 sm:mb-8">
          <span className="text-[10px] uppercase tracking-wider text-slate-500 sm:text-xs">
            System Status:
          </span>

          <div className="flex items-center gap-1.5">
            <div className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
            <span className="text-[10px] text-green-400 sm:text-xs">
              Ready
            </span>
          </div>
        </div>

        {/* Button */}
        <Link
          to="/dashboard/monitoring"
          className="inline-flex w-full items-center justify-center rounded bg-blue-600 px-6 py-4 text-sm text-white shadow-lg shadow-blue-900/30 transition hover:bg-blue-700 sm:w-auto sm:px-8 sm:py-6 sm:text-base"
        >
          Start Monitoring
        </Link>

        {/* Loading dots */}
        <div className="mt-10 flex justify-center sm:mt-12">
          <div className="flex gap-1">
            <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-slate-600" />
            <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-slate-600" style={{ animationDelay: "150ms" }} />
            <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-slate-600" style={{ animationDelay: "300ms" }} />
          </div>
        </div>

      </div>

      {/* Corner frames (hidden on small screens for cleaner UI) */}
      <div className="absolute left-8 top-8 hidden h-20 w-20 border-l-2 border-t-2 border-slate-700/50 sm:block" />
      <div className="absolute right-8 top-8 hidden h-20 w-20 border-r-2 border-t-2 border-slate-700/50 sm:block" />
      <div className="absolute bottom-8 left-8 hidden h-20 w-20 border-b-2 border-l-2 border-slate-700/50 sm:block" />
      <div className="absolute bottom-8 right-8 hidden h-20 w-20 border-b-2 border-r-2 border-slate-700/50 sm:block" />

    </div>
  );
}

export default HomePage;