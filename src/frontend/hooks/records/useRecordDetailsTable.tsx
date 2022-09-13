import { RecordDetails } from '@prisma/client'
import { useRecoilState } from 'recoil'
import { selectedRecordState } from '../../atoms/records/selectedRecordAtom'
import useDetailsQuery from '../details/useDetailsQuery'

const useRecordDetailsTable = () => {
  const detailsQuery = useDetailsQuery('details')
  const [selectedRecord] = useRecoilState(selectedRecordState)
  const filteredDetails: RecordDetails[] =
    detailsQuery.data?.recordsDetails?.filter(
      (d: RecordDetails) => d.recordId === selectedRecord.id
    )
  return { filteredDetails }
}

export default useRecordDetailsTable
