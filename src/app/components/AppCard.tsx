import { useState } from 'react'
import { FaDownload, FaCheckCircle, FaTimesCircle, FaQuestionCircle, FaExclamationTriangle } from 'react-icons/fa'
import Image from 'next/image'
import Link from 'next/link'
import { format } from 'date-fns'

interface AppCardProps {
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

const AppCard: React.FC<AppCardProps> = ({
  id,
  name,
  slug,
  category,
  status,
  directDownloadLink,
  storeLink,
  remarks,
  icon,
  publisher,
  lastUpdated
}) => {
  const [imgSrc, setImgSrc] = useState(icon)

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return format(date, 'MMM d, yyyy')
    } catch {
      return dateString
    }
  }

  const getStatusIcon = () => {
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

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
      <div className="p-6">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 mr-4 relative">
            <Image
              src={imgSrc}
              alt={`${name} icon`}
              layout="fill"
              objectFit="cover"
              className="rounded-full"
              onError={() => setImgSrc('/defaultappicon.jpg')}
            />
          </div>
          <div>
            <Link 
              href={`/app/${slug}`}
              className="text-xl font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              {name}
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-400">{category}</p>
          </div>
        </div>
        <div className="flex items-center mb-4">
          <span className="mr-2">{getStatusIcon()}</span>
          <span className="text-sm text-gray-700 dark:text-gray-300">{status}</span>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{remarks}</p>
        <div className="flex flex-col sm:flex-row gap-2">
          <a
            href={directDownloadLink || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center justify-center px-4 py-2 rounded-full transition-colors ${
              directDownloadLink
                ? 'bg-blue-500 text-white hover:bg-blue-600'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            onClick={(e) => !directDownloadLink && e.preventDefault()}
          >
            <FaDownload className="mr-2" />
            Download
          </a>
          {storeLink && (
            <a
              href={storeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center px-4 py-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors"
            >
              <div className="relative w-6 h-6 mr-2">
                <Image
                  src="/downloadfromstore.png"
                  alt="Download from Store"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
              Store
            </a>
          )}
        </div>
        
      </div>
    </div>
  )
}

export default AppCard