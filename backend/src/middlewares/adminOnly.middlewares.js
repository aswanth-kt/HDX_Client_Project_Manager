
export const adminOnly = (req, res, next) => {
  console.log("adminonly req.user:", req.user)
  
  if (req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Admin access required"
    })
  };

  next();
};