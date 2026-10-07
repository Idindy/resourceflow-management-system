export type AllocationStatus = "DRAFT" | "SUBMITTED" | "APPROVED" | "REJECTED";

export interface Allocation {
  id: number;
  employeeId: number;
  projectId: number;
  allocationPct: number;
  startDate: string;
  endDate: string;
  status: AllocationStatus;
  requestedBy: string;
  approvedBy?: string;
}

export interface CreateAllocation {
  employeeId: number;
  projectId: number;
  allocationPct: number;
  startDate: string;
  endDate: string;
  requestedBy: string;
}
