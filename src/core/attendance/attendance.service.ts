import { Injectable } from '@nestjs/common';
import {ethers} from "ethers";

@Injectable()
export class AttendanceService {
  private readonly provider: ethers.JsonRpcProvider;
  private readonly wallet: ethers.Wallet;
  private contract: ethers.Contract;

  constructor() {
    const rpcUrl = process.env.SEPOLIA_RPC_URL;
    const privateKey = process.env.SEPOLIA_PRIVATE_KEY;
    const contractAddress = process.env.ATTENDANCE_CONTRACT_ADDRESS;

    this.provider = new ethers.JsonRpcProvider(rpcUrl);

    this.wallet = new ethers.Wallet(privateKey!, this.provider);

    const abi = [
      "function recordAttendance(uint256 professorId, uint256 studentId, int256 latitude, int256 longitude) public",
      "function getAttendanceByStudent(uint256 studentId) public view returns (tuple(uint256 professorId, uint256 studentId, int256 latitude, int256 longitude, uint256 timestamp)[])",
      "function getAttendanceByProfessor(uint256 professorId) public view returns (tuple(uint256 professorId, uint256 studentId, int256 latitude, int256 longitude, uint256 timestamp)[])"
    ];
    this.contract = new ethers.Contract(contractAddress!, abi, this.wallet);
  }

  async recordAttendance(professorId: number, studentId: number, latitude: number, longitude: number) {
    const tx = await this.contract.recordAttendance(professorId, studentId, latitude, longitude);
    return await tx.wait();
  }

  async getByStudent(studentId: number) {
    const records = await this.contract.getAttendanceByStudent(studentId);
    return records.map((r: any) => ({
      professorId: Number(r.professorId),
      studentId: Number(r.studentId),
      latitude: Number(r.latitude),
      longitude: Number(r.longitude),
      timestamp: new Date(Number(r.timestamp) * 1000).toISOString()
    }));
  }

  async getByProfessor(professorId: number) {
    const records = await this.contract.getAttendanceByProfessor(professorId);
    return records.map((r: any) => ({
      professorId: Number(r.professorId),
      studentId: Number(r.studentId),
      latitude: Number(r.latitude),
      longitude: Number(r.longitude),
      timestamp: new Date(Number(r.timestamp) * 1000).toISOString()
    }));
  }
}
