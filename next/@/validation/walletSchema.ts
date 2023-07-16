import { z } from "zod";

// changes done here have to be reflected in the ../../server/validation/walletSchema.ts file

export const addWalletSchema = z.object({
  address: z.string().regex(/^0x[a-fA-F0-9]+$/, { message: "Invalid address" }),
  tag: z.string().min(1, { message: "Please define a tag." }).max(20),
  highlight: z.enum(["none", "red", "green", "blue", "yellow"]),
  chainId: z
    .string()
    .regex(/^0x[a-fA-F0-9]+$/, { message: "Invalid chain ID" }),
});
