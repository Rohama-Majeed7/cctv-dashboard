"use client";

import { useState, useEffect } from "react";

const initialSystemLog = [
  { id: 1, time: "14:32:15", eventType: "Person Detected", stage: "Stage 2", action: "Recorded" },
  { id: 2, time: "14:28:42", eventType: "Vehicle Detected", stage: "Stage 2", action: "Recorded" },
  { id: 3, time: "14:25:18", eventType: "Motion Detected", stage: "Stage 1", action: "Ignored" },
  { id: 4, time: "14:15:03", eventType: "Person Detected", stage: "Stage 2", action: "Recorded" },
  { id: 5, time: "13:58:21", eventType: "Person Detected", stage: "Stage 2", action: "Recorded" },
];

export default function LiveMonitoringPage() {
  const [isMonitoring, setIsMonitoring] = useState(true);

  const [detectionState] = useState({
    inputSource: "Webcam",
    stage1: "Active",
    stage2: "Active",
    detectedClass: "Person",
    confidence: 94,
    recordingStatus: "Triggered",
  });

  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-US", { hour12: false })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="mx-auto max-w-[1600px] p-3 sm:p-6">

        {/* GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">

          {/* LEFT SIDE */}
          <div className="lg:col-span-2 space-y-4 lg:space-y-6">

            {/* VIDEO BOX */}
            <div className="rounded border border-slate-800 bg-slate-900">
              <div className="border-b border-slate-800 bg-slate-900/50 px-4 py-3">
                <h2 className="text-sm text-slate-200">Video Feed</h2>
              </div>

              <div className="p-3 sm:p-4">
                <div className="relative aspect-video rounded border border-slate-800 bg-black">

                  <div className="absolute inset-0 flex items-center justify-center text-xs sm:text-sm text-slate-600">
                    Live Camera Feed
                  </div>

                  {/* BOXES */}
                  {isMonitoring && (
                    <>
                      <div
                        className="absolute border-2 border-blue-500"
                        style={{ top: "25%", left: "15%", width: "20%", height: "35%" }}
                      >
                        <div className="bg-blue-500 px-1 text-[10px] text-white sm:text-xs">
                          Person
                        </div>
                      </div>

                      <div
                        className="absolute border-2 border-green-500"
                        style={{ top: "40%", right: "20%", width: "25%", height: "30%" }}
                      >
                        <div className="bg-green-500 px-1 text-[10px] text-white sm:text-xs">
                          Vehicle
                        </div>
                      </div>
                    </>
                  )}

                  {/* TIMESTAMP */}
                  <div className="absolute bottom-2 left-2 bg-black/80 px-2 py-1 text-[10px] font-mono text-white sm:text-xs">
                    2026-02-01 {currentTime}
                  </div>

                  {/* BUTTON */}
                  <button
                    onClick={() => setIsMonitoring(!isMonitoring)}
                    className={`absolute bottom-2 right-2 px-3 py-1 text-[10px] sm:text-xs ${
                      isMonitoring ? "bg-blue-600" : "bg-slate-700"
                    } text-white`}
                  >
                    {isMonitoring ? "Stop" : "Start"}
                  </button>

                </div>
              </div>
            </div>

            {/* SYSTEM LOG */}
            <div className="rounded border border-slate-800 bg-slate-900">
              <div className="border-b border-slate-800 bg-slate-900/50 px-4 py-3">
                <h2 className="text-sm text-slate-200">System Log</h2>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[600px] text-sm">
                  <thead className="border-b border-slate-800 bg-slate-800/50">
                    <tr>
                      <th className="px-4 py-2 text-left text-slate-400">Time</th>
                      <th className="px-4 py-2 text-left text-slate-400">Event</th>
                      <th className="px-4 py-2 text-left text-slate-400">Stage</th>
                      <th className="px-4 py-2 text-left text-slate-400">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {initialSystemLog.map((log) => (
                      <tr
                        key={log.id}
                        className="border-b border-slate-800/50 hover:bg-slate-800/30"
                      >
                        <td className="px-4 py-2 font-mono text-slate-300">
                          {log.time}
                        </td>
                        <td className="px-4 py-2 text-slate-200">
                          {log.eventType}
                        </td>
                        <td className="px-4 py-2 text-slate-400">
                          {log.stage}
                        </td>
                        <td className="px-4 py-2">
                          <span
                            className={
                              log.action === "Recorded"
                                ? "text-green-400"
                                : "text-slate-500"
                            }
                          >
                            {log.action}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-4 lg:space-y-6">

            {/* DETECTION STATE */}
            <div className="rounded border border-slate-800 bg-slate-900">
              <div className="border-b border-slate-800 bg-slate-900/50 px-4 py-3">
                <h2 className="text-sm text-slate-200">
                  Detection State
                </h2>
              </div>

              <div className="p-4">
                <Info label="Input" value={detectionState.inputSource} />
                <Info label="Stage 1" value={detectionState.stage1} green />
                <Info label="Stage 2" value={detectionState.stage2} green />
                <Info label="Class" value={detectionState.detectedClass} />
                <Info label="Confidence" value={`${detectionState.confidence}%`} />
                <Info label="Recording" value={detectionState.recordingStatus} red />
              </div>
            </div>

            {/* STATS */}
            <div className="rounded border border-slate-800 bg-slate-900">
              <div className="border-b border-slate-800 bg-slate-900/50 px-4 py-3">
                <h2 className="text-sm text-slate-200">Stats</h2>
              </div>

              <div className="p-4">
                <Info label="Events" value="127" />
                <Info label="Clips" value="89" />
                <Info label="Saved" value="78%" green />
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

/* ---------------- UI HELPERS ---------------- */

function Info({
  label,
  value,
  green,
  red,
}: {
  label: string;
  value: string;
  green?: boolean;
  red?: boolean;
}) {
  return (
    <div className="flex justify-between border-b border-slate-800/50 py-2 text-sm">
      <span className="text-slate-400">{label}</span>
      <span
        className={
          red
            ? "text-red-400"
            : green
            ? "text-green-400"
            : "text-slate-200"
        }
      >
        {value}
      </span>
    </div>
  );
}