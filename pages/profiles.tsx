import useCurrentUser from '@hooks/useCurrentUser';
import { Session } from 'inspector';
import { NextPageContext } from 'next'
import { getSession } from 'next-auth/react'
import React, { useState } from 'react'
import Image from 'next/image';
import Link from 'next/link';

export async function getServerSideProps(context: NextPageContext) {
    const session = await getSession(context);

    if(!session){
        return {
            redirect: {
                destination: '/auth',
                permanent: false,
            }
        }
    }

    return {
        props: {}
    }
}

const Profiles = () => {
    const { data: user } = useCurrentUser();
    const [isInfos, setIsInfos] = useState(true)

    const infosProfile = [
        {id: "info", title: "Infos personnelles"},
        {id: "mdp", title: "Mot de passe"}
    ]

    const handleMenu = () => {
        setIsInfos((prev) => !prev)
    }
  return (
    <div className='h-screen flex flex-col'>
        <div className='h-[35%] bg-[#141414] flex flex-col justify-center items-center hover:drop-shadow-2xl drop-shadow-xl'>
            <Image src={user?.image} width={80} height={80} alt='user image' 
            className='
                object-contain
                rounded-full
                mb-2
                shadow
                md:w-[130px]
                '/>
            <p className='text-[#f9f9f9] text-lg md:text-3xl'>{user?.email}</p>
        </div>
        <div className='bg-[#141414] flex justify-center hover:drop-shadow-2xl drop-shadow-xl'>
        <ul className='flex flex-row w-[60%] md:w-[20%] justify-between items-baseline'>
                {
                    infosProfile.map((info, index) => {
                        return (
                            <div key={index} onClick={info.id === "info" ? ()=> setIsInfos(true) :()=> setIsInfos(false)} className="text-[#f9f9f9]">
                                <Link href="" className='font-thin text-sm hover:border-b'>
                                    {info.title}
                                </Link>
                            </div>
                        )
                    })
                }
            </ul>
        </div>
        <section className='h-[55%] px-5 pt-5 md:w-[70%] w-full border self-center'>
            {
                isInfos? 
                (
                    <div className='h-full'>Info</div>
                ) : 
                (
                    <div>MDP</div>
                )
            }
        </section>
    </div>
  )
}

export default Profiles