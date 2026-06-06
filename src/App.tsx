import { Route, Routes } from "react-router"
import { BrowserRouter } from "react-router";
import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";
import LiveMonitoringPage from "./pages/LiveMonitoringPage";
import RecordingPage from "./pages/RecordingPage";
import ConfigurationPage from "./pages/ConfigurationPage";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<DashboardPage />}>
          <Route path="monitoring" element={<LiveMonitoringPage />} />
          <Route path="recordings" element={<RecordingPage />} />
          <Route path="configuration" element={<ConfigurationPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App