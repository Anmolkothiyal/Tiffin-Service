"use client";

import { Menu, Phone, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const getLinkClass = (href: string) => {
    const isActive = pathname === href;
    return isActive
      ? "text-primary-600 font-medium"
      : "text-gray-700 hover:text-primary-600 transition-colors";
  };

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute("href")?.substring(1);
    setIsMenuOpen(false);

    if (targetId) {
      // If we're not on the home page, navigate to home page first
      if (pathname !== "/") {
        // Navigate to home page with the hash
        router.push(`/#${targetId}`);
        return;
      }

      // If we're already on home page, scroll to the section
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        const headerHeight = 80; // pt-20 = 5rem = 80px
        const targetPosition = targetElement.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100">
      <div className="container">
        <nav className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-primary-600">YTS</div>
            <div className="text-sm text-gray-600 hidden sm:block">
              YAANI TIFFIN SERVICES
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link href="/" className={getLinkClass("/")}>
              Home
            </Link>
            <Link href="/plans" className={getLinkClass("/plans")}>
              Plans & Menu
            </Link>
            <a
              href="#how-it-works"
              onClick={handleSmoothScroll}
              className="text-gray-700 hover:text-primary-600 transition-colors">
              How It Works
            </a>
            <Link href="/about" className={getLinkClass("/about")}>
              About Us
            </Link>
            <Link href="/contact" className={getLinkClass("/contact")}>
              Contact
            </Link>
            <Link
              href="/admin"
              className={
                pathname === "/admin"
                  ? "text-primary-600 font-medium"
                  : "text-primary-600 hover:text-primary-700 font-medium transition-colors"
              }>
              Admin
            </Link>
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center space-x-4">
            <a href="tel:+18678882293" className="btn btn-primary">
              <Phone className="w-4 h-4" />
              Call Now
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-gray-600 hover:text-primary-600 transition-colors">
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </nav>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col space-y-4">
              <Link
                href="/"
                className={getLinkClass("/")}
                onClick={() => setIsMenuOpen(false)}>
                Home
              </Link>
              <Link
                href="/plans"
                className={getLinkClass("/plans")}
                onClick={() => setIsMenuOpen(false)}>
                Plans & Menu
              </Link>
              <a
                href="#how-it-works"
                onClick={handleSmoothScroll}
                className="text-gray-700 hover:text-primary-600 transition-colors">
                How It Works
              </a>
              <Link
                href="/about"
                className={getLinkClass("/about")}
                onClick={() => setIsMenuOpen(false)}>
                About Us
              </Link>
              <Link
                href="/contact"
                className={getLinkClass("/contact")}
                onClick={() => setIsMenuOpen(false)}>
                Contact
              </Link>
              <Link
                href="/admin"
                className={
                  pathname === "/admin"
                    ? "text-primary-600 font-medium"
                    : "text-primary-600 hover:text-primary-700 font-medium transition-colors"
                }
                onClick={() => setIsMenuOpen(false)}>
                Admin
              </Link>
              <a href="tel:+18678882293" className="btn btn-primary w-fit">
                <Phone className="w-4 h-4" />
                Call Now
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
