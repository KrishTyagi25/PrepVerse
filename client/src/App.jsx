import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";

import LandingPage from "./pages/Landing/LandingPage";
import LoginPage from "./pages/Auth/LoginPage";
import SignupPage from "./pages/Auth/SignupPage";
import OnboardingPage from "./pages/Onboarding/index";
import DashboardPage from "./pages/Dashboard";
import PracticePage from "./pages/Practice";
import SolvePage from "./pages/Practice/Solve";
import DailyPage from "./pages/Daily";
import InterviewPage from "./pages/Interview";
import LeaderboardPage from "./pages/Leaderboard";
import ProfilePage from "./pages/Profile";
import RecruiterPage from "./pages/Recruiter";
import SettingsPage from "./pages/Settings";
import FeedPage from "./pages/Feed";
import MessagesPage from "./pages/Messages";
import PeopleSearchPage from "./pages/Feed/PeopleSearch";
import NotificationsPage from "./pages/Notifications";
import ResumePage from "./pages/Resume";
import RoadmapPage from "./pages/Roadmap";
import SearchPage from "./pages/Search";
import NotFoundPage from "./pages/NotFound";

const Protect = ({ children }) => <ProtectedRoute>{children}</ProtectedRoute>;

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Protected */}
        <Route path="/onboarding" element={<Protect><OnboardingPage /></Protect>} />
        <Route path="/dashboard" element={<Protect><DashboardPage /></Protect>} />
        <Route path="/practice" element={<Protect><PracticePage /></Protect>} />
        <Route path="/practice/:id" element={<Protect><SolvePage /></Protect>} />
        <Route path="/daily" element={<Protect><DailyPage /></Protect>} />
        <Route path="/interview" element={<Protect><InterviewPage /></Protect>} />
        <Route path="/leaderboard" element={<Protect><LeaderboardPage /></Protect>} />
        <Route path="/profile/:username" element={<Protect><ProfilePage /></Protect>} />
        <Route path="/recruiter" element={<Protect><RecruiterPage /></Protect>} />
        <Route path="/settings" element={<Protect><SettingsPage /></Protect>} />
        <Route path="/feed" element={<Protect><FeedPage /></Protect>} />
        <Route path="/messages" element={<Protect><MessagesPage /></Protect>} />
        <Route path="/people" element={<Protect><PeopleSearchPage /></Protect>} />
        <Route path="/notifications" element={<Protect><NotificationsPage /></Protect>} />
        <Route path="/resume" element={<Protect><ResumePage /></Protect>} />
        <Route path="/roadmap" element={<Protect><RoadmapPage /></Protect>} />
        <Route path="/search" element={<Protect><SearchPage /></Protect>} />

        {/* Catch all */}
        <Route path="*" element={<NotFoundPage />} />

      </Routes>
    </BrowserRouter>
  );
}