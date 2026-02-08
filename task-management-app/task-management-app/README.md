# Task Management Application

A full-stack task management application built with MERN stack (MongoDB replaced with PostgreSQL) featuring JWT authentication, CRUD operations, and interactive dashboard with Chart.js visualizations.

## 🚀 Features

- **User Authentication**: JWT-based secure login and registration
- **Task Management**: Full CRUD operations (Create, Read, Update, Delete)
- **Task Status**: Three status levels - Todo, In Progress, Completed
- **Dashboard Analytics**: Interactive charts using Chart.js
  - Pie chart showing task distribution
  - Bar chart displaying task statistics
- **Real-time Statistics**: Task counts by status
- **Search & Filter**: Search tasks by title and filter by status
- **Responsive Design**: Mobile-friendly UI
- **Form Validation**: Client and server-side validation
- **Error Handling**: Comprehensive error handling with user-friendly messages
- **Loading Indicators**: Visual feedback during API operations

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **PostgreSQL** - Database
- **Sequelize** - ORM for database operations
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

### Frontend
- **React** - UI library
- **Redux Toolkit** - State management
- **React Router** - Navigation
- **Axios** - HTTP client
- **Chart.js** - Data visualization
- **React-Toastify** - Notifications

## 📁 Project Structure

```
task-management-app/
├── backend/
│   ├── config/
│   │   └── database.js          # Database configuration
│   ├── controllers/
│   │   ├── authController.js    # Authentication logic
│   │   └── taskController.js    # Task CRUD operations
│   ├── middleware/
│   │   └── auth.js              # JWT middleware
│   ├── models/
│   │   ├── User.js              # User model
│   │   ├── Task.js              # Task model
│   │   └── index.js             # Model associations
│   ├── routes/
│   │   ├── authRoutes.js        # Auth endpoints
│   │   └── taskRoutes.js        # Task endpoints
│   ├── .env.example             # Environment variables template
│   ├── package.json
│   └── server.js                # Entry point
│
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   ├── Dashboard.js     # Main dashboard with charts
    │   │   ├── Login.js         # Login page
    │   │   ├── Register.js      # Registration page
    │   │   └── PrivateRoute.js  # Protected route wrapper
    │   ├── redux/
    │   │   ├── slices/
    │   │   │   ├── authSlice.js # Auth state management
    │   │   │   └── taskSlice.js # Task state management
    │   │   └── store.js         # Redux store
    │   ├── styles/
    │   │   ├── Auth.css         # Auth pages styles
    │   │   └── Dashboard.css    # Dashboard styles
    │   ├── utils/
    │   │   └── api.js           # Axios configuration
    │   ├── App.js               # Main app component
    │   ├── App.css              # Global styles
    │   └── index.js             # Entry point
    ├── .env.example
    └── package.json
```

## 🔧 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- PostgreSQL database
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file from example:
```bash
cp .env.example .env
```

4. Configure your `.env` file with your database credentials:
```env
PORT=5000
DB_HOST=your-database-host
DB_USER=your-database-user
DB_PASSWORD=your-database-password
DB_NAME=task_management_db
DB_PORT=5432
JWT_SECRET=your-super-secret-jwt-key-change-this
NODE_ENV=development
```

5. Start the backend server:
```bash
npm start
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Configure the API URL in `.env`:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

5. Start the development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## 📊 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)

### Tasks
- `GET /api/tasks` - Get all tasks (Protected)
- `GET /api/tasks/:id` - Get single task (Protected)
- `POST /api/tasks` - Create new task (Protected)
- `PUT /api/tasks/:id` - Update task (Protected)
- `DELETE /api/tasks/:id` - Delete task (Protected)
- `GET /api/tasks/stats` - Get task statistics (Protected)

## 🚀 Deployment

### Database Setup (Free Options)

#### Option 1: Supabase
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Get connection string from Settings > Database
4. Use the connection details in your `.env`

#### Option 2: Neon
1. Go to [neon.tech](https://neon.tech)
2. Create a new project
3. Copy the connection string
4. Update your `.env` file

#### Option 3: Railway
1. Go to [railway.app](https://railway.app)
2. Create a PostgreSQL database
3. Get connection details
4. Configure `.env`

### Backend Deployment (Render/Railway)

#### Using Render:
1. Push code to GitHub
2. Go to [render.com](https://render.com)
3. Create a new Web Service
4. Connect your GitHub repository
5. Set build command: `cd backend && npm install`
6. Set start command: `cd backend && npm start`
7. Add environment variables from `.env`
8. Deploy!

#### Using Railway:
1. Push code to GitHub
2. Go to [railway.app](https://railway.app)
3. Create new project from GitHub repo
4. Add environment variables
5. Deploy automatically

### Frontend Deployment (Vercel)

1. Push code to GitHub

2. Go to [vercel.com](https://vercel.com)

3. Import your repository

4. Configure build settings:
   - Build Command: `cd frontend && npm install && npm run build`
   - Output Directory: `frontend/build`
   - Install Command: `npm install`

5. Add environment variable:
   - `REACT_APP_API_URL` = Your backend URL

6. Deploy!

### Alternative: Deploy Both on Vercel

**Backend (API Routes):**
- Create `vercel.json` in backend folder:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/server.js"
    }
  ]
}
```

**Frontend:**
- Update `REACT_APP_API_URL` to point to your deployed backend

## 📸 Screenshots & Testing

### Testing the Application

1. **Register a new account**
   - Navigate to `/register`
   - Fill in username, email, and password
   - Screenshot the registration success

2. **Login**
   - Use your credentials
   - Screenshot successful login

3. **Dashboard**
   - View the main dashboard
   - Screenshot showing statistics cards

4. **Create Tasks**
   - Create tasks with different statuses
   - Screenshot the task creation form

5. **Charts**
   - Screenshot the Pie chart
   - Screenshot the Bar chart

6. **Task List**
   - Screenshot the task list with multiple tasks

7. **Edit Task**
   - Click edit on a task
   - Screenshot the edit mode

8. **Filter & Search**
   - Test the search functionality
   - Test status filters
   - Screenshot the filtered results

## 🔐 Environment Variables

### Backend (.env)
```env
PORT=5000
DB_HOST=your-db-host
DB_USER=your-db-user
DB_PASSWORD=your-db-password
DB_NAME=task_management_db
DB_PORT=5432
JWT_SECRET=your-jwt-secret-key
NODE_ENV=production
```

### Frontend (.env)
```env
REACT_APP_API_URL=https://your-backend-url.com/api
```

## 📝 Features Checklist

- ✅ Node.js + Express.js backend
- ✅ PostgreSQL with Sequelize ORM
- ✅ JWT-based authentication
- ✅ User registration and login
- ✅ Protected API routes
- ✅ Task CRUD operations
- ✅ Task status: Todo, In Progress, Completed
- ✅ React frontend
- ✅ Redux Toolkit state management
- ✅ Chart.js dashboard integration
- ✅ Pie chart for task distribution
- ✅ Bar chart for task statistics
- ✅ Form validation
- ✅ Error handling
- ✅ Loading indicators
- ✅ Search functionality
- ✅ Filter by status
- ✅ Responsive design
- ✅ Toast notifications

## 🐛 Troubleshooting

### Database Connection Issues
- Verify PostgreSQL is running
- Check connection credentials in `.env`
- Ensure database exists
- Check firewall settings for remote databases

### CORS Errors
- Verify backend CORS is configured
- Check API URL in frontend `.env`
- Ensure both servers are running

### Authentication Issues
- Check JWT_SECRET is set
- Verify token in localStorage
- Check token expiration (7 days)

## 📧 Support

For issues or questions, please create an issue in the repository.

## 📄 License

This project is created for educational purposes as part of an interview assignment.

---

**Built with ❤️ using MERN Stack (PostgreSQL variant)**
