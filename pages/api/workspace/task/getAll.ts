import { NextApiRequest, NextApiResponse } from 'next'
import prismadb from '@/lib/prismadb'

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    if(req.method !== 'GET'){
        return res.status(405).end()
    }

    try {
        const { projectId } = req.body;
        
        const tasks = await prismadb.task.findMany({
            where: {
                projectId: projectId,
            }
        })
        console.log(tasks)
        return res.status(200).json(tasks);
    } catch (error) {
        console.log("Entré dans erreur tasks:")
        console.log(error)
        res.status(500).end();
    }
}