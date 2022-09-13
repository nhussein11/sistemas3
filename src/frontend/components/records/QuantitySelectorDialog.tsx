import React from 'react'
import { ConfirmDialog } from 'primereact/confirmdialog'
import { InputText } from 'primereact/inputtext'
import useQuantitySelectorDialog from '../../hooks/records/useQuantitySelectorDialog'

const QuantitySelectorDialog = () => {
  const {
    showQuantitySelectorDialog,
    setShowQuantitySelectorDialog,
    showQuantitySelectorDialogDefaultState,
    quantity,
    addDetail
  } = useQuantitySelectorDialog()
  return (
    <ConfirmDialog
      visible={showQuantitySelectorDialog.show}
      onHide={() =>
        setShowQuantitySelectorDialog(showQuantitySelectorDialogDefaultState)
      }
      message={
        <InputText
          {...quantity}
          name="quantity"
          placeholder="Ingresar Cantidad"
        />
      }
      header="Cantidad"
      accept={() => addDetail()}
      reject={() => console.log('Cancelamos')}
    />
  )
}

export default QuantitySelectorDialog
