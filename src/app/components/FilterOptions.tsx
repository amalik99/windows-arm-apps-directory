import { FaLayerGroup, FaCheckCircle } from 'react-icons/fa'

interface FilterOptionsProps {
  categories: string[]
  statuses: string[]
  onCategoryChange: (category: string) => void
  onStatusChange: (status: string) => void
}

const FilterOptions: React.FC<FilterOptionsProps> = ({
  categories,
  statuses,
  onCategoryChange,
  onStatusChange
}) => {
  return (
    <div className="flex space-x-4">
      <div className="relative">
        <select
          onChange={(e) => onCategoryChange(e.target.value)}
          className="appearance-none bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-full py-2 pl-10 pr-8 focus:outline-none focus:border-blue-500 transition-colors"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <FaLayerGroup className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-300" />
      </div>
      <div className="relative">
        <select
          onChange={(e) => onStatusChange(e.target.value)}
          className="appearance-none bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-full py-2 pl-10 pr-8 focus:outline-none focus:border-blue-500 transition-colors"
        >
          <option value="">All Statuses</option>
          {statuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
        <FaCheckCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-300" />
      </div>
    </div>
  )
}

export default FilterOptions