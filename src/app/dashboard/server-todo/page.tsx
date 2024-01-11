
export const dynamic = 'force-dynamic'
export const revalidate = 0

import prisma from "@/lib/prisma";
import { NewTodo, TodosGrid } from "@/todos/components";




export const metadata = {
    title: 'Listado de TODOS',
    description: 'Listado de TODOS',
};


export default async function ServerTodosPage() {

    const todos = await prisma.todo.findMany({
        orderBy: {
            description: 'asc'
        }
    })

    return (
        <>
            <span className="text-3xl mb-10">Server Actions</span>
            <div className="w-full px-3 mx-5 mb-5">
                <NewTodo />
            </div>
            <TodosGrid todos={todos} />
        </>
    );
}