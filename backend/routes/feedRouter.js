import express from 'express';
import {
    getOtherUsers,
    handleSwipe,
    getMatches,
    getLikedUsers,
    undoLike
} from '../controllers/feedController.js';
import userAuth from '../middleware/userAuth.js';

const feedRouter = express.Router();

feedRouter.get('/others', userAuth, getOtherUsers);
feedRouter.post('/swipe', userAuth, handleSwipe);
feedRouter.get('/matches', userAuth, getMatches);
feedRouter.get('/liked', userAuth, getLikedUsers);
feedRouter.post('/unlike', userAuth, undoLike);


export default feedRouter;
