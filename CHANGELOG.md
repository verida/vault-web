# 1.0.2 (2025-05-05)

## Bug Fixes

- Update ThirdWeb custom RPC fallback

## Misc

- Update dependencies

# 1.0.1 (2025-04-23)

## Bug Fixes

- Fix ThirdWeb RPC usage

## Misc

- Update dependencies

# 1.0.0 (2025-04-16)

First official release

## Enhancements

- Support alternative sign-in methods (Google, Apple, Discord, Telegram, X, Passkeys, Email, Crypto Wallets)

## Misc

- Update dependencies

# 0.18.0 (2025-03-12)

## Enhancements

- Add user profile feature
- Add a Discovery page showcasing applications integrating Verida
- Add Terms & Conditions in Identity menu
- Add loading state for data connections in the onboarding
- Reworked the application layout (header)

## Misc

- Update dependencies

# 0.17.0 (2025-03-03)

## Enhancements

- View authorized applications via Verida Auth
- Allow users to revoke access to authorized applications
- Allow users to create new Verida Auth authorization tokens
- Add QR code for easier Verida Wallet installation in onboarding
- Improve data connections display in onboarding

## Misc

- Remove redundant data connections sync on app load
- Update dependencies

# 0.16.0 (2025-02-24)

## Enhancements

- Add onboarding for new Verida users

## Misc

- Update dependencies

# 0.15.0 (2025-02-12)

## Enhancements

- Improve UI of Verida Auth

## Misc

- Add license
- Set up Plausible integration
- Update dependencies

# 0.14.0 (2025-02-04)

## Enhancements

- Improve Verida Auth consent flow

## Misc

- Update dependencies

# 0.13.0 (2025-02-03)

## Enhancements

- Implement Verida Auth request consent flow
- Implement user profile request feature

## Misc

- Update dependencies

# 0.12.0 (2025-01-09)

## Enhancements

- Support responding to inbox data request and incoming data messages
- Improve internal support of JSON schemas

## Misc

- Update dependencies

# 0.11.0 (2024-12-31)

## Enhancements

- Use new agent-based AI assistant
- Display upcoming data connections
- Display security details in a dialog rather than a popover
- Display error message if access check fails

## Misc

- Rework inbox feature implementation (dev only for now)
- Prepare OAuth integration and authorized apps management (dev only for now)
- Upgrade Verida SDK
- Update other dependencies

# 0.10.0 (2024-12-05)

## Enhancements

- Implement multi AI assistants support
- Implement user-saved AI assistant prompts
- Allow user to order their saved prompts
- Allow configuring a prompt before sending it (dev only for now)
- Prevent using AI assistant before data pre-loading is completed
- Add security details on AI assistant, data and connectors page
- Improve data rendering in item panel
- Update SEO meta image

## Bug fixes

- Fix layout and scroll on assistant page
- Hide inbox when access is limited

## Misc

- Cache the restricted access result if allowed
- Implement reusable foundations for standard sheets
- Use nuqs library for type-safe search params
- Update dependencies

# 0.9.0 (2024-11-19)

## Enhancements

- Adjust the processing time displayed in the assistant output
- Update meta tags for SEO
- Adapt page title based on active page
- Remove cache on restrited access check

## Bug Fixes

- Fix loading spinner on iOS
- Fix background colour on iOS status bar

## Misc

- Move default LLM model to env var

# 0.8.0 (2024-11-12)

## Enhancements

- Improve performance for loading Verida identity profile
- Add ability to delete a data record
- Add ability to destroy a whole database
- Move inbox link from navigation to icon button in header

## Bug fixes

- Fix assistant error for invalid response
- Fix data item not found when opening it
- Fix incorrect processing time and data status in assistant

## Misc

- Create CHANGELOG.md
- Update dependencies

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
