'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useUser } from '@/lib/user-context';
import { useLanguage } from '@/lib/language-context';
import { Menu, X, User, LogOut, Home, BookOpen, Settings } from 'lucide-react';

export default function Header() {
  const { user, logout } = useUser();
  const { t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">NK</span>
            </div>
            <span className="font-bold text-gray-900 text-lg hidden sm:block">
              NextKey Housing
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors">
              {t.home}
            </Link>
            {user && (
              <Link href="/workshop" className="text-gray-600 hover:text-gray-900 transition-colors">
                {t.workshop}
              </Link>
            )}
            {user && (
              <Link href="/profile" className="text-gray-600 hover:text-gray-900 transition-colors">
                {t.profile}
              </Link>
            )}
          </nav>

          {/* Desktop User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-600">
                  {user.firstName} {user.lastName}
                </span>
                <button
                  onClick={logout}
                  className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="text-sm">{t.logout}</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <button className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  {t.login}
                </button>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors">
                  {t.signup}
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <nav className="flex flex-col space-y-3">
              <Link
                href="/"
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <Home className="w-4 h-4" />
                <span>{t.home}</span>
              </Link>
              
              {user && (
                <Link
                  href="/workshop"
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <BookOpen className="w-4 h-4" />
                  <span>{t.workshop}</span>
                </Link>
              )}
              
              {user && (
                <Link
                  href="/profile"
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Settings className="w-4 h-4" />
                  <span>{t.profile}</span>
                </Link>
              )}

              <div className="border-t border-gray-200 pt-3 mt-3">
                {user ? (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 text-gray-600 py-2">
                      <User className="w-4 h-4" />
                      <span className="text-sm">
                        {user.firstName} {user.lastName}
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        logout();
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors py-2 w-full"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>{t.logout}</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <button className="w-full text-left text-gray-600 hover:text-gray-900 transition-colors py-2">
                      {t.login}
                    </button>
                    <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors">
                      {t.signup}
                    </button>
                  </div>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
