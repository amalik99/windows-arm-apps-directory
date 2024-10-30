import Head from 'next/head'
import Link from 'next/link'

export default function Contribute() {
  return (
    <>
    <Head>
      <title>Contribute to Windows ARM Apps Directory</title>
      <meta name="description" content="Learn how to contribute to our comprehensive directory of applications compatible with Windows ARM64 devices." />
      <meta name="keywords" content="contribute, Windows ARM, ARM64, applications, directory, submit app" />
    </Head>
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Contribute to the Directory</h1>
      <p className="mb-4">
        We welcome contributions from the community to help keep this directory up-to-date and comprehensive.
        There are two main ways you can contribute:
      </p>
      
      <h2 className="text-2xl font-bold mb-2">1. Submit an App</h2>
      <p className="mb-4">
        The easiest way to contribute is to use our "Submit App" feature on the home page. This allows you to quickly add a new app to our directory:
      </p>
      <ol className="list-decimal list-inside mb-4 ml-4">
        <li className="mb-2">Go to the <Link href="/" className="text-blue-600 hover:underline">home page</Link></li>
        <li className="mb-2">Click on the "Submit App" button</li>
        <li className="mb-2">Fill out the form with the app's details</li>
        <li className="mb-2">Submit the form</li>
      </ol>
      <p className="mb-4">
        Our team will review your submission and add it to the directory if it meets our criteria.
      </p>

      <h2 className="text-2xl font-bold mb-2">2. Contribute via GitHub</h2>
      <p className="mb-4">
        For more advanced users or those who want to make multiple changes, you can contribute directly via GitHub:
      </p>
      <ol className="list-decimal list-inside mb-4 ml-4">
        <li className="mb-2">Fork the repository at <a href="https://github.com/amalik99/windows-arm-apps-directory" className="text-blue-600 hover:underline">https://github.com/amalik99/windows-arm-apps-directory</a></li>
        <li className="mb-2">Make your changes to the `apps.json` file in the data directory</li>
        <li className="mb-2">Submit a pull request with your changes</li>
      </ol>

      <h2 className="text-2xl font-bold mb-2">Legal Notice</h2>
      <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <p className="text-sm mb-2">
          When contributing to this directory, please ensure that:
        </p>
        <ul className="list-disc list-inside text-sm mb-4 ml-4">
          <li className="mb-1">You only submit publicly available information</li>
          <li className="mb-1">You respect all intellectual property rights</li>
          <li className="mb-1">You provide accurate and verifiable information</li>
          <li className="mb-1">You don't include any proprietary or confidential information</li>
        </ul>
        <p className="text-sm">
          This directory does not claim ownership of any trademarks, logos, or brand names. 
          All submissions are subject to review and may be modified or removed at any time.
        </p>
      </div>

      <h2 className="text-2xl font-bold mb-2">Contribution Guidelines</h2>
      <ul className="list-disc list-inside mb-4 ml-4">
        <li className="mb-2">Ensure all required fields are filled out for each app entry</li>
        <li className="mb-2">Use consistent formatting and follow the existing JSON structure</li>
        <li className="mb-2">Provide accurate and up-to-date information</li>
        <li className="mb-2">Include a brief description of your changes in the pull request</li>
      </ul>
      <p className="mb-4">
        Thank you for helping to improve the Native Apps for Windows ARM - Directory!
      </p>

      <h2 className="text-2xl font-bold mb-2">Reporting Issues</h2>
      <p>
        In case of any issues, please report them to the <a href="https://github.com/amalik99/windows-arm-apps-directory/issues" className="text-blue-600 hover:underline">GitHub repository</a>.
      </p>
    </div>
    </>
  )
}