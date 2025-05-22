import jwt from "jsonwebtoken";


export const protect = (req, res, next) => {
   const token = req.headers.authorization;
   if (!token) return res.status(401).json({ message: "No token provided" });
   try {
      console.log('reached till here');
      console.log(`Token passed ${token} ${process.env.JWT_SECRET}`);
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(`Data: ${decoded}`);
      req.user = decoded;
      next();
   } catch (err) {
      console.log(`Protection Error ${err}`)
      res.status(401).json({ message: "Invalid token" });
   }
};
export const adminOnly = (req, res, next) => {
   console.log(`User Role ${req.user.role}`);
   if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Admin access only" });
   }
   next();
};