import express from "express";
import { parser } from "../utils/parser.js";
import { analyzeSEO } from "../utils/gemini.js";
import redis from "../utils/redis.js";

const router = express.Router();

router.post('/', async (req, res) => {
    const { url } = req.body;
    
    if (!url) {
        return res.status(400).json({ error: "URL is required in the request body" });
    }

    try {
        const cachedResult = await redis.get(url);
        if (cachedResult) {
            return res.json({ cached: true, ...JSON.parse(cachedResult) });
        }

        const scrapedData = await parser(url);
        const analysis = await analyzeSEO(scrapedData);

        await redis.set(url, JSON.stringify(analysis), 'EX', 3600); // Cache for 1 hour
        
        return res.json({ cached: false, ...analysis });
    } catch (error) {
        console.error("Audit error:", error);
        return res.status(500).json({ error: "Failed to perform audit. " + error.message });
    }
});

export default router;