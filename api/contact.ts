import type { VercelRequest, VercelResponse } from "@vercel/node";

const BREVO = "https://api.brevo.com/v3/smtp/email";

function row(label: string, value: string) {
  if (!value || value === "—") return "";
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
  </tr>`;
}

function ownerEmail(d: Record<string, string>) {
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"/></head>
<body style="margin:0;padding:0;background:#070D1A;font-family:Inter,Arial,sans-serif;">
<div style="max-width:600px;margin:0 auto;padding:40px 20px;">

  <!-- Logo -->
  <div style="display:flex;align-items:center;gap:8px;margin-bottom:36px">
    <div style="width:8px;height:8px;border-radius:50%;background:#0DD9C5;box-shadow:0 0 12px rgba(13,217,197,0.7)"></div>
    <span style="font-family:monospace;font-size:13px;color:#0DD9C5;letter-spacing:.1em;text-transform:uppercase;font-weight:700">artclick</span>
  </div>

  <!-- Card -->
  <div style="background:#0C1528;border:1px solid rgba(13,217,197,0.18);border-radius:18px;overflow:hidden">
    <div style="height:2px;background:linear-gradient(90deg,transparent 0%,#0DD9C5 40%,#38BDF8 70%,transparent 100%)"></div>

    <div style="padding:36px">
      <!-- Badge -->
      <div style="display:inline-flex;align-items:center;gap:7px;background:rgba(13,217,197,0.1);
        border:1px solid rgba(13,217,197,0.25);border-radius:100px;
        padding:5px 14px;margin-bottom:20px">
        <div style="width:6px;height:6px;border-radius:50%;background:#0DD9C5"></div>
        <span style="font-family:monospace;font-size:11px;color:#0DD9C5;text-transform:uppercase;letter-spacing:.08em">
          Cerere nouă · ${new Date().toLocaleDateString("ro-RO", { day: "2-digit", month: "long", year: "numeric" })}
        </span>
      </div>

      <h1 style="font-size:24px;font-weight:800;color:#EEF4FF;margin:0 0 8px;letter-spacing:-.02em">
        🔔 Cerere de ofertă nouă
      </h1>
      <p style="font-size:15px;color:#7B8EB5;margin:0 0 32px;line-height:1.6">
        <strong style="color:#0DD9C5">${d.name}</strong> a completat formularul de ofertă pe artclick.ro
      </p>

      <!-- Data table -->
      <table style="width:100%;border-collapse:collapse">
        ${row("Nume", d.name)}
        ${row("Email", `<a href="mailto:${d.email}" style="color:#0DD9C5;text-decoration:none">${d.email}</a>`)}
        ${row("Telefon", d.phone ? `<a href="tel:${d.phone}" style="color:#0DD9C5;text-decoration:none">${d.phone}</a>` : "—")}
        ${row("Ce face firma", d.business || "—")}
        ${row("Descriere gata?", d.hasDescription || "—")}
        ${row("Logo + culori?", d.hasLogo || "—")}
        ${row("Termen dorit", d.deadline || "—")}
      </table>

      <!-- CTA buttons -->
      <div style="margin-top:32px;padding-top:28px;border-top:1px solid rgba(255,255,255,0.06);display:flex;gap:12px;flex-wrap:wrap">
        <a href="mailto:${d.email}?subject=Ofertă personalizată pentru ${encodeURIComponent(d.name)}&body=Bună ${encodeURIComponent(d.name.split(" ")[0])}%2C%0A%0AMultumesc pentru cererea de ofertă trimisă prin artclick.ro.%0A%0AVoi reveni cu o propunere detaliată în cel mai scurt timp.%0A%0ACu stimă%2C%0AArtclick"
          style="display:inline-block;padding:13px 28px;background:#0DD9C5;color:#070D1A;
            font-size:14px;font-weight:700;border-radius:100px;text-decoration:none">
          ✉ Răspunde acum
        </a>
        ${
          d.phone
            ? `
        <a href="tel:${d.phone}"
          style="display:inline-block;padding:13px 24px;
            border:1px solid rgba(13,217,197,0.35);color:#0DD9C5;
            font-size:14px;font-weight:600;border-radius:100px;text-decoration:none">
          📞 Sună: ${d.phone}
        </a>`
            : ""
        }
      </div>
    </div>
  </div>

  <p style="font-size:12px;color:#3D5070;text-align:center;margin-top:24px;line-height:1.7">
    artclick.ro · artclickon@outlook.com · România
  </p>
</div>
</body></html>`;
}

function clientEmail(d: Record<string, string>) {
  const firstName = d.name?.split(" ")[0] || d.name;
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"/></head>
<body style="margin:0;padding:0;background:#070D1A;font-family:Inter,Arial,sans-serif;">
<div style="max-width:560px;margin:0 auto;padding:40px 20px;">

  <!-- Logo -->
  <div style="display:flex;align-items:center;gap:8px;margin-bottom:36px">
    <div style="width:8px;height:8px;border-radius:50%;background:#0DD9C5;box-shadow:0 0 12px rgba(13,217,197,0.7)"></div>
    <span style="font-family:monospace;font-size:13px;color:#0DD9C5;letter-spacing:.1em;text-transform:uppercase;font-weight:700">artclick</span>
  </div>

  <!-- Card -->
  <div style="background:#0C1528;border:1px solid rgba(13,217,197,0.18);border-radius:18px;overflow:hidden">
    <div style="height:2px;background:linear-gradient(90deg,transparent 0%,#0DD9C5 40%,#38BDF8 70%,transparent 100%)"></div>

    <div style="padding:36px">
      <h1 style="font-size:24px;font-weight:800;color:#EEF4FF;margin:0 0 14px;letter-spacing:-.02em">
        Am primit cererea ta, ${firstName}! ✓
      </h1>
      <p style="font-size:15px;color:#7B8EB5;margin:0 0 28px;line-height:1.75">
        Mulțumesc că ai ales Artclick. Am primit toate informațiile și revin cu o
        <strong style="color:#0DD9C5"> ofertă personalizată în maximum 24 de ore.</strong>
      </p>

      <!-- Summary box -->
      <div style="background:rgba(13,217,197,0.06);border:1px solid rgba(13,217,197,0.15);
        border-radius:12px;padding:22px;margin-bottom:30px">
        <p style="font-family:monospace;font-size:10.5px;color:#0DD9C5;text-transform:uppercase;
          letter-spacing:.1em;margin:0 0 16px;font-weight:700">
          Ce ai trimis
        </p>
        ${
          d.business
            ? `<p style="font-size:13.5px;color:#7B8EB5;margin:0 0 10px;line-height:1.6">
          <span style="color:#EEF4FF;font-weight:600">Firma:</span> ${d.business}</p>`
            : ""
        }
        ${
          d.hasDescription
            ? `<p style="font-size:13.5px;color:#7B8EB5;margin:0 0 10px">
          <span style="color:#EEF4FF;font-weight:600">Descriere:</span> ${d.hasDescription}</p>`
            : ""
        }
        ${
          d.hasLogo
            ? `<p style="font-size:13.5px;color:#7B8EB5;margin:0 0 10px">
          <span style="color:#EEF4FF;font-weight:600">Logo & culori:</span> ${d.hasLogo}</p>`
            : ""
        }
        ${
          d.deadline
            ? `<p style="font-size:13.5px;color:#7B8EB5;margin:0">
          <span style="color:#EEF4FF;font-weight:600">Termen:</span> ${d.deadline}</p>`
            : ""
        }
      </div>

      <!-- Next steps -->
      <p style="font-family:monospace;font-size:10.5px;color:#0DD9C5;text-transform:uppercase;
        letter-spacing:.1em;margin:0 0 18px;font-weight:700">Ce urmează</p>

      ${[
        [
          "Analizez cererea",
          "Studiez activitatea firmei tale și pregătesc o propunere adaptată nevoilor tale specifice.",
        ],
        [
          "Ofertă detaliată",
          "Primești o ofertă clară: ce includem, termen de livrare și preț fix — fără surprize.",
        ],
        [
          "Te sun personal",
          d.phone
            ? `Te contactez direct la ${d.phone} ca să discutăm detaliile și să răspund la orice întrebare.`
            : "Mă asigur că ai toate informațiile necesare pentru a lua o decizie corectă.",
        ],
      ]
        .map(
          ([title, desc], i) => `
        <div style="display:flex;gap:14px;margin-bottom:16px">
          <div style="width:26px;height:26px;border-radius:50%;background:rgba(13,217,197,0.12);
            border:1px solid rgba(13,217,197,0.25);display:flex;align-items:center;justify-content:center;
            flex-shrink:0;font-family:monospace;font-size:12px;color:#0DD9C5;font-weight:700">
            ${i + 1}
          </div>
          <div style="padding-top:3px">
            <div style="font-size:14px;font-weight:600;color:#EEF4FF;margin-bottom:3px">${title}</div>
            <div style="font-size:13px;color:#7B8EB5;line-height:1.6">${desc}</div>
          </div>
        </div>`,
        )
        .join("")}

      <div style="margin-top:28px;padding-top:24px;border-top:1px solid rgba(255,255,255,0.06)">
        <p style="font-size:13px;color:#7B8EB5;margin:0 0 8px">Ai o întrebare urgentă?</p>
        <a href="mailto:artclickon@outlook.com" style="color:#0DD9C5;font-size:14px;
          text-decoration:none;font-weight:600">artclickon@outlook.com</a>
      </div>
    </div>
  </div>

  <!-- Guarantees -->
  <table style="width:100%;border-collapse:collapse;margin-top:16px">
    <tr>
      ${[
        ["💰", "Preț fix garantat"],
        ["⏱", "Răspuns în 24h"],
        ["✓", "Fără angajamente"],
      ]
        .map(
          ([icon, text]) => `
      <td style="padding:16px 8px;text-align:center;background:#0C1528;
        border:1px solid rgba(13,217,197,0.1);border-radius:10px">
        <div style="font-size:20px;margin-bottom:6px">${icon}</div>
        <div style="font-size:11.5px;color:#7B8EB5;font-family:monospace">${text}</div>
      </td>`,
        )
        .join('<td style="width:8px"></td>')}
    </tr>
  </table>

  <p style="font-size:12px;color:#3D5070;text-align:center;margin-top:28px;line-height:1.7">
    © 2026 Artclick · artclickon@outlook.com · România<br/>
    <span style="font-size:11px">Ai primit acest email pentru că ai completat formularul pe artclick.ro</span>
  </p>
</div>
</body></html>`;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  const d: Record<string, string> = req.body ?? {};
  if (!d.name || !d.email)
    return res.status(400).json({ error: "Missing fields" });

  const KEY = process.env.BREVO_API_KEY;
  const OWNER = process.env.OWNER_EMAIL || "artclickon@outlook.com";
  const FROM = process.env.SENDER_EMAIL || "noreply@artclick.ro";

  if (!KEY) {
    console.warn("BREVO_API_KEY not set — skipping email");
    return res.status(200).json({ success: true, warn: "no api key" });
  }

  const headers = {
    "api-key": KEY,
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  try {
    // ① Notificare owner
    const r1 = await fetch(BREVO, {
      method: "POST",
      headers,
      body: JSON.stringify({
        sender: { name: `${d.name} via Artclick`, email: FROM },
        to: [{ email: OWNER, name: "Artclick" }],
        replyTo: { email: d.email, name: d.name },
        subject: `🔔 Cerere ofertă nouă — ${d.name}${d.deadline ? " · " + d.deadline : ""}`,
        htmlContent: ownerEmail(d),
      }),
    });
    if (!r1.ok) throw new Error(await r1.text());

    // ② Confirmare client
    await fetch(BREVO, {
      method: "POST",
      headers,
      body: JSON.stringify({
        sender: { name: "Artclick", email: FROM },
        to: [{ email: d.email, name: d.name }],
        subject: `Am primit cererea ta! Revin în 24h cu oferta ✓`,
        htmlContent: clientEmail(d),
      }),
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Brevo error:", err);
    return res.status(500).json({ error: "Email send failed" });
  }
}
