const JWT_SECRET = "raveena";
const jwt = require("jsonwebtoken");
function auth(req, res, next) {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      // Check if token is provided with Bearer prefix
      const token = authHeader.startsWith("Bearer ") 
        ? authHeader.split(" ")[1] 
        : authHeader;
        console.log(token);
      jwt.verify(token, JWT_SECRET, (err, decoded) => {
        console.log(err);
        if (err) {
          return res.status(400).json({ message: "Invalid token" });
        }
        req.userId = decoded.userId;
        next();
      });
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  }
module.exports = { auth, JWT_SECRET };
