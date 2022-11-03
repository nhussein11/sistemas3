import { useRecoilState } from 'recoil'
import { selectedRecordDetailsState } from '../../atoms/records/selectedRecordDetails'
import { showQuantitySelectorDialogDefaultState, showQuantitySelectorDialogState } from '../../atoms/records/showQuantitySelectorDialog'
import useField from '../useField'
import { ammountRecordAtomState } from '../../../frontend/atoms/records/ammountRecordAtom'
import useProductsQuery from '../../hooks/products/useProductsQuery'
import { findProductPrice } from '../../services/products/findProductPrice'
import { RecordNameEnum } from '@prisma/client'
import { selectedRecordTypeState } from '../../atoms/records/selectedRecordType'

const useQuantitySelectorDialog = (recordName: any) => {
  const productsQuery = useProductsQuery('products')
  const [showQuantitySelectorDialog, setShowQuantitySelectorDialog] = useRecoilState(showQuantitySelectorDialogState)
  const [selectedRecordType] = useRecoilState(selectedRecordTypeState)
  const [, setAmmount] = useRecoilState(ammountRecordAtomState)
  const quantity = useField({ type: 'number', initialValue: 1 })
  const historicalPrice = useField({ type: 'number', initialValue: 0 })
  const [, setSelectedRecordDetails] = useRecoilState(selectedRecordDetailsState)
  console.log(selectedRecordType.recordName)

  // historicalPrice.value = findProductPrice(showQuantitySelectorDialog.productId, productsQuery)
  const addDetail = () => {
    if (selectedRecordType.recordName === RecordNameEnum.FACTURA_DUPLICADO) {
      console.log('entra como fac duplicado')
      historicalPrice.value = findProductPrice(showQuantitySelectorDialog.productId, productsQuery)
    }
    setSelectedRecordDetails((prev) => [
      ...prev,
      {
        stockId: showQuantitySelectorDialog.stockId,
        productId: showQuantitySelectorDialog.productId,
        storeId: showQuantitySelectorDialog.storeId,
        quantity: quantity.value as number,
        historicalPrice: historicalPrice.value as number
      }
    ])
    setAmmount((prev) => ({ ammount: prev.ammount + (historicalPrice.value as number * parseFloat(quantity.value?.toString() ? quantity.value?.toString() : '0')) }))
  }
  return {
    showQuantitySelectorDialog,
    setShowQuantitySelectorDialog,
    showQuantitySelectorDialogDefaultState,
    quantity,
    historicalPrice,
    addDetail
  }
}

export default useQuantitySelectorDialog
