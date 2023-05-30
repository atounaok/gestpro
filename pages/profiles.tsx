import useCurrentUser from '@hooks/useCurrentUser';
import { Session } from 'inspector';
import { NextPageContext } from 'next'
import { getSession } from 'next-auth/react'
import React from 'react'
import Image from 'next/image';

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
  return (
    <div>
        <p>Page de profile : {user?.name}</p>
        <Image src={user?.image} width={30} height={30} alt='user image' className='object-contain'/>
    </div>
  )
}

export default Profiles