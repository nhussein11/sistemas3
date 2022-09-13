import { useRecoilState } from 'recoil'
import { selectedRecordDetailsState } from '../../atoms/records/selectedRecordDetails'
import {
  showQuantitySelectorDialogDefaultState,
  showQuantitySelectorDialogState
} from '../../atoms/records/showQuantitySelectorDialog'
import useField from '../useField'

const useQuantitySelectorDialog = () => {
  const [showQuantitySelectorDialog, setShowQuantitySelectorDialog] =
    useRecoilState(showQuantitySelectorDialogState)
  const quantity = useField({
    type: 'number',
    initialValue: 0
  })
  const [, setSelectedRecordDetails] = useRecoilState(
    selectedRecordDetailsState
  )
  const addDetail = () => {
    setSelectedRecordDetails((prev) => [
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
