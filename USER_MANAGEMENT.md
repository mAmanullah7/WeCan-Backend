# User Management Feature

## Overview
The User Management feature allows administrators to view and manage all registered users in the WeCan system.

## Features
- **User Listing**: View all registered users with pagination
- **Search**: Search users by name or email
- **Filter**: Filter users by role (User/Admin)
- **Role Management**: Change user roles between 'user' and 'admin'
- **User Deletion**: Remove users from the system (with confirmation)
- **User Statistics**: View counts of total users, regular users, and administrators

## Access
Only users with 'admin' role can access the user management page.

## Navigation
1. Login as an admin user
2. Go to Admin Dashboard (`/admin`)
3. Click on "User Management" card or navigate to `/admin/users`

## API Endpoints

### GET /api/users
Fetch all users with pagination and filtering options.

**Query Parameters:**
- `search` (optional): Search term for name/email
- `role` (optional): Filter by role ('user' or 'admin')
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)

**Response:**
```json
{
  "users": [
    {
      "_id": "user_id",
      "name": "User Name",
      "email": "user@example.com",
      "role": "user",
      "createdAt": "2025-05-27T00:00:00.000Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalUsers": 50,
    "hasNextPage": true,
    "hasPrevPage": false
  }
}
```

### PATCH /api/users
Update user role.

**Request Body:**
```json
{
  "userId": "user_id",
  "role": "admin"
}
```

### DELETE /api/users
Delete a user.

**Query Parameters:**
- `userId`: ID of the user to delete

## Security
- Only authenticated admin users can access the API endpoints
- Users cannot delete themselves
- Role changes are logged and validated

## Database Schema
The User model includes:
- `name`: User's full name
- `email`: User's email address (unique)
- `password`: Hashed password
- `role`: User role ('user' or 'admin')
- `createdAt`: Account creation timestamp

## Testing
Use the sample users script to create test data:
```bash
node scripts/create-sample-users.js
```

This will create sample users with different roles for testing the user management functionality.

## Files Added/Modified
- `src/app/api/users/route.ts` - API endpoints for user management
- `src/app/admin/users/page.tsx` - User management page component
- `src/app/admin/page.tsx` - Added navigation card to user management
- `scripts/create-sample-users.js` - Script to create sample test data
