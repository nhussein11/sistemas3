import { useRecoilState } from 'recoil'
import { selectedRecordDetailsState } from '../../atoms/records/selectedRecordDetails'

const useActionDeleteButton = (stockId: string) => {
  const [, setSelectedRecordDetails] = useRecoilState(
    selectedRecordDetailsState
  )
  const deleteSelectedDetail = () => {
    setSelectedRecordDetails((prev) =>
      prev.filter((detail) => detail.stockId !== stockId)
    )
  }
  return {
    deleteSelectedDetail
  }
}

export default useActionDeleteButton
