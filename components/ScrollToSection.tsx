"use client";

import { useEffect } from "react";

export default function ScrollToSection() {
  useEffect(() => {
    // Handle scroll to section when page loads with hash
    const handleHashScroll = () => {
      const hash = window.location.hash;
      if (hash) {
        // Small delay to ensure the page is fully loaded
        setTimeout(() => {
          const targetId = hash.substring(1);
          const targetElement = document.getElementById(targetId);
          if (targetElement) {
            const headerHeight = 80; // pt-20 = 5rem = 80px
            const targetPosition = targetElement.offsetTop - headerHeight;

            window.scrollTo({
              top: targetPosition,
              behavior: "smooth",
            });
          }
        }, 100);
      }
    };

    // Call on mount
    handleHashScroll();

    // Listen for hash changes
    window.addEventListener("hashchange", handleHashScroll);

    return () => {
      window.removeEventListener("hashchange", handleHashScroll);
    };
  }, []);

  return null; // This component doesn't render anything
}
