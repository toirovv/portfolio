const BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
const CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID;

export const sendTelegram = async ({ name, email, message }) => {
  if (!BOT_TOKEN || !CHAT_ID) {
    console.warn("Telegram bot token or chat ID not configured");
    return;
  }

  const text = [
    "<b>🔔 New Contact Message</b>",
    "",
    `<b>Name:</b> ${name}`,
    `<b>Email:</b> ${email}`,
    `<b>Message:</b> ${message}`,
    "",
    `— from toirovv.dev`,
  ].join("\n");

  try {
    const res = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text,
          parse_mode: "HTML",
        }),
      }
    );
    return await res.json();
  } catch (err) {
    console.error("Telegram send error:", err);
  }
};
