import puppeteer from "puppeteer";

export const parser = async (url) => {   
    const browser = await puppeteer.launch({
        headless: "new",
        defaultViewport: null,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    try {
        const page = await browser.newPage();
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36');
        await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });

        const data = await page.evaluate(() => {
            const title = document.title || "";
            const metaDescriptionTag = document.querySelector('meta[name="description"]');
            const description = metaDescriptionTag ? metaDescriptionTag.getAttribute("content") : "";
            
            const keywordsTag = document.querySelector('meta[name="keywords"]');
            const keywords = keywordsTag ? keywordsTag.getAttribute("content") : "";

            const canonicalTag = document.querySelector('link[rel="canonical"]');
            const canonical = canonicalTag ? canonicalTag.getAttribute("href") : "";

            const language = document.documentElement.lang || "";

            const headingsCount = {
                h1: document.querySelectorAll("h1").length,
                h2: document.querySelectorAll("h2").length,
                h3: document.querySelectorAll("h3").length,
                h4: document.querySelectorAll("h4").length,
                h5: document.querySelectorAll("h5").length,
                h6: document.querySelectorAll("h6").length,
            };

            const images = Array.from(document.querySelectorAll("img"));
            const imageStats = {
                total: images.length,
                missingAlt: images.filter(img => !img.hasAttribute("alt") || img.getAttribute("alt").trim() === "").length
            };

            const links = Array.from(document.querySelectorAll("a"));
            const currentDomain = window.location.hostname;
            let internalLinks = 0;
            let externalLinks = 0;
            
            links.forEach(link => {
                if (link.hostname === currentDomain || !link.hostname) {
                    internalLinks++;
                } else {
                    externalLinks++;
                }
            });

            // Remove scripts and styles
            const scripts = document.querySelectorAll('script, style');
            scripts.forEach(s => s.remove());
            
            let content = document.body ? document.body.innerText : "";
            const wordCount = content.trim().split(/\s+/).filter(word => word.length > 0).length;
            content = content.replace(/\s+/g, ' ').trim().substring(0, 3000); // Limit to 3000 chars

            return { 
                title, 
                description, 
                keywords,
                canonical,
                language,
                headingsCount,
                imageStats,
                linkStats: { total: links.length, internal: internalLinks, external: externalLinks },
                wordCount,
                content 
            };
        });

        return data;
    } finally {
        await browser.close();
    }
};
