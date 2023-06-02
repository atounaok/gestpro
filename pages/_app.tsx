import React from 'react';
import '@styles/globals.css'
import type { AppContext, AppProps } from 'next/app'
import Layout from '@components/Layout';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import NextNProgress from 'nextjs-progressbar';
import { getSession, SessionProvider, useSession } from 'next-auth/react';
import { NextPageContext } from 'next';
import App from 'next/app';

export const metadeta = {
    title: "Gestpro",
    description: 'Here to help you finish your projects'
}

function MyApp({ Component, pageProps }: AppProps, appContext: NextPageContext) {

  return (
    <>
      <SessionProvider>
          <Layout>
            <NextNProgress color="radial-gradient(rgb(254, 202, 202), rgb(220, 38, 38))"/>
            <Component {...pageProps} />
          </Layout>
      </SessionProvider>
    </>
  )
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);
  const session = await getSession(appContext.ctx);

  if (session) {
    const updatedSession = {
      ...session,
      user: {
        ...session.user,
        id: 'votre_id_utilisateur', // Remplacez 'votre_id_utilisateur' par l'ID réel de l'utilisateur
      },
    };

    return {
      ...appProps,
      session: updatedSession,
    };
  }

  return {
    ...appProps,
  };
}

export default MyApp
