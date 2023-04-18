import 'dotenv/config';
import {ethers} from "ethers";
import {Alchemy, Network} from "alchemy-sdk";



const settings = {
    apikey: process.env.ALCHEMY_KEY,
    network: Network.ARB_MAINNET
}
const alchemy = new Alchemy(settings) ;
