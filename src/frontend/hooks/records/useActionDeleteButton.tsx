import { useRecoilState } from 'recoil'
import { selectedRecordDetailsState } from '../../atoms/records/selectedRecordDetails'

const useActionDeleteButton = (productId: string) => {
  const [, setSelectedRecordDetails] = useRecoilState(
    selectedRecordDetailsState
  )
  const deleteSelectedDetail = () => {
    setSelectedRecordDetails((prev) =>
      prev.filter((detail) => detail.productId !== productId)
    )
  }
  return {
    deleteSelectedDetail
  }
}

export default useActionDeleteButton
