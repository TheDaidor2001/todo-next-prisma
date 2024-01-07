import prisma from '@/lib/prisma'
import { NextResponse, NextRequest } from 'next/server'

export async function GET(request: Request) { 

  await prisma.todo.deleteMany()

  await prisma.todo.createMany({
    data: [
      {description: 'Learn Next.js'},
      {description: 'Learn Prisma'},
      {description: 'Learn GraphQL'},
      {description: 'Learn React'},
      {description: 'Learn Redux', complete: true},
    ]
  })

  return NextResponse.json({
    mesg: 'Seed executed'
  })
}