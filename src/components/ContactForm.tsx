import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

function SendIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
      <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ContactForm() {
  return (
    <form
      className="grid gap-4"
      onSubmit={async (e) => {
        e.preventDefault()
        const form = e.currentTarget as HTMLFormElement
        const data = new FormData(form)
        const payload = Object.fromEntries(data.entries())

        // honeypot field present in markup:
        // <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />

        const btn = form.querySelector('button[type="submit"]') as HTMLButtonElement | null
        if (btn) btn.disabled = true

        try {
          const resp = await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          })
          let json: any = null
          const text = await resp.text()
          try {
            json = JSON.parse(text)
          } catch {
            throw new Error(`Non-JSON response: ${text}`)
          }

          if (!resp.ok || !json.ok) throw new Error(json?.error || 'Send failed')
          alert('Спасибо! Сообщение отправлено.')
          form.reset()
        } catch (err) {
          console.error(err)
          alert('Не удалось отправить. Попробуйте позже.')
        } finally {
          if (btn) btn.disabled = false
        }
      }}
    >
      <div className="grid md:grid-cols-2 gap-4">
        <Input name="name" placeholder="Your name" required />
        <Input name="email" placeholder="Email" type="email" required />
      </div>
      <Input name="subject" placeholder="Subject" required />
      <Textarea name="message" placeholder="Message" className="min-h-32" required />
      <Button type="submit" className="w-fit" data-test-id="contact-submit">
        <SendIcon /> Send
      </Button>
    </form>
  );
}