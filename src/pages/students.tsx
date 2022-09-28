import type { NextPage } from 'next'
import Head from 'next/head'
import { useRecoilState } from 'recoil'
import { globalFilterValueState } from '../frontend/atoms/globalFilterValueAtom'
import StudentsTable from '../frontend/components/students/StudentsTable'
import useStudentsQuery from '../frontend/hooks/students/useStudentsQuery'
import { filterCourses } from '../frontend/services/courses/filterCourses'

const Home: NextPage = () => {
  const query = useStudentsQuery('students')
  const [globalFilterValue] = useRecoilState(globalFilterValueState)
  return (
    <div>
      <Head>
        <title>Sistemas III</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="main-container">
        <StudentsTable
          courses={filterCourses(query?.data?.students, globalFilterValue)}
        />
      </div>
    </div>
  )
}

export default Home
