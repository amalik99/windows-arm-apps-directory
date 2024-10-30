import { FaDownload, FaCheckCircle, FaTimesCircle, FaQuestionCircle, FaExclamationTriangle } from 'react-icons/fa'
import Image from 'next/image'
import Link from 'next/link'
import { format } from 'date-fns'

interface AppListProps {
  apps: Array<{
    id: string
    name: string
    category: string
    status: string
    directDownloadLink: string | null
    storeLink: string | null
    about: string
    icon: string
    slug: string
    publisher: string
    lastUpdated: string
  }>
}

const AppList: React.FC<AppListProps> = ({ apps }) => {
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

  const DownloadButtons = ({ app }: { app: AppListProps['apps'][0] }) => (
    <div className="flex flex-nowrap gap-2">
      <a
        href={app.directDownloadLink || '#'}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
          app.directDownloadLink
            ? 'bg-blue-500 text-white hover:bg-blue-600'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
        onClick={(e) => !app.directDownloadLink && e.preventDefault()}
      >
        <FaDownload className="mr-1.5 w-4 h-4" />
        Download
      </a>
      {app.storeLink && (
        <a
          href={app.storeLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-blue-500 text-white hover:bg-blue-600 transition-colors whitespace-nowrap"
        >
          <div className="relative w-4 h-4 mr-1.5">
            <Image
              src="/downloadfromstore.png"
              alt="Store"
              layout="fill"
              objectFit="contain"
            />
          </div>
          Store
        </a>
      )}
    </div>
  )

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return format(date, 'MMM d, yyyy')
    } catch {
      return dateString
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
      {/* Mobile View */}
      <div className="md:hidden">
        {apps.map((app) => (
          <div key={app.id} className="p-4 border-b border-gray-200 dark:border-gray-600 last:border-b-0">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <div className="h-12 w-12 relative flex-shrink-0">
                  <Image
                    src={app.icon}
                    alt={app.name}
                    layout="fill"
                    className="rounded-lg object-cover"
                    onError={(e: any) => { e.target.src = '/defaultappicon.jpg' }}
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <Link
                    href={`/app/${encodeURIComponent(app.slug)}`}
                    className="font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {app.name}
                  </Link>
                  <span className="inline-block px-2 py-0.5 text-xs rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                    {app.category}
                  </span>
                </div>
              </div>
              <div className="ml-2">{getStatusIcon(app.status)}</div>
            </div>
            
            {app.about && (
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{app.about}</p>
            )}
            
            <div className="mt-3">
              <DownloadButtons app={app} />
            </div>
          </div>
        ))}
      </div>

      {/* Desktop View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">App</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Category</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">about</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Download</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
            {apps.map((app) => (
              <tr key={app.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 relative flex-shrink-0">
                      <Image
                        src={app.icon}
                        alt={app.name}
                        layout="fill"
                        className="rounded-lg object-cover"
                        onError={(e: any) => { e.target.src = '/defaultappicon.jpg' }}
                      />
                    </div>
                    <div className="ml-4">
                      <Link
                        href={`/app/${encodeURIComponent(app.slug)}`}
                        className="text-sm font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      >
                        {app.name}
                      </Link>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{app.publisher}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-sm rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                    {app.category}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusIcon(app.status)}
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400 max-w-xs">{app.about}</p>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <DownloadButtons app={app} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AppList