# Restricted Access Feature

## Overview

The Restricted Access feature is a security mechanism designed to control user access to specific parts of the application based on their Decentralized Identifier (DID). This feature ensures that only authorized users can access restricted sections, enhancing the application's overall security and user management.

## Key Components

1. **`useRestrictedAccess` Hook**

   - **Location:** `src/features/restricted-access/hooks/use-restricted-access.ts`
   - **Purpose:** Fetches the user's access status based on their DID.
   - **Details:** Utilizes React Query for data fetching and caching to efficiently manage access status retrieval.

2. **`RestrictedAccessStatus` Type**

   - **Location:** `src/features/restricted-access/types/index.ts`
   - **Purpose:** Defines the possible access statuses: `"allowed"` or `"denied"`.

3. **API Route**

   - **Location:** `src/app/api/restricted-access/route.ts`
   - **Purpose:** Handles the server-side logic for determining user access.
   - **Details:** Interfaces with a Notion database to store and retrieve access information, ensuring centralized management of access control data.

4. **Restricted Access Handler**

   - **Location:** `src/app/(connected)/_components/restricted-access-handler.tsx`
   - **Purpose:** Manages the UI flow based on the user's access status, ensuring that unauthorized users are redirected or shown appropriate messages.

5. **Restricted Access Page Content**

   - **Location:** `src/app/(connected)/_components/restricted-access-page-content.tsx`
   - **Purpose:** Displays content specifically tailored for users with restricted access, ensuring a seamless user experience.

## API Route Details

The API route (`/api/restricted-access`) is a crucial part of this feature. Here's how it operates:

1. **Request Handling:**

   - **Method:** GET
   - **Parameters:** Receives the user's DID as a query parameter.

2. **Database Interaction:**

   - **Database Used:** Notion
   - **Functionality:** Connects to the Notion database that stores access information, querying to verify if the provided DID exists in the list of allowed DIDs.

3. **Response Generation:**
   - **Allowed:** Returns an access status of `"allowed"` if the DID is found.
   - **Denied:** Returns an access status of `"denied"` if the DID is not found.

This approach facilitates easy management of access control through the Notion interface, allowing quick updates to the list of allowed DIDs without necessitating code changes.

## Setup

### Environment Variables

- Ensure the following variables are set in the environment:
  ```env
  NOTION_API_KEY=your_notion_api_key
  NOTION_DATABASE_ID=your_notion_database_id
  ```

## Usage

### Access Control in Components

To utilize the Restricted Access feature within your React components:

1. **Import the Hook:**

   ```typescript
   import { useRestrictedAccess } from "@/features/restricted-access/hooks/use-restricted-access"
   ```

2. **Use the Hook:**

   ```typescript
   const { access, isLoading, error } = useRestrictedAccess()

   if (isLoading) return <div>Loading...</div>
   if (error) return <div>Error: {error.message}</div>

   return access === "allowed" ? <ProtectedContent /> : <AccessDenied />
   ```

## Configuration

### React Query Settings

The `useRestrictedAccess` hook utilizes React Query with specific configurations:

- **Stale Time:** 24 hours (`staleTime: 1000 * 60 * 60 * 24`)
- **Garbage Collection Time:** 24 hours (`gcTime: 1000 * 60 * 60 * 24`)

These settings ensure that the access status is cached efficiently, reducing unnecessary API calls.

---

_This README was generated with the assistance of AI._
