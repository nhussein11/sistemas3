import { useQuery } from '@tanstack/react-query'
import { getCourses } from '../../services/courses/getCourses'
import { useRecoilState } from 'recoil'
import { isLoadState } from '../../atoms/isLoadState'

const useCoursesQuery = (queryId: string) => {
  const [, setLoading] = useRecoilState(isLoadState)
  const query = useQuery([queryId], () => getCourses().then((res) => {
    setLoading(false)
    return res.data
  }))
  return query
}

export default useCoursesQuery
