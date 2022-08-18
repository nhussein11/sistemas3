import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import React, { useState } from 'react'

const DialogUpdateProduct = ({showUpdateDialog,setShowUpdateDialog}) => {
  const [productName, setProductName] = useState('')
  const [productPrice, setProductPrice] = useState(0)
  return (
    <Dialog
      visible={showUpdateDialog}
      header="Nuevo Producto"
      style={{ width: '50vw' }}
      onHide={() => setShowUpdateDialog(false)}
    >
      <div className="field-form-container">
        <span className="p-float-label">
          <InputText
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
          <label htmlFor="in">Nombre</label>
        </span>
        <span className="p-float-label">
          <InputText
            value={productPrice}
            type="number"
            onChange={(e) => setProductPrice(Number(e.target.value).valueOf())}
          />
          <label htmlFor="in">Descripcion</label>
        </span>
      </div>
      <button>Update</button>
    </Dialog>
  )
}

export default DialogUpdateProduct
