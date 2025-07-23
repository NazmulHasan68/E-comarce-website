import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
} from "lucide-react";

import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[var(--primary-bg-color)] text-[var(--primary-text-color)] dark:bg-[var(--primary-bg-color)] dark:text-[var(--primary-text-color)] border-t border-[var(--border-color)]">
      <div className="max-w-7xl mx-auto px-6 py-14 grid gap-10 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
        {/* Brand */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-2xl font-bold">Shadow Shop</h2>
          <p className="text-sm text-[var(--white-text-color)]">
            YourBrand is your trusted source for premium fashion and lifestyle products.
          </p>
          <div className="flex space-x-4 pt-2">
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <Facebook className="hover:text-[var(--secondary-text-color)] transition" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <Twitter className="hover:text-[var(--secondary-text-color)] transition" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <Instagram className="hover:text-[var(--secondary-text-color)] transition" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer">
              <Linkedin className="hover:text-[var(--secondary-text-color)] transition" />
            </a>
            <a href="mailto:info@yourbrand.com">
              <Mail className="hover:text-[var(--secondary-text-color)] transition" />
            </a>
          </div>
        </div>

        <div className="flex md:hidden justify-between">

            {/* Company Links */}
            <div>
            <h4 className="text-lg font-semibold mb-3">Company</h4>
            <ul className="space-y-2 text-sm text-[var(--white-text-color)]">
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/careers">Careers</Link></li>
                <li><Link to="/press">Press</Link></li>
                <li><Link to="/blog">Blog</Link></li>
                <li><Link to="/privacy">Privacy Policy</Link></li>
            </ul>
            </div>

            {/* Support Links */}
            <div>
            <h4 className="text-lg font-semibold mb-3">Support</h4>
            <ul className="space-y-2 text-sm text-[var(--white-text-color)]">
                <li><Link to="/contact">Contact</Link></li>
                <li><Link to="/faq">FAQs</Link></li>
                <li><Link to="/shipping">Shipping</Link></li>
                <li><Link to="/returns">Returns</Link></li>
                <li><Link to="/terms">Terms of Service</Link></li>
            </ul>
            </div>
        </div>

        
            {/* Company Links */}
            <div className="hidden md:block">
                <h4 className="text-lg font-semibold mb-3">Company</h4>
                <ul className="space-y-2 text-sm text-[var(--white-text-color)]">
                    <li><Link to="/about">About Us</Link></li>
                    <li><Link to="/careers">Careers</Link></li>
                    <li><Link to="/press">Press</Link></li>
                    <li><Link to="/blog">Blog</Link></li>
                    <li><Link to="/privacy">Privacy Policy</Link></li>
                </ul>
            </div>

            {/* Support Links */}
            <div className="hidden md:block">
                <h4 className="text-lg font-semibold mb-3">Support</h4>
                <ul className="space-y-2 text-sm text-[var(--white-text-color)]">
                    <li><Link to="/contact">Contact</Link></li>
                    <li><Link to="/faq">FAQs</Link></li>
                    <li><Link to="/shipping">Shipping</Link></li>
                    <li><Link to="/returns">Returns</Link></li>
                    <li><Link to="/terms">Terms of Service</Link></li>
                </ul>
            </div>


      </div>

      {/* Footer Bottom */}
      <div className="border-t border-[var(--border-color)] mt-6 py-4 text-center text-sm text-[var(--white-text-color)]">
        © {new Date().getFullYear()} Shadow shop. All rights reserved.
      </div>
    </footer>
  );
}
