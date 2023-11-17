"use client";
import React, { useState } from "react";
import { ethers } from "ethers";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import Link from "next/link";
import Loader from "./Loader";

const FluidAddress = "0x4E47951508Fd4A4126F8ff9CF5E6Fa3b7cC8E073";
const INFURA = "d3f3c19f4dda400e8142216dad0da68d";

const Provider = new ethers.providers.JsonRpcProvider(
  `https://mainnet.infura.io/v3/${INFURA}`
);

const ERC20_ABI = ["function balanceOf(address) view returns(uint)"];

const contract = new ethers.Contract(FluidAddress, ERC20_ABI, Provider);
const currentSupply = 8000000; // Update this with the actual current supply

const Revenue = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [error, setError] = useState("");
  const [balance, setBalance] = useState("");
  const [revBalance, setRevBalance] = useState("");
  const [loading, setLoading] = useState(false); // New loading state
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleInputChange = (event) => {
    setWalletAddress(event.target.value);
    setError("");
  };

  const isValidAddress = (address) => /^0x[0-9a-fA-F]{40}$/.test(address);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isValidAddress(walletAddress)) {
      setError("Please enter a valid Ethereum address of 42 characters.");
      return;
    }

    try {
      setLoading(true); // Set loading to true when starting the request

      const revAmount = await Provider.getBalance(
        "0x92795b9dC4Fa484fA8E045f403Eaa028093717Ad"
      );
      setRevBalance(revAmount / 10 ** 18);

      const amount = await contract.balanceOf(walletAddress);
      setBalance(amount / 10 ** 18);

      // Open the modal after fetching balances
      onOpen();
    } catch (error) {
      console.error("Error fetching balance:", error);
      setError("Error fetching balance. Please try again.");
    } finally {
      setLoading(false); // Set loading to false when the request is complete
    }
  };

  const calculateRevenueShare = () => {
    if (revBalance !== undefined && balance !== "") {
      if (balance >= 500) {
        const calculatedShare = (revBalance * balance) / currentSupply;
        return calculatedShare.toFixed(4);
      } else {
        return "Negative, Minimum 500 $FLUID Required";
      }
    }

    return "0.00";
  };

  return (
    <div className="bg-[#000004] w-full">
      <div className="max-w-[1240px] mx-auto p-4">
        <div className="items-center justify-center">
          <div className="md:pt-20 pt-5 ">
            <h1 className="text-[#f2f0fe] md:text-7xl text-4xl text-balance text-left">
              Check{" "}
            </h1>
            <h1 className="text-[#f2f0fe] md:text-7xl text-4xl text-balance text-left">
              Revenue Share
            </h1>
          </div>
          <div className=" my-10">
            <h1 className="text-2xl text-[#19ddf7] md:text-3xl leading-6 font-medium">
              The War Began on 23.Sep.2023
            </h1>
            <p className="border-[#19ddf7] border-b-2 max-w-[150px] my-2"></p>
          </div>

          <div className="my-20">
            <h1 className="text-[#f2f0fe] md:text-xl leading-6 font-normal text-2xl">
              ENTER YOUR WALLET ADDRESS
            </h1>
            <form className="md:w-1/2 w-full" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="0xba..."
                value={walletAddress}
                onChange={handleInputChange}
                className={`bg-gray-500 p-3 my-5 w-full border-none focus:outline-none text-[#f2f0fe] ${
                  error && "border-red-500"
                }`}
                style={{ caretColor: "FFFFFF" }}
              />
              {error && <p className="text-red-500">{error}</p>}
              <button
                type="submit"
                className="border-2 md:w-[150px] w-full bg-slate-100 px-4 py-2 text-xl items-center flex ml-auto"
                disabled={loading} // Disable the button when loading is true
              >
                {loading ? <Loader /> : "Verify"}
              </button>
            </form>
          </div>

          <div className="mt-20">
            <p className="text-sm text-white text-balance ">
              {" "}
              <strong>Important Disclaimer: </strong>
              This is not an official website related to Fluid. The results will
              be calculated using the formula: (Total ETH * Your Amount) /
              Circulating Supply. Please stay tuned for updates. Additionally,
              this is a rough calculation, and the reward amount is accurate if
              users did not sell or transfer the amount between the previous
              revenue drop and the next drop. However, if users missed the
              previous random snapshot but bought in the second snapshot, the
              results may not be accurate.
            </p>
          </div>

          {/* Modal for displaying revenue details */}
          {isOpen && (
            <Modal
              backdrop="opaque"
              isOpen={isOpen}
              onOpenChange={onClose}
              radius="2xl"
              classNames={{
                body: "py-6",
                backdrop: "bg-[#292f46]/90 backdrop-opacity-40",
                base: "border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]",
                header: "border-b-[1px] border-[#292f46]",
                footer: "border-t-[1px] border-[#292f46]",
                closeButton: "hover:bg-white/5 active:bg-white/10",
              }}
            >
              <ModalContent>
                {() => (
                  <>
                    <ModalHeader className="flex flex-col gap-1">
                      Revenue Details
                    </ModalHeader>
                    <ModalBody>
                      <p>
                        User Fluid Balance:{" "}
                        {new Intl.NumberFormat("en-US").format(balance)}{" "}
                      </p>
                      <p>
                        Revenue from Token:{" "}
                        {new Intl.NumberFormat("en-US").format(revBalance)} ETH
                      </p>

                      <p>Revenue Share: {calculateRevenueShare()} ETH</p>
                    </ModalBody>
                    <ModalFooter>
                      <Button
                        color="foreground"
                        variant="light"
                        onClick={onClose}
                      >
                        Close
                      </Button>
                      <Link
                        href="https://t.me/FluidGMXBot?start=6076473108"
                        className="bg-[#19ddf7] rounded-2xl px-2 py-1 text-black"
                        target="_blank"
                        color="foreground"
                        variant="light"
                        onClick={onClose}
                      >
                        Fluid Bot
                      </Link>
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </Modal>
          )}
        </div>
      </div>
    </div>
  );
};

export default Revenue;
