import { NextPageContext } from 'next'
import { getSession } from 'next-auth/react'
import React from 'react'

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
  return (
    <div>
        Page de profile
    </div>
  )
}

export default Profiles