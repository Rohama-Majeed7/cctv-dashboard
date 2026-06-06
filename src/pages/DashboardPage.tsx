import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import { useEffect } from "react";
export default function Dashboard() {
useEffect(() => {
  document.title = "CCTV System | Live Monitoring ";
}, []);

  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}