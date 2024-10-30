'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FaDownload, FaCheckCircle, FaTimesCircle, FaQuestionCircle, FaExclamationTriangle } from 'react-icons/fa'
import { format } from 'date-fns'

interface App {
  id: string
  name: string
  slug: string
  category: string
  status: string
  directDownloadLink: string | null
  storeLink: string | null
  remarks: string
  icon: string
  publisher: string
  lastUpdated: string
}

interface AppPageProps {
  params: {
    app: string
  }
}

const AppPage = ({ params }: AppPageProps) => {
  const [app, setApp] = useState<App | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAppDetails()
  }, [params.app])

  const fetchAppDetails = async () => {
    setLoading(true)
    try {
      const dataUrl = process.env.NEXT_PUBLIC_DATA_URL || 'https://raw.githubusercontent.com/amalik99/windows-arm-apps-directory/refs/heads/main/data/apps.json'
      const response = await fetch(dataUrl)
      const data = await response.json()
      
      console.log('Raw data:', data)
      
      if (!data.apps || !Array.isArray(data.apps)) {
        console.error('Invalid data structure:', data)
        setApp(null)
        return
      }

      const decodedSlug = decodeURIComponent(params.app).toLowerCase()
      const foundApp = data.apps.find((a: App) => a?.slug?.toLowerCase() === decodedSlug)
      
      console.log('Searching for slug:', decodedSlug)
      console.log('Available apps:', data.apps.map((a: App) => ({ name: a.name, slug: a.slug })))
      
      setApp(foundApp || null)
    } catch (error) {
      console.error('Error fetching app details:', error)
      setApp(null)
    } finally {
      setLoading(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Available Natively':
        return <FaCheckCircle className="text-green-500 w-5 h-5" title="Available Natively" />
      case 'Available via Emulation':
        return <FaExclamationTriangle className="text-yellow-500 w-5 h-5" title="Available via Emulation" />
      case 'Not Available':
        return <FaTimesCircle className="text-red-500 w-5 h-5" title="Not Available" />
      default:
        return <FaQuestionCircle className="text-gray-500 w-5 h-5" title="Unknown" />
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (!app) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">App Not Found</h1>
          <Link href="/" className="text-blue-500 hover:text-blue-600">
            Return to Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="relative w-24 h-24 md:w-32 md:h-32">
              <Image
                src={app.icon}
                alt={app.name}
                layout="fill"
                className="rounded-xl"
                onError={(e: any) => { e.target.src = '/defaultappicon.jpg' }}
              />
            </div>
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-4">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                  {app.name}
                </h1>
                <span className="px-3 py-1 text-sm rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 w-fit">
                  {app.category}
                </span>
              </div>
              
              <div className="flex items-center gap-2 mb-4">
                {getStatusIcon(app.status)}
                <span className="text-gray-600 dark:text-gray-300">{app.status}</span>
              </div>

              <div className="flex flex-wrap gap-3">
                {app.directDownloadLink && (
                  <a
                    href={app.directDownloadLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                  >
                    <FaDownload className="mr-2" />
                    Download
                  </a>
                )}
                {app.storeLink && (
                  <a
                    href={app.storeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                  >
                    <Image
                      src="/downloadfromstore.png"
                      alt="Store"
                      width={24}
                      height={24}
                      className="mr-2"
                    />
                    Get from Store
                  </a>
                )}
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="flex-1">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">About</h2>
                  <p className="text-gray-600 dark:text-gray-300 whitespace-pre-wrap">
                    {app.remarks}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {app && (
        <div className="mt-4 text-sm text-gray-500">
          Last updated: {format(new Date(app.lastUpdated), 'MMM d, yyyy')}
        </div>
      )}
    </div>
  )
}

export default AppPage