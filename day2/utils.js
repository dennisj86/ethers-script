import "dotenv/config.js";
//require('dotenv').config()
import {Alchemy, Network} from "alchemy-sdk";
import {ethers} from "ethers";

const getProvider = (mainnet = false) => {
    const providerUrl = mainnet
        ? Network.ARB_GOERLI
        : Network.ETH_SEPOLIA;

    const settings = {
        apiKey: process.env.ALCHEMY_KEY,
        network: providerUrl
    };
    return new Alchemy(settings);
}

const getSigner = (mainnet = false) => {
    const provider = getProvider(mainnet);
    return new ethers.Wallet(process.env.PRIVATE_KEY, provider);

}

const signer = getSigner();
const provider = getProvider();
console.log("signer:", await signer.getAddress());
const balance = await provider.core.getBalance(signer.getAddress());
console.log("Balance:", ethers.formatEther(balance._hex));