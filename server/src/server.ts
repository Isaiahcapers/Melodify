import express from 'express';
import dotenv from 'dotenv';
import { authRoutes } from './routes/auth.js';
import { usersRouter } from './routes/api/userRoutes.js';
import { sequelize } from './config/connection.js';
import { melodifyRoutes } from './routes/api/melodifyRoutes.js';
import OpenAI from 'openai';

dotenv.config();

const app = express();
app.use(express.static('../client/dist'));
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const getHaikuCompletion = async (message: string) => {
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: `Write a haiku about ${message}` }],
    });

    if (completion && completion.choices[0]?.message?.content) {
      return completion.choices[0].message.content.trim();
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error generating haiku:', error);
    return null;
  }
};

app.post('/api/openai/haiku', async (req, res) => {
  const userMessage = req.body.message;
  const haiku = await getHaikuCompletion(userMessage);

  if (haiku) {
    res.status(200).json({ haiku });
  } else {
    res.status(500).json({ message: 'Failed to generate haiku' });
  }
});

app.use('/api/users', usersRouter);
app.use('/api/auth', authRoutes);
app.use('/api/melodify', melodifyRoutes);

app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('Error stack:', err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

const PORT = process.env.PORT || 3001;

sequelize.sync({ alter: true }).then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log('Database synchronized successfully.');
    });
  }).catch((error: any) => {
    console.error('Failed to sync database:', error);
  });
