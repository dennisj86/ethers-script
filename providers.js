import {ethers} from "ethers";
import {Alchemy, Network} from "alchemy-sdk";
import 'dotenv/config';


const settings = {
    apiKey: process.env.ALCHEMY_KEY,
    network: Network.ETH_SEPOLIA
}
const alchemy = new Alchemy(settings);

//console.log("Current block number", await alchemy.core.getBlock("latest"));
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, alchemy);
//console.log(wallet.address);
//wallet.connect(alchemy);
let walletBalance = await alchemy.core.getBalance(wallet.address);
let walletBalanceAsValue = ethers.formatEther(walletBalance._hex);
const amaountToSend = ethers.parseEther("0.1");

console.log(walletBalance)
console.log("Balance:", walletBalanceAsValue);

const walletReceiver = "0x48D547D95f676b273811416F1E04a645eD10789E";

const tx = await wallet.signTransaction(
    {
        to: walletReceiver,
        value: amaountToSend,
        gasLimit: "21000",
        maxPriorityFeePerGas: ethers.parseUnits("5", "gwei"),
        maxFeePerGas: ethers.parseUnits("20", "gwei"),
        nonce: await alchemy.core.getTransactionCount(wallet.getAddress()),
        type: 2,
        chainId: 11155111
    }
)
const response = await alchemy.transact.sendTransaction(tx)
console.log("sent:", response);
walletBalance = await alchemy.core.getBalance(wallet.address);
walletBalanceAsValue = ethers.formatEther(walletBalance._hex);