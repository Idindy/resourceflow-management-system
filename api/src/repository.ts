import { Allocation, CreateAllocation } from "./domain.js";

export interface AllocationRepository {
  create(input: CreateAllocation): Promise<Allocation>;
  get(id: number): Promise<Allocation | undefined>;
  save(allocation: Allocation): Promise<void>;
  overlappingApproved(employeeId: number, start: string, end: string): Promise<Allocation[]>;
}

export class InMemoryAllocationRepository implements AllocationRepository {
  private rows: Allocation[] = [];
  private nextId = 1;

  async create(input: CreateAllocation): Promise<Allocation> {
    const row: Allocation = { id: this.nextId++, ...input, status: "DRAFT" };
    this.rows.push(row);
    return { ...row };
  }
  async get(id: number) { const r=this.rows.find(x=>x.id===id); return r ? {...r} : undefined; }
  async save(a: Allocation) { const i=this.rows.findIndex(x=>x.id===a.id); if(i<0) throw new Error("Allocation not found"); this.rows[i]={...a}; }
  async overlappingApproved(employeeId:number,start:string,end:string) {
    return this.rows.filter(a=>a.employeeId===employeeId && a.status==="APPROVED" && a.startDate<=end && a.endDate>=start).map(a=>({...a}));
  }
}
