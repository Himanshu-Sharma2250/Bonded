import Redis from "ioredis";

const redis = new Redis({host: "localhost", port: Number(6379)});

export const joinTeamRateLimit = async (req, res, next) => {
    const userId = req.user._id;

    const key = `join-${userId}`;
    const value = await redis.get(key);

    if (!Number(value)) {
        await redis.set(key, 0);
        await redis.expire(key, 3600)
    }

    if (Number(value) > 5) {
        return res.status(429).json({
            message: "You can send join request only 5 times per hour"
        })
    }

    await redis.incr(key);
    next();
}