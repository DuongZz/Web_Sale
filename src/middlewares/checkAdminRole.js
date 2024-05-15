export const checkAdminRole = async (req, res, next) => {
  if (req.user.role === "admin") {
    next();
  } else {
    res.status(403).json("Access denied. You're not a admin");
  }
};
