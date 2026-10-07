import { AllocationRepository } from "./repository.js";
import { CreateAllocation } from "./domain.js";

export class AllocationService {
  constructor(private repo: AllocationRepository) {}

  async create(input: CreateAllocation) {
    if (input.allocationPct <= 0 || input.allocationPct > 100) throw new Error("Allocation must be between 0 and 100 percent");
    if (input.endDate < input.startDate) throw new Error("End date must not precede start date");
    return this.repo.create(input);
  }

  async submit(id: number) {
    const a=await this.required(id);
    if(a.status!=="DRAFT") throw new Error("Only draft allocations may be submitted");
    a.status="SUBMITTED"; await this.repo.save(a); return a;
  }

  async approve(id:number, approver:string) {
    const a=await this.required(id);
    if(a.status!=="SUBMITTED") throw new Error("Only submitted allocations may be approved");
    const overlaps=await this.repo.overlappingApproved(a.employeeId,a.startDate,a.endDate);
    const committed=overlaps.reduce((sum,x)=>sum+x.allocationPct,0);
    if(committed+a.allocationPct>100) throw new Error(`Capacity exceeded: ${committed + a.allocationPct}%`);
    a.status="APPROVED"; a.approvedBy=approver; await this.repo.save(a); return a;
  }

  private async required(id:number) {
    const a=await this.repo.get(id);
    if(!a) throw new Error("Allocation not found");
    return a;
  }
}
