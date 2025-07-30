import userModel from "../model/userModel.js";

export const getUserData = async (req, res) => {
    try {
        const { userId } = req.body;

        const user = await userModel.findById(userId);

        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }

        res.json({
            success: true,
            userData: {
                name: user.name,
                username: user.username,
                email: user.email,
                isAccountVerified: user.isAccountVerified,
                role: user.role,
                bio: user.bio,
                designation: user.designation,
                website: user.website,
                qualifications: user.qualifications,
                skills: user.technicalSkills,
                projectLearning: user.projectLearnings,
                gender: user.gender,
                gitHub: user.gitHub,
                LinkedIn: user.LinkedIn,
                _id: user._id
            }
        })

    } catch (error) {
        res.json({ success: false, message: error.message });
    }

}
