import { useRecoilState } from 'recoil'
import { selectedMovementDetailsState } from '../../atoms/selectedMovementDetails'
const useActionDeleteButton = (productId: string) => {
  const [, setSelectedMovementDetails] = useRecoilState(
    selectedMovementDetailsState
  )
  const deleteSelectedDetail = () => {
    setSelectedMovementDetails((prev) =>
      prev.filter((detail) => detail.productId !== productId)
    )
  }
  return {
    deleteSelectedDetail
  }
}

export default useActionDeleteButton
