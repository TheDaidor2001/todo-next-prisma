'use server'

import prisma from "@/lib/prisma"
import { Todo } from "@prisma/client"
import { revalidatePath } from "next/cache"


export const sleep = async(seconds: number = 0) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true)
        }, seconds * 1000)
    })
}

export const toggleTodo = async (id:string, complete:boolean):Promise<Todo> => {


    const todo = await prisma.todo.findFirst({where: {id: id}})

    if(!todo) {
        throw `Todo con id: ${id} no existe`
    }

    const updatedTodo = await prisma.todo.update({
        where: {id},
        data: {complete}
    })

    revalidatePath('/dashboard/server-todos')

    return updatedTodo;

}

export const addTodo = async (description:string) => {
    try {
        const todo = await prisma.todo.create({data: {description, userId: '...'}})
        revalidatePath('/dashboard/server-todos')
        return todo;

    } catch (error) {
        return {
            msg: 'Error al crear el todo',
        }
    }
} 

export const deleteCompleted = async ():Promise<void> => {

    try {
        await prisma.todo.deleteMany({ where: { complete: true } })
        revalidatePath('/dashboard/server-todos')
    } catch (error) {
        console.log(error)
    }
}





