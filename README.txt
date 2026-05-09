================================================================================
                    TEAM TASK MANAGER - PROJECT README
================================================================================

PROJECT OVERVIEW
================================================================================
Team Task Manager is a modern web-based task management application that allows
teams to organize projects, assign tasks, track progress, and manage team members
efficiently. Built with HTML5, JavaScript, and local storage.

VERSION: 1.0.0
LAST UPDATED: May 9, 2026


FEATURES
================================================================================
✓ User Authentication (Signup & Login)
✓ Role-based Access Control (Admin & Member)
✓ Create and Manage Projects
✓ Assign Tasks to Team Members
✓ Track Task Status (Pending/Completed)
✓ Set Task Due Dates
✓ Automatic Overdue Detection
✓ Task Statistics Dashboard
✓ Add Members to Projects
✓ Responsive Design (Mobile-Friendly)
✓ Browser Local Storage (No Server Needed)


PROJECT STRUCTURE
================================================================================
tam task manager/
├── frontend/
│   └── index.html          (Main web application file)
├── backend/
│   ├── server.js           (Node.js backend - not used by Netlify)
│   └── package.json        (Backend dependencies)
├── netlify.toml            (Netlify deployment configuration)
├── README.txt              (This file)
└── TODO.md                 (Project tasks)


HOW TO USE
================================================================================

GETTING STARTED:
1. Open the frontend/index.html file in your web browser
2. Click "Signup" to create a new account
3. Fill in your details:
   - Full Name
   - Email Address
   - Password
   - Role (Member or Admin)
4. Click "Signup" button
5. You'll be redirected to login - enter your credentials

FEATURES WALKTHROUGH:

Creating a Project:
1. Login to your account
2. Click "🚀 New Project" button
3. Enter project name and description
4. Click "Create Project"

Creating a Task:
1. Click "➕ New Task" button
2. Fill in:
   - Task Title (required)
   - Description (optional)
   - Select Project (required)
   - Select Assignee (required)
   - Due Date (optional)
3. Click "Create Task"

Viewing Tasks:
1. Click "✅ Tasks" to see all tasks assigned to you
2. Admin can see all tasks in the system
3. Overdue tasks are highlighted in red
4. Completed tasks are shown in green

Completing Tasks:
1. Find the task you want to complete
2. Click "✅ Complete" button
3. Task status will change to completed

Managing Project Members:
1. Click "📁 Projects"
2. Select a project (if you're admin)
3. Click "➕ Add Member"
4. Enter the member's email address
5. Click "Add Member"
6. (Member must have signed up first)

Dashboard:
1. Click "✅ Tasks"
2. View statistics:
   - Total Tasks
   - Completed Tasks
   - Pending Tasks
   - Overdue Tasks


DATA STORAGE
================================================================================
All data is stored in your browser's local storage. This means:
✓ Your data persists when you close and reopen the browser
✓ Each browser has its own separate data
✓ Clearing browser cache will delete all data
✓ Data is NOT shared across different devices

USERS: admin@task.com initially created after first signup
PROJECTS: Stored locally in your browser
TASKS: Stored locally in your browser


DEPLOYMENT TO NETLIFY
================================================================================

Prerequisites:
- GitHub account (with your project uploaded)
- Netlify account (free at netlify.com)

Steps:
1. Go to netlify.com and login
2. Click "Add new site" → "Import an existing project"
3. Choose GitHub and authenticate
4. Select your repository (SonaShakya/SonaShakya)
5. Settings:
   - Base directory: Leave blank
   - Build command: Leave blank
   - Publish directory: frontend
6. Click "Deploy site"
7. Wait for deployment to complete (1-5 minutes)
8. Your site will be live at a Netlify URL

Access Your Live Site:
- Netlify will provide a public URL (e.g., your-app.netlify.app)
- Share this URL with your team members
- Everyone can access the same app instance


LOCAL INSTALLATION
================================================================================

To run locally (for development):

1. Clone the repository:
   git clone https://github.com/SonaShakya/SonaShakya.git

2. Open in a browser:
   - Simply open frontend/index.html in your browser
   - OR use a local server (Python, Node.js, etc.)

3. To use the backend (optional):
   - Requires Node.js installed
   - Run: npm install (in backend folder)
   - Run: npm start
   - Backend runs on http://localhost:5000
   - Modify API constant in index.html to use backend


TECHNICAL DETAILS
================================================================================

Frontend Technology:
- HTML5
- CSS3 (Flexbox, Grid, Responsive Design)
- Vanilla JavaScript (ES6+)
- Browser Local Storage API

Backend (Optional):
- Node.js with Express.js
- MongoDB connection
- JWT Authentication
- bcryptjs for password hashing

Compatibility:
- Chrome (Latest)
- Firefox (Latest)
- Safari (Latest)
- Edge (Latest)
- Mobile Browsers

Storage Limits:
- Browser local storage: ~5-10 MB per domain
- Suitable for teams up to 50-100 users with moderate data


USER ROLES
================================================================================

ADMIN:
- Create projects
- Add members to projects
- View all tasks in the system
- Complete any task
- Create tasks

MEMBER:
- Create projects
- See their own projects
- See tasks assigned to them
- Complete only their own tasks
- Create tasks in shared projects


TROUBLESHOOTING
================================================================================

Issue: "Invalid credentials or no account found"
Solution: You need to sign up first. No default accounts exist.

Issue: Tasks/Projects not appearing
Solution: 
- Clear browser cache and reload
- Ensure you're logged in with correct account
- Check browser console for errors (F12)

Issue: Can't add member to project
Solution:
- Member must have signed up first
- Use exact email address they signed up with
- You must be the project admin

Issue: Data disappeared
Solution:
- Browser cache was cleared
- Data is only in current browser's local storage
- No backup is available from local storage

Issue: "Can't connect to server"
Solution:
- Frontend works without backend
- Error is from optional backend feature
- Ignore if using static frontend only


SECURITY NOTES
================================================================================
⚠️ WARNING: This project stores passwords in local storage. 
   For production use with sensitive data:
   - Use HTTPS
   - Implement proper authentication server
   - Never store passwords locally
   - Use secure session management

For Development Only:
- This app is suitable for local/team testing
- Not recommended for production without security hardening
- Passwords should be hashed on server, not client


FUTURE ENHANCEMENTS
================================================================================
Planned features for next versions:
- Export tasks as PDF
- Email notifications
- Task comments and discussions
- File attachments
- Time tracking
- Project templates
- Advanced filtering and search
- Dark mode
- Multi-language support


GITHUB REPOSITORY
================================================================================
Project URL: https://github.com/SonaShakya/SonaShakya
Clone: git clone https://github.com/SonaShakya/SonaShakya.git


SUPPORT & CONTACT
================================================================================
For issues, suggestions, or contributions:
- Create an issue on GitHub
- Email: SonaShakya (GitHub account)
- Check README.txt for troubleshooting


LICENSE
================================================================================
This project is open source and available under MIT License.
Feel free to use, modify, and distribute as needed.


QUICK START CHECKLIST
================================================================================
☐ Open frontend/index.html in browser
☐ Sign up with your email
☐ Create a project
☐ Create a task
☐ Assign task to team member
☐ Mark task as complete
☐ Deploy to Netlify (if desired)
☐ Share URL with team


VERSION HISTORY
================================================================================
v1.0.0 (May 9, 2026)
- Initial release
- Signup/Login functionality
- Project management
- Task management
- Role-based access
- Local storage backend
- Responsive design
- Netlify deployment ready


CHANGELOG
================================================================================
May 9, 2026:
- Removed hardcoded default admin user
- Converted from backend API to local storage
- Added netlify.toml configuration
- Updated for Netlify static deployment
- All users must sign up on first use


================================================================================
                          END OF README
================================================================================

Last Updated: May 9, 2026
For latest information, visit: https://github.com/SonaShakya/SonaShakya
