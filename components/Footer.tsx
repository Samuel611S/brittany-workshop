'use client';

import { useLanguage } from '@/lib/language-context';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">NK</span>
              </div>
              <span className="font-bold text-lg">NextKey Housing</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              {t.footerDescription}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">{t.quickLinks}</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-300 hover:text-white transition-colors text-sm">
                  {t.home}
                </a>
              </li>
              <li>
                <a href="/workshop" className="text-gray-300 hover:text-white transition-colors text-sm">
                  {t.workshop}
                </a>
              </li>
              <li>
                <a href="/profile" className="text-gray-300 hover:text-white transition-colors text-sm">
                  {t.profile}
                </a>
              </li>
              <li>
                <a href="/admin" className="text-gray-300 hover:text-white transition-colors text-sm">
                  {t.admin}
                </a>
              </li>
            </ul>
          </div>

          {/* Learning Tracks */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">{t.learningTracks}</h3>
            <ul className="space-y-2">
              <li>
                <span className="text-gray-300 text-sm">
                  {t.track1}
                </span>
              </li>
              <li>
                <span className="text-gray-300 text-sm">
                  {t.track2}
                </span>
              </li>
              <li>
                <span className="text-gray-300 text-sm">
                  {t.track3}
                </span>
              </li>
              <li>
                <span className="text-gray-300 text-sm">
                  {t.track4}
                </span>
              </li>
              <li>
                <span className="text-gray-300 text-sm">
                  {t.track5}
                </span>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">{t.contactUs}</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-blue-400" />
                <span className="text-gray-300 text-sm">info@nextkeyhousing.org</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-blue-400" />
                <span className="text-gray-300 text-sm">(555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-blue-400" />
                <span className="text-gray-300 text-sm">
                  {t.address}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-gray-400 text-sm">
              © 2024 NextKey Housing Access Foundation. {t.allRightsReserved}
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                {t.privacyPolicy}
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                {t.termsOfService}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
