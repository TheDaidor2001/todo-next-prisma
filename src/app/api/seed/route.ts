import prisma from '@/lib/prisma'
import { NextResponse, NextRequest } from 'next/server'
import bcrypt from 'bcryptjs';

export async function GET(request: Request) { 

  await prisma.todo.deleteMany()
  await prisma.user.deleteMany()

  const user = await prisma.user.create({
    data: {
      email: 'test@google.com',
      password: bcrypt.hashSync('123456'),
      roles: ['admin','client','super-user'],
      todo: {
        create: [
          {description: 'Learn Next.js'},
              {description: 'Learn Prisma'},
              {description: 'Learn GraphQL'},
              {description: 'Learn React'},
              {description: 'Learn Redux', complete: true},
        ]
      }
    }
  })

  // await prisma.todo.createMany({
  //   data: [
  //     {description: 'Learn Next.js'},
  //     {description: 'Learn Prisma'},
  //     {description: 'Learn GraphQL'},
  //     {description: 'Learn React'},
  //     {description: 'Learn Redux', complete: true},
  //   ]
  // })

  return NextResponse.json({
    mesg: 'Seed executed'
  })
}