import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import React from 'react'
import useDialogNewStoreMutation from '../../hooks/stores/useDialogNewStoreMutation'
import StoreDialogFooter from './StoreDialogFooter'

const DialogNewStore = ({ displayBasic, closeDialog }) => {
  const { storeAddress, storeName, handleCreateNewStore } =
    useDialogNewStoreMutation('stores')
  return (
    <Dialog
      visible={displayBasic}
      header="Nuevo Deposito"
      style={{ width: '50vw' }}
      footer={() => StoreDialogFooter({ closeDialog, handleCreateNewStore })}
      onHide={() => closeDialog()}
    >
      <div className="form-container">
        <div className="field-form-container">
          <span className="p-float-label">
            <InputText {...storeName} name="storeName" />
            <label htmlFor="in">name</label>
          </span>
        </div>
        <div className="field-form-container">
          <span className="p-float-label">
            <InputText {...storeAddress} name="storeAddress" />
            <label htmlFor="in">address</label>
          </span>
        </div>
      </div>
    </Dialog>
  )
}

export default DialogNewStore
