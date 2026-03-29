import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

export const analyzeSEO = async (scrapedData) => {
    const prompt = `Analyze the following website for SEO performance strictly using this scraped data.
Title: ${scrapedData.title}
Meta Description: ${scrapedData.description}
Meta Keywords: ${scrapedData.keywords}
Canonical Link: ${scrapedData.canonical}
Language: ${scrapedData.language}
Word Count: ${scrapedData.wordCount}
Headings Count: ${JSON.stringify(scrapedData.headingsCount)}
Image Stats (Total / Missing Alt): ${scrapedData.imageStats.total} / ${scrapedData.imageStats.missingAlt}
Link Stats (Total / Internal / External): ${scrapedData.linkStats.total} / ${scrapedData.linkStats.internal} / ${scrapedData.linkStats.external}
Text Content (limited to 3000 chars):
${scrapedData.content}

Respond strictly with a JSON object containing the exact following keys:
- "siteHealth": A number from 0 to 100 representing the overall SEO score based on title length, description length, headings structure, image alts, word count, and content keywords.
- "keywordDensity": An array of maximum 10 objects representing the most used meaningful keywords. Each object must have "keyword" (string), "count" (number), and "density" (number representing percentage).
- "aiSuggestions": An array of strings with actionable SEO improvements. Formulate 3-5 high-value suggestions based on the metrics provided (e.g., if images lack alt texts, mention it; if internal links are low, suggest linking strategies, etc.).`;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
            }
        });
        
        return JSON.parse(response.text);
    } catch (e) {
        console.error("Gemini GenAI Error:", e);
        throw e;
    }
};

export const chatAboutReport = async (report, message, history = []) => {
    const prompt = `You are an expert SEO auditor AI.
    
Here is the SEO report for a website:
${JSON.stringify(report, null, 2)}

User's query: ${message}

Provide a helpful, precise, and concise answer based ONLY on the provided report. Focus on giving actionable advice derived from the report. Do NOT use markdown formatting (no asterisks, no hashes, no bolding). Use plain conversational text separated by natural line breaks. If the user asks something completely outside the scope of SEO or the report, gently state that you can only answer questions regarding the site's SEO analysis.`;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        
        return { response: response.text };
    } catch (e) {
        console.error("Gemini GenAI Chat Error:", e);
        throw e;
    }
};
