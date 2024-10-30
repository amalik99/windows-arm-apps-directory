import { useState } from 'react'
import { FaTimes } from 'react-icons/fa'

interface SubmitAppFormProps {
  onClose: () => void
}

const SubmitAppForm: React.FC<SubmitAppFormProps> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    status: '',
    directDownloadLink: '',
    storeLink: '',
    about: '',
    icon: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN
      if (!token) {
        throw new Error('Failed: GitHub token is not set in environment variables, submit is not working')
      }

      const owner = 'amalik99'
      const repo = 'windows-arm-apps-directory'

      // Create an issue
      const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/issues`, {
        method: 'POST',
        headers: {
          'Authorization': `token ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: `New App Submission from WindowsARM.ORG: ${formData.name}`,
          body: `
A new app has been submitted for the Windows ARM Apps Directory:

- **Name**: ${formData.name}
- **Category**: ${formData.category}
- **Status**: ${formData.status}
- **Direct Download Link**: ${formData.directDownloadLink || 'N/A'}
- **Store Link**: ${formData.storeLink || 'N/A'}
- **about**: ${formData.about || 'N/A'}
- **Icon URL**: ${formData.icon || 'N/A'}

Please review this submission and add it to the directory if appropriate.
          `,
          labels: ['new app submission']
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to create GitHub issue')
      }

      setSubmitSuccess(true)
    } catch (error) {
      console.error('Error submitting app:', error)
      // You might want to show an error message to the user here
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitSuccess) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg max-w-md w-full">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Thank You!</h2>
          <p className="text-gray-700 dark:text-gray-300">Your app submission has been received. An issue has been created in our GitHub repository for review. We'll process your submission within 7 days.</p>
          <button
            onClick={onClose}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    )
  }

  

  
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg max-w-md w-full">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Submit an App</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
              <FaTimes />
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block mb-1 text-gray-700 dark:text-gray-300">
                App Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="category" className="block mb-1 text-gray-700 dark:text-gray-300">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
              >
                <option value="">Select a category</option>
                <option value="Productivity">Productivity</option>
                <option value="Communication">Communication</option>
                <option value="Creative">Creative</option>
                <option value="Development">Development</option>
                <option value="Utilities">Utilities</option>
                <option value="Media">Media</option>
                <option value="Security">Security</option>
                <option value="Web Browser">Web Browser</option>
                <option value="Personalization">Personalization</option>
                <option value="Gaming">Gaming</option>
                <option value="Education">Education</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="status" className="block mb-1 text-gray-700 dark:text-gray-300">
                Status <span className="text-red-500">*</span>
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
              >
                <option value="">Select a status</option>
                <option value="Available Natively">Available Natively</option>
                <option value="Available via Emulation">Available via Emulation</option>
                <option value="Not Available">Not Available</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="directDownloadLink" className="block mb-1 text-gray-700 dark:text-gray-300">Direct Download Link</label>
              <input
                type="url"
                id="directDownloadLink"
                name="directDownloadLink"
                value={formData.directDownloadLink}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="storeLink" className="block mb-1 text-gray-700 dark:text-gray-300">Microsoft Store Link</label>
              <input
                type="url"
                id="storeLink"
                name="storeLink"
                value={formData.storeLink}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="icon" className="block mb-1 text-gray-700 dark:text-gray-300">Icon URL</label>
              <input
                type="url"
                id="icon"
                name="icon"
                value={formData.icon}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="about" className="block mb-1 text-gray-700 dark:text-gray-300">about</label>
              <textarea
                id="about"
                name="about"
                value={formData.about}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors disabled:bg-gray-400"
            >
              {isSubmitting ? 'Submitting...' : 'Submit App'}
            </button>
          </form>
        </div>
      </div>
    )
  }
  
  export default SubmitAppForm