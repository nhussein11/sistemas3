import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import React, { useState } from 'react'

const DialogNewProduct = ({displayBasic,closeDialog,renderFooter}) => {
  const [nombreProducto, setNombreProducto] = useState('')

  return (
    <Dialog visible={displayBasic} header="Nuevo Producto" style={{ width: '50vw' }} footer={renderFooter('displayBasic')} onHide={() => closeDialog()}>
      <div className='field-form-container'>
          <span className="p-float-label">
              <InputText value={nombreProducto} onChange={(e) => setNombreProducto(e.target.value)} />
              <label htmlFor="in">Nombre</label>
          </span>
          <span className="p-float-label">
              <InputText value={nombreProducto} onChange={(e) => setNombreProducto(e.target.value)} />
              <label htmlFor="in">Descripcion</label>
          </span>
          <span className="p-float-label">
              <InputText value={nombreProducto} onChange={(e) => setNombreProducto(e.target.value)} />
              <label htmlFor="in">Precio</label>
          </span>
      </div>
  </Dialog>
  )
}

export default DialogNewProduct
