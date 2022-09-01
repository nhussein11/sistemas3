import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import React from 'react'
import { DialogNewStoreProps } from '../../@types/frontend.types'
import useDialogNewStoreMutation from '../../hooks/stores/useDialogNewStoreMutation'
import StoreDialogFooter from './StoreDialogFooter'

const DialogNewStore = ({ displayBasic, closeDialog }:DialogNewStoreProps) => {
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
          <div>
            <label htmlFor="id">Nombre</label>
            <InputText {...storeName} name="storeName" placeholder='Nombre'/>
          </div>
          <div>
            <label htmlFor="id">Dirección</label>
            <InputText {...storeAddress} name="storeAddress" placeholder='Dirección'/>
          </div>
        </div>
      </div>
    </Dialog>
  )
}

export default DialogNewStore
