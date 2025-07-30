import User from '../model/userModel.js';
import mongoose from 'mongoose';

// ✅ GET: Other Users to Swipe
export const getOtherUsers = async (req, res) => {
    try {
        const userId = req.body.userId;

        if (!userId) {
            return res.status(401).json({ success: false, message: "Unauthorized: Invalid token" });
        }

        const currentUser = await User.findById(userId).select('likes skipped name technicalSkills bio gitHub LinkedIn projects');

        if (!currentUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // ✅ Profile validation
        if (!currentUser.name || !currentUser.bio || !currentUser.technicalSkills || !currentUser.gitHub || !currentUser.LinkedIn) {
            return res.status(403).json({ success: false, message: "Profile incomplete" });
        }

        if (!currentUser.projects || currentUser.projects.length === 0) {
            return res.status(403).json({ success: false, message: "Upload a project" });
        }

        // ✅ Excluded user IDs
        const excludedIds = [...currentUser.likes, ...currentUser.skipped, userId].map(id => new mongoose.Types.ObjectId(id));

        // ✅ Randomize users
        const otherUsers = await User.aggregate([
            { $match: { _id: { $nin: excludedIds } } },
            { $sample: { size: 20 } }, // Random 20 users
            {
                $project: {
                    password: 0,
                    email: 0,
                    role: 0
                }
            }
        ]);

        res.status(200).json({ success: true, users: otherUsers });

    } catch (err) {
        console.error("getOtherUsers error:", err);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};
// ✅ POST: Swipe Action (Like / Skip)
export const handleSwipe = async (req, res) => {
    const { targetUserId, action } = req.body;

    if (!['like', 'skip'].includes(action)) {
        return res.status(400).json({ success: false, message: 'Invalid action type' });
    }

    try {
        const userId = req.body.userId;

        if (!userId) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        const currentUser = await User.findById(userId);
        const targetUser = await User.findById(targetUserId);

        if (!currentUser || !targetUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        if (action === 'like') {
            if (!currentUser.likes.includes(targetUserId)) {
                currentUser.likes.push(targetUserId);
            }

            if (targetUser.likes.includes(userId)) {
                // Match found!
                currentUser.matches.push(targetUserId);
                targetUser.matches.push(userId);
                await targetUser.save();
                await currentUser.save();

                return res.status(200).json({ success: true, matched: true });
            }

        } else if (action === 'skip') {
            if (!currentUser.skipped.includes(targetUserId)) {
                currentUser.skipped.push(targetUserId);
            }
        }

        await currentUser.save();
        res.status(200).json({ success: true, matched: false });

    } catch (err) {
        res.status(500).json({ success: false, message: "Swipe failed" });
    }
};

// ✅ GET: All Matches
export const getMatches = async (req, res) => {
    try {
        const userId = req.body.userId;

        if (!userId) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        const currentUser = await User.findById(userId).populate('matches', '-password -email -role');

        res.status(200).json({ success: true, matches: currentUser.matches });
    } catch (err) {
        res.status(500).json({ success: false, message: "Error fetching matches" });
    }
};


export const getLikedUsers = async (req, res) => {
    try {
        const userId = req.body.userId;

        if (!userId) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        const currentUser = await User.findById(userId).populate('likes', '-password -email -role');

        if (!currentUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.status(200).json({ success: true, likedUsers: currentUser.likes });

    } catch (err) {
        console.error("getLikedUsers error:", err);
        res.status(500).json({ success: false, message: "Failed to fetch liked users" });
    }
};




export const undoLike = async (req, res) => {
    try {
        const userId = req.body.userId;
        const { targetUserId } = req.body;

        if (!userId || !targetUserId) {
            return res.status(400).json({ success: false, message: "Missing userId or targetUserId" });
        }

        const currentUser = await User.findById(userId);
        const targetUser = await User.findById(targetUserId);

        if (!currentUser || !targetUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Remove from likes[]
        currentUser.likes = currentUser.likes.filter(id => id.toString() !== targetUserId);

        // Remove from matches[] (both sides)
        currentUser.matches = currentUser.matches.filter(id => id.toString() !== targetUserId);
        targetUser.matches = targetUser.matches.filter(id => id.toString() !== userId);

        await currentUser.save();
        await targetUser.save();

        res.status(200).json({ success: true, message: "Swipe reverted successfully" });

    } catch (err) {
        console.error("undoLike error:", err);
        res.status(500).json({ success: false, message: "Failed to undo swipe" });
    }
};

