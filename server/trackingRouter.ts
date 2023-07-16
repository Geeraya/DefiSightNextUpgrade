import { router, publicProcedure } from "./trpc.ts";
import { z } from "zod";
import { addWalletSchema } from "./validation/walletSchema.ts";

export const trackingRouter = router({
  add: publicProcedure
    .input(
      addWalletSchema.extend({
        userId: z.string(),
      })
    )
    .output(z.object({ status: z.string() }))
    .query(async ({ input }) => {
      console.log(input);

      return {
        status: "success",
      };
    }),

  delete: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        walletAddress: z.string(),
        walletChainId: z.number(),
      })
    )
    .query(async ({ input }) => {
      console.log(input);

      return {
        user: input.userId,
        wallet: input.walletAddress,
        status: "success",
      };
    }),
});
