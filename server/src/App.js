// app.js
import express from 'express';
import userRoutes from './routes/userRoutes'
import taskRoutes from './routes/taskRoutes'
const app = express();


app.use(express.json());


app.get('/', (req, res) => {
  res.status(200).send('Welcome to Task Manager API');
});


app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

export default app;
