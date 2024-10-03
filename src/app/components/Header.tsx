'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { FaMoon, FaSun, FaGithub, FaChevronDown } from 'react-icons/fa'
import Image from 'next/image'

interface App {
  id: string
  name: string
  category: string
  status: string
  directDownloadLink: string
  storeLink: string | null
  remarks: string
  icon: string
}

const Header = () => {
  const [darkMode, setDarkMode] = useState(false)
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false)
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
    <header className="bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image src="/logo.png" alt="Logo" width={40} height={40} className="mr-4" />
          <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">Windows on ARM</h1>
        </Link>
        <nav>
          <ul className="flex space-x-6">
            <li><Link href="/" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">All Apps</Link></li>
            <li className="relative">
              <button
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center"
                onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
              >
                Categories
                <FaChevronDown className="ml-1" />
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
            <li><Link href="/contribute" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Contribute</Link></li>
            <li><Link href="/finding-arm-apps" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Finding ARM Apps</Link></li>
          </ul>
        </nav>
        <div className="flex items-center">
          <a href="https://github.com/amalik99/windows-arm-apps-directory" target="_blank" rel="noopener noreferrer" className="mr-4">
            <FaGithub className="w-5 h-5 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" />
          </a>
          <button onClick={toggleDarkMode} className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
            {darkMode ? <FaSun className="w-5 h-5" /> : <FaMoon className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header