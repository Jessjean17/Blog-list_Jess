import express from 'express';
import logger from 'morgan';
import { config } from 'dotenv';
import path from 'path';
import movieRouter from './routes/movie.routes';
import charRouter from './routes/characters.routes';

config();

const app = express();

const staticPath = path.join(__dirname, '../public');
app.use(express.static(staticPath));

if (app.get('env') === 'development') {
  app.use(logger('dev'));
}

app.get('/', (req, res) => {
  res.render('index');
});

app.use('/api/v1/movie', movieRouter);
app.use('/api/v1/character', charRouter);

//404 Page
app.all('*', (req, res, next) => {
  res.status(404).json({
    status: 'error',
    message: `Can't find ${req.originalUrl} on this server`
  });
});

const port = process.env.NODE_ENV === 'test' ? 5272 : process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});

export default app;
