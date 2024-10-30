'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FaDownload, FaCheckCircle, FaTimesCircle, FaQuestionCircle, FaExclamationTriangle } from 'react-icons/fa'
import { format } from 'date-fns'
import Head from 'next/head'

interface App {
  id: string
  name: string
  slug: string
  category: string
  status: string
  directDownloadLink: string | null
  storeLink: string | null
  about: string
  description?: string
  highlights?: string[]
  icon: string
  publisher: string
  lastUpdated: string
}

interface AppPageProps {
  params: {
    app: string
  }
}

// Add interface for metadata
interface Metadata {
  title: string;
  description: string;
  keywords: string;
  publisher: string;
  lastUpdated: string;
  status: string;
  category: string;
  armStatus?: {
    status: string;
    detail: string;
    compatibility: string;
  };
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
      const foundApp = data.apps.find((app: App) => app?.slug?.toLowerCase() === decodedSlug)
      
      console.log('Searching for slug:', decodedSlug)
      console.log('Available apps:', data.apps.map((app: App) => ({ name: app.name, slug: app.slug })))
      
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
        return <FaCheckCircle className="text-green-500" />
      case 'Available via Emulation':
        return <FaExclamationTriangle className="text-yellow-500" />
      case 'Not Available':
        return <FaTimesCircle className="text-red-500" />
      case 'Unknown':
        return <FaQuestionCircle className="text-gray-500" />
      default:
        return <FaQuestionCircle className="text-gray-500" />
    }
  }

  const getMetadata = (): Metadata => {
    if (!app) {
      return {
        title: 'App Not Found | Windows ARM Apps Directory',
        description: 'The requested application could not be found in the Windows ARM Apps Directory.',
        keywords: 'Windows ARM, ARM64, applications, directory',
        publisher: '',
        lastUpdated: '',
        status: '',
        category: ''
      }
    }

    // Generate ARM-specific status description
    const getArmStatus = () => {
      switch (app.status) {
        case 'Available Natively':
          return {
            status: 'native ARM64 support',
            detail: 'optimized for Windows ARM processors',
            compatibility: 'runs natively on ARM64'
          }
        case 'Available via Emulation':
          return {
            status: 'x64 emulation support',
            detail: 'runs through Windows x64 emulation',
            compatibility: 'compatible via emulation'
          }
        case 'Not Available':
          return {
            status: 'not available',
            detail: 'no ARM64 or emulation support',
            compatibility: 'not compatible'
          }
        default:
          return {
            status: 'unknown compatibility',
            detail: 'ARM64 compatibility status unknown',
            compatibility: 'compatibility unconfirmed'
          }
      }
    }

    const armStatus = getArmStatus()

    // Generate keywords focusing on ARM compatibility
    const keywordsList = [
      app.name,
      'Windows ARM',
      'ARM64',
      'Windows on ARM',
      app.category,
      armStatus.status,
      armStatus.compatibility,
      'Windows ARM apps',
      app.status === 'Available Natively' ? 'native ARM64' : '',
      app.status === 'Available via Emulation' ? 'x64 emulation' : '',
      app.status === 'Not Available' ? 'incompatible' : '',
      'ARM processor',
      'Windows ARM compatibility',
      app.publisher,
      app.category.toLowerCase(),
      'ARM64 apps',
      app.storeLink ? 'Microsoft Store' : '',
      'Windows ARM software'
    ].filter(Boolean)

    // Generate ARM-focused description
    const description = [
      `${app.name} ${armStatus.compatibility} on Windows ARM devices.`,
      app.status === 'Available Natively' 
        ? `This application provides native ARM64 support, offering optimal performance on Windows ARM processors.`
        : app.status === 'Available via Emulation'
        ? `This application runs on Windows ARM through x64 emulation.`
        : `This application is currently not supported on Windows ARM devices.`,
      app.description || app.about,
      `Published by ${app.publisher} for ${app.category}.`,
      app.storeLink ? 'Available on Microsoft Store.' : '',
      app.directDownloadLink ? 'Direct download available.' : '',
      app.highlights ? `Key features: ${app.highlights[0]}` : ''
    ].filter(Boolean).join(' ')

    return {
      title: `${app.name} - ${armStatus.status} | Windows ARM Apps Directory`,
      description: description.substring(0, 160) + '...', // Limit to recommended length
      keywords: keywordsList.join(', '),
      publisher: app.publisher,
      lastUpdated: app.lastUpdated,
      status: app.status,
      category: app.category,
      armStatus: armStatus
    }
  }

  const metadata = getMetadata()

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (!app) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">App Not Found</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">The requested app could not be found.</p>
        <Link 
          href="/"
          className="inline-block bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Return to Directory
        </Link>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
        
        {/* Open Graph tags */}
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Windows ARM Apps Directory" />
        {app?.icon && <meta property="og:image" content={app.icon} />}
        <meta property="og:url" content={`https://windowsarm.org/app/${params.app}`} />
        
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={metadata.title} />
        <meta name="twitter:description" content={metadata.description} />
        {app?.icon && <meta name="twitter:image" content={app.icon} />}

        {/* ARM-specific metadata with null checking */}
        <meta name="arm-compatibility" content={app?.status || ''} />
        {metadata.armStatus && (
          <meta name="arm-support-type" content={metadata.armStatus.detail} />
        )}
        
        {/* Schema.org markup with null checking */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": app?.name,
            "applicationCategory": metadata.category,
            "operatingSystem": "Windows ARM",
            "processorRequirements": metadata.armStatus?.detail || 'Unknown',
            "description": metadata.description,
            "author": {
              "@type": "Organization",
              "name": metadata.publisher
            },
            "dateModified": metadata.lastUpdated,
            "applicationSubCategory": metadata.status,
            "requirements": metadata.armStatus 
              ? `Windows ARM - ${metadata.armStatus.compatibility}`
              : 'Windows ARM',
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            }
          })}
        </script>
      </Head>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
          <div className="p-6">
            <div className="flex flex-col md:flex-row md:items-start gap-6">
              <div className="relative h-32 w-32 flex-shrink-0 mx-auto md:mx-0">
                <Image
                  src={app.icon}
                  alt={app.name}
                  layout="fill"
                  className="rounded-full object-cover"
                  onError={(e: any) => { e.target.src = '/defaultappicon.jpg' }}
                />
              </div>
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">{app.name}</h1>
                  <div className="flex items-center justify-center md:justify-start gap-2">
                    {getStatusIcon(app.status)}
                    <span className="text-sm text-gray-600 dark:text-gray-400">{app.status}</span>
                  </div>
                </div>
                
                <div className="mt-4 space-y-3 text-gray-600 dark:text-gray-400">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <p className="text-sm">
                      <span className="font-semibold">Publisher:</span> {app.publisher}
                    </p>
                    <p className="text-sm">
                      <span className="font-semibold">Category:</span> {app.category}
                    </p>
                    <p className="text-sm">
                      <span className="font-semibold">Last Updated:</span> {format(new Date(app.lastUpdated), 'MMMM d, yyyy')}
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row justify-center md:justify-start gap-4">
                  {app.directDownloadLink && (
                    <a
                      href={app.directDownloadLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center px-6 py-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                    >
                      <FaDownload className="mr-2" />
                      <span>Download Directly</span>
                    </a>
                  )}
                  {app.storeLink && (
                    <a
                      href={app.storeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center px-6 py-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                    >
                      <div className="relative w-6 h-6 mr-2">
                        <Image
                          src="/downloadfromstore.png"
                          alt="Download from Store"
                          layout="fill"
                          objectFit="contain"
                        />
                      </div>
                      <span>Download from Microsoft Store</span>
                    </a>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6">
              {app.description && (
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">About {app.name}</h2>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {app.description}
                  </p>
                </div>
              )}
              
              {app.highlights && app.highlights.length > 0 && (
                <div className="mt-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Key Features</h2>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {app.highlights.map((highlight, index) => (
                      <li 
                        key={index}
                        className="flex items-start gap-2 text-gray-600 dark:text-gray-400"
                      >
                        <span className="text-blue-500 mt-1">•</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Disclaimer</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            The information provided about {app.name} is community-contributed and may not be current. 
            All trademarks, product names, and company names or logos mentioned here are the property of their respective owners. 
            Please verify compatibility and performance on your specific device before downloading or purchasing.
          </p>
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/"
            className="inline-flex items-center text-blue-500 hover:text-blue-600 transition-colors"
          >
            <span className="mr-2">←</span>
            <span>Back to Directory</span>
          </Link>
        </div>
      </div>
    </>
  )
}

export default AppPage