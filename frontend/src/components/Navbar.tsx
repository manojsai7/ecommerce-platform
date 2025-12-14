import React from 'react';
import Link from 'next/link';
import { useAuthStore } from '@/lib/store';

export const Navbar: React.FC = () => {
  const { user, logout } = useAuthStore();

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-2xl font-bold text-primary-600">
              E-Shop
            </Link>
            <div className="hidden md:flex space-x-4">
              <Link href="/products" className="text-gray-700 hover:text-primary-600 px-3 py-2">
                Products
              </Link>
              {user?.role === 'admin' && (
                <Link href="/admin" className="text-gray-700 hover:text-primary-600 px-3 py-2">
                  Admin
                </Link>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link href="/cart" className="text-gray-700 hover:text-primary-600 px-3 py-2">
              🛒 Cart
            </Link>
            
            {user ? (
              <>
                <Link href="/orders" className="text-gray-700 hover:text-primary-600 px-3 py-2">
                  Orders
                </Link>
                <Link href="/profile" className="text-gray-700 hover:text-primary-600 px-3 py-2">
                  {user.firstName}
                </Link>
                <button
                  onClick={logout}
                  className="text-gray-700 hover:text-primary-600 px-3 py-2"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-gray-700 hover:text-primary-600 px-3 py-2">
                  Login
                </Link>
                <Link
                  href="/register"
                  className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
