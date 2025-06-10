
const jwt = require('jsonwebtoken');

 const verifyPassenger = (req, res, next) => {
  const token = req.headers.Authorization?.split(' ')[1];
  console.log("Authorization Header:", req.headers.Authorization);
  console.log("Token:", token);
  if (!token) return res.status(401).json({ message: "Access denied" });


  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // contains passengerId
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });
  }
};

module.exports = {
  verifyPassenger
};

