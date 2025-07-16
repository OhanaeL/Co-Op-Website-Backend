require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const ICTCE01Routes = require('./routes/ICTCE01Routes');
const ICTCE02Routes = require('./routes/ICTCE02Routes');

const app = express();

const {
  MONGODB_USERNAME: username,
  MONGODB_PASSWORD: password,
  MONGODB_HOST: host,
  MONGODB_DATABASE: database,
  MONGODB_APPNAME: appName,
  MONGODB_OPTIONS: options,
  FRONTEND_HOST_LOCAL,
  FRONTEND_HOST_PROD,
  PORT = 5172
} = process.env;

const uri = `mongodb+srv://${username}:${password}@${host}/${database}?${options}&appName=${appName}`;

console.log(uri)

const allowedOrigins = [FRONTEND_HOST_LOCAL, FRONTEND_HOST_PROD];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS policy: Origin ${origin} not allowed`));
    }
  },
  credentials: true
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB with Mongoose'))
.catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

// Route grouping
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/ictce01', ICTCE01Routes);
app.use('/api/ictce02', ICTCE02Routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
