'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { FaMoon, FaSun, FaGithub, FaChevronDown, FaBars, FaTimes } from 'react-icons/fa'
import Image from 'next/image'

interface App {
  id: string
  name: string
  category: string
  status: string
  directDownloadLink: string
  storeLink: string | null
  about: string
  icon: string
}

const Header = () => {
  const [darkMode, setDarkMode] = useState(false)
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [categories, setCategories] = useState<string[]>([])

  useEffect(() => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true'
    setDarkMode(isDarkMode)
    document.documentElement.classList.toggle('dark', isDarkMode)

    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const dataUrl = process.env.NEXT_PUBLIC_DATA_URL || 'https://raw.githubusercontent.com/amalik99/windows-arm-apps-directory/refs/heads/main/data/apps.json'
      const response = await fetch(dataUrl)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      if (data.apps && Array.isArray(data.apps)) {
        const uniqueCategories: string[] = Array.from(new Set(data.apps.map((app: App) => app.category)))
        setCategories(uniqueCategories)
      }
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode
    setDarkMode(newDarkMode)
    localStorage.setItem('darkMode', newDarkMode.toString())
    document.documentElement.classList.toggle('dark', newDarkMode)
  }

  const handleCategoryClick = () => {
    setIsCategoryMenuOpen(false)
  }

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md relative">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image src="/logo.png" alt="Logo" width={40} height={40} className="mr-4" />
            <h1 className="text-xl md:text-2xl font-bold text-blue-600 dark:text-blue-400">Windows on ARM</h1>
          </Link>
          
          <div className="flex items-center md:hidden">
            <button 
              onClick={toggleDarkMode} 
              className="p-2 mr-2 text-gray-600 dark:text-gray-300"
            >
              {darkMode ? <FaSun className="w-5 h-5" /> : <FaMoon className="w-5 h-5" />}
            </button>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-600 dark:text-gray-300"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
            </button>
          </div>

          <nav className="hidden md:block">
            <ul className="flex space-x-6">
              <li><Link href="/" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">All Apps</Link></li>
              <li className="relative">
                <button
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 flex items-center"
                  onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
                >
                  Categories <FaChevronDown className="ml-1" />
                </button>
                {isCategoryMenuOpen && (
                  <ul className="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md shadow-lg z-10">
                    {categories.map((category) => (
                      <li key={category}>
                        <Link
                          href={`/category/${encodeURIComponent(category)}`}
                          className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
                          onClick={handleCategoryClick}
                        >
                          {category}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
              <li><Link href="/contribute" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Contribute</Link></li>
              <li><Link href="/finding-arm-apps" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Finding ARM Apps</Link></li>
            </ul>
          </nav>

          <div className="hidden md:flex items-center">
            <a href="https://github.com/amalik99/windows-arm-apps-directory" target="_blank" rel="noopener noreferrer" className="mr-4">
              <FaGithub className="w-5 h-5 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400" />
            </a>
            <button onClick={toggleDarkMode} className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
              {darkMode ? <FaSun className="w-5 h-5" /> : <FaMoon className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <div
          className={`${
            isMobileMenuOpen ? 'block' : 'hidden'
          } md:hidden absolute left-0 right-0 top-full bg-white dark:bg-gray-800 shadow-lg z-50`}
        >
          <nav className="px-4 py-2">
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="block py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  All Apps
                </Link>
              </li>
              <li>
                <button
                  className="w-full flex items-center justify-between py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                  onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
                >
                  Categories
                  <FaChevronDown className={`transform transition-transform ${isCategoryMenuOpen ? 'rotate-180' : ''}`} />
                </button>
                {isCategoryMenuOpen && (
                  <ul className="pl-4 space-y-2 mt-2">
                    {categories.map((category) => (
                      <li key={category}>
                        <Link
                          href={`/category/${encodeURIComponent(category)}`}
                          className="block py-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                          onClick={() => {
                            setIsMobileMenuOpen(false)
                            setIsCategoryMenuOpen(false)
                          }}
                        >
                          {category}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
              <li>
                <Link
                  href="/contribute"
                  className="block py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contribute
                </Link>
              </li>
              <li>
                <Link
                  href="/finding-arm-apps"
                  className="block py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Finding ARM Apps
                </Link>
              </li>
            </ul>
          </nav>
          <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-3">
            <a
              href="https://github.com/amalik99/windows-arm-apps-directory"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <FaGithub className="w-5 h-5 mr-2" />
              GitHub Repository
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header