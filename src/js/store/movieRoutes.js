import { Router } from 'express';
import movieController from '../controllers/movie.controller';

const movieRouter = Router();

movieRouter.get('/', movieController.getMovies);

export default movieRouter;
