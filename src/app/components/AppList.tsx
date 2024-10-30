import { FaDownload, FaCheckCircle, FaTimesCircle, FaQuestionCircle, FaExclamationTriangle } from 'react-icons/fa'
import Image from 'next/image'

interface AppListProps {
  apps: Array<{
    id: string
    name: string
    category: string
    status: string
    directDownloadLink: string | null
    storeLink: string | null
    remarks: string
    icon: string
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
      case 'Unknown':
        return <FaQuestionCircle className="text-gray-500 w-5 h-5" title="Unknown" />
      default:
        return <FaQuestionCircle className="text-gray-500 w-5 h-5" title="Unknown" />
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">App</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Remarks</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Download Options</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
            {apps.map((app) => (
              <tr key={app.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="h-10 w-10 relative flex-shrink-0">
                      <Image
                        src={app.icon}
                        alt={`${app.name} icon`}
                        layout="fill"
                        className="rounded-full object-cover"
                        onError={(e: any) => {
                          e.target.src = '/defaultappicon.jpg'
                        }}
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{app.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full bg-gray-100 dark:bg-gray-600 text-gray-800 dark:text-gray-200">
                    {app.category}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    {getStatusIcon(app.status)}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400 max-w-xs">{app.remarks}</p>
                </td>
                <td className="px-6 py-4">
                  <div className="flex space-x-2">
                    <a
                      href={app.directDownloadLink || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        app.directDownloadLink
                          ? 'bg-blue-500 text-white hover:bg-blue-600'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                      onClick={(e) => !app.directDownloadLink && e.preventDefault()}
                    >
                      <FaDownload className="mr-2" />
                      Download
                    </a>
                    {app.storeLink && (
                      <a
                        href={app.storeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-500 text-white hover:bg-blue-600 transition-colors"
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