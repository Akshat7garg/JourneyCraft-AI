import { prisma } from "@/lib/prisma";
import { hash } from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
  const body=await req.json()
  const {name,email,password,}=body;
  const isexistingUser=await prisma.user.findUnique({
  where:{
    email
  }
  })
  if(isexistingUser){
    return NextResponse.json({
      user:null,
      message:"User with this email is already exists"
    },{status:409})
  }
  const hashedPass=await hash(password,10)
  const newUser=await prisma.user.create({
    data:{
      name,
      email,
      password:hashedPass
    }
  })
  return NextResponse.json({
    user:newUser,
    message:"New user created successfully"
  },{status:200})
}
