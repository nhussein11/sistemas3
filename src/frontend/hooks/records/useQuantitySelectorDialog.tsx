import { useRecoilState } from 'recoil'
import { selectedRecordDetailsState } from '../../atoms/records/selectedRecordDetails'
import { showQuantitySelectorDialogDefaultState, showQuantitySelectorDialogState } from '../../atoms/records/showQuantitySelectorDialog'
import useField from '../useField'
import { ammountRecordAtomState } from '../../../frontend/atoms/records/ammountRecordAtom'
import useProductsQuery from '../../hooks/products/useProductsQuery'
import { findProductPrice } from '../../services/products/findProductPrice'

const useQuantitySelectorDialog = () => {
  const productsQuery = useProductsQuery('products')
  const [showQuantitySelectorDialog, setShowQuantitySelectorDialog] = useRecoilState(showQuantitySelectorDialogState)
  const [, setAmmount] = useRecoilState(ammountRecordAtomState)
  const quantity = useField({ type: 'number', initialValue: 1 })
  const [, setSelectedRecordDetails] = useRecoilState(selectedRecordDetailsState)
  const addDetail = () => {
    setSelectedRecordDetails((prev) => [
      ...prev,
      {
        stockId: showQuantitySelectorDialog.stockId,
        productId: showQuantitySelectorDialog.productId,
        storeId: showQuantitySelectorDialog.storeId,
        quantity: quantity.value as number
      }
    ])
    setAmmount((prev) => ({ ammount: prev.ammount + (findProductPrice(showQuantitySelectorDialog.productId, productsQuery) * parseFloat(quantity.value?.toString() ? quantity.value?.toString() : '0')) }))
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
