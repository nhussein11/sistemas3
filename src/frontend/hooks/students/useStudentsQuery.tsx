import { useQuery } from '@tanstack/react-query'
import { getStudents } from '../../services/students/getStudents'

const useStudentsQuery = (queryId: string) => {
  const query = useQuery([queryId], () => getStudents().then((res) => res.data))
  return query
}

export default useStudentsQuery
