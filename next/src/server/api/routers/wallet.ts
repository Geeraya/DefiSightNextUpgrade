import { clerkClient } from "@clerk/nextjs/server";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  privateProcedure,
} from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  add: privateProcedure
    .input(
      z.object({ address: z.string(), name: z.string(), higlight: z.string() })
    )
    .query(({ ctx }) => {
      return {
        greeting: `Hello ${ctx.userId}`,
      };
    }),
});
