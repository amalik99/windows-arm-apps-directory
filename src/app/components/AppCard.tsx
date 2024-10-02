import { useState } from 'react'
import { FaDownload } from 'react-icons/fa'
import Image from 'next/image'

interface AppCardProps {
  name: string
  category: string
  status: string
  directDownloadLink: string | null
  storeLink: string | null
  remarks: string
  icon: string
}

const AppCard: React.FC<AppCardProps> = ({
  name,
  category,
  status,
  directDownloadLink,
  storeLink,
  remarks,
  icon
}) => {
  const [imgSrc, setImgSrc] = useState(icon)

  const getStatusIcon = () => {
    switch (status) {
      case 'Available Natively':
        return <span className="text-green-500">●</span>
      case 'Available via Emulation':
        return <span className="text-yellow-500">●</span>
      case 'Not Available':
        return <span className="text-red-500">●</span>
      case 'Unknown':
        return <span className="text-gray-500">●</span>
      default:
        return <span className="text-gray-500">●</span>
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
              onError={() => setImgSrc('/defaultappicon.jpg')} // Update state on error
            />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{name}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{category}</p>
          </div>
        </div>
        <div className="flex items-center mb-4">
          {getStatusIcon()}
          <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{status}</span>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{remarks}</p>
        <div className="flex space-x-2">
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
          <a
            href={storeLink || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center justify-center px-4 py-2 rounded-full transition-colors ${
              storeLink
                ? 'bg-blue-500 text-white hover:bg-blue-600'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            onClick={(e) => !storeLink && e.preventDefault()}
          >
            <div className="relative w-6 h-6 mr-2">
              <Image
                src="/downloadfromstore.png"
                alt="Download from Store"
                layout="fill"
                objectFit="contain"
                className={storeLink ? '' : 'opacity-50 grayscale'}
              />
            </div>
            Store
          </a>
        </div>
      </div>
    </div>
  )
}

export default AppCard