// app.js
import express from 'express';
import userRoutes from './routes/userRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).send('Welcome to Task Manager API');
});

app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

export default app;
