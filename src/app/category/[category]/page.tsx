'use client'

import { useState, useEffect } from 'react'
import AppCard from '../../components/AppCard'
import SearchBar from '../../components/SearchBar'
import FilterOptions from '../../components/FilterOptions'
import Head from 'next/head'
import AppList from '../../components/AppList'

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

export default function CategoryPage({ params }: { params: { category: string } }) {
  const [apps, setApps] = useState<App[]>([])
  const [filteredApps, setFilteredApps] = useState<App[]>([])
  const [statuses, setStatuses] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [isListView, setIsListView] = useState(false)

  useEffect(() => {
    fetchApps()
  }, [params.category])

  const fetchApps = async () => {
    setLoading(true)
    try {
      const dataUrl = process.env.NEXT_PUBLIC_DATA_URL || 'https://raw.githubusercontent.com/amalik99/windows-arm-apps-directory/refs/heads/main/data/apps.json'
      const response = await fetch(dataUrl)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()

      if (!data.apps || !Array.isArray(data.apps)) {
        throw new Error('Invalid data structure: "apps" property is missing or not an array')
      }

      const typedApps = data.apps as App[]
      const categoryApps = typedApps.filter(app => 
        app.category.toLowerCase() === decodeURIComponent(params.category).toLowerCase()
      )
      setApps(categoryApps)
      setFilteredApps(categoryApps)
      setStatuses([...new Set(categoryApps.map(app => app.status))])
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

  const handleStatusChange = (status: string) => {
    const filtered = status
      ? apps.filter((app) => app.status === status)
      : apps
    setFilteredApps(filtered)
  }

  const categoryTitle = decodeURIComponent(params.category)
  const categoryDescription = `Explore our curated collection of ${categoryTitle.toLowerCase()} applications for Windows ARM64 devices.`

  const pageTitle = `${categoryTitle} Apps for Windows ARM`
  const pageDescription = `Explore our curated collection of ${categoryTitle.toLowerCase()} applications compatible with Windows ARM64 devices.`
  
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content={`Windows ARM, ARM64, ${categoryTitle}, applications, directory`} />
      </Head>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {categoryTitle}
            </h1>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {categoryDescription}
            </p>
          </div>

          {/* Search and Filters Section */}
          <div className="flex flex-col gap-4 mb-8">
            <div className="w-full">
              <SearchBar onSearch={handleSearch} />
            </div>
            
            <div className="w-full">
              <FilterOptions
                categories={[]}
                statuses={statuses}
                onCategoryChange={() => {}}
                onStatusChange={handleStatusChange}
                isListView={isListView}
                onViewChange={setIsListView}
              />
            </div>
          </div>

          {/* Content Section */}
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <>
              {isListView ? (
                <AppList apps={filteredApps} />
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredApps.map((app) => (
                    <AppCard key={app.id} {...app} />
                  ))}
                </div>
              )}

              {filteredApps.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-600 dark:text-gray-400">
                    No apps found matching your criteria.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  )
}