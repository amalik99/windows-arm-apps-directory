const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-6">
      <div className="container mx-auto px-4">
        <div className="text-center text-gray-600 dark:text-gray-300">
          <p className="mb-2">
            &copy; {new Date().getFullYear()} Free to use, Open Source directory for Windows ARM Apps.
          </p>
          <p className="text-sm mb-2">
            All product names, logos, brands, trademarks and registered trademarks are property of their respective owners. 
            All company, product and service names used in this directory are for identification purposes only.
          </p>
          <p className="text-sm mb-2">
            This is a community-driven directory. Information may not be accurate or up-to-date. 
            No guarantees are made regarding app compatibility or performance.
          </p>
          <a 
            href="https://github.com/amalik99/windows-arm-apps-directory" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors underline"
          >
            Visit GitHub Repository
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer