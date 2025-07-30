import express from 'express';
import {
  sendMessage,
  getMessages,
  markAsSeen,
  deleteMessages
} from '../controllers/chatController.js';
import userAuth from '../middleware/userAuth.js';

const chatRouter = express.Router();

chatRouter.post("/send", userAuth, sendMessage);
chatRouter.get("/messages", userAuth, getMessages);
chatRouter.put("/mark-seen", userAuth, markAsSeen);
chatRouter.delete('/delete', userAuth, deleteMessages);

export default chatRouter;
