import * as pug from 'pug';
import * as path from 'path';
import puppeteer from 'puppeteer';
import fs from 'fs';

export default async (profile, template) => {
    const pugTemplate = fs.readFileSync(`${__dirname}/../../templates/pug/${template.pug}`, 'utf8');
    const htmlOutput = pug.render(pugTemplate, profile);

    const browser = await puppeteer.launch({
        headless: true,
        args: ['--start-full-screen'],
    });

    const page = await browser.newPage();

    // set your html as the pages content
    await page.setContent(htmlOutput, {
        waitUntil: 'networkidle0',
    });

    await page.addStyleTag({ path: 'templates/css/' + template.css });
    const pdfBuffer = await page.pdf({
        format: 'A4',
        printBackground: true,
    });
    // close the browser
    await browser.close();

    return pdfBuffer;
};
