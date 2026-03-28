import express from "express";
import puppeteer from "puppeteer";
const app=express();

const port=3000;

app.listen(port);  

app.get('/',(req,res)=>{
    res.send('hello world');
});

app.use('/post',)