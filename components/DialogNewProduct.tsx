import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import React, { useState } from 'react'
import DialogFooter from './DialogFooter'

const DialogNewProduct = ({ displayBasic, closeDialog }) => {
  const [nombreProducto, setNombreProducto] = useState('')
  const [precioProducto, setPrecioProducto] = useState(0)
  // description and other when backend is ready
  return (
    <Dialog
      visible={displayBasic}
      header="Nuevo Producto"
      style={{ width: '50vw' }}
      footer={() => DialogFooter({ closeDialog })}
      onHide={() => closeDialog()}
    >
      <div className="field-form-container">
        <span className="p-float-label">
          <InputText
            value={nombreProducto}
            onChange={(e) => setNombreProducto(e.target.value)}
          />
          <label htmlFor="in">Nombre</label>
        </span>
        <span className="p-float-label">
          <InputText
            value={precioProducto}
            type="number"
            onChange={(e) =>
              setPrecioProducto(Number(e.target.value).valueOf())
            }
          />
          <label htmlFor="in">Descripcion</label>
        </span>
      </div>
    </Dialog>
  )
}

export default DialogNewProduct
