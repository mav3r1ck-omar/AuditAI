import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

export const analyzeSEO = async (scrapedData) => {
    const prompt = `Analyze the following website for SEO performance strictly using this scraped data.
Title: ${scrapedData.title}
Meta Description: ${scrapedData.description}
Text Content:
${scrapedData.content}

Respond strictly with a JSON object containing the exact following keys:
- "siteHealth": A number from 0 to 100 representing the overall SEO score based on title length, description length, and content keywords.
- "keywordDensity": An array of maximum 10 objects representing the most used meaningful keywords. Each object must have "keyword" (string), "count" (number), and "density" (number representing percentage).
- "aiSuggestions": An array of strings with actionable SEO improvements. Provide 3-5 suggestions.`;

    const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        response_format: { type: "json_object" },
    });
    
    return JSON.parse(response.choices[0].message.content);
};
