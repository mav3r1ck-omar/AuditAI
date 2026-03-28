import puppeteer from "puppeteer";

export const parser=async(url)=>{   
    const browser=await  puppeteer.launch({
        headless:false,
        defaultViewport:null,
    });

    const page=await browser.newPage();
    await page.goto(url,{waitUntil:"domcontentloaded"});



};

