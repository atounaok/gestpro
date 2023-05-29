import { compare } from "bcrypt";

interface RequestBody{
    email: string;
    password: string;
}


export async function POST(request: Request){
    const body:RequestBody = await request.json()

    const user = await prismadb.user.findUnique({
        where:{
            email: body.email,
        }
    })

    if(user && user.hashedPassword && await compare(body.password, user.hashedPassword)){
        const {hashedPassword, ...userWithoutPass} = user;
        
        return new Response(JSON.stringify(userWithoutPass));
    }else{
        return new Response(JSON.stringify(null));
    }
    
}