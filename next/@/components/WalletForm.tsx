// #TODO: Add highlight functionality

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { api } from "~/utils/api";
import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useToast } from "@/components/ui/use-toast";

import { Loader2 } from "lucide-react";
import { PlusCircle } from "lucide-react";

import { addWalletSchema } from "@/validation/walletSchema";

function WalletForm() {
  const { toast } = useToast();

  const { mutate, isLoading } = api.wallet.add.useMutation({
    onSuccess: () => {
      setDialogOpen(false);
      toast({
        title: "Wallet Added",
        description: "Your wallet has been added successfully.",
      });
    },
  });
  const [dialogOpen, setDialogOpen] = useState(false);

  const form = useForm<z.infer<typeof addWalletSchema>>({
    resolver: zodResolver(addWalletSchema),
    defaultValues: {
      address: "",
      chainId: "0xaa36a7",
      tag: "",
      highlight: "none",
    },
  });

  function handleSubmit(values: z.infer<typeof addWalletSchema>) {
    mutate(values);
  }

  return (
    <Dialog open={dialogOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setDialogOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add a new wallet
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Add a Wallet</DialogTitle>
        <Form {...form}>
          {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Wallet Address</FormLabel>
                  <FormControl>
                    <Input
                      spellCheck={false}
                      placeholder="Wallet Address"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    The address you would like to track.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tag"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Wallet Tag</FormLabel>
                  <FormControl>
                    <Input placeholder="Wallet Tag" {...field} />
                  </FormControl>
                  <FormDescription>
                    The tag that you would like to associate with the wallet.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="chainId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Chain</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select one of our supported blockchains" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={"0xaa36a7"}>
                        Sepolia Testnet
                      </SelectItem>
                      <SelectItem value={"0x1"}>Ethereum Mainnet</SelectItem>
                      <SelectItem value={"0x38"}>
                        Binance Smart Chain
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    The chain that the wallet resides on.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {isLoading ? (
              <Button className="mt-4" disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button className="mt-4" type="submit" variant={"default"}>
                Add Wallet
              </Button>
            )}
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default WalletForm;
