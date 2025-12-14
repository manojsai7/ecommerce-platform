import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <Head>
        <title>E-commerce Platform</title>
        <meta name="description" content="Full-stack e-commerce application" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <div className="flex items-center">
                <Link href="/" className="text-2xl font-bold text-primary-600">
                  E-Shop
                </Link>
              </div>
              <div className="flex space-x-4">
                <Link href="/products" className="text-gray-700 hover:text-primary-600 px-3 py-2">
                  Products
                </Link>
                <Link href="/cart" className="text-gray-700 hover:text-primary-600 px-3 py-2">
                  Cart
                </Link>
                <Link href="/login" className="text-gray-700 hover:text-primary-600 px-3 py-2">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-5xl font-extrabold text-gray-900 mb-6">
              Welcome to Our E-commerce Platform
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Discover amazing products, enjoy seamless shopping experience, and get your orders delivered fast.
            </p>
            <div className="flex justify-center space-x-4">
              <Link 
                href="/products"
                className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition"
              >
                Shop Now
              </Link>
              <Link 
                href="/register"
                className="bg-gray-200 text-gray-800 px-8 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
              >
                Sign Up
              </Link>
            </div>
          </div>

          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="text-4xl mb-4">🚚</div>
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Get your orders delivered quickly and safely to your doorstep.</p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-xl font-semibold mb-2">Secure Payment</h3>
              <p className="text-gray-600">Shop with confidence using our secure payment gateways.</p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4">⭐</div>
              <h3 className="text-xl font-semibold mb-2">Quality Products</h3>
              <p className="text-gray-600">Browse through our curated selection of high-quality products.</p>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
