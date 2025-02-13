const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const subjectRoutes = require('./routes/subjects');
const feedbackRoutes = require('./routes/feedback');
const ratingRoutes = require('./routes/rating');  
const cors = require('cors');

require('dotenv').config();

const app = express();
app.use(express.json());

app.use(cors());
connectDB();

app.get('/', (req, res) => res.send('API is running...'));



app.get("/", (req, res) => {
    res.send("Hello from Vercel!");
  });
  
app.use('/api/auth', authRoutes);
app.use('/api/subjects', subjectRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/ratings', ratingRoutes);

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
