import { useEffect, useState } from "react";

import {
  Lock,
  Save,
  Settings,
  Video,
  Shield,
  Database,
  Bell,
  Car,
  User,
  Bus,
  Truck,
  FileText,
  Activity,
} from "lucide-react";

const ReadOnlyField = ({
  label,
  value,
  mono = false,
}: {
  label: string;
  value: string | number | boolean;
  mono?: boolean;
}) => (
  <div className="flex justify-between items-center py-2.5 border-b border-slate-800/50">
    <div className="flex items-center gap-2 text-sm text-slate-400">
      <Lock className="w-3 h-3 text-slate-600" />
      <span>{label}:</span>
    </div>

    <span
      className={`text-sm text-slate-200 ${
        mono ? "font-mono" : ""
      }`}
    >
      {typeof value === "boolean"
        ? value
          ? "Yes"
          : "No"
        : value}
    </span>
  </div>
);

function ConfigurationPage() {
  const [processingFps, setProcessingFps] =
    useState("15");

  const [preEventBuffer, setPreEventBuffer] =
    useState("3");

  const [postEventBuffer, setPostEventBuffer] =
    useState("3");

  const [motionAreaThreshold, setMotionAreaThreshold] =
    useState("0.02");

  const [minContourArea, setMinContourArea] =
    useState("800");

  const [confidenceThreshold, setConfidenceThreshold] =
    useState("0.10");

  const [logLevel, setLogLevel] =
    useState("INFO");

  const [
    motionDetectionEnabled,
    setMotionDetectionEnabled,
  ] = useState(true);

  const [
    objectDetectionEnabled,
    setObjectDetectionEnabled,
  ] = useState(true);

  const [
    eventRecordingEnabled,
    setEventRecordingEnabled,
  ] = useState(true);

  const [shadowDetection, setShadowDetection] =
    useState(true);

  const [logToFile, setLogToFile] =
    useState(true);

  const [targetPerson, setTargetPerson] =
    useState(true);

  const [targetCar, setTargetCar] =
    useState(true);

  const [targetBus, setTargetBus] =
    useState(true);

  const [targetTruck, setTargetTruck] =
    useState(true);

  useEffect(() => {
    document.title =
      "CCTV System | System Configuration";
  }, []);

  const handleSaveConfiguration = () => {
    alert("Configuration saved successfully!");
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="max-w-[1400px] mx-auto md:p-6 p-3">

        {/* Header */}
        <div className="mb-6 flex flex-col gap-2 md:flex-row items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Settings className="w-6 h-6 text-blue-500" />

              <h1 className="text-2xl text-slate-200">
                System Configuration
              </h1>
            </div>

            <p className="text-sm text-slate-500">
              Loaded from{" "}
              <span className="font-mono text-slate-400">
                settings.yaml
              </span>{" "}
              — modify user preferences below
            </p>
          </div>

          <button
            onClick={handleSaveConfiguration}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white flex items-center transition"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Configuration
          </button>
        </div>

        {/* Main */}
        <div className="bg-slate-900 border border-slate-800 rounded overflow-hidden">

          {/* Section 1 */}
          <details
            open
            className="border-b border-slate-800"
          >
            <summary className="px-6 py-4 cursor-pointer text-slate-200 flex items-center gap-2">
              <Video className="w-4 h-4 text-blue-400" />
              Video Input Configuration
            </summary>

            <div className="px-6 pb-4 space-y-4">
              <ReadOnlyField
                label="Source ID"
                value="full_test_video"
                mono
              />

              <ReadOnlyField
                label="Source Path"
                value="data/merged_test_video_full_video.mp4"
                mono
              />

              <div className="py-2.5 border-b border-slate-800/50">
                <div className="flex justify-between items-center">
                  <label className="text-sm text-slate-400">
                    Processing FPS:
                  </label>

                  <input
                    type="number"
                    min="5"
                    max="60"
                    value={processingFps}
                    onChange={(e) =>
                      setProcessingFps(
                        e.target.value
                      )
                    }
                    className="w-24 h-8 bg-slate-800 border border-slate-700 rounded px-2 text-slate-200 text-sm"
                  />
                </div>
              </div>

              <ReadOnlyField
                label="Stream Timeout"
                value={5}
              />
            </div>
          </details>

          {/* Section 2 */}
          <details
            open
            className="border-b border-slate-800"
          >
            <summary className="px-6 py-4 cursor-pointer text-slate-200 flex items-center gap-2">
              <Database className="w-4 h-4 text-cyan-400" />
              Event Buffering Parameters
            </summary>

            <div className="px-6 pb-4 space-y-4">

              <div className="py-2.5 border-b border-slate-800/50 flex justify-between items-center">
                <label className="text-sm text-slate-400">
                  Pre Event Buffer:
                </label>

                <input
                  type="number"
                  value={preEventBuffer}
                  onChange={(e) =>
                    setPreEventBuffer(
                      e.target.value
                    )
                  }
                  className="w-24 h-8 bg-slate-800 border border-slate-700 rounded px-2 text-slate-200 text-sm"
                />
              </div>

              <div className="py-2.5 border-b border-slate-800/50 flex justify-between items-center">
                <label className="text-sm text-slate-400">
                  Post Event Buffer:
                </label>

                <input
                  type="number"
                  value={postEventBuffer}
                  onChange={(e) =>
                    setPostEventBuffer(
                      e.target.value
                    )
                  }
                  className="w-24 h-8 bg-slate-800 border border-slate-700 rounded px-2 text-slate-200 text-sm"
                />
              </div>
            </div>
          </details>

          {/* Section 3 */}
          <details
            open
            className="border-b border-slate-800"
          >
            <summary className="px-6 py-4 cursor-pointer text-slate-200 flex items-center gap-2">
              <Shield className="w-4 h-4 text-green-400" />
              Motion Detector
            </summary>

            <div className="px-6 pb-4 space-y-4">

              <ReadOnlyField
                label="Method"
                value="MOG2"
                mono
              />

              <div className="flex justify-between items-center py-2.5 border-b border-slate-800/50">
                <label className="text-sm text-slate-400">
                  Shadow Detection
                </label>

                <input
                  type="checkbox"
                  checked={shadowDetection}
                  onChange={(e) =>
                    setShadowDetection(
                      e.target.checked
                    )
                  }
                  className="w-4 h-4"
                />
              </div>

              <div className="flex justify-between items-center py-2.5 border-b border-slate-800/50">
                <label className="text-sm text-slate-400">
                  Motion Area Threshold
                </label>

                <input
                  type="number"
                  value={motionAreaThreshold}
                  onChange={(e) =>
                    setMotionAreaThreshold(
                      e.target.value
                    )
                  }
                  className="w-24 h-8 bg-slate-800 border border-slate-700 rounded px-2 text-slate-200 text-sm"
                />
              </div>
            </div>
          </details>

          {/* Section 4 */}
          <details
            open
            className="border-b border-slate-800"
          >
            <summary className="px-6 py-4 cursor-pointer text-slate-200 flex items-center gap-2">
              <Activity className="w-4 h-4 text-yellow-400" />
              Semantic Filtering
            </summary>

            <div className="px-6 pb-4 space-y-4">

              <ReadOnlyField
                label="Trigger Method"
                value="Contour-Based"
                mono
              />

              <div className="flex justify-between items-center py-2.5 border-b border-slate-800/50">
                <label className="text-sm text-slate-400">
                  Minimum Contour Area
                </label>

                <input
                  type="number"
                  value={minContourArea}
                  onChange={(e) =>
                    setMinContourArea(
                      e.target.value
                    )
                  }
                  className="w-24 h-8 bg-slate-800 border border-slate-700 rounded px-2 text-slate-200 text-sm"
                />
              </div>
            </div>
          </details>

          {/* Section 5 */}
          <details
            open
            className="border-b border-slate-800"
          >
            <summary className="px-6 py-4 cursor-pointer text-slate-200 flex items-center gap-2">
              <Bell className="w-4 h-4 text-red-400" />
              Object Detection
            </summary>

            <div className="px-6 pb-4 space-y-4">

              <ReadOnlyField
                label="Detector Type"
                value="YOLO"
                mono
              />

              <ReadOnlyField
                label="Model Path"
                value="models/yolov8n.pt"
                mono
              />

              <div className="flex justify-between items-center py-2.5 border-b border-slate-800/50">
                <label className="text-sm text-slate-400">
                  Confidence Threshold
                </label>

                <input
                  type="number"
                  value={confidenceThreshold}
                  onChange={(e) =>
                    setConfidenceThreshold(
                      e.target.value
                    )
                  }
                  className="w-24 h-8 bg-slate-800 border border-slate-700 rounded px-2 text-slate-200 text-sm"
                />
              </div>

              {/* Target Classes */}
              <div className="space-y-3 pt-2">

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-slate-400" />
                    <label className="text-sm text-slate-400">
                      Person
                    </label>
                  </div>

                  <input
                    type="checkbox"
                    checked={targetPerson}
                    onChange={(e) =>
                      setTargetPerson(
                        e.target.checked
                      )
                    }
                    className="w-4 h-4"
                  />
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Car className="w-4 h-4 text-slate-400" />
                    <label className="text-sm text-slate-400">
                      Car
                    </label>
                  </div>

                  <input
                    type="checkbox"
                    checked={targetCar}
                    onChange={(e) =>
                      setTargetCar(
                        e.target.checked
                      )
                    }
                    className="w-4 h-4"
                  />
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Bus className="w-4 h-4 text-slate-400" />
                    <label className="text-sm text-slate-400">
                      Bus
                    </label>
                  </div>

                  <input
                    type="checkbox"
                    checked={targetBus}
                    onChange={(e) =>
                      setTargetBus(
                        e.target.checked
                      )
                    }
                    className="w-4 h-4"
                  />
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-slate-400" />
                    <label className="text-sm text-slate-400">
                      Truck
                    </label>
                  </div>

                  <input
                    type="checkbox"
                    checked={targetTruck}
                    onChange={(e) =>
                      setTargetTruck(
                        e.target.checked
                      )
                    }
                    className="w-4 h-4"
                  />
                </div>
              </div>
            </div>
          </details>

          {/* Section 6 */}
          <details
            open
            className="border-b border-slate-800"
          >
            <summary className="px-6 py-4 cursor-pointer text-slate-200 flex items-center gap-2">
              <FileText className="w-4 h-4 text-purple-400" />
              Logging & Diagnostics
            </summary>

            <div className="px-6 pb-4 space-y-4">

              <div className="flex justify-between items-center py-2.5 border-b border-slate-800/50">
                <label className="text-sm text-slate-400">
                  Log Level
                </label>

                <select
                  value={logLevel}
                  onChange={(e) =>
                    setLogLevel(e.target.value)
                  }
                  className="w-32 h-8 bg-slate-800 border border-slate-700 rounded px-2 text-slate-200 text-sm"
                >
                  <option value="DEBUG">
                    DEBUG
                  </option>

                  <option value="INFO">
                    INFO
                  </option>

                  <option value="WARNING">
                    WARNING
                  </option>

                  <option value="ERROR">
                    ERROR
                  </option>
                </select>
              </div>

              <div className="flex justify-between items-center py-2.5 border-b border-slate-800/50">
                <label className="text-sm text-slate-400">
                  Log To File
                </label>

                <input
                  type="checkbox"
                  checked={logToFile}
                  onChange={(e) =>
                    setLogToFile(
                      e.target.checked
                    )
                  }
                  className="w-4 h-4"
                />
              </div>

              <ReadOnlyField
                label="Log File Path"
                value="logs/system.log"
                mono
              />
            </div>
          </details>

          {/* Section 7 */}
          <details open>
            <summary className="px-6 py-4 cursor-pointer text-slate-200 flex items-center gap-2">
              <Settings className="w-4 h-4 text-orange-400" />
              Pipeline Control
            </summary>

            <div className="px-6 pb-4 space-y-4">

              <div className="flex justify-between items-center py-2">
                <label className="text-sm text-slate-400">
                  Motion Detection
                </label>

                <input
                  type="checkbox"
                  checked={motionDetectionEnabled}
                  onChange={(e) =>
                    setMotionDetectionEnabled(
                      e.target.checked
                    )
                  }
                  className="w-4 h-4"
                />
              </div>

              <div className="flex justify-between items-center py-2">
                <label className="text-sm text-slate-400">
                  Object Detection
                </label>

                <input
                  type="checkbox"
                  checked={objectDetectionEnabled}
                  onChange={(e) =>
                    setObjectDetectionEnabled(
                      e.target.checked
                    )
                  }
                  className="w-4 h-4"
                />
              </div>

              <div className="flex justify-between items-center py-2">
                <label className="text-sm text-slate-400">
                  Event Recording
                </label>

                <input
                  type="checkbox"
                  checked={eventRecordingEnabled}
                  onChange={(e) =>
                    setEventRecordingEnabled(
                      e.target.checked
                    )
                  }
                  className="w-4 h-4"
                />
              </div>
            </div>
          </details>
        </div>
      </div>
    </div>
  );
}

export default ConfigurationPage;