// Your bot's behaviour. Add commands here; grammY's docs (grammy.dev) cover
// keyboards, sessions, files, inline queries and everything else.

import { InlineKeyboard } from "grammy";

export function registerCommands(bot) {
  bot.command("start", (ctx) =>
    ctx.reply(
      `Привет, ${ctx.from?.first_name ?? "друг"}! Я твой Telegram-бот. Напиши /help, чтобы узнать мои команды.`,
      {
        reply_markup: new InlineKeyboard().text("Проверить связь", "ping"),
      }
    )
  );

  bot.command("help", (ctx) =>
    ctx.reply([
      "Доступные команды:",
      "/start — запустить бота",
      "/help — список команд",
      "/ping — проверить связь",
      "/id — узнать свой ID и ID чата",
    ].join("\n"))
  );

  bot.command("ping", (ctx) => ctx.reply("Связь работает!"));

  bot.command("id", (ctx) =>
    ctx.reply(
      `ID чата: ${ctx.chat.id}\nТвой ID: ${ctx.from?.id ?? "неизвестен"}`
    )
  );

  bot.callbackQuery("ping", async (ctx) => {
    await ctx.answerCallbackQuery({ text: "Связь работает!" });
    await ctx.reply("Всё работает! Бот на связи.");
  });

  bot.on("message:text", (ctx) => ctx.reply(ctx.message.text));
}

