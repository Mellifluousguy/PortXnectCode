import jwt from 'jsonwebtoken';
import userModel from '../model/userModel.js';

const userAuth = async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return res.json({ success: false, message: 'Not authorized login again' });
    }

    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

        if (tokenDecode.id) {
            req.body.userId = tokenDecode.id;
        } else {
            return res.json({ success: false, message: 'Not Authorized Login Again' }); 
        }

        const user = await userModel.findById(tokenDecode.id).select('username role');
        req.body.username = user?.username;
        req.body.userRole = user?.role; // Add role here
        req.user = { id: user._id, username: user.username, role: user.role };

        next();
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export default userAuth;
