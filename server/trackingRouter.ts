import { router, publicProcedure } from "./trpc.ts";
import { z } from "zod";

export const trackingRouter = router({
  add: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        walletAddress: z.string(),
        walletChainId: z.number(),
        walletTag: z.string(),
        walletHighlight: z.enum(["red", "green", "blue", "yellow"]),
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
