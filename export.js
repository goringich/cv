// export.js
import puppeteer from "puppeteer";

async function exportPDF() {
  const browser = await puppeteer.launch({
    headless: true, // без открытия окна браузера
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();

  // открой свою страницу (локально или задеплоенную)
  await page.goto("http://localhost:5174", {
    waitUntil: "networkidle0",
  });

  // сохрани PDF
  await page.pdf({
    path: "portfolio.pdf",     // куда сохранить
    format: "A4",              // размер страницы
    printBackground: true,     // обязательно, чтобы фоны/градиенты попали в PDF
  });

  await browser.close();
}

exportPDF();
