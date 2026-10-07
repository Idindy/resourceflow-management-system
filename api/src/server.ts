import express from "express";
import { InMemoryAllocationRepository } from "./repository.js";
import { AllocationService } from "./service.js";

const app=express();
app.use(express.json());
const service=new AllocationService(new InMemoryAllocationRepository());

app.get("/health",(_req,res)=>res.json({status:"ok"}));
app.post("/api/allocations",async(req,res)=>{
  try { res.status(201).json(await service.create(req.body)); }
  catch(e){ res.status(400).json({error:(e as Error).message}); }
});
app.post("/api/allocations/:id/submit",async(req,res)=>{
  try { res.json(await service.submit(Number(req.params.id))); }
  catch(e){ res.status(409).json({error:(e as Error).message}); }
});
app.post("/api/allocations/:id/approve",async(req,res)=>{
  try { res.json(await service.approve(Number(req.params.id), String(req.body.approver ?? "manager"))); }
  catch(e){ res.status(409).json({error:(e as Error).message}); }
});

if(process.env.NODE_ENV!=="test"){
  app.listen(Number(process.env.PORT ?? 3000),()=>console.log("ResourceFlow API listening"));
}
export { app };
