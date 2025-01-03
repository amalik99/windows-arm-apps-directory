'use client'

import { useState, useEffect } from 'react'
import AppCard from './components/AppCard'
import SearchBar from './components/SearchBar'
import FilterOptions from './components/FilterOptions'
import Head from 'next/head'
import SubmitAppForm from './components/SubmitAppForm'
import AppList from './components/AppList'

interface App {
  id: string
  name: string
  slug: string
  category: string
  status: string
  directDownloadLink: string | null
  storeLink: string | null
  about: string
  icon: string
  publisher: string
  lastUpdated: string
  featured?: boolean
}

export default function Directory() {
  const [apps, setApps] = useState<App[]>([])
  const [filteredApps, setFilteredApps] = useState<App[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [statuses, setStatuses] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [showSubmitForm, setShowSubmitForm] = useState(false)
  const [isListView, setIsListView] = useState(false)

  const handleOpenSubmitForm = () => {
    setShowSubmitForm(true)
  }

  const handleCloseSubmitForm = () => {
    setShowSubmitForm(false)
  }

  useEffect(() => {
    fetchApps()
  }, [])

  const fetchApps = async () => {
    setLoading(true)
    try {
      const dataUrl = process.env.NEXT_PUBLIC_DATA_URL || 'https://raw.githubusercontent.com/amalik99/windows-arm-apps-directory/refs/heads/main/data/apps.json'
      console.log('Fetching data from:', dataUrl)
      const response = await fetch(dataUrl)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      console.log('Fetched data:', data)

      if (!data.apps || !Array.isArray(data.apps)) {
        throw new Error('Invalid data structure: "apps" property is missing or not an array')
      }

      const typedApps = data.apps.map((app: App) => ({
        ...app,
      })) as App[]
      
      const sortedApps = [...typedApps].sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return 0;
      });
      
      setApps(sortedApps)
      setFilteredApps(sortedApps)
      setCategories([...new Set(sortedApps.map(app => app.category))])
      setStatuses([...new Set(sortedApps.map(app => app.status))])
    } catch (error) {
      console.error('Error fetching apps:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (query: string) => {
    const filtered = apps
      .filter((app) =>
        app.name.toLowerCase().includes(query.toLowerCase()) ||
        app.category.toLowerCase().includes(query.toLowerCase())
      )
      .sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return 0;
      });
    setFilteredApps(filtered)
  }
  

  const handleCategoryChange = (category: string) => {
    const filtered = (category
      ? apps.filter((app) => app.category === category)
      : apps)
      .sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return 0;
      });
    setFilteredApps(filtered)
  }

  const handleStatusChange = (status: string) => {
    const filtered = (status
      ? apps.filter((app) => app.status === status)
      : apps)
      .sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return 0;
      });
    setFilteredApps(filtered)
  }
  

  return (
    <>
    <Head>
      <title>Windows ARM Apps Directory</title>
      <meta name="description" content="A comprehensive directory of applications compatible with Windows ARM64 devices" />
    </Head>
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
        <div className="flex flex-col gap-4 mb-8">
          <div className="w-full">
            <SearchBar onSearch={handleSearch} />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="w-full sm:flex-1">
              <FilterOptions
                categories={categories}
                statuses={statuses}
                onCategoryChange={handleCategoryChange}
                onStatusChange={handleStatusChange}
                isListView={isListView}
                onViewChange={setIsListView}
              />
            </div>
            
            <button
              onClick={handleOpenSubmitForm}
              className="w-full sm:w-auto whitespace-nowrap bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
            >
              Submit App
            </button>
          </div>
        </div>
        {showSubmitForm && <SubmitAppForm onClose={handleCloseSubmitForm} />}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          isListView ? (
            <AppList apps={filteredApps} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredApps.map((app) => (
                <AppCard key={app.id} {...app} />
              ))}
            </div>
          )
        )}
      </div>
    </div>
  </>
)
}