import React from 'react'
import { ConfirmDialog } from 'primereact/confirmdialog'
import { InputText } from 'primereact/inputtext'
import useQuantitySelectorDialog from '../../../hooks/records/useQuantitySelectorDialog'
import { RecordNameEnum } from '@prisma/client'

const QuantitySelectorDialog = (recordName: any) => {
  const { showQuantitySelectorDialog, setShowQuantitySelectorDialog, showQuantitySelectorDialogDefaultState, quantity, historicalPrice, addDetail } = useQuantitySelectorDialog(recordName)
  function showHistoricalPrice () {
    if (recordName === RecordNameEnum.FACTURA_ORIGINAL) return true
    else return false
  }
  return (
    <ConfirmDialog visible={showQuantitySelectorDialog.show} onHide={() => setShowQuantitySelectorDialog(showQuantitySelectorDialogDefaultState)}
      message={ <>
      <InputText {...quantity} name="quantity" placeholder="Ingresar Cantidad" />
      {showHistoricalPrice() ? <InputText {...historicalPrice} name="precio Compra" placeholder="Ingresar Cantidad" hidden={showHistoricalPrice()}/> : null }
      </>}
      header="Cantidad" accept={() => addDetail()}
    />
  )
}

export default QuantitySelectorDialog
