import { Clock, MapPin, MessageCircle, Phone } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="text-2xl font-bold text-primary-400">YTS</div>
              <div className="text-sm text-gray-300">YAANI TIFFIN SERVICES</div>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Fresh, healthy, and affordable Indian meals delivered to your
              doorstep. Experience authentic flavors with the convenience of
              modern delivery.
            </p>
            <div className="flex space-x-4">
              <a href="tel:+18678882293" className="btn btn-primary">
                <Phone className="w-4 h-4" />
                Call Now
              </a>
              <a href="https://wa.me/18678882293" className="btn btn-outline">
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/plans"
                  className="text-gray-300 hover:text-white transition-colors">
                  Plans & Menu
                </Link>
              </li>
              <li>
                <Link
                  href="#how-it-works"
                  className="text-gray-300 hover:text-white transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-300 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Hours */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact & Hours</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-primary-400" />
                <a
                  href="tel:+18678882293"
                  className="text-gray-300 hover:text-white transition-colors">
                  +1 867 888 2293
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <MessageCircle className="w-4 h-4 text-primary-400" />
                <a
                  href="https://wa.me/18678882293"
                  className="text-gray-300 hover:text-white transition-colors">
                  WhatsApp
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-primary-400" />
                <span className="text-gray-300">Throughout GTA</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-primary-400" />
                <span className="text-gray-300">Mon - Sun: 8AM - 10PM</span>
              </div>
            </div>
            <p className="text-primary-400 font-semibold mt-4">
              Free Delivery Throughout GTA!
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700">
        <div className="container py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 Yaani Tiffin Services. All rights reserved. | Made with ❤️
              for authentic Indian cuisine lovers.
            </p>
            <Link
              href="/admin"
              className="text-gray-400 hover:text-white text-sm transition-colors mt-2 md:mt-0">
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
