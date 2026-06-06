import { useEffect, useState } from "react";

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
      <span className="text-slate-600">🔒</span>
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
  // Editable state variables
  const [processingFps, setProcessingFps] = useState("15");
  const [preEventBuffer, setPreEventBuffer] = useState("3");
  const [postEventBuffer, setPostEventBuffer] = useState("3");
  const [motionAreaThreshold, setMotionAreaThreshold] =
    useState("0.02");
  const [minContourArea, setMinContourArea] =
    useState("800");
  const [confidenceThreshold, setConfidenceThreshold] =
    useState("0.10");
  const [iouThreshold, setIouThreshold] =
    useState("0.45");
  const [inferenceInterval, setInferenceInterval] =
    useState("3");
  const [logLevel, setLogLevel] = useState("INFO");

  // Toggle states
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

  const [logToFile, setLogToFile] = useState(true);

  const [boundingBoxes, setBoundingBoxes] =
    useState(true);

  // Target classes
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
            <h1 className="text-2xl text-slate-200 mb-2">
              System Configuration
            </h1>

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
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white flex items-center"
          >
            <span className="mr-2">💾</span>
            Save Configuration
          </button>
        </div>

        {/* Main */}
        <div className="bg-slate-900 border border-slate-800 rounded">

          {/* Section 1 */}
          <details open className="border-b border-slate-800">
            <summary className="px-6 py-4 cursor-pointer text-slate-200">
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
                  <label
                    htmlFor="processingFps"
                    className="text-sm text-slate-400"
                  >
                    Processing FPS:
                  </label>

                  <input
                    id="processingFps"
                    type="number"
                    min="5"
                    max="60"
                    value={processingFps}
                    onChange={(e) =>
                      setProcessingFps(e.target.value)
                    }
                    className="w-24 h-8 bg-slate-800 border border-slate-700 text-slate-200 text-sm rounded px-2"
                  />
                </div>
              </div>

              <ReadOnlyField
                label="Stream Timeout (seconds)"
                value={5}
              />

              <div className="mt-4 pt-4 border-t border-slate-800">
                <div className="text-xs text-slate-500 uppercase tracking-wider mb-3">
                  Reconnect Policy
                </div>

                <ReadOnlyField
                  label="Max Retries"
                  value={5}
                />

                <ReadOnlyField
                  label="Backoff Interval (seconds)"
                  value={2}
                />
              </div>
            </div>
          </details>

          {/* Section 2 */}
          <details open className="border-b border-slate-800">
            <summary className="px-6 py-4 cursor-pointer text-slate-200">
              Event Buffering Parameters
            </summary>

            <div className="px-6 pb-4 space-y-4">
              <ReadOnlyField
                label="Expected FPS"
                value={15}
              />

              <div className="py-2.5 border-b border-slate-800/50">
                <div className="flex justify-between items-center">
                  <label className="text-sm text-slate-400">
                    Pre-Event Buffer (seconds):
                  </label>

                  <input
                    type="number"
                    min="0"
                    max="10"
                    step="0.5"
                    value={preEventBuffer}
                    onChange={(e) =>
                      setPreEventBuffer(e.target.value)
                    }
                    className="w-24 h-8 bg-slate-800 border border-slate-700 text-slate-200 text-sm rounded px-2"
                  />
                </div>
              </div>

              <div className="py-2.5 border-b border-slate-800/50">
                <div className="flex justify-between items-center">
                  <label className="text-sm text-slate-400">
                    Post-Event Buffer (seconds):
                  </label>

                  <input
                    type="number"
                    min="0"
                    max="15"
                    step="0.5"
                    value={postEventBuffer}
                    onChange={(e) =>
                      setPostEventBuffer(e.target.value)
                    }
                    className="w-24 h-8 bg-slate-800 border border-slate-700 text-slate-200 text-sm rounded px-2"
                  />
                </div>
              </div>
            </div>
          </details>

          {/* Section 3 */}
          <details open className="border-b border-slate-800">
            <summary className="px-6 py-4 cursor-pointer text-slate-200">
              Stage-1 Motion Detector
            </summary>

            <div className="px-6 pb-4 space-y-4">
              <ReadOnlyField
                label="Method"
                value="MOG2"
                mono
              />

              <ReadOnlyField
                label="Background History"
                value={500}
              />

              <ReadOnlyField
                label="Variance Threshold"
                value={16}
              />

              <div className="py-2.5 border-b border-slate-800/50 flex justify-between items-center">
                <label className="text-sm text-slate-400">
                  Shadow Detection:
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

              <div className="py-2.5 border-b border-slate-800/50 flex justify-between items-center">
                <label className="text-sm text-slate-400">
                  Motion Area Threshold:
                </label>

                <input
                  type="number"
                  value={motionAreaThreshold}
                  onChange={(e) =>
                    setMotionAreaThreshold(
                      e.target.value
                    )
                  }
                  className="w-24 h-8 bg-slate-800 border border-slate-700 text-slate-200 text-sm rounded px-2"
                />
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-slate-800">
                <span className="text-sm text-slate-400">
                  Stage Enabled:
                </span>

                <span className="bg-green-600 text-white text-xs px-2 py-1 rounded">
                  Yes
                </span>
              </div>
            </div>
          </details>

          {/* Section 4 */}
          <details open className="border-b border-slate-800">
            <summary className="px-6 py-4 cursor-pointer text-slate-200">
              Stage-2 Semantic Filtering
            </summary>

            <div className="px-6 pb-4 space-y-4">
              <ReadOnlyField
                label="Trigger Method"
                value="Contour-Based"
                mono
              />

              <div className="py-2.5 border-b border-slate-800/50 flex justify-between items-center">
                <label className="text-sm text-slate-400">
                  Minimum Contour Area:
                </label>

                <input
                  type="number"
                  value={minContourArea}
                  onChange={(e) =>
                    setMinContourArea(
                      e.target.value
                    )
                  }
                  className="w-24 h-8 bg-slate-800 border border-slate-700 text-slate-200 text-sm rounded px-2"
                />
              </div>
            </div>
          </details>

          {/* Section 5 */}
          <details open className="border-b border-slate-800">
            <summary className="px-6 py-4 cursor-pointer text-slate-200">
              Stage-3 Object Detection
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

              <div className="py-2.5 border-b border-slate-800/50 flex justify-between items-center">
                <label className="text-sm text-slate-400">
                  Confidence Threshold:
                </label>

                <input
                  type="number"
                  value={confidenceThreshold}
                  onChange={(e) =>
                    setConfidenceThreshold(
                      e.target.value
                    )
                  }
                  className="w-24 h-8 bg-slate-800 border border-slate-700 text-slate-200 text-sm rounded px-2"
                />
              </div>

              <div className="space-y-3 pt-4 border-t border-slate-800">
                <div className="flex justify-between items-center">
                  <label className="text-sm text-slate-400">
                    Person
                  </label>

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
                  <label className="text-sm text-slate-400">
                    Car
                  </label>

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
                  <label className="text-sm text-slate-400">
                    Bus
                  </label>

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
                  <label className="text-sm text-slate-400">
                    Truck
                  </label>

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
          <details open className="border-b border-slate-800">
            <summary className="px-6 py-4 cursor-pointer text-slate-200">
              Logging & Diagnostics
            </summary>

            <div className="px-6 pb-4 space-y-4">

              <div className="py-2.5 border-b border-slate-800/50 flex justify-between items-center">
                <label className="text-sm text-slate-400">
                  Log Level:
                </label>

                <select
                  value={logLevel}
                  onChange={(e) =>
                    setLogLevel(e.target.value)
                  }
                  className="w-32 h-8 bg-slate-800 border border-slate-700 text-slate-200 text-sm rounded px-2"
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

              <div className="py-2.5 border-b border-slate-800/50 flex justify-between items-center">
                <label className="text-sm text-slate-400">
                  Log to File:
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
            <summary className="px-6 py-4 cursor-pointer text-slate-200">
              Pipeline Control
            </summary>

            <div className="px-6 pb-4 space-y-4">

              <div className="flex justify-between items-center py-2">
                <label className="text-sm text-slate-400">
                  Motion Detection:
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
                  Human / Object Detection:
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
                  Event-Based Recording:
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

        {/* Footer */}
        <div className="mt-6 bg-slate-900/50 border border-slate-800 rounded p-4">
          <p className="text-xs text-slate-500 leading-relaxed">
            <strong className="text-slate-400">
              Note:
            </strong>{" "}
            Editable parameters can be modified
            above and saved to{" "}
            <span className="font-mono text-slate-400">
              settings.yaml
            </span>
            . Technical parameters marked with a
            lock icon 🔒 are read-only.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ConfigurationPage;