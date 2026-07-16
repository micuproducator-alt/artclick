import type { VercelRequest, VercelResponse } from '@vercel/node'

const BREVO = 'https://api.brevo.com/v3/smtp/email'

function row(label: string, value: string) {
  if (!value || value === '—') return ''
  return `
  <tr>
    <td style="padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.06);
      color:#7B8EB5;font-size:11.5px;font-family:monospace;
      text-transform:uppercase;letter-spacing:.07em;width:130px;vertical-align:top">
      ${label}
    </td>
    <td style="padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.06);
      color:#EEF4FF;font-size:14px;line-height:1.6">
      ${value}
    </td>
  </tr>`
}

function ownerEmail(d: Record<string, string>) {
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"/></head>
<body style="margin:0;padding:0;background:#070D1A;font-family:Inter,Arial,sans-serif;">
<div style="max-width:600px;margin:0 auto;padding:40px 20px;">
  <div style="display:flex;align-items:center;gap:8px;margin-bottom:36px">
    <div style="width:8px;height:8px;border-radius:50%;background:#0DD9C5;box-shadow:0 0 12px rgba(13,217,197,0.7)"></div>
    <span style="font-family:monospace;font-size:13px;color:#0DD9C5;letter-spacing:.1em;text-transform:uppercase;font-weight:700">artclick</span>
  </div>
  <div style="background:#0C1528;border:1px solid rgba(13,217,197,0.18);border-radius:18px;overflow:hidden">
    <div style="height:2px;background:linear-gradient(90deg,transparent 0%,#0DD9C5 40%,#38BDF8 70%,transparent 100%)"></div>
    <div style="padding:36px">
      <div style="display:inline-flex;align-items:center;gap:7px;background:rgba(13,217,197,0.1);
        border:1px solid rgba(13,217,197,0.25);border-radius:100px;
        padding:5px 14px;margin-bottom:20px">
        <div style="width:6px;height:6px;border-radius:50%;background:#0DD9C5"></div>
        <span style="font-family:monospace;font-size:11px;color:#0DD9C5;text-transform:uppercase;letter-spacing:.08em">
          Cerere nouă · ${new Date().toLocaleDateString('ro-RO', { day: '2-digit', month: 'long', year: 'numeric' })}
        </span>
      </div>
      <h1 style="font-size:24px;font-weight:800;color:#EEF4FF;margin:0 0 8px;letter-spacing:-.02em">
        🔔 Cerere nouă pe artclick.ro
      </h1>
      <p style="font-size:15px;color:#7B8EB5;margin:0 0 32px;line-height:1.6">
        <strong style="color:#0DD9C5">${d.name}</strong> a completat un formular pe site.
      </p>
      <table style="width:100%;border-collapse:collapse">
        ${row('Nume', d.name)}
        ${row('Email', `<a href="mailto:${d.email}" style="color:#0DD9C5;text-decoration:none">${d.email}</a>`)}
        ${row('Telefon', d.phone ? `<a href="tel:${d.phone}" style="color:#0DD9C5;text-decoration:none">${d.phone}</a>` : '—')}
        ${row('Tip', d.type)}
        ${row('Firma / activitate', d.business || '—')}
        ${row('Descriere gata?', d.hasDescription || '—')}
        ${row('Logo + culori?', d.hasLogo || '—')}
        ${row('Termen dorit', d.deadline || '—')}
        ${row('Mesaj', d.message || '—')}
      </table>
      <div style="margin-top:32px;padding-top:28px;border-top:1px solid rgba(255,255,255,0.06);display:flex;gap:12px;flex-wrap:wrap">
        <a href="mailto:${d.email}?subject=Re: ${encodeURIComponent(d.type || 'Cererea ta')}&body=Bună ${encodeURIComponent((d.name||'').split(' ')[0])}%2C%0A%0AMultumesc pentru mesajul trimis prin artclick.ro."
          style="display:inline-block;padding:13px 28px;background:#0DD9C5;color:#070D1A;
            font-size:14px;font-weight:700;border-radius:100px;text-decoration:none">
          ✉ Răspunde acum
        </a>
        ${d.phone ? `<a href="tel:${d.phone}"
          style="display:inline-block;padding:13px 24px;border:1px solid rgba(13,217,197,0.35);
            color:#0DD9C5;font-size:14px;font-weight:600;border-radius:100px;text-decoration:none">
          📞 Sună: ${d.phone}
        </a>` : ''}
      </div>
    </div>
  </div>
  <p style="font-size:12px;color:#3D5070;text-align:center;margin-top:24px">artclick.ro · contact@artclick.ro · România</p>
</div></body></html>`
}

function clientEmail(d: Record<string, string>) {
  const firstName = (d.name || '').split(' ')[0] || d.name
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"/></head>
<body style="margin:0;padding:0;background:#070D1A;font-family:Inter,Arial,sans-serif;">
<div style="max-width:560px;margin:0 auto;padding:40px 20px;">
  <div style="display:flex;align-items:center;gap:8px;margin-bottom:36px">
    <div style="width:8px;height:8px;border-radius:50%;background:#0DD9C5;box-shadow:0 0 12px rgba(13,217,197,0.7)"></div>
    <span style="font-family:monospace;font-size:13px;color:#0DD9C5;letter-spacing:.1em;text-transform:uppercase;font-weight:700">artclick</span>
  </div>
  <div style="background:#0C1528;border:1px solid rgba(13,217,197,0.18);border-radius:18px;overflow:hidden">
    <div style="height:2px;background:linear-gradient(90deg,transparent 0%,#0DD9C5 40%,#38BDF8 70%,transparent 100%)"></div>
    <div style="padding:36px">
      <h1 style="font-size:24px;font-weight:800;color:#EEF4FF;margin:0 0 14px;letter-spacing:-.02em">
        Am primit mesajul tău, ${firstName}! ✓
      </h1>
      <p style="font-size:15px;color:#7B8EB5;margin:0 0 28px;line-height:1.75">
        Mulțumesc că ai contactat Artclick. Revin la tine
        <strong style="color:#0DD9C5"> în cel mult 24 de ore.</strong>
      </p>
      ${d.message ? `
      <div style="background:rgba(13,217,197,0.06);border:1px solid rgba(13,217,197,0.15);
        border-radius:12px;padding:22px;margin-bottom:28px">
        <p style="font-family:monospace;font-size:10.5px;color:#0DD9C5;text-transform:uppercase;
          letter-spacing:.1em;margin:0 0 12px;font-weight:700">Mesajul tău</p>
        <p style="font-size:13.5px;color:#7B8EB5;margin:0;line-height:1.6">${d.message}</p>
      </div>` : ''}
      <div style="padding-top:24px;border-top:1px solid rgba(255,255,255,0.06)">
        <p style="font-size:13px;color:#7B8EB5;margin:0 0 8px">Ai o întrebare urgentă?</p>
        <a href="mailto:contact@artclick.ro" style="color:#0DD9C5;font-size:14px;
          text-decoration:none;font-weight:600">contact@artclick.ro</a>
      </div>
    </div>
  </div>
  <p style="font-size:12px;color:#3D5070;text-align:center;margin-top:28px;line-height:1.7">
    © 2026 Artclick · contact@artclick.ro · România
  </p>
</div></body></html>`
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const d: Record<string, string> = req.body ?? {}
  if (!d.name || !d.email) return res.status(400).json({ error: 'Missing fields' })

  const KEY   = process.env.BREVO_API_KEY
  const OWNER = process.env.OWNER_EMAIL  || 'contact@artclick.ro'
  const FROM  = process.env.SENDER_EMAIL || 'contact@artclick.ro'

  if (!KEY) {
    console.error('BREVO_API_KEY not set in Vercel env variables')
    return res.status(500).json({ error: 'BREVO_API_KEY not configured' })
  }

  const headers = {
    'api-key': KEY,
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }

  try {
    // ① Notificare owner (tu)
    const r1 = await fetch(BREVO, {
      method: 'POST', headers,
      body: JSON.stringify({
        sender:  { name: `${d.name} via Artclick`, email: FROM },
        to:      [{ email: OWNER, name: 'Artclick' }],
        replyTo: { email: d.email, name: d.name },
        subject: `🔔 ${d.type || 'Cerere nouă'} — ${d.name}`,
        htmlContent: ownerEmail(d),
      }),
    })
    if (!r1.ok) {
      const errText = await r1.text()
      console.error('Brevo owner email failed:', errText)
      throw new Error(errText)
    }

    // ② Confirmare client
    const r2 = await fetch(BREVO, {
      method: 'POST', headers,
      body: JSON.stringify({
        sender:      { name: 'Artclick', email: FROM },
        to:          [{ email: d.email, name: d.name }],
        subject:     `Am primit mesajul tău! Revin în 24h ✓`,
        htmlContent: clientEmail(d),
      }),
    })
    if (!r2.ok) {
      const errText = await r2.text()
      console.error('Brevo client email failed:', errText)
      throw new Error(errText)
    }

    return res.status(200).json({ success: true })
  } catch (err) {
    console.error('Brevo error:', err)
    return res.status(500).json({ error: 'Email send failed' })
  }
}
