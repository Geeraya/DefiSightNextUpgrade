import { publicProcedure, router } from "./trpc.ts";
import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { z } from "zod";
import { trackingRouter } from "./trackingRouter.ts";

const appRouter = trackingRouter;

const server = createHTTPServer({
  router: appRouter,
});

server.listen(3001);

export type AppRouter = typeof appRouter;
