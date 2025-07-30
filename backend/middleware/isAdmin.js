const isAdmin = (req, res, next) => {
    if (req.body.userRole === "admin") {
        next(); // Allow access
    } else {
        return res.status(403).json({ success: false, message: "Access Denied! Admins Only" });
    }
};

export default isAdmin;
