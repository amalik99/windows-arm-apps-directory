import { FaLayerGroup, FaCheckCircle } from 'react-icons/fa'
import ViewToggle from './ViewToggle'

interface FilterOptionsProps {
  categories: string[]
  statuses: string[]
  onCategoryChange: (category: string) => void
  onStatusChange: (status: string) => void
  isListView: boolean
  onViewChange: (isListView: boolean) => void
}

const FilterOptions: React.FC<FilterOptionsProps> = ({
  categories,
  statuses,
  onCategoryChange,
  onStatusChange,
  isListView,
  onViewChange
}) => {
  return (
    <div className="flex flex-col gap-3 w-full">
      {/* Filters and View Toggle Row */}
      <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <select
            onChange={(e) => onCategoryChange(e.target.value)}
            className="w-full sm:w-auto px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <select
            onChange={(e) => onStatusChange(e.target.value)}
            className="w-full sm:w-auto px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
          >
            <option value="">All Statuses</option>
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        {/* View Toggle */}
        <div className="w-full sm:w-auto flex justify-center sm:justify-end sm:ml-auto">
          <ViewToggle isListView={isListView} onViewChange={onViewChange} />
        </div>
      </div>
    </div>
  )
}

export default FilterOptions