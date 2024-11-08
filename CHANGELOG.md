# 0.7.0 (2024-11-07)

## Enhancements

- Implement UI of assistant prompt v2
- Add file data type
- Update Limited Access copywriting

## Bug fixes

- Fix assistant UI accessibility

## Misc

- Update dependencies

# 0.6.0 (2024-11-01)

## Enhancements

- Display sync details for each connection on the Connections summary page
- Adjust data table layout
- Set the LLM model in the requests

# 0.5.0 (2024-10-31)

## Enhancements

- Add ability to sync all the connections at once
- Update AI Assistant suggested prompts

## Bug fixes

- Fix redirection timing to new connection

## Misc

- Refactor data connection logs table with tanstack table
- Update dependencies

# 0.4.0 (2024-10-29)

## Enhancements

- Display app version in the UI
- Add calendar events data type
- Disable sync connection button when status is not ok

## Bug fixes

- Fix potential invalid datetime format on fetched data
- Fix connection avatar and data in logs when the connection no longer exist

# 0.3.0 (2024-10-29)

## Enhancements

- Reduce cache stale time of the retricted access result
- Automatically trigger data connections sync
- Update Data Connections type following DCS changes

## Bug fixes

- Fix assistant layout when virtual keyboard is displayed on Android Chrome

## Misc

- Update dependencies

# 0.2.0 (2024-10-25)

## Enhancements

- Connections page design
- Update layout matching new design for desktop and mobile
- Update components
- Implement the landing/connection page
- Implement inbox feature
- Ensure each item "screen" has a dedicated URL
- Handle connection with Verida
- Implement inbox data request handling
- Remove "Refer a friend" page and "Connections" from nav bar
- Configure meta tags for SEO and previews in social media
- Implement data page
- Implement AI assistant page
- Rework overall layout
- Define env vars and implement custom logger
- Refactor usage of VaultCommon
- Rework AI assistant page as a simple chat with no history
- Implement the Connections page
- Integrate AI assistant with backend
- Rework colors and primitive UI components
- Implement reusable foundations for dialog UI components
- Implement reusable foundations for modal sheets
- Integrate the Data Connector API
- Harmonise loading, error and not found pages in routes
- Add new Vault databases in Data tab
- Implement toast notification feature
- Integrate private data API to fetch datastore records
- Implement the connection logs page
- Update landing page with AI Assistant feature showcase
- Update private data API integration
- Set up Sentry
- Implement a CTA in assistant if no data or connections
- Implement DID whitelist on connection
- Rework data records table
- Add "invalid-auth" status on data connections
- Implement global search feature
- Check restricted access from Private Data API
- Implement search data type selection
- Update private data API auth method
- Restrict Command dialog when user has limited access
- Update X logo
- Implement React Query persistence for all non-private data

## Bug fixes

- Fix CI issue
- Fix UI issues of identity dropdown menu
- Fix accessibility in identity dropdown menu
- Fix Verida Connect showing two QR codes
- Fix verida Connect with existing session
- Fix navigation menu in narrow layout

## Misc

- Set up CI
- Harmonise logs and logger categories
- Harmonise file names and remove barrel files
- Define necessary predefined variables and set up eslint and prettier plugins
- Update dependencies
- Clean up dependencies
- Restructure the repository with `/src`

# 0.1.0 (2024-02-13)

Intial release of the application
