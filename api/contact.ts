// /api/contact.ts
import type { VercelRequest, VercelResponse } from '@vercel/node'
import 'dotenv/config' // локально подхватит .env.local

// ---- config from env ----
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID!
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || '')
  .split(',')
  .map(s => s.trim())
  .filter(Boolean)
const RATE_LIMIT_PER_MIN = Number(process.env.RATE_LIMIT_PER_MIN || 8)

// ---- simple in-memory limiter (per runtime) ----
const bucket = new Map<string, { count: number; ts: number }>()
const WINDOW_MS = 60_000

function rateLimited(ip: string) {
  const now = Date.now()
  const rec = bucket.get(ip)
  if (!rec || now - rec.ts > WINDOW_MS) {
    bucket.set(ip, { count: 1, ts: now })
    return false
  }
  rec.count++
  if (rec.count > RATE_LIMIT_PER_MIN) return true
  return false
}
const ALLOWED = (process.env.ALLOWED_ORIGINS || "")
  .split(",")
  .map(s => s.trim())
  .filter(Boolean);

function isAllowedOrigin(origin?: string) {
  if (!origin) return true; // SSR/серверные вызовы без Origin
  try {
    const o = new URL(origin).origin;

    // разрешаем любые деплои под *.vercel.app
    if (o.endsWith(".vercel.app")) return true;

    // точные совпадения из ENV
    return ALLOWED.includes(o);
  } catch {
    return false;
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  console.log("[api] using chat_id:", TELEGRAM_CHAT_ID, typeof TELEGRAM_CHAT_ID);

  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'Method Not Allowed' })

  // origin check
  const origin = req.headers.origin as string | undefined
  if (!isAllowedOrigin(origin)) return res.status(403).json({ ok: false, error: 'Forbidden origin' })

  // rate limit
  const ip = (req.headers['x-forwarded-for'] as string || req.socket.remoteAddress || 'unknown').split(',')[0].trim()
  if (rateLimited(ip)) return res.status(429).json({ ok: false, error: 'Too Many Requests' })

  // parse & validate
  const { name = '', email = '', subject = '', message = '', website = '' } = (req.body || {}) as Record<string, string>

  // honeypot
  if (typeof website === 'string' && website.trim() !== '') {
    return res.status(200).json({ ok: true }) // тихо игнорируем бота
  }

  // server-side validation
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!name || !emailRe.test(email) || !message) {
    return res.status(400).json({ ok: false, error: 'Missing or invalid fields' })
  }
  if (name.length > 120 || subject.length > 200 || message.length > 4000) {
    return res.status(413).json({ ok: false, error: 'Payload too large' })
  }

  const text =
    `📩 Новое сообщение с портфолио\n` +
    `— Имя: ${name}\n` +
    `— Email: ${email}\n` +
    (subject ? `— Тема: ${subject}\n` : '') +
    `— Сообщение:\n${message}`

        console.log("[api] payload:", { name, email, subject, message, website })



  try {
    // send to Telegram (token только на сервере)
    const tgResp = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text,
        disable_web_page_preview: true,
      }),
    })
    const tgJson = await tgResp.json()
    console.log("[api] Telegram response:", tgJson)
    console.error("[telegram]", tgJson);


    if (!tgResp.ok || !tgJson.ok) {
      return res.status(502).json({ ok: false, error: 'Telegram error', details: tgJson })
    }
    return res.status(200).json({ ok: true })
  } catch (e: any) {
    return res.status(500).json({ ok: false, error: e?.message || 'Server error' })
  }
}
