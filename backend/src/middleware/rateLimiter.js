// backend/src/middleware/rateLimiter.js
import { rateLimit } from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
  try {
    // Use IP as unique key
    const key = req.ip || "global";

    // Check if request is within rate limit
    const { success } = await rateLimit.limit(key);

    if (!success) {
      return res.status(429).json({
        message: "Too many requests, please try again later.",
      });
    }

    next(); // Continue to next middleware or route
  } catch (error) {
    console.error("Rate limiter error:", error);
    next(error);
  }
};

export default rateLimiter;
