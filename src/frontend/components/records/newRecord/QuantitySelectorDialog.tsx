import React from 'react'
import { ConfirmDialog } from 'primereact/confirmdialog'
import { InputText } from 'primereact/inputtext'
import useQuantitySelectorDialog from '../../../hooks/records/useQuantitySelectorDialog'
import { RecordNameEnum } from '@prisma/client'

const QuantitySelectorDialog = ({ recordName } : {recordName: string}) => {
  const { showQuantitySelectorDialog, setShowQuantitySelectorDialog, showQuantitySelectorDialogDefaultState, quantity, historicalPrice, addDetail } = useQuantitySelectorDialog()
  function showHistoricalPrice () {
    if (recordName === RecordNameEnum.FACTURA_ORIGINAL) return true
    else return false
  }
  return (
    <ConfirmDialog visible={showQuantitySelectorDialog.show} onHide={() => setShowQuantitySelectorDialog(showQuantitySelectorDialogDefaultState)}
      message={ <>
        <span className="p-float-label" style={{ marginTop: '2rem' }}>
            <InputText {...quantity} name="quantity" placeholder="Ingresar Cantidad" />
            <label htmlFor="quantity">Cantidad</label>
        </span>
      {showHistoricalPrice()
        ? <span className="p-float-label" style={{ marginTop: '2rem' }}>
          <InputText {...historicalPrice} name="historicalPrice" placeholder="Ingresar Precio"/>
          <label htmlFor="historicalPrice">Precio Compra</label>
      </span>
        : null }
      </>}
      header="Cantidad" accept={() => addDetail()}
    />
  )
}

export default QuantitySelectorDialog
