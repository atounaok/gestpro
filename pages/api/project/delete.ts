import { NextApiRequest, NextApiResponse } from 'next'
import prismadb from '@/lib/prismadb'

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    if(req.method !== 'GET'){
        return res.status(405).end()
    }

    try {
        console.log("entré dans get projects")
        const projects = await prismadb.project.findMany()

        return res.status(200).json(projects);
    } catch (error) {
        console.log("Entré dans erreur project:")
        console.log(error)
        res.status(500).end();
    }
}