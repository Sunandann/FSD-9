# Experiment 9 - Screenshot Documentation

This folder contains the frontend integration screenshots for **Experiment 9: Frontend Integration with RBAC (React + Session-Based UI)**.

## Backend and Frontend Context

- Backend: Spring Boot RBAC APIs (Experiment 7)
- Frontend: React + Bootstrap + Material UI
- Auth mode: Session-based UI using `sessionStorage`
- Roles tested: `USER`, `ADMIN`

## Screenshot Index

| No. | Screenshot File | What It Demonstrates |
| ----- | ----------------- | ---------------------- |
| 1 | `login.png` | Login screen UI for username/password authentication |
| 2 | `userdashboard.png` | USER role dashboard and user-level access |
| 3 | `admindashboard.png` | ADMIN role dashboard and admin-level access |
| 4 | `apiresponse.png` | API response validation for role-based endpoint behavior |

## 1. Login UI

Shows the RBAC login page where users enter credentials.

![Login UI](./login.png)

## 2. USER Dashboard Access

Shows successful access to USER-side features after login.

![User Dashboard](./userdashboard.png)

## 3. ADMIN Dashboard Access

Shows successful access to ADMIN-only features.

![Admin Dashboard](./admindashboard.png)

## 4. API Response Verification

Shows role-based API response behavior used to verify authorization.

![API Response](./apiresponse.png)

## Additional Recommended Captures

For complete submission quality, also include these extra screenshots in this folder:

- USER denied access to ADMIN-only route (403/Access Denied flow)
- Browser `sessionStorage` showing role and auth values
- Unauthorized request handling from frontend (redirect/error state)

You can add them later and update this README with the new file names.
