import { publicProcedure, router } from "./_core/trpc";
import { processTelegramUpdate } from "./telegram-bot";
import { z } from "zod";

export const telegramRouter = router({
  webhook: publicProcedure
    .input(z.any())
    .mutation(async ({ input }) => {
      try {
        await processTelegramUpdate(input);
        return { ok: true };
      } catch (error) {
        console.error("Telegram webhook error:", error);
        return { ok: false, error: String(error) };
      }
    }),
});
