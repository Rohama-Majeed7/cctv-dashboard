"use client";

import { useEffect, useState } from "react";

const mockRecordings = [
  { id: "EVT-001", timestamp: "2026-02-01 14:32:15", object: "Person", confidence: 94, duration: "12s" },
  { id: "EVT-002", timestamp: "2026-02-01 14:28:42", object: "Vehicle", confidence: 89, duration: "8s" },
  { id: "EVT-003", timestamp: "2026-02-01 14:15:03", object: "Person", confidence: 96, duration: "15s" },
  { id: "EVT-004", timestamp: "2026-02-01 13:58:21", object: "Person", confidence: 91, duration: "10s" },
  { id: "EVT-005", timestamp: "2026-02-01 13:42:08", object: "Vehicle", confidence: 88, duration: "11s" },
  { id: "EVT-006", timestamp: "2026-02-01 12:15:30", object: "Person", confidence: 93, duration: "14s" },
  { id: "EVT-007", timestamp: "2026-02-01 11:48:12", object: "Vehicle", confidence: 87, duration: "9s" },
  { id: "EVT-008", timestamp: "2026-02-01 11:22:45", object: "Person", confidence: 95, duration: "13s" },
];

type TabType = "events" | "storage";

export default function RecordingPage() {
  const [activeTab, setActiveTab] = useState<TabType>("events");
useEffect(() => {
  document.title = "CCTV System | Recorded Events ";
}, []);
  return (
    <div className="min-h-screen bg-slate-950">
      <div className="mx-auto max-w-[1600px] px-3 py-4 sm:p-6">

        {/* TABS */}
        <div className="mb-4 flex gap-2 overflow-x-auto border-b border-slate-800 sm:mb-6">
          <TabButton
            active={activeTab === "events"}
            onClick={() => setActiveTab("events")}
            label="Recorded Events"
          />
          <TabButton
            active={activeTab === "storage"}
            onClick={() => setActiveTab("storage")}
            label="Storage Overview"
          />
        </div>

        {/* EVENTS */}
        {activeTab === "events" && (
          <div className="rounded border border-slate-800 bg-slate-900">

            <div className="border-b border-slate-800 bg-slate-900/50 px-3 py-3 sm:px-4">
              <h2 className="text-sm text-slate-200">
                Recorded Events
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px] text-sm">
                <thead className="border-b border-slate-800 bg-slate-800/50">
                  <tr>
                    <th className="px-3 py-2 text-left text-slate-400">ID</th>
                    <th className="px-3 py-2 text-left text-slate-400">Time</th>
                    <th className="px-3 py-2 text-left text-slate-400">Object</th>
                    <th className="px-3 py-2 text-left text-slate-400">Conf</th>
                    <th className="px-3 py-2 text-left text-slate-400">Duration</th>
                    <th className="px-3 py-2 text-left text-slate-400">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {mockRecordings.map((r) => (
                    <tr
                      key={r.id}
                      className="border-b border-slate-800/50 hover:bg-slate-800/30"
                    >
                      <td className="px-3 py-2 font-mono text-slate-300">
                        {r.id}
                      </td>
                      <td className="px-3 py-2 font-mono text-slate-300">
                        {r.timestamp}
                      </td>
                      <td className="px-3 py-2 text-slate-200">
                        {r.object}
                      </td>
                      <td className="px-3 py-2 text-slate-200">
                        {r.confidence}%
                      </td>
                      <td className="px-3 py-2 text-slate-200">
                        {r.duration}
                      </td>
                      <td className="px-3 py-2">
                        <button className="text-xs text-blue-400 hover:text-blue-300">
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        )}

        {/* STORAGE */}
        {activeTab === "storage" && (
          <div className="rounded border border-slate-800 bg-slate-900">

            <div className="border-b border-slate-800 bg-slate-900/50 px-3 py-3 sm:px-4">
              <h2 className="text-sm text-slate-200">
                Storage Overview
              </h2>
            </div>

            <div className="p-3 sm:p-6">

              <div className="space-y-6">

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <tbody>
                      <StorageRow label="Total Storage" value="50 GB" />
                      <StorageRow label="Used Storage" value="2.4 GB (4.8%)" />
                      <StorageRow label="Available" value="47.6 GB" />
                      <StorageRow label="Recorded Clips" value="360" />
                      <StorageRow label="Avg Clip Size" value="6.8 MB" />
                      <StorageRow label="Storage Saved" value="78%" green />
                    </tbody>
                  </table>
                </div>

                {/* INFO BOX */}
                <div className="rounded border border-slate-700 bg-slate-800/40 p-4">
                  <h3 className="mb-2 text-sm text-slate-200">
                    AI Event-Based Recording
                  </h3>
                  <p className="text-xs leading-relaxed text-slate-400">
                    System records only meaningful motion and object detection events,
                    significantly reducing storage usage compared to continuous recording.
                  </p>
                </div>

              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}

/* ---------------- TAB BUTTON ---------------- */

function TabButton({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`whitespace-nowrap border-b-2 px-3 py-2 text-sm transition-all sm:px-4 ${
        active
          ? "border-blue-500 text-blue-400"
          : "border-transparent text-slate-400 hover:text-slate-200"
      }`}
    >
      {label}
    </button>
  );
}

/* ---------------- STORAGE ROW ---------------- */

function StorageRow({
  label,
  value,
  green,
}: {
  label: string;
  value: string;
  green?: boolean;
}) {
  return (
    <tr className="border-b border-slate-800/50">
      <td className="py-2 text-slate-400 sm:py-3">{label}</td>
      <td
        className={`py-2 text-right sm:py-3 ${
          green ? "text-green-400" : "text-slate-200"
        }`}
      >
        {value}
      </td>
    </tr>
  );
}