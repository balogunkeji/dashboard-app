'use client';
import React, { useState } from 'react';

// Sidebar Component
export const Sidebar = () => (
  <aside className={`hidden lg:w-[300px] bg-white text-white h-screen py-5 fixed top-0 sm:flex flex-col justify-between items-center transform transition-transform duration-300 lg:translate-x-0 sm:translate-x-[-100%]`}>
    <h1 className="logo text-2xl sm:text-3xl font-bold mb-4 text-[#a05aff] text-center">aTrace</h1>
    <div className='flex justify-center w-full'>
      <p className='text-[#a05aff] text-[12px] logo'>@2025 aTrace</p>
    </div>
  </aside>
);

// Header Component
const Header = ({ toggleMenu }: { toggleMenu: () => void }) => (
  <header className="bg-white text-[#a05aff] p-4 flex items-center justify-between fixed top-0 w-full lg:w-[calc(100%-300px)] right-0">
    <h1 className="text-base font-bold">Dashboard</h1>
    <button
      className="lg:hidden text-[#a05aff] focus:outline-none"
      onClick={toggleMenu}
    >
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M4 6h16M4 12h16M4 18h16"
        ></path>
      </svg>
    </button>
  </header>
);

// Main Content Component
const MainContent = ({ children }: { children: React.ReactNode }) => (
  <main className="p-4 bg-[#f9f9f9] h-screen md:min-h-screen w-full overflow-y-auto overflow-x-hidden">
    {children}
  </main>
);

export const ModalOverlay = ({ isOpen, toggleMenu }: { isOpen: boolean, toggleMenu: () => void }) => (
  <div
    className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'} z-40`}
    onClick={toggleMenu}
  ></div>
);

// Dashboard Layout
const Dashboard = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="w-screen flex h-screen relative no-scrollbar">
      <ModalOverlay isOpen={isSidebarOpen} toggleMenu={toggleSidebar} />
      <Sidebar />
      <div
        className="w-full lg:w-[calc(100%-300px)] ml-auto"
      >
        <Header toggleMenu={toggleSidebar} />
        <MainContent>{children}</MainContent>
      </div>
    </div>
  );
};

export default Dashboard;
