import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";

export const walletRouter = createTRPCRouter({
  add: privateProcedure
    .input(
      z.object({
        walletAddress: z.string(),
        walletTag: z.string(),
        walletHighlight: z.enum(["red", "green", "blue", "yellow"]),
        walletChainId: z.number(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const res = await ctx.trackerService.add.query({
        ...input,
        userId: ctx.userId,
      });

      if (!res || res.status !== "success") {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to add wallet",
        });
      }

      await ctx.prisma.wallet.create({
        data: {
          address: input.walletAddress,
          tag: input.walletTag,
          highlight: input.walletHighlight,
          chainId: input.walletChainId,
          userId: ctx.userId,
        },
      });
      return { status: "success" };
    }),
});
