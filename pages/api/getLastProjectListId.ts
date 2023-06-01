import { NextApiRequest, NextApiResponse } from 'next'
import prismadb from '@/lib/prismadb'

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    if(req.method !== 'GET'){
        return res.status(405).end()
    }

    try {
        const { projectId } = req.query;

        const project = await prismadb.listes.findFirst({
            where:{
                projectId: projectId as string, 
            },
            orderBy: {
                id: 'desc'
            },
        })

        return res.status(200).json(project?.id);
    } catch (error) {
        console.log("Entré dans erreur project:")
        console.log(error)
        res.status(500).end();
    }
}