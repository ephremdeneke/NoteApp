// backend/src/config/upstash.js
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
const url = process.env.UPSTASH_REDIS_REST_URL;
const token = process.env.UPSTASH_REDIS_TOKEN;

let rateLimit;
if (url && token) {
  const redis = new Redis({ url, token });
  rateLimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, "10 s"), // 5 requests per 10 seconds
  });
} else {
  // No-op limiter for local/dev when Upstash env vars are missing
  rateLimit = { limit: async () => ({ success: true }) };
}

export { rateLimit };
