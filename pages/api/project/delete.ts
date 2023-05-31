import { NextApiRequest, NextApiResponse } from 'next'
import prismadb from '@/lib/prismadb'

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    if(req.method !== 'DELETE'){
        return res.status(405).end()
    }

    try {
        console.log("entré dans delete projects")
        const { id } = req.query;
        const projects = await prismadb.project.delete({
            where:{
                id: id as string,
            }
        })

        return res.status(200).json(projects);
    } catch (error) {
        console.log("Entré dans erreur delete project:")
        console.log(error)
        res.status(500).end();
    }
}