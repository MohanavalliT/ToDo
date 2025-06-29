✅ To-Do List Project
To-Do List Project is a full-stack task management web application that helps users collaborate on tasks, manage productivity, and sync their workflows using social OAuth logins. Built with a modern tech stack including React, Vite, TypeScript, Tailwind CSS, and Node.js with Express and MongoDB.
🌐 Live Project
URL: _Add your deployed URL here (e.g., Netlify, Vercel, Render, etc.)_
🛠 How to Run This Project Locally
Make sure you have Node.js and npm installed. It’s recommended to use nvm to manage Node versions.
📁 Clone and Setup

# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to the project directory
cd to-do-list-project


📦 Install Dependencies
npm install

Start the Development Server
npm run dev

⚙️ Backend Setup

Navigate to the backend directory (if separate).

Create a .env file and add your environment variables:

PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net
JWT_SECRET=your-jwt-secret

GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret

FACEBOOK_APP_ID=your-facebook-app-id
FACEBOOK_APP_SECRET=your-facebook-app-secret


Install backend dependencies and run the server:

cd backend
npm install
node server.js



📌 Features
•	🔐 OAuth Login: Google, GitHub, Facebook
•	✅ Create, Edit, Delete To-Do Tasks
•	🔁 Real-time Sync & API Integration
•	🧑‍🤝‍🧑 Multi-user Collaboration
•	📱 Responsive and Clean UI
•	🎨 Tailwind-powered Modern Interface
🧰 Tech Stack
Frontend:
•	React
•	TypeScript
•	Vite
•	Tailwind CSS
•	shadcn/ui
•	Lucide Icons
Backend:
•	Node.js
•	Express.js
•	MongoDB
•	Passport.js (OAuth for Google, GitHub, Facebook)
•	JWT for authentication
📦 Scripts
•	npm run dev – Start frontend in development
•	npm start – (Backend) Run Express server
•	npm run build – Build frontend for production
🚀 Deployment
Frontend can be deployed on Netlify, Vercel, or Firebase Hosting.
Backend can be hosted on Render, Railway, Heroku, or VPS services.


Author Mohanavalli
