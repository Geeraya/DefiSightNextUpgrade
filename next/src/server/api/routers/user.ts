import { clerkClient } from "@clerk/nextjs/server";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  privateProcedure,
} from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  get: privateProcedure.query(({ ctx }) => {
    return {
      greeting: `Hello ${ctx.userId}`,
    };
  }),
});
