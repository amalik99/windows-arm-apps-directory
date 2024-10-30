import { FaThLarge, FaList } from 'react-icons/fa'

interface ViewToggleProps {
  isListView: boolean
  onViewChange: (isListView: boolean) => void
}

const ViewToggle: React.FC<ViewToggleProps> = ({ isListView, onViewChange }) => {
  return (
    <div className="flex bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 rounded-full">
      <button
        onClick={() => onViewChange(false)}
        className={`p-2 rounded-l-full transition-colors ${
          !isListView
            ? 'bg-blue-500 text-white'
            : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
        }`}
      >
        <FaThLarge className="w-5 h-5" />
      </button>
      <button
        onClick={() => onViewChange(true)}
        className={`p-2 rounded-r-full transition-colors ${
          isListView
            ? 'bg-blue-500 text-white'
            : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
        }`}
      >
        <FaList className="w-5 h-5" />
      </button>
    </div>
  )
}

export default ViewToggle