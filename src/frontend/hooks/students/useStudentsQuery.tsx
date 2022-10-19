import { useQuery } from '@tanstack/react-query'
import { getStudents } from '../../services/students/getStudents'
import { useRecoilState } from 'recoil'
import { isLoadState } from '../../atoms/isLoadState'

const useStudentsQuery = (queryId: string) => {
  const [, setLoading] = useRecoilState(isLoadState)
  const query = useQuery([queryId], () => getStudents().then((res) => {
    setLoading(false)
    return res.data
  }))
  return query
}

export default useStudentsQuery
