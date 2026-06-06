import { useState } from "react";
import { Lock, CheckCircle2, XCircle, Save } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { Switch } from "../components/ui/switch";
import { Checkbox } from "../components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

const ReadOnlyField = ({ 
  label, 
  value, 
  mono = false 
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
    <span className={`text-sm text-slate-200 ${mono ? 'font-mono' : ''}`}>
      {typeof value === 'boolean' ? (value ? 'Yes' : 'No') : value}
    </span>
  </div>
);

const StatusBadge = ({ enabled }: { enabled: boolean }) => (
  <div className="flex items-center gap-2">
    {enabled ? (
      <>
        <CheckCircle2 className="w-4 h-4 text-green-400" />
        <span className="text-sm text-green-400">Enabled</span>
      </>
    ) : (
      <>
        <XCircle className="w-4 h-4 text-slate-500" />
        <span className="text-sm text-slate-500">Disabled</span>
      </>
    )}
  </div>
);
 function ConfigurationPage() {
  // Editable state variables
  const [processingFps, setProcessingFps] = useState("15");
  const [preEventBuffer, setPreEventBuffer] = useState("3");
  const [postEventBuffer, setPostEventBuffer] = useState("3");
  const [motionAreaThreshold, setMotionAreaThreshold] = useState("0.02");
  const [minContourArea, setMinContourArea] = useState("800");
  const [confidenceThreshold, setConfidenceThreshold] = useState("0.10");
  const [iouThreshold, setIouThreshold] = useState("0.45");
  const [inferenceInterval, setInferenceInterval] = useState("3");
  const [logLevel, setLogLevel] = useState("INFO");
  
  // Toggle states
  const [motionDetectionEnabled, setMotionDetectionEnabled] = useState(true);
  const [objectDetectionEnabled, setObjectDetectionEnabled] = useState(true);
  const [eventRecordingEnabled, setEventRecordingEnabled] = useState(true);
  const [shadowDetection, setShadowDetection] = useState(true);
  const [logToFile, setLogToFile] = useState(true);
  const [boundingBoxes, setBoundingBoxes] = useState(true);
  
  // Target classes
  const [targetPerson, setTargetPerson] = useState(true);
  const [targetCar, setTargetCar] = useState(true);
  const [targetBus, setTargetBus] = useState(true);
  const [targetTruck, setTargetTruck] = useState(true);

  const handleSaveConfiguration = () => {
    // In a real application, this would save to settings.yaml
    alert("Configuration saved successfully!");
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="max-w-[1400px] mx-auto md:p-6 p-3">
        {/* Page Header */}
        <div className="mb-6 flex flex-col gap-2 md:flex-row items-start justify-between">
          <div>
            <h1 className="text-2xl text-slate-200 mb-2">System Configuration</h1>
            <p className="text-sm text-slate-500">
              Loaded from <span className="font-mono text-slate-400">settings.yaml</span> — modify user preferences below
            </p>
          </div>
          <Button 
            onClick={handleSaveConfiguration}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Configuration
          </Button>
        </div>

        {/* Configuration Sections */}
        <div className="bg-slate-900 border border-slate-800 rounded p-0">
          <Accordion type="multiple" defaultValue={["section1", "section2", "section3", "section4", "section5", "section6", "section7"]} className="w-full">
            
            {/* Section 1: Video Source & RTSP Settings */}
            <AccordionItem value="section1" className="border-b border-slate-800">
              <AccordionTrigger className="px-6 py-4 hover:bg-slate-800/30">
                <span className="text-sm text-slate-200">Video Input Configuration</span>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4">
                <div className="space-y-4">
                  <ReadOnlyField label="Source ID" value="full_test_video" mono />
                  <ReadOnlyField label="Source Path" value="data/merged_test_video_full_video.mp4" mono />
                  
                  {/* Editable: Processing FPS */}
                  <div className="py-2.5 border-b border-slate-800/50">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="processingFps" className="text-sm text-slate-400">
                        Processing FPS:
                      </Label>
                      <Input
                        id="processingFps"
                        type="number"
                        min="5"
                        max="60"
                        value={processingFps}
                        onChange={(e) => setProcessingFps(e.target.value)}
                        className="w-24 h-8 bg-slate-800 border-slate-700 text-slate-200 text-sm"
                      />
                    </div>
                  </div>
                  
                  <ReadOnlyField label="Stream Timeout (seconds)" value={5} />
                  
                  {/* Reconnect Policy Sub-section */}
                  <div className="mt-4 pt-4 border-t border-slate-800">
                    <div className="text-xs text-slate-500 uppercase tracking-wider mb-3">Reconnect Policy</div>
                    <ReadOnlyField label="Max Retries" value={5} />
                    <ReadOnlyField label="Backoff Interval (seconds)" value={2} />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Section 2: Buffering Configuration */}
            <AccordionItem value="section2" className="border-b border-slate-800">
              <AccordionTrigger className="px-6 py-4 hover:bg-slate-800/30">
                <span className="text-sm text-slate-200">Event Buffering Parameters</span>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4">
                <div className="space-y-4">
                  <ReadOnlyField label="Expected FPS" value={15} />
                  
                  {/* Editable: Pre-Event Buffer */}
                  <div className="py-2.5 border-b border-slate-800/50">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="preEventBuffer" className="text-sm text-slate-400">
                        Pre-Event Buffer (seconds):
                      </Label>
                      <Input
                        id="preEventBuffer"
                        type="number"
                        min="0"
                        max="10"
                        step="0.5"
                        value={preEventBuffer}
                        onChange={(e) => setPreEventBuffer(e.target.value)}
                        className="w-24 h-8 bg-slate-800 border-slate-700 text-slate-200 text-sm"
                      />
                    </div>
                  </div>

                  {/* Editable: Post-Event Buffer */}
                  <div className="py-2.5 border-b border-slate-800/50">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="postEventBuffer" className="text-sm text-slate-400">
                        Post-Event Buffer (seconds):
                      </Label>
                      <Input
                        id="postEventBuffer"
                        type="number"
                        min="0"
                        max="15"
                        step="0.5"
                        value={postEventBuffer}
                        onChange={(e) => setPostEventBuffer(e.target.value)}
                        className="w-24 h-8 bg-slate-800 border-slate-700 text-slate-200 text-sm"
                      />
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-slate-800">
                    <p className="text-xs text-slate-500 italic">
                      Buffers define how many frames are saved before and after a detection event.
                    </p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Section 3: Stage-1 Motion Detection */}
            <AccordionItem value="section3" className="border-b border-slate-800">
              <AccordionTrigger className="px-6 py-4 hover:bg-slate-800/30">
                <span className="text-sm text-slate-200">Stage-1 Motion Detector</span>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4">
                <div className="space-y-4">
                  <ReadOnlyField label="Method" value="MOG2" mono />
                  <ReadOnlyField label="Background History" value={500} />
                  <ReadOnlyField label="Variance Threshold" value={16} />
                  
                  {/* Editable: Shadow Detection */}
                  <div className="py-2.5 border-b border-slate-800/50">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="shadowDetection" className="text-sm text-slate-400">
                        Shadow Detection:
                      </Label>
                      <Switch
                        id="shadowDetection"
                        checked={shadowDetection}
                        onCheckedChange={setShadowDetection}
                      />
                    </div>
                  </div>

                  {/* Editable: Motion Area Threshold */}
                  <div className="py-2.5 border-b border-slate-800/50">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="motionAreaThreshold" className="text-sm text-slate-400">
                        Motion Area Threshold:
                      </Label>
                      <Input
                        id="motionAreaThreshold"
                        type="number"
                        min="0.001"
                        max="0.5"
                        step="0.001"
                        value={motionAreaThreshold}
                        onChange={(e) => setMotionAreaThreshold(e.target.value)}
                        className="w-24 h-8 bg-slate-800 border-slate-700 text-slate-200 text-sm"
                      />
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-slate-800 flex justify-between items-center">
                    <span className="text-sm text-slate-400">Stage Enabled:</span>
                    <Badge className="bg-green-600 hover:bg-green-600">Yes</Badge>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Section 4: Stage-2 Semantic Trigger */}
            <AccordionItem value="section4" className="border-b border-slate-800">
              <AccordionTrigger className="px-6 py-4 hover:bg-slate-800/30">
                <span className="text-sm text-slate-200">Stage-2 Semantic Filtering</span>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4">
                <div className="space-y-4">
                  {/* Method Selection */}
                  <div className="mb-4">
                    <div className="text-xs text-slate-500 uppercase tracking-wider mb-3">Method Selection</div>
                    <ReadOnlyField label="Trigger Method" value="Contour-Based" mono />
                  </div>

                  {/* Contour Filtering Parameters */}
                  <div className="mb-4 pt-4 border-t border-slate-800">
                    <div className="text-xs text-slate-500 uppercase tracking-wider mb-3">Contour Filtering Parameters</div>
                    
                    {/* Editable: Minimum Contour Area */}
                    <div className="py-2.5 border-b border-slate-800/50">
                      <div className="flex justify-between items-center">
                        <Label htmlFor="minContourArea" className="text-sm text-slate-400">
                          Minimum Contour Area (pixels):
                        </Label>
                        <Input
                          id="minContourArea"
                          type="number"
                          min="100"
                          max="5000"
                          step="50"
                          value={minContourArea}
                          onChange={(e) => setMinContourArea(e.target.value)}
                          className="w-24 h-8 bg-slate-800 border-slate-700 text-slate-200 text-sm"
                        />
                      </div>
                    </div>
                    
                    <ReadOnlyField label="Aspect Ratio Range" value="0.3 – 4.0" />
                  </div>

                  {/* Optional Robustness Filters */}
                  <div className="mb-4 pt-4 border-t border-slate-800">
                    <div className="text-xs text-slate-500 uppercase tracking-wider mb-3">Optional Robustness Filters</div>
                    <ReadOnlyField label="Solidity Filter Enabled" value="No" />
                    <ReadOnlyField label="Minimum Solidity" value={0.4} />
                  </div>

                  {/* Temporal Consistency */}
                  <div className="mb-4 pt-4 border-t border-slate-800">
                    <div className="text-xs text-slate-500 uppercase tracking-wider mb-3">Temporal Consistency</div>
                    <ReadOnlyField label="Temporal Filter Enabled" value="No" />
                    <ReadOnlyField label="Minimum Consecutive Frames" value={3} />
                  </div>

                  {/* Debug Options */}
                  <div className="pt-4 border-t border-slate-800">
                    <div className="text-xs text-slate-500 uppercase tracking-wider mb-3">Debug Options</div>
                    <ReadOnlyField label="Save ROI Crops" value="Disabled" />
                    <ReadOnlyField label="Log Metadata" value="Enabled" />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Section 5: Stage-3 Object Detection */}
            <AccordionItem value="section5" className="border-b border-slate-800">
              <AccordionTrigger className="px-6 py-4 hover:bg-slate-800/30">
                <span className="text-sm text-slate-200">Stage-3 Object Detection</span>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4">
                <div className="space-y-4">
                  <ReadOnlyField label="Detector Type" value="YOLO" mono />
                  <ReadOnlyField label="Model Path" value="models/yolov8n.pt" mono />
                  <ReadOnlyField label="Inference Mode" value="ROI" mono />
                  
                  {/* Editable: Inference Interval */}
                  <div className="py-2.5 border-b border-slate-800/50">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="inferenceInterval" className="text-sm text-slate-400">
                        Inference Interval (frames):
                      </Label>
                      <Input
                        id="inferenceInterval"
                        type="number"
                        min="1"
                        max="10"
                        value={inferenceInterval}
                        onChange={(e) => setInferenceInterval(e.target.value)}
                        className="w-24 h-8 bg-slate-800 border-slate-700 text-slate-200 text-sm"
                      />
                    </div>
                  </div>

                  {/* Image & ROI Handling */}
                  <div className="mt-4 pt-4 border-t border-slate-800">
                    <div className="text-xs text-slate-500 uppercase tracking-wider mb-3">Image & ROI Handling</div>
                    <ReadOnlyField label="Input Size" value={640} />
                    <ReadOnlyField label="ROI Padding" value={0.0} />
                  </div>

                  {/* Detection Thresholds */}
                  <div className="mt-4 pt-4 border-t border-slate-800">
                    <div className="text-xs text-slate-500 uppercase tracking-wider mb-3">Detection Thresholds</div>
                    
                    {/* Editable: Confidence Threshold */}
                    <div className="py-2.5 border-b border-slate-800/50">
                      <div className="flex justify-between items-center">
                        <Label htmlFor="confidenceThreshold" className="text-sm text-slate-400">
                          Confidence Threshold:
                        </Label>
                        <Input
                          id="confidenceThreshold"
                          type="number"
                          min="0.05"
                          max="0.95"
                          step="0.05"
                          value={confidenceThreshold}
                          onChange={(e) => setConfidenceThreshold(e.target.value)}
                          className="w-24 h-8 bg-slate-800 border-slate-700 text-slate-200 text-sm"
                        />
                      </div>
                    </div>

                    {/* Editable: IoU Threshold */}
                    <div className="py-2.5 border-b border-slate-800/50">
                      <div className="flex justify-between items-center">
                        <Label htmlFor="iouThreshold" className="text-sm text-slate-400">
                          IoU Threshold:
                        </Label>
                        <Input
                          id="iouThreshold"
                          type="number"
                          min="0.1"
                          max="0.9"
                          step="0.05"
                          value={iouThreshold}
                          onChange={(e) => setIouThreshold(e.target.value)}
                          className="w-24 h-8 bg-slate-800 border-slate-700 text-slate-200 text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Target Classes */}
                  <div className="mt-4 pt-4 border-t border-slate-800">
                    <div className="text-xs text-slate-500 uppercase tracking-wider mb-3">Target Classes</div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between py-2">
                        <Label htmlFor="targetPerson" className="text-sm text-slate-400 cursor-pointer">
                          Person
                        </Label>
                        <Checkbox
                          id="targetPerson"
                          checked={targetPerson}
                          onCheckedChange={(checked:any) => setTargetPerson(checked as boolean)}
                        />
                      </div>
                      <div className="flex items-center justify-between py-2">
                        <Label htmlFor="targetCar" className="text-sm text-slate-400 cursor-pointer">
                          Car
                        </Label>
                        <Checkbox
                          id="targetCar"
                          checked={targetCar}
                          onCheckedChange={(checked:any) => setTargetCar(checked as boolean)}
                        />
                      </div>
                      <div className="flex items-center justify-between py-2">
                        <Label htmlFor="targetBus" className="text-sm text-slate-400 cursor-pointer">
                          Bus
                        </Label>
                        <Checkbox
                          id="targetBus"
                          checked={targetBus}
                          onCheckedChange={(checked:any) => setTargetBus(checked as boolean)}
                        />
                      </div>
                      <div className="flex items-center justify-between py-2">
                        <Label htmlFor="targetTruck" className="text-sm text-slate-400 cursor-pointer">
                          Truck
                        </Label>
                        <Checkbox
                          id="targetTruck"
                          checked={targetTruck}
                          onCheckedChange={(checked:any) => setTargetTruck(checked as boolean)}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Visualization */}
                  <div className="mt-4 pt-4 border-t border-slate-800">
                    <div className="text-xs text-slate-500 uppercase tracking-wider mb-3">Visualization</div>
                    
                    {/* Editable: Bounding Boxes */}
                    <div className="py-2.5 border-b border-slate-800/50">
                      <div className="flex justify-between items-center">
                        <Label htmlFor="boundingBoxes" className="text-sm text-slate-400">
                          Bounding Boxes:
                        </Label>
                        <Switch
                          id="boundingBoxes"
                          checked={boundingBoxes}
                          onCheckedChange={setBoundingBoxes}
                        />
                      </div>
                    </div>
                    
                    <ReadOnlyField label="ROI Crop Preview" value="Disabled" />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Section 6: Logging Configuration */}
            <AccordionItem value="section6" className="border-b border-slate-800">
              <AccordionTrigger className="px-6 py-4 hover:bg-slate-800/30">
                <span className="text-sm text-slate-200">Logging & Diagnostics</span>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4">
                <div className="space-y-4">
                  {/* Editable: Log Level */}
                  <div className="py-2.5 border-b border-slate-800/50">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="logLevel" className="text-sm text-slate-400">
                        Log Level:
                      </Label>
                      <Select value={logLevel} onValueChange={setLogLevel}>
                        <SelectTrigger className="w-32 h-8 bg-slate-800 border-slate-700 text-slate-200 text-sm">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-slate-700">
                          <SelectItem value="DEBUG">DEBUG</SelectItem>
                          <SelectItem value="INFO">INFO</SelectItem>
                          <SelectItem value="WARNING">WARNING</SelectItem>
                          <SelectItem value="ERROR">ERROR</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Editable: Log to File */}
                  <div className="py-2.5 border-b border-slate-800/50">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="logToFile" className="text-sm text-slate-400">
                        Log to File:
                      </Label>
                      <Switch
                        id="logToFile"
                        checked={logToFile}
                        onCheckedChange={setLogToFile}
                      />
                    </div>
                  </div>
                  
                  <ReadOnlyField label="Log File Path" value="logs/system.log" mono />
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Section 7: Pipeline Control Flags */}
            <AccordionItem value="section7">
              <AccordionTrigger className="px-6 py-4 hover:bg-slate-800/30">
                <span className="text-sm text-slate-200">Pipeline Control</span>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4">
                <div className="space-y-4">
                  {/* Editable: Motion Detection */}
                  <div className="flex justify-between items-center py-2">
                    <Label htmlFor="motionDetection" className="text-sm text-slate-400">
                      Motion Detection:
                    </Label>
                    <Switch
                      id="motionDetection"
                      checked={motionDetectionEnabled}
                      onCheckedChange={setMotionDetectionEnabled}
                    />
                  </div>

                  {/* Editable: Object Detection */}
                  <div className="flex justify-between items-center py-2">
                    <Label htmlFor="objectDetection" className="text-sm text-slate-400">
                      Human / Object Detection:
                    </Label>
                    <Switch
                      id="objectDetection"
                      checked={objectDetectionEnabled}
                      onCheckedChange={setObjectDetectionEnabled}
                    />
                  </div>

                  {/* Editable: Event Recording */}
                  <div className="flex justify-between items-center py-2">
                    <Label htmlFor="eventRecording" className="text-sm text-slate-400">
                      Event-Based Recording:
                    </Label>
                    <Switch
                      id="eventRecording"
                      checked={eventRecordingEnabled}
                      onCheckedChange={setEventRecordingEnabled}
                    />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

          </Accordion>
        </div>

        {/* Footer Note */}
        <div className="mt-6 bg-slate-900/50 border border-slate-800 rounded p-4">
          <p className="text-xs text-slate-500 leading-relaxed">
            <strong className="text-slate-400">Note:</strong> Editable parameters can be modified above and saved to <span className="font-mono text-slate-400">settings.yaml</span>. 
            Technical parameters marked with a lock icon <Lock className="w-3 h-3 inline text-slate-600" /> are read-only and require direct file modification.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ConfigurationPage
