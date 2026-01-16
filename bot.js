const TelegramBot = require("node-telegram-bot-api");

// 🔐 Put your bot token here (keep this private!)
const BOT_TOKEN = "8598881821:AAFCumaoYWUXQ1gOSXwVtql7hjm_jEUbYQU";

// Use plain text (no Markdown) to avoid entity parsing errors
const WELCOME_TEXT =
  "👋 Welcome to Giggle Academy · Hero Training Camp (Probation Period)\n" +
  "You are not joining an ordinary volunteer group.\n" +
  "You are entering a global public-good initiative dedicated to providing free, high-quality education to children worldwide.\n\n" +
  "🌍 Over the next one-month probation period, you will:\n" +
  "• Learn how to introduce and promote Giggle Academy to real users\n" +
  "• Support children, parents, and teachers using our free learning tools\n" +
  "• Participate in 公益 outreach, content creation, or community support\n" +
  "• Grow through real action into an official Giggle Hero\n\n" +
  "📌 Please complete the following within 24 hours:\n" +
  "1️⃣ Read all pinned announcements and materials\n" +
  "• Project guide, points rules, group code of conduct, and authorized resources\n\n" +
  "2️⃣ Complete self-introduction & information form\n" +
  "Your introduction should include:\n" +
  "• Your country / city\n" +
  "• Why you want to become a Giggle Hero\n" +
  "• How you can contribute to Giggle Academy\n" +
  "(user outreach, feedback, content creation, education resources, etc.)\n\n" +
  "📄 New Hero Information Form:\n" +
  "https://docs.google.com/forms/d/e/1FAIpQLSdIUcskb2VaW-0ThbKInqvcJDfTx8dTJ9zFJT0GR_vBmFxO4g/viewform?usp=dialog\n\n" +
  "3️⃣ Wait for the Welcome Ceremony (It is expected that after most people join next week)\n" +
  "• The group will be temporarily muted during the ceremony\n" +
  "• This marks the official start of your probation period\n\n" +
  "🚫 Zero-Tolerance Rules\n" +
  "• No advertising or commercial promotion\n" +
  "• No fake registrations, bots, or fabricated data\n" +
  "• Violations result in immediate removal\n\n" +
  "🌟 We look forward to celebrating your official Hero promotion in one month.";

function main() {
  if (!BOT_TOKEN || BOT_TOKEN.includes("PASTE_YOUR_BOT_TOKEN_HERE")) {
    console.error("❌ Please paste your real BOT_TOKEN into BOT_TOKEN in bot.js");
    process.exit(1);
  }

  const bot = new TelegramBot(BOT_TOKEN, { polling: true });

  console.log("🤖 Welcome bot is running...");

  // Listen for new members
  bot.on("message", async (msg) => {
    if (!msg.new_chat_members || msg.new_chat_members.length === 0) return;

    for (const member of msg.new_chat_members) {
      // Skip welcoming bots (optional)
      if (member.is_bot) continue;

      const fullName = `${member.first_name || ""} ${member.last_name || ""}`.trim();
      const username = member.username ? `@${member.username}` : "";
      const displayName = fullName || username || "New Hero";

      const personalizedWelcome =
        `👋 Welcome ${displayName}!\n\n` + WELCOME_TEXT;

      await bot.sendMessage(msg.chat.id, personalizedWelcome, {
        disable_web_page_preview: true,
      });
    }
  });
}

main();
