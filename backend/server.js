import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/taskmanager')
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.log('❌ MongoDB Error:', err));

// ========== MODELS ==========

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['admin', 'member'], default: 'member' }
});

const ProjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now }
});

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  assignedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
  dueDate: Date,
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', UserSchema);
const Project = mongoose.model('Project', ProjectSchema);
const Task = mongoose.model('Task', TaskSchema);

// ========== MIDDLEWARE ==========

const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token' });
  
  try {
    const decoded = jwt.verify(token, 'SECRET_KEY');
    req.userId = decoded.userId;
    req.userRole = decoded.role;
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
};

const isAdmin = async (req, res, next) => {
  const user = await User.findById(req.userId);
  if (user.role !== 'admin') return res.status(403).json({ error: 'Admin only' });
  next();
};

// ========== AUTH ROUTES ==========

app.post('/api/auth/signup', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'All fields required' });
    }
    
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed, role: role || 'member' });
    res.json({ message: 'User created', userId: user._id });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: 'Invalid credentials' });
    
    const token = jwt.sign({ userId: user._id, role: user.role }, 'SECRET_KEY');
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ========== PROJECT ROUTES ==========

app.post('/api/projects', auth, async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name) return res.status(400).json({ error: 'Project name required' });
    
    const project = await Project.create({ name, description, adminId: req.userId, members: [req.userId] });
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/projects', auth, async (req, res) => {
  const projects = await Project.find({ members: req.userId }).populate('adminId', 'name').populate('members', 'name email');
  res.json(projects);
});

app.post('/api/projects/:projectId/members', auth, isAdmin, async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });
    
    const project = await Project.findById(req.params.projectId);
    if (!project.members.includes(user._id)) {
      project.members.push(user._id);
      await project.save();
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ========== TASK ROUTES ==========

app.post('/api/tasks', auth, async (req, res) => {
  try {
    const { title, description, projectId, assignedTo, dueDate } = req.body;
    if (!title || !projectId || !assignedTo) {
      return res.status(400).json({ error: 'Title, project, and assignee required' });
    }
    
    const task = await Task.create({
      title, description, projectId, assignedTo, dueDate,
      assignedBy: req.userId
    });
    
    await task.populate('assignedTo', 'name email');
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/tasks', auth, async (req, res) => {
  const user = await User.findById(req.userId);
  let tasks;
  
  if (user.role === 'admin') {
    tasks = await Task.find().populate('assignedTo', 'name').populate('projectId', 'name');
  } else {
    tasks = await Task.find({ assignedTo: req.userId }).populate('projectId', 'name');
  }
  
  res.json(tasks);
});

app.patch('/api/tasks/:taskId/status', auth, async (req, res) => {
  try {
    const { status } = req.body;
    const task = await Task.findById(req.params.taskId);
    
    if (req.userRole !== 'admin' && task.assignedTo.toString() !== req.userId) {
      return res.status(403).json({ error: 'Not authorized' });
    }
    
    task.status = status;
    await task.save();
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(5000, () => console.log('🚀 Server running on http://localhost:5000'));