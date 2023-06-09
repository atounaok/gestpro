import { NextApiRequest, NextApiResponse } from 'next'
import prismadb from '@/lib/prismadb'

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    if(req.method !== 'PUT'){
        return res.status(405).end()
    }

    try {
        console.log("entré dans delete projects")
        const { id } = req.query;
        const { name } = req.body;

        console.log('Entré dans update voici id:'+ id)
        const tasks = await prismadb.task.update({
            where: {
                id: id as string
            },
            data: {
                name: name,
            }
        })

        return res.status(200).json(tasks);
    } catch (error) {
        console.log("Entré dans erreur delete project:")
        console.log(error)
        res.status(500).end();
    }
}