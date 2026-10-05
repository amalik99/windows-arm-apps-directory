const BOOKING_WIDGET = 'w_qprxet05sb'
const BOOKING_URL = `https://bookingsxp.com/book/${BOOKING_WIDGET}`
const BOOKINGSXP_LOADER = 'https://bookingsxp.com/embed/v1.js'

type BookingsXPWindow = Window & {
  BookingsXP?: { open?: (options: { widget: string; accent?: string; theme?: string }) => unknown }
}

// Opens the BookingsXP popup. The loader is fetched on first click so it is not on every page;
// if it can't load, the link falls through to the hosted booking page.
const openBookCall = (event: React.MouseEvent<HTMLAnchorElement>) => {
  if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
  const w = window as BookingsXPWindow
  const open = () => w.BookingsXP?.open?.({ widget: BOOKING_WIDGET, accent: '#2563eb', theme: 'dark' })
  event.preventDefault()
  if (w.BookingsXP?.open) {
    open()
    return
  }
  if (document.querySelector(`script[src="${BOOKINGSXP_LOADER}"]`)) return
  const script = document.createElement('script')
  script.src = BOOKINGSXP_LOADER
  script.async = true
  script.onload = () => (w.BookingsXP?.open ? open() : window.location.assign(BOOKING_URL))
  script.onerror = () => window.location.assign(BOOKING_URL)
  document.head.appendChild(script)
}

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
          <span className="mx-2" aria-hidden="true">&middot;</span>
          <a
            href={BOOKING_URL}
            onClick={openBookCall}
            className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors underline"
          >
            Book a call
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer