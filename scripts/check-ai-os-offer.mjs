import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const page = readFileSync(resolve(root, "src/ai-os/AiOsPage.tsx"), "utf8");
const offer = readFileSync(resolve(root, "docs/ai-os-pilot.md"), "utf8");
const vercel = JSON.parse(readFileSync(resolve(root, "vercel.json"), "utf8"));
const index = readFileSync(resolve(root, "index.html"), "utf8");

const checks = [
  ["pilot price", page.includes("49 900 ₽") && offer.includes("49 900 ₽")],
  ["diagnostic price", page.includes("9 900 ₽") && offer.includes("9 900 ₽")],
  ["telegram CTA", page.includes("https://t.me/a1gorithms")],
  ["email CTA", page.includes("actingsv@gmail.com")],
  ["no-secrets boundary", /парол|token|токен/i.test(page) && /password|token|парол|токен/i.test(offer)],
  ["no-autonomy overclaim", /Без обещаний полной автономии/.test(page)],
  ["public system proof", page.includes("github.com/goringich/system-bootstrap")],
  ["public Atlas proof", page.includes("github.com/goringich/home-admin")],
  [
    "direct route rewrite",
    vercel.rewrites?.some((item) => item.source === "/ai-os" && item.destination === "/index.html"),
  ],
  ["search description", index.includes('name="description"') && index.includes("AI OS")],
  ["removed fake sales contact", !page.includes("sales@codexlocal.com") && !offer.includes("sales@codexlocal.com")],
  ["removed unproven $2,000 offer", !page.includes("$2,000") && !offer.includes("$2,000")],
];

const failed = checks.filter(([, passed]) => !passed);
for (const [label, passed] of checks) {
  console.log(`${passed ? "ok" : "FAIL"} ${label}`);
}

if (failed.length > 0) {
  process.exitCode = 1;
}
