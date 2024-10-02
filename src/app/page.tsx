'use client'

import { useState, useEffect } from 'react'
import AppCard from './components/AppCard'
import SearchBar from './components/SearchBar'
import FilterOptions from './components/FilterOptions'

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

export default function Directory() {
  const [apps, setApps] = useState<App[]>([])
  const [filteredApps, setFilteredApps] = useState<App[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [statuses, setStatuses] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchApps()
  }, [])

  const fetchApps = async () => {
    setLoading(true)
    try {
      const dataUrl = process.env.NEXT_PUBLIC_DATA_URL || 'https://raw.githubusercontent.com/amalik99/windows-arm-apps-directory/refs/heads/main/data/apps.json'
      console.log('Fetching data from:', dataUrl) // Log the URL being fetched
      const response = await fetch(dataUrl)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      console.log('Fetched data:', data) // Log the fetched data

      if (!data.apps) {
        throw new Error('Invalid data structure: "apps" property is missing')
      }
      setApps(data.apps)
      setFilteredApps(data.apps)
      setCategories([...new Set(data.apps.map((app: App) => app.category))])
      setStatuses([...new Set(data.apps.map((app: App) => app.status))])
    } catch (error) {
      console.error('Error fetching apps:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (query: string) => {
    const filtered = apps.filter((app) =>
      app.name.toLowerCase().includes(query.toLowerCase()) ||
      app.category.toLowerCase().includes(query.toLowerCase())
    )
    setFilteredApps(filtered)
  }

  const handleCategoryChange = (category: string) => {
    const filtered = category
      ? apps.filter((app) => app.category === category)
      : apps
    setFilteredApps(filtered)
  }

  const handleStatusChange = (status: string) => {
    const filtered = status
      ? apps.filter((app) => app.status === status)
      : apps
    setFilteredApps(filtered)
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Windows Apps for ARM Devices
          </h1>
          <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover and explore our curated collection of applications on Windows ARM64 devices, such as Copilot Plus PCs and more. 
          </p>
        </div>
        <div className="flex mb-8">
          <SearchBar onSearch={handleSearch} />
          <FilterOptions
            categories={categories}
            statuses={statuses}
            onCategoryChange={handleCategoryChange}
            onStatusChange={handleStatusChange}
          />
        </div>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredApps.map((app) => (
              <AppCard key={app.id} {...app} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}