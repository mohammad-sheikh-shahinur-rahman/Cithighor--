import React, { useState } from "react";
import {
  Menu,
  Home,
  User,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// যদি React Router ব্যবহার করেন, তাহলে নিচের কমেন্ট আনকমেন্ট করে নিন
// import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false); // Mobile drawer open/close
  const [isCollapsed, setIsCollapsed] = useState(false); // Desktop sidebar collapsed

  // React Router useNavigate hook (যদি ব্যবহার করেন)
  // const navigate = useNavigate();

  // Navigation function - এখানে আপনার নেভিগেশন লজিক দিন
  const handleNavigation = (path) => {
    setIsOpen(false); // Mobile drawer বন্ধ করবেন নেভিগেশনের পর
    // যদি React Router ব্যবহার করেন:
    // navigate(path);

    // যদি না ব্যবহার করেন, window.location.href ব্যবহার করতে পারেন:
    window.location.href = path;

    // অথবা এখানে alert দিয়ে ডেমো দেখাচ্ছি:
    // alert(`Navigating to ${path}`);
  };

  // Logout handler - এখানে আপনার লগআউট লজিক লিখবেন
  const handleLogout = () => {
    setIsOpen(false);
    // যেমনঃ
    // 1. Token/localStorage থেকে টোকেন মুছে ফেলুন
    localStorage.removeItem("authToken");
    // 2. User state clear করতে পারেন (যদি Context/Redux ব্যবহার করেন)
    // 3. লগইন পেজে রিডাইরেক্ট করুন
    window.location.href = "/login";

    // alert("Logged out successfully!");
  };

  return (
    <>
      {/* Mobile Hamburger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden p-2 m-2 rounded-md text-gray-700 hover:bg-gray-200"
        aria-label="Open menu"
      >
        <Menu size={24} />
      </button>

      {/* Overlay for mobile drawer */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full bg-white border-r border-gray-200 z-50
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 md:static md:flex md:flex-col
          ${isCollapsed ? "w-20" : "w-64"}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          {!isCollapsed && <h1 className="text-xl font-bold">চিঠিঘর</h1>}

          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 rounded hover:bg-gray-200"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>

          {/* Close button on mobile */}
          <button
            onClick={() => setIsOpen(false)}
            className="md:hidden p-1 rounded hover:bg-gray-200"
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col flex-grow mt-4 space-y-2 px-2">
          <SidebarItem
            icon={<Home size={20} />}
            label="Dashboard"
            collapsed={isCollapsed}
            onClick={() => handleNavigation("/dashboard")}
          />
          <SidebarItem
            icon={<User size={20} />}
            label="Profile"
            collapsed={isCollapsed}
            onClick={() => handleNavigation("/profile")}
          />
          <SidebarItem
            icon={<Settings size={20} />}
            label="Settings"
            collapsed={isCollapsed}
            onClick={() => handleNavigation("/settings")}
          />
          <div className="mt-auto">
            <SidebarItem
              icon={<LogOut size={20} />}
              label="Logout"
              collapsed={isCollapsed}
              onClick={handleLogout}
            />
          </div>
        </nav>
      </aside>
    </>
  );
};

const SidebarItem = ({ icon, label, collapsed, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center gap-3 p-3 rounded-md text-gray-700 hover:bg-gray-200
        transition-colors duration-200 w-full text-left
        ${collapsed ? "justify-center" : ""}
      `}
      aria-label={label}
    >
      {icon}
      {!collapsed && <span className="text-sm font-medium">{label}</span>}
    </button>
  );
};

export default Sidebar;
