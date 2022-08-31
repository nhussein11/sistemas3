import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import React from 'react'
import StoreDialogFooter from './StoreDialogFooter'

const DialogNewStore = ({ displayBasic, closeDialog }) => {
  return (
    <Dialog
      visible={displayBasic}
      header="Nuevo Producto"
      style={{ width: '50vw' }}
      footer={() => StoreDialogFooter({ closeDialog })}
      onHide={() => closeDialog()}
    >
      <div className="form-container">
        <div className="field-form-container">
          <span className="p-float-label">
            <InputText id="name" type={'text'} name="storeName" />
            <label htmlFor="in">name</label>
          </span>
        </div>
        <div className="field-form-container">
          <span className="p-float-label">
            <InputText id="address" type={'text'} name="storeAddress" />
            <label htmlFor="in">address</label>
          </span>
        </div>
      </div>
    </Dialog>
  )
}

export default DialogNewStore
