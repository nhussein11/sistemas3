import React from 'react'
import { ConfirmDialog } from 'primereact/confirmdialog'
import { InputText } from 'primereact/inputtext'
import useQuantitySelectorDialog from '../../../hooks/records/useQuantitySelectorDialog'
import { RecordNameEnum } from '@prisma/client'

const QuantitySelectorDialog = (recordName: any, productsQuery: any) => {
  const { showQuantitySelectorDialog, setShowQuantitySelectorDialog, showQuantitySelectorDialogDefaultState, quantity, historicalPrice, addDetail } = useQuantitySelectorDialog()
  function showHistoricalPrice () {
    if (recordName === RecordNameEnum.FACTURA_ORIGINAL) return true
    else return false
  }
  console.log(showHistoricalPrice())
  return (
    <ConfirmDialog visible={showQuantitySelectorDialog.show} onHide={() => setShowQuantitySelectorDialog(showQuantitySelectorDialogDefaultState)}
      message={ <>
      <InputText {...quantity} name="quantity" placeholder="Ingresar Cantidad" />
      <InputText {...historicalPrice} name="precio Compra" placeholder="Ingresar Precio"/>
      {/* {showHistoricalPrice() ? <InputText {...historicalPrice} name="precio Compra" placeholder="Ingresar Precio"/> : null } */}
      </>}
      header="Cantidad" accept={() => addDetail()}
    />
  )
}

export default QuantitySelectorDialog
