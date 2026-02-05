import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  // 1. Get token from header
  // Format is usually: "Authorization <token>"
  const token = req.header("Authorization")?.split(" ")[1];

  // 2. Check if token exists
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access Denied: No Token Provided" });
  }

  try {
    // 3. Verify the token
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    // 4. Attach user info to the request object
    // Now any route after this can access req.user.id
    req.user = verified;

    // 5. Move to the next function (the actual route handler)
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid Token" });
  }
};

export default auth;
