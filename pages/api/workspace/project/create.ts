import { NextApiRequest, NextApiResponse } from 'next'
import prismadb from '@/lib/prismadb'

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    if(req.method !== 'POST'){
        return res.status(405).end()
    }

    try {
        const { name, userId } = req.body;

        const project = await prismadb.project.create({
            data: {
                name: name,
                userId: userId
            }
        })

        return res.status(200).json(project);
    } catch (error) {
        console.log("Entré dans erreur:")
        console.log(error)
        res.status(400).end();
    }
}