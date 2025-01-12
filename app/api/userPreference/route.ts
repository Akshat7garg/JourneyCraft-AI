import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { handler } from "../auth/[...nextauth]/route";
import { getSession } from "next-auth/react";
import { prisma } from "@/lib/prisma";


; // Adjust path as needed

export async function POST(req: NextRequest) {
  const body=await req.json()
  const { depDate, arrivalDate } = body;
  const parsedDepDate = new Date(depDate); // Convert depDate to Date object
  const parsedArrivalDate = new Date(arrivalDate);
  console.log(body.userId);
  console.log(body.from);
  console.log(body.to);
  console.log(body.depDate);
  console.log(body.arrivalDate);
  console.log(body.adult);
  console.log(body.children);
  console.log(body.addInput);
  if (!body.userId || !body.from || !body.to || !body.depDate || !body.arrivalDate || !body.adult || !body.children || !body.addInput) {
    return NextResponse.json({message:"Value undefined"},{status:400})
  }
  
 
  
  const userPrefernce=await prisma.userPrefernce.create({
    
    
    data:{
      userId:body.userId,
      from:body.from,
      to:body.to,
      depDate:parsedDepDate,
      arrivalDate:parsedArrivalDate,
      adult:body.adult,
      children:body.children,
      addInput:body.addInput
    }
    
  })
  return NextResponse.json({userPrefernce},{status:200})
   
    
}

