"use client";
import { useState } from "react";

export default function MobileMenuButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="relative h-6 w-6 md:hidden">
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className={`z-50 text-primary-100 ${
            isOpen ? "fixed inset-[inherit]" : "relative"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              className={`transition-opacity duration-300 ${
                isOpen ? "opacity-0" : "opacity-100"
              }`}
              d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              className={`transition-opacity duration-300 ${
                isOpen ? "opacity-100" : "opacity-0"
              }`}
              d="M6 18L18 6M6 6l12 12"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      <style jsx global>{`
        @media (max-width: 768px) {
          .nav-menu {
            display: ${isOpen ? "block" : "none"};
          }
        }
      `}</style>
    </>
  );
}
