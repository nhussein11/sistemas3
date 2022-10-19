import { useQuery } from '@tanstack/react-query'
import { getRecords } from '../../services/records/getRecords'
import { useRecoilState } from 'recoil'
import { isLoadState } from '../../atoms/isLoadState'

const useRecordsQuery = (queryId: string) => {
  const [, setLoading] = useRecoilState(isLoadState)
  const query = useQuery([queryId], () => getRecords().then((res) => {
    setLoading(false)
    return res.data
  }))
  return query
}

export default useRecordsQuery
