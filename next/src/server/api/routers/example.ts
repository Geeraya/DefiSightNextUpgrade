import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const exampleRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(async ({ input, ctx }) => {
      const res = await ctx.trackerService.add.query({
        userId: "userId",
        walletAddress: "walletAddress",
        walletChainId: 1,
        walletTag: "walletTag",
        walletHighlight: "red",
      });
      return {
        greeting: `${res.status}}`,
      };
    }),
});
