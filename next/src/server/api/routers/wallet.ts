// TODO: Delete procedure
// TODO: Update procedure?

import { TRPCError } from "@trpc/server";

import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";

import { addWalletSchema } from "@/validation/walletSchema";

export const walletRouter = createTRPCRouter({
  add: privateProcedure
    .input(addWalletSchema)
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

      // await ctx.prisma.wallet.create({
      //   data: {
      //     address: input.address,
      //     tag: input.tag,
      //     highlight: input.highlight,
      //     chainId: input.chainId,
      //     userId: ctx.userId,
      //   },
      // });
      console.log("walletRouter.add", input);
      // delay
      await new Promise((resolve) => setTimeout(resolve, 2000));
      return { status: "success" };
    }),
});
