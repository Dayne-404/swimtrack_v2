# API Endpoints

List of all API endpoints for Swimtrack.

## Authentication Routes

Endpoints for handing authentication.

| Endpoint | Method | Description | Test Status | Route |
|----------|--------|-------------|-------------|-------|
| /auth/login | POST | Log in | [] | <http://localhost:3000/api/auth/login> |
| /auth/logout | POST | Log out | [] | <http://localhost:3000/api/auth/logout> |
| /auth/refresh | POST | Refresh token | [] | <http://localhost:3000/api/auth/refresh> |

## User Routes

Endpoints for managing users.

| Endpoint | Method | Description | Test Status | Route |
|----------|--------|-------------|-------------|-------|
| /users | POST | Create user | [] | <http://localhost:3000/api/users> |
| /users/:targetUserId | PUT | Update user | [] | <http://localhost:3000/api/users/:targetUserId> |
| /users/resetPassword | PUT | Reset user password | [] | **TODO** |
| /users | GET | Get all users | [] | <http://localhost:3000/api/users> |
| /users/:targetUserId | GET | Get user by ID | [] | <http://localhost:3000/api/users/:targetUserId> |

## Worksheet Routes

Endpoints for managing worksheets.

| Endpoint | Method | Description | Test Status | Route |
|----------|--------|-------------|-------------|-------|
| /worksheets | POST | Create worksheet | [] | <http://localhost:3000/api/worksheets> |
| /worksheets/:worksheetId | PUT | Update worksheet | [] | <http://localhost:3000/api/worksheets/:worksheetId> |
| /worksheets | GET | Get all worksheets | [] | <http://localhost:3000/api/worksheets> |
| /worksheets/:worksheetId | GET | Get worksheet by ID | [] | <http://localhost:3000/api/worksheets/:worksheetId> |
| /worksheets/:worksheetId | DELETE | Delete worksheet | [] | <http://localhost:3000/api/worksheets/:worksheetId> |

## Group Routes

Endpoints for managing groups of worksheets.

| Endpoint | Method | Description | Test Status | Route |
|----------|--------|-------------|-------------|-------|
| /groups | POST | Create group | [] | <http://localhost:3000/api/groups> |
| /groups/user/:targetUserId | POST | Create group for user | [] | <http://localhost:3000/api/groups/user/:targetUserId> |
| /groups/:groupId | PUT | Update group | [] | **TODO** |
| /groups/:groupId/worksheets | PUT | Add worksheets to group | [] | <http://localhost:3000/api/groups/:groupId/worksheets> |
| /groups | GET | Get all groups | [] | <http://localhost:3000/api/groups> |
| /groups/:groupId/worksheets | GET | Get worksheets in group | [] | <http://localhost:3000/api/groups/:groupId/worksheets> |
| /groups/user/:targetUserId | GET | Get groups for user | [] | <http://localhost:3000/api/groups/user/:targetUserId> |
| /groups/:groupId/worksheets | DELETE | Remove worksheets from group | [] | <http://localhost:3000/api/groups/:groupId/worksheets> |
| /groups/:groupId | DELETE | Delete group | [] | <http://localhost:3000/api/groups/:groupId> |
