import { useRecoilState } from 'recoil'
import { selectedMovementDetailsState } from '../../atoms/selectedMovementDetails'
import {
  showQuantitySelectorDialogDefaultState,
  showQuantitySelectorDialogState
} from '../../atoms/showQuantitySelectorDialog'
import useField from '../useField'

const useQuantitySelectorDialog = () => {
  const [showQuantitySelectorDialog, setShowQuantitySelectorDialog] =
    useRecoilState(showQuantitySelectorDialogState)
  const quantity = useField({
    type: 'number',
    initialValue: 0
  })
  const [, setSelectedMovementDetails] = useRecoilState(
    selectedMovementDetailsState
  )
  const addDetail = () => {
    setSelectedMovementDetails((prev) => [
      ...prev,
      {
        productId: showQuantitySelectorDialog.productId,
        quantity: quantity.value as number,
        name: showQuantitySelectorDialog.name,
        price: showQuantitySelectorDialog.price
      }
    ])
  }
  return {
    showQuantitySelectorDialog,
    setShowQuantitySelectorDialog,
    showQuantitySelectorDialogDefaultState,
    quantity,
    addDetail
  }
}

export default useQuantitySelectorDialog
