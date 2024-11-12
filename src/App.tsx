import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import MainLayout from "./MainLayout";
import ScrollToTop from "./ScrollToTop";
import Settings from "./Settings";
import TopPage from "./TopPage";

function App() {
  return (
    <Router>
      <ScrollToTop /> {/* ページ遷移時にスクロールをリセット */}
      <Routes>
        <Route path="/" element={<TopPage />} />
        <Route path="/calculate" element={<MainLayout />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  );
}

export default App;
