'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { FaMoon, FaSun } from 'react-icons/fa'
import { FaGithub } from 'react-icons/fa' // Import GitHub icon
import Image from 'next/image'

const Header = () => {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true'
    setDarkMode(isDarkMode)
    document.documentElement.classList.toggle('dark', isDarkMode)
  }, [])

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode
    setDarkMode(newDarkMode)
    localStorage.setItem('darkMode', newDarkMode.toString())
    document.documentElement.classList.toggle('dark', newDarkMode)
  }

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <Image src="/logo.png" alt="Logo" width={40} height={40} className="mr-4" />
          <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">Windows on ARM </h1>
        </div>
        <nav>
          <ul className="flex space-x-6">
            <li><Link href="/" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Home</Link></li>
            <li><Link href="/contribute" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Contribute</Link></li>
            <li><Link href="/finding-arm-apps" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Finding ARM Apps</Link></li>

          </ul>
        </nav>
        <div className="flex items-center">
          {/* GitHub Icon */}
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