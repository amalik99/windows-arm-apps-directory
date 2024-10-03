'use client'
import { useEffect } from 'react'

export default function Contribute() {
    useEffect(() => {
      if (process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID) {
        window.gtag('event', 'page_view', {
          page_title: 'Contribute',
          page_location: window.location.href,
          page_path: '/contribute',
        })
      }
    }, [])

    return (
      <div>
        <h1 className="text-3xl font-bold mb-4">Contribute to the Directory</h1>
        <p className="mb-4">
          We welcome contributions from the community to help keep this directory up-to-date and comprehensive.
          Here's how you can contribute:
        </p>
        <ol className="list-decimal list-inside mb-4">
          <li className="mb-2">Fork the repository at <a href="https://github.com/amalik99/windows-arm-apps-directory" className="text-blue-600 hover:underline">https://github.com/amalik99/windows-arm-apps-directory</a></li>
          <li className="mb-2">Make your changes to the `apps.json` file in data directory.</li>
          <li className="mb-2">Submit a pull request with your changes</li>
        </ol>
        <h2 className="text-2xl font-bold mb-2">Contribution Guidelines</h2>
        <ul className="list-disc list-inside mb-4">
          <li className="mb-2">Ensure all required fields are filled out for each app entry</li>
          <li className="mb-2">Use consistent formatting and follow the existing JSON structure</li>
          <li className="mb-2">Provide accurate and up-to-date information</li>
          <li className="mb-2">Include a brief description of your changes in the pull request</li>
        </ul>
        <p>
          Thank you for helping to improve the Native Apps for Windows ARM - Directory!
        </p>
        <h2 className="text-2xl font-bold mb-2">Reporting Issues</h2>

        <p>
          Incase of any issues, please report them to the <a href="https://github.com/amalik99/windows-arm-apps-directory/issues" className="text-blue-600 hover:underline">GitHub repository</a>.
        </p>
      </div>
    )
  }