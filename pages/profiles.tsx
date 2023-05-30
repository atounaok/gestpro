import useCurrentUser from '@hooks/useCurrentUser';
import { Session } from 'inspector';
import { NextPageContext } from 'next'
import { getSession } from 'next-auth/react'
import React from 'react'
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
    const infosProfile = [
        "Infos personnelles",
        "Mot de passe"
    ]
  return (
    <div className='h-screen'>
        <div className='h-[35%] bg-[#141414] flex flex-col justify-center items-center'>
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
        <div className='bg-[#141414] flex justify-center'>
        <ul className='flex flex-row w-[60%] justify-between items-baseline'>
                {
                    infosProfile.map((info, index) => {
                        return (
                            <div key={index} className="text-[#f9f9f9]">
                                <Link href="" className='font-thin text-sm hover:border-b'>
                                    {info}
                                </Link>
                            </div>
                        )
                    })
                }
            </ul>
        </div>
    </div>
  )
}

export default Profiles