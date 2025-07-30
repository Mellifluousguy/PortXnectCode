import Chat from '../model/chatModel.js';

export const sendMessage = async (req, res) => {
  try {
    const { receiverId, message } = req.body;
    const senderId = req.user.id;

    if (!receiverId || !message) {
      return res.status(400).json({ error: 'Receiver ID and message are required' });
    }

    const newMsg = await Chat.create({ senderId, receiverId, message });
    res.status(201).json(newMsg);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { receiverId } = req.query;
    const senderId = req.user.id;

    if (!receiverId) {
      return res.status(400).json({ error: 'Receiver ID is required' });
    }

    const messages = await Chat.find({
      $or: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId }
      ]
    }).sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const markAsSeen = async (req, res) => {
  try {
    const { receiverId } = req.body;
    const senderId = req.user.id;

    if (!receiverId) {
      return res.status(400).json({ error: 'Receiver ID is required' });
    }

    await Chat.updateMany(
      { senderId, receiverId, seen: false },
      { $set: { seen: true } }
    );

    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const deleteMessages = async (req, res) => {
  try {
    const { receiverId } = req.body;
    const senderId = req.user.id;

    if (!receiverId) {
      return res.status(400).json({ error: 'Receiver ID is required' });
    }

    await Chat.deleteMany({
      $or: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId }
      ]
    });

    res.status(200).json({ success: true, message: 'Messages deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
