import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home.jsx";
import StudentRegister from "../src/components/StudentRegister.jsx";
import { ChooseUser } from "./components/ChooseUser.jsx";
import StudentSignin from "./components/StudentSignin.jsx";
import AdminSignin from "./components/AdminSignin.jsx";
import ParentSignin from "./components/ParentSignin.jsx";
import TeacherSignin from "./components/TeacherSignin.jsx";
import AdminDashboard from "./pages/Admin/dashboard.jsx";
import StudentDashboard from "./pages/Students/Dashboard.jsx";
import Assignments from "./pages/Students/Assignment.jsx";
import Performance from "./pages/Students/Performance.jsx";
import Attendance from "./pages/Students/Attendance.jsx";
import Announcements from "./pages/Students/Announcements.jsx";
import Settings from "./pages/Students/Settings.jsx";
import Classes from "./pages/Admin/Classes.jsx";
import Teachers from "./pages/Admin/Teachers.jsx";
import Students from "./pages/Admin/Students.jsx";
import TeacherDashboard from "./pages/Teachers/Dashboard.jsx";
import PostAssignment from "./pages/Teachers/Assignments.jsx";
import ManageClassStudents from "./pages/Teachers/Students.jsx";
import ParentDashboard from "./pages/Parent/ParentHome.jsx";
import EventCalendar from "./pages/Admin/EventCalender.jsx";
import Announcement from "./pages/Admin/Announcement.jsx";
import PAssignments from "./pages/Parent/Assignment.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<StudentRegister />} />
        <Route path="/choose-user" element={<ChooseUser />} />
        <Route path="/StudentSignin" element={<StudentSignin />} />
        <Route path="/AdminSignin" element={<AdminSignin />} />
        <Route path="/ParentSignin" element={<ParentSignin />} />
        <Route path="/TeacherSignin" element={<TeacherSignin />} />
        [/*admin dashboard routes*/]
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/classes" element={<Classes />} />
        <Route path="/admin/students" element={<Students />} />
        <Route path="/admin/teachers" element={<Teachers />} />
        <Route path="/admin/events" element={<EventCalendar />} />
        <Route path="/admin/announcements" element={<Announcement />} />
        [/*student dashboard routes*/]
        <Route path="student/dashboard" element={<StudentDashboard />} />
        <Route path="/student/assignments" element={<Assignments />} />
        <Route path="/student/attendance" element={<Attendance />} />
        <Route path="/student/performance" element={<Performance />} />
        <Route path="/student/announcements" element={<Announcements />} />
        <Route path="/student/settings" element={<Settings />} />
        [/*Teacher dashboard routes*/]
        <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
        <Route path="/teacher/assignments" element={<PostAssignment />} />
        <Route path="/teacher/students" element={<ManageClassStudents />} />
        [/*Parent dashboard routes*/]
        <Route path="/parent/dashboard" element={<ParentDashboard />} />
        <Route path="/parent/assignments" element={<PAssignments />} />
      </Routes>
    </Router>
  );
}

export default App;
