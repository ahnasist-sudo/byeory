import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./pages/Home";
import AdminDashboard from "./admin/Dashboard";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function App() {
  const [settings, setSettings] = useState<any>({});

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => setSettings(data));
  }, []);

  return (
    <Router>
      <div 
        className="min-h-screen flex flex-col transition-colors duration-500"
        style={{ backgroundColor: settings.bg_color || "#000000", color: "#fff" }}
      >
        <Navbar siteName={settings.site_name} primaryColor={settings.primary_color} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home settings={settings} />} />
            <Route path="/admin/*" element={<AdminDashboard />} />
          </Routes>
        </main>
        <Footer settings={settings} />
      </div>
    </Router>
  );
}
