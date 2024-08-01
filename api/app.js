import express from 'express';
import dotenv from 'dotenv'; // Import dotenv
import connectDB from './config/mongoose.js';
import postRoute from './routes/post.route.js';
import authRoute from './routes/auth.route.js';

dotenv.config(); // Load environment variables from .env file

const app = express();

connectDB();

app.use(express.json());

app.use('/api/posts', postRoute);
app.use('/api/auth', authRoute);

app.listen(8800, () => {
  console.log('Server is running');
});
