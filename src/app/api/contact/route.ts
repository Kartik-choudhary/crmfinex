import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type") || "";
    let name = "";
    let email = "";
    let message = "";

    if (contentType.includes("application/json")) {
      const body = await request.json();
      name = body.name || "";
      email = body.email || "";
      message = body.message || "";
    } else if (contentType.includes("application/x-www-form-urlencoded")) {
      const form = await request.formData();
      name = String(form.get("name") || "");
      email = String(form.get("email") || "");
      message = String(form.get("message") || "");
    } else {
      const form = await request.formData();
      name = String(form.get("name") || "");
      email = String(form.get("email") || "");
      message = String(form.get("message") || "");
    }

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
    }

    const host = process.env.SMTP_HOST as string;
    const port = Number(process.env.SMTP_PORT || 587);
    const user = process.env.SMTP_USER as string;
    const pass = "Langot@#1234";
    // const pass = process.env.SMTP_PASS as string;
    const to = process.env.CONTACT_TO || "kartik.choudhary@crmfinex.com";
    const smtpSecureEnv = process.env.SMTP_SECURE?.toLowerCase();
    const secure = smtpSecureEnv === "true" || (smtpSecureEnv === undefined && port === 465);
    const fromAddress = process.env.SMTP_FROM || user;

    if (!host || !user || !pass) {
      return new Response(
        JSON.stringify({ error: "SMTP not configured. Set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO envs." }),
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: { user, pass },
    });

    // Verify connection/auth first for clearer errors
    // try {
    //   await transporter.verify();
    // } catch (e: any) {
    //   console.error("SMTP verify failed", e);
    //   return new Response(
    //     JSON.stringify({ error: `SMTP verify failed: ${e?.message || "Unknown error"}` }),
    //     { status: 500 }
    //   );
    // }

    const info = await transporter.sendMail({
      from: `CRMFinex Contact <${fromAddress}>`,
      to,
      replyTo: email,
      subject: `New contact form submission from ${name}`,
      text: message,
      html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p>${message.replace(
        /\n/g,
        "<br/>"
      )}</p>`,
    });

    return Response.json({ ok: true, id: info.messageId });
  } catch (err) {
    console.error("Send failed", err);
    const message = (err as any)?.message || "Failed to send";
    return new Response(JSON.stringify({ error: message }), { status: 500 });
  }
}


