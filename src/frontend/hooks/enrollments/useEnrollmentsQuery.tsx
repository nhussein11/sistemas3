import { useQuery } from '@tanstack/react-query'
import { getEnrollments } from '../../services/enrollments/getEnrollments'
import { useRecoilState } from 'recoil'
import { isLoadState } from '../../atoms/isLoadState'

const useEnrollmentsQuery = (queryId: string) => {
  const [, setLoading] = useRecoilState(isLoadState)
  const query = useQuery([queryId], () =>
    getEnrollments().then((res) => {
      setLoading(false)
      return res.data
    })
  )
  return query
}

export default useEnrollmentsQuery
