import { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'
import EnrollmentsTable from '../frontend/components/enrollments/EnrollmentsTable'
import useEnrollmentsQuery from '../frontend/hooks/enrollments/useEnrollmentsQuery'
const Home: NextPage = () => {
  const query = useEnrollmentsQuery('enrollments')
  return (
    <div>
      <Head>
        <title>Inscripciones</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="main-container">
        <EnrollmentsTable enrollments={query?.data?.enrollments} />
      </div>
    </div>
  )
}

export default Home