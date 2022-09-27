import type { NextPage } from 'next'
import Head from 'next/head'
import { useRecoilState } from 'recoil'
import { globalFilterValueState } from '../frontend/atoms/globalFilterValueAtom'
import CoursesTable from '../frontend/components/courses/coursesTable'
import useCoursesQuery from '../frontend/hooks/courses/useCoursesQuery'
import { filterCourses } from '../frontend/services/courses/filterCourses'

const Home: NextPage = () => {
  const query = useCoursesQuery('courses')
  const [globalFilterValue] = useRecoilState(globalFilterValueState)
  return (
    <div>
      <Head>
        <title>Sistemas III</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="main-container">
        <CoursesTable
          courses={filterCourses(query?.data?.courses, globalFilterValue)}
        />
      </div>
    </div>
  )
}

export default Home