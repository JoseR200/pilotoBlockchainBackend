import { Injectable } from '@nestjs/common';
import {ethers} from "ethers";

@Injectable()
export class VoteService {
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
            "function vote(string memory option) public",
            "function getVotes(string memory option) public view returns (uint256)"
        ];
        this.contract = new ethers.Contract(contractAddress!, abi, this.wallet);
    }

    async vote(option: string) {
        const tx = await this.contract.vote(option);
        return await tx.wait();
    }

    async getVotes(option: string) {
        return await this.contract.getVotes(option);
    }
}
