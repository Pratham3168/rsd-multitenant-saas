# RSD — Office Operations Management Platform

RSD is a MERN-stack application designed to simplify everyday office operations through a centralized workspace. It brings employee administration, department organization, project tracking, attendance, leave management, and other business activities into a single platform.

The project follows a modular architecture with separate frontend and backend applications. Its multi-tenant design is intended to support multiple organizations while keeping their data logically separated.

RSD provides a foundation for developing an office management SaaS product that can be extended with additional modules, workflows, and organization-specific requirements.

## Features

### Employee and Organization Management
- Maintain employee profiles and organizational records.
- Organize employees into departments.
- Manage attendance information and leave-related records.
- Store employment contracts and payroll-related data.

### Project and Task Management
- Organize projects and associated tasks.
- Maintain client information.
- Keep records of company assets.
- Manage meeting-related information.
- Support notifications and activity tracking where implemented.

### Authentication and Access Control
- JWT-based authentication.
- Password hashing using bcryptjs.
- Role-based access control where configured.
- Request validation and centralized error-handling utilities.

### User Interface
- React-based application with reusable components.
- Dashboard and data-table interfaces.
- Client-side navigation using React Router.
- API communication through Axios.
- Responsive layouts for desktop and smaller screens.
- Data visualization and interface animations.

The actual availability of individual features depends on the current implementation in the repository.

## Technology Stack

### Frontend
- React
- Vite
- React Router
- Axios
- Tailwind CSS
- Recharts
- Framer Motion
- date-fns

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Tokens (JWT)
- bcryptjs
- Helmet
- CORS
- Morgan
- express-validator

### Deployment
- Vercel for frontend hosting
- Render for backend hosting
- MongoDB Atlas for database hosting

## Architecture

RSD uses a client-server architecture in which each component has a separate responsibility.

- **Frontend:** Provides the application interface, navigation, forms, dashboards, and API integration.
- **Backend:** Handles incoming requests, authentication, authorization, validation, and application logic.
- **Database:** Stores application records using MongoDB and Mongoose.
- **Multi-tenancy:** Uses tenant-aware data access as the basis for separating records belonging to different organizations.

Tenant isolation depends on correctly implemented authorization checks and database queries. The implementation should be reviewed and tested before handling sensitive production data.

## Project Structure

```text
RSD_SAAS_clean/
├── backend/
│   ├── src/
│   │   ├── config/          # Application and database configuration
│   │   ├── models/          # Mongoose models and schemas
│   │   ├── controllers/     # Request handlers and business logic
│   │   ├── routes/          # API endpoint definitions
│   │   ├── middleware/      # Authentication and request middleware
│   │   ├── utils/            # Shared utilities
│   │   └── seed/             # Database initialization scripts
│   ├── tests/                # Backend tests
│   ├── package.json
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── context/          # Shared application state
│   │   ├── services/         # API communication
│   │   ├── components/       # Reusable UI components
│   │   └── pages/            # Application screens
│   ├── package.json
│   └── vercel.json
├── MULTI-TENANCY.md
├── README.md
└── package-lock.json