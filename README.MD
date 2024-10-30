# Windows ARM Apps Directory - windowsarm.org

A comprehensive, community-maintained directory of applications compatible with Windows ARM64 devices.

## Project Overview

This web application serves as a directory for applications that are compatible with Windows ARM64 devices (Qualcomm chips). It allows users to browse, search, and filter applications based on their compatibility status and category. The directory aims to help users find native ARM64 applications, as well as those that run through emulation on Windows ARM devices.

## ## Hosted on WindowsARM.org

This project is hosted on [WindowsARM.org](https://windowsarm.org).


## How to Contribute

We welcome contributions from the community to help keep this directory up-to-date and comprehensive. Here's how you can contribute:

1. Fork the repository at [https://github.com/amalik99/windows-arm-apps-directory](https://github.com/amalik99/windows-arm-apps-directory)
2. Make your changes to the `apps.json` file in the `public/data` directory
3. Submit a pull request with your changes

### Updating the JSON File

When updating the `apps.json` file, please follow these guidelines:

1. Ensure all required fields are filled out for each app entry
2. Use consistent formatting and follow the existing JSON structure
3. Provide accurate and up-to-date information

Here's an example of the JSON structure for an app entry:

json
{
"id": "unique_id",
"name": "App Name",
"category": "App Category",
"status": "Available Natively",
"directDownloadLink": "https://example.com/download",
"storeLink": "https://www.microsoft.com/store/productId/XXXXX",
"about": "Brief description or notes about the app",
"icon": "https://example.com/app-icon.png"
}


Fields to update:
- `id`: A unique identifier for the app (use a new number or string)
- `name`: The official name of the application
- `category`: The primary category of the app (e.g., Development, Graphics, Productivity)
- `status`: One of the following: "Available Natively", "Available in Emulation", or "Not Available"
- `directDownloadLink`: Direct download link from the official website (use `null` if not available)
- `storeLink`: Microsoft Store link (use `null` if not available)
- `about`: Brief notes about the app's compatibility or performance on ARM
- `icon`: URL to the app's icon image (preferably from the official source)

Please ensure that all information is accurate and up-to-date. If you're unsure about any details, it's better to leave them blank or mark them as unknown.

## Disclaimer

This directory is community-maintained and is not officially affiliated with Microsoft or any of the application developers listed. All application names, logos, and trademarks are the property of their respective owners. The information provided in this directory is for informational purposes only and does not constitute any endorsement or guarantee of compatibility or performance.

## Deployment

This project is set up for easy deployment on Vercel. For other deployment platforms, follow their respective documentation for deploying Next.js applications.

## License

This project is licensed under the MIT License.