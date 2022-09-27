import { useQuery } from '@tanstack/react-query'
import { getCourses } from '../../services/courses/getCourses'

const useCoursesQuery = (queryId: string) => {
  const query = useQuery([queryId], () => getCourses().then((res) => res.data))
  return query
}

export default useCoursesQuery
