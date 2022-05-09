const {ethers} = require("ethers")
require('dotenv').config()
const express = require("express")
const router = express.Router()

const TOKENLIST = require("../utils/TOKENLIST.json")
const TOKENS = TOKENLIST["tokens"]
const ADDRESSES = require("../utils/build/deployments/map.json")
const RESOLVER = require("../utils/build/contracts/Resolver.json")
const {ROUTERS} = require("../utils/routers")
const {verifyKey} = require("../routes/authenticate")
const {fetchRouterInfo} = require("../routes/equityRouter")

const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);

//web3shit
const fetchSigner = async () => {
    const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
    
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY);
    
    const signer = wallet.connect(provider);
    console.log(`connected to ${signer.address}`);
    
    return signer;
};



const fetchContract = async (address, abi) => {
    const contract = new ethers.Contract(address, abi, provider);
    console.log(`loaded contract ${contract.address}`);
    return contract;
};//works


const main = async () => { 
    const data = await fetchRouterInfo("0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270", "0x2791bca1f2de4661ed88a30c99a7a9449aa84174", "100")
    console.log(data)
}

main()