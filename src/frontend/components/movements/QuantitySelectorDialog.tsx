import React, { useState } from 'react'
import { ConfirmDialog } from 'primereact/confirmdialog'
import { InputText } from 'primereact/inputtext'

const QuantitySelectorDialog = () => {
  const [visible, setVisible] = useState(false)
  const bodyInput = () => {
    return <InputText name="quantity" placeholder="Ingresar Cantidad" />
  }
  return (
    <ConfirmDialog visible={visible} onHide={() => setVisible(false)} message={bodyInput} header="Cantidad" accept={() => console.log('metemos el producto en tabla')} reject={() => console.log('Cancelamos')} />
  )
}

export default QuantitySelectorDialog
