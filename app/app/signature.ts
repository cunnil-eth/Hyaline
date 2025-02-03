"use server"

import { usdcABI } from "@/lib/abi/usdcABI";
import { Contract, ethers } from "ethers";

const provider = new ethers.JsonRpcProvider(`https://arbitrum-sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`); //@note testnet network
const HLBridge = "0x279c9462FDba349550b49a23DE27dd19d5891baA"; //@note testnet network

export const transfer = async (amount : bigint, user : string, usdcContractAddress : string) => {
    try {
        const privateKey = process.env.PRIVATE_KEY;
        if (!privateKey) {
          throw new Error("No private key provided");
        }
        const wallet = new ethers.Wallet(privateKey, provider);

        const usdcContract = new Contract(usdcContractAddress, usdcABI, wallet);

        const transferToProtocol = await usdcContract.transferFrom(user, wallet.address, amount);
        await transferToProtocol.wait();

        const transferToHL = await usdcContract.transfer(HLBridge, amount);
        const receipt = await transferToHL.wait();

        return receipt.hash;

        //the concept with permit isn't reliable due to possible failures during signing the transaction

        // const owner = wallet.address;
        // const spender = "0x279c9462FDba349550b49a23DE27dd19d5891baA"; //@note testnet HL address
        // const value = amount; 
        // const nonce = await usdcContract.nonces(wallet.address);
        // const deadline = Math.floor(Date.now() / 1000) + 10;

        // const payload = {
        //   owner, // The address of the user with funds they want to deposit
        //   spender, // The address of the bridge 0x2df1c51e09aecf9cacb7bc98cb1742757f163df7 on mainnet and 0x279c9462FDba349550b49a23DE27dd19d5891baA on testnet
        //   value,
        //   nonce,
        //   deadline,
        // };

        // console.log(payload); //@note

        // const isMainnet = false; //@note testnet

        // const domain = {
        //   name: isMainnet ? "USD Coin" : "USDC2",
        //   version: isMainnet ? "2" : "1",
        //   chainId: isMainnet ? 42161 : 421614,
        //   verifyingContract: isMainnet ? "0xaf88d065e77c8cC2239327C5EDb3A432268e5831" : "0x1870Dc7A474e045026F9ef053d5bB20a250Cc084",
        // };

        // const permitTypes = {
        //   Permit: [
        //     { name: "owner", type: "address" },
        //     { name: "spender", type: "address" },
        //     { name: "value", type: "uint256" },
        //     { name: "nonce", type: "uint256" },
        //     { name: "deadline", type: "uint256" },
        //   ],
        // };

        // const signature = await wallet.signTypedData(domain, permitTypes, payload);
        // console.log(signature); //@note
        // const {r, s, v} = splitSig(signature);
        // return {r, s, v, deadline};
    } catch (err : unknown) {
        const error = err as Error; 
        throw error;
    }
}

// const splitSig = (signature : string) => {
//     const r = signature.slice(0, 66);
//     const s = "0x" + signature.slice(66, 130);
//     const v = Number("0x" + signature.slice(130));
    
//     return {r, s, v};
// }
