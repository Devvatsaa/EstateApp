import jwt from "jsonwebtoken";

// Middleware to check if the user should be logged in
export const shouldBeLoggedIn = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Not Authenticated..." });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (error, payload) => {
    if (error) {
      return res.status(403).json({ message: "Invalid token" });
    }

    // Attach user ID to request object for further use
    req.userId = payload.userId;

    // Proceed to the next middleware or route handler
    next();
  });
};

// Middleware to check if the user should be an admin
export const shouldBeAdmin = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Not Authenticated for this." });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (error, payload) => {
    if (error) {
      return res.status(403).json({ message: "Invalid token" });
    }

    // Ensure the user is an admin
    if (!payload.isAdmin) {
      return res.status(401).json({ message: "Not an admin" });
    }

    // Attach user ID to request object for further use
    req.userId = payload.userId;

    // Proceed to the next middleware or route handler
    next();
  });
};
