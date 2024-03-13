
import { Router } from 'express';
import charController from '../controllers/characters.controller';

const charRouter = Router();

charRouter.get('/', charController.getCharacters);
charRouter.get('/:id', charController.cache, charController.getOneCharacter);

export default charRouter;
