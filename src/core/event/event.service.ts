import { Injectable } from '@nestjs/common';
import {ethers} from "ethers";

@Injectable()
export class EventService {
    private readonly provider: ethers.JsonRpcProvider;
    private readonly wallet: ethers.Wallet;
    private contract: ethers.Contract;

    constructor() {
        const rpcUrl = process.env.SEPOLIA_RPC_URL;
        const privateKey = process.env.SEPOLIA_PRIVATE_KEY;
        const contractAddress = process.env.VOTING_CONTRACT_ADDRESS;

        this.provider = new ethers.JsonRpcProvider(rpcUrl);

        this.wallet = new ethers.Wallet(privateKey!, this.provider);

        const abi = [
            "function addEvent(string memory productId, string memory description) public",
            "function getEvents(string memory productId) public view returns (string[] memory, uint256[] memory)"
        ];
        this.contract = new ethers.Contract(contractAddress!, abi, this.wallet);
    }

    async addEvent(productId: string, description: string) {
        const tx = await this.contract.addEvent(productId, description);
        return await tx.wait();
    }

    async getEvents(productId: string) {
        return await this.contract.getEvents(productId)
    }
}
