"use client";
import React, { useState } from "react";
import { api } from "~/utils/api";
import { z } from "zod";

const walletSchema = z.object({
  address: z
    .string()
    .length(42, { message: "Invalid address" })
    .regex(/^0x[a-fA-F0-9]+$/, { message: "Invalid address" }),
  chainId: z.number(),
  tag: z.string().min(1).max(20),
  highlight: z.enum(["red", "green", "blue", "yellow"]),
});

function WalletForm() {
  const { mutate } = api.wallet.add.useMutation();

  const [formErrors, setFormErrors] = useState({
    address: "",
    highlight: "",
  });

  const [walletInfo, setWalletInfo] = useState({
    address: "0x",
    chainId: 1,
    tag: "",
    highlight: "red",
  });

  function handleChange(
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) {
    const { name, value } = event.target;
    // The selector automatically casts the value to a string, so we need to cast it back to a number if the name is chainId
    let v: number | string;
    if (name === "chainId") {
      v = parseInt(value);
    } else {
      v = value;
    }

    setWalletInfo((prevWalletInfo) => ({
      ...prevWalletInfo,
      [name]: v,
    }));
  }

  function handleSubmit() {
    const validate = walletSchema.safeParse(walletInfo);
    console.log(walletInfo);

    console.log(validate);
  }

  return (
    <div className="flex flex-col">
      <h2 className="text-white">New Wallet Form</h2>
      <label className="text-white">Wallet Address</label>
      <input
        name="address"
        onChange={handleChange}
        value={walletInfo.address}
      />
      <label className="text-white">Chain</label>
      <select name="chainId" onChange={handleChange}>
        <option value={1} defaultChecked>
          Ethereum Mainnet
        </option>
        <option value={56} itemType="number">
          Binance Smart Chain
        </option>
        <option value={42161}>Arbitrum One</option>
        <option value={11155111}>Sepolia Testnet</option>
      </select>
      <label className="text-white">Tag</label>
      <input name="tag" onChange={handleChange} value={walletInfo.tag} />
      <label className="text-white">Highlight</label>
      <select name="highlight" onChange={handleChange}>
        <option value="red">Red</option>
        <option value="green">Green</option>
        <option value="blue">Blue</option>
        <option value="yellow">Yellow</option>
      </select>
      <button onClick={handleSubmit} className="text-white">
        Submit
      </button>
    </div>
  );
}

export default WalletForm;
