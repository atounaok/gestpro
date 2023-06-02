import { NextApiRequest, NextApiResponse } from 'next'
import prismadb from '@/lib/prismadb'

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    if(req.method !== 'POST'){
        return res.status(405).end()
    }

    try {
        const { name, projectId } = req.body;

        const newList = await prismadb.listes.create({
            data: {
              name:name,
              projectId: projectId,
            },
          });

        return res.status(200).json(newList);
    } catch (error) {
        console.log("Entré dans erreur:")
        console.log(error)
        res.status(400).end();
    }
}