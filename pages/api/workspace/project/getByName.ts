import { NextApiRequest, NextApiResponse } from 'next'
import prismadb from '@/lib/prismadb'

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    if(req.method !== 'GET'){
        return res.status(405).end()
    }

    try {
        const { userId, name } = req.query;

        const project = await prismadb.project.findMany({
            where:{
                userId: userId as string,
                name: {
                    startsWith: name as string,
                    mode: 'insensitive',
                }
            },
        })

        return res.status(200).json(project);
    } catch (error) {
        console.log("Entré dans erreur project:")
        console.log(error)
        res.status(500).end();
    }
}