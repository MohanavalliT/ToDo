
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const http = require('http');
const { Server } = require('socket.io');

dotenv.config();

const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');
const { authenticateToken } = require('./middleware/auth');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', authenticateToken, taskRoutes);

// WebSocket connection
io.on('connection', (socket) => {
  console.log('New client connected');
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

app.set('io', io);

// DB + Server start
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
  server.listen(process.env.PORT || 5000, () =>
    console.log('Server running on port', process.env.PORT || 5000)
  );
}).catch(err => console.error(err));
