import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "../../../../server/server";

// @ts-expect-error - unknown error with the bellow type of AppRouter. Trying to find the problem yelded no results. Application working as expected. To be fixed.
export const trackerService = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:3001",
    }),
  ],
});
