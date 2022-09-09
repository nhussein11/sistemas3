import React from 'react'
import { ConfirmDialog } from 'primereact/confirmdialog'
import { InputText } from 'primereact/inputtext'
import { useRecoilState } from 'recoil'
import {
  showQuantitySelectorDialogDefaultState,
  showQuantitySelectorDialogState
} from '../../atoms/showQuantitySelectorDialog'
import useField from '../../hooks/useField'
import { selectedMovementDetailsState } from '../../atoms/selectedMovementDetails'

const QuantitySelectorDialog = () => {
  const [showQuantitySelectorDialog, setShowQuantitySelectorDialog] =
    useRecoilState(showQuantitySelectorDialogState)
  const quantity = useField({
    type: 'number',
    initialValue: 0
  })
  const [, setSelectedMovementDetails] = useRecoilState(
    selectedMovementDetailsState
  )
  const bodyInput = () => {
    return (
      <InputText
        {...quantity}
        name="quantity"
        placeholder="Ingresar Cantidad"
      />
    )
  }
  return (
    <ConfirmDialog
      visible={showQuantitySelectorDialog.show}
      onHide={() =>
        setShowQuantitySelectorDialog(showQuantitySelectorDialogDefaultState)
      }
      message={bodyInput}
      header="Cantidad"
      accept={() =>
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
      reject={() => console.log('Cancelamos')}
    />
  )
}

export default QuantitySelectorDialog
