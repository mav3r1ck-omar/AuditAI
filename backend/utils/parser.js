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
            
            // Remove scripts and styles
            const scripts = document.querySelectorAll('script, style');
            scripts.forEach(s => s.remove());
            
            let content = document.body ? document.body.innerText : "";
            content = content.replace(/\s+/g, ' ').trim().substring(0, 3000); // Limit to 3000 chars

            return { title, description, content };
        });

        return data;
    } finally {
        await browser.close();
    }
};
