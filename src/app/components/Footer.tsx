const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-6">
      <div className="container mx-auto px-4">
        <p className="text-center text-gray-600 dark:text-gray-300">
          &copy; {new Date().getFullYear()} Free to use, Open Source directory for Windows ARM Apps.{' '}
          <a 
            href="https://github.com/amalik99/windows-arm-apps-directory" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors underline"
          >
            Visit GitHub Repository
          </a>
        </p>
      </div>
    </footer>
  )
}

export default Footer