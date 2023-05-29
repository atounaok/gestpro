import bcrypt from 'bcrypt'
import prismadb from '@/lib/prismadb'


export const POST = async (req: Request) => {
    if(req.method !== 'POST'){
        console.log("Il est entré")
        return new Response('Not ok', { status: 405 })
        };

        try {
            const { email, name, password } = await req.json();
    
            const existingUser = await prismadb.user.findUnique({
                where: {
                    email,
                }
            })
    
            if(existingUser){
                return new Response("Email taken", { status: 422, })
            }
    
            const hashedPassword = await bcrypt.hash(password, 12);
    
            const user = await prismadb.user.create({
                data: {
                    email,
                    name,
                    hashedPassword,
                    image: '',
                    emailVerified: new Date()
                }
            })
    
            return new Response(JSON.stringify({user}), { status: 200 });
        } catch (error) {
            console.log(error);
            //return new Response("", {status: 400})
        }
    }