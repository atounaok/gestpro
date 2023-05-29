import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import CredentialsProvider from "next-auth/providers/credentials";
import prismadb from '@/lib/prismadb';
import { compare } from 'bcrypt';
import { POST } from "@app/api/users/route";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
          // The name to display on the sign in form (e.g. "Sign in with...")
          name: "Credentials",
          // `credentials` is used to generate a form on the sign in page.
          // You can specify which fields should be submitted, by adding keys to the `credentials` object.
          // e.g. domain, username, password, 2FA token, etc.
          // You can pass any HTML attribute to the <input> tag through the object.
          credentials: {
            email: {
                label: 'Email',
                type: 'text',
            },
            password: {
                label: 'password',
                type: 'password',
            },
            },
          async authorize(credentials, req) {
            // Add logic here to look up the user from the credentials supplied
            const res = await fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: credentials?.email,
                    password: credentials?.password,
                })
            })

            const user = await res.json();
      
            if (user) {
              // Any object returned will be saved in `user` property of the JWT
              return user
            } else {
              // If you return null then an error will be displayed advising the user to check their details.
              return null
      
              // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
            }
          }
        })
      ] 
})

export { handler as GET, handler as POST }
// export default NextAuth({
//     providers: [
//         Credentials({
//             id: 'credentials',
//             name: 'credentials',
//             credentials: {
//                 email: {
//                     label: 'Email',
//                     type: 'text',
//                 },
//                 password: {
//                     label: 'password',
//                     type: 'password',
//                 },
//             },
            
//             async authorize(credentials){
//                 alert('JE suis rentré')
//                 if(!credentials?.email || !credentials?.password){
//                     throw new Error('Email and password rerquired')
//                 }

//                 const user = await prismadb.user.findUnique({
//                     where: {
//                         email: credentials.email
//                     }
//                 });

//                 if(!user || !user.hashedPassword){
//                     throw new Error('Email does not exist')
//                 }

//                 const isCorrectPassword = await compare(credentials.password, user.hashedPassword);

//                 if(!isCorrectPassword){
//                     throw new Error('Incorrect password')
//                 }

//                 return user;
//             }
//         })
//     ],

//     pages: {
//         signIn: '/auth'
//     },

//     debug: process.env.NODE_ENV === 'development',

//     session: {
//         strategy: 'jwt',
//     },
//     jwt:{
//         secret: process.env.NEXTAUTH_JWT_SECRET,
//     },

//     secret: process.env.NEXTAUTH_SECRET,
// })