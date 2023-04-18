import 'dotenv/config';
import {ethers} from "ethers";
import {Alchemy, AlchemySubscription, Network} from "alchemy-sdk";



const settings = {
    apiKey: process.env.ALCHEMY_KEY,
    network: Network.ARB_MAINNET
}
const alchemy = new Alchemy(settings);

console.log("Current block number", await alchemy.core.getBlock("latest"));
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY);
console.log(wallet.address);
