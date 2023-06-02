import { NextApiRequest, NextApiResponse } from 'next'
import prismadb from '@/lib/prismadb'

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    if(req.method !== 'POST'){
        return res.status(405).end()
    }

    try {
        const { projectId, listId, name } = req.body;

        const newTask = await prismadb.task.create({
            data: {
              projectId: projectId,
              listId: listId,
              name: name,
            },
        });
        console.log(newTask)

        return res.status(200).json(newTask);
    } catch (error) {
        console.log("Entré dans erreur task:")
        console.log(error)
        res.status(400).end();
    }
}