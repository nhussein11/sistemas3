import React from 'react'
import { Dialog } from 'primereact/dialog'
import { DialogNewStoreProps } from '../../@types/frontend.types'
import { InputText } from 'primereact/inputtext'
import useDialogNewStoreMutation from '../../hooks/stores/useDialogNewStoreMutation'
import StoreDialogFooter from './StoreDialogFooter'

const DialogNewStore = ({ displayBasic, closeDialog }:DialogNewStoreProps) => {
  const { storeAddress, storeName, handleCreateNewStore } =
    useDialogNewStoreMutation('stores')
  return (
    <Dialog
      visible={displayBasic}
      header="Nuevo Deposito"
      style={{ width: 'auto' }}
      footer={() => StoreDialogFooter({ closeDialog, handleCreateNewStore })}
      onHide={() => closeDialog()}
    >
      <div style={ { display: 'grid' } }>
          <div style={ { display: 'grid' } }>
            <label htmlFor="id">Nombre</label>
            <InputText {...storeName} name="storeName" placeholder='Nombre'/>
          </div>
          <div style={ { display: 'grid' } }>
            <label htmlFor="id">Dirección</label>
            <InputText {...storeAddress} name="storeAddress" placeholder='Dirección'/>
          </div>
     </div>
    </Dialog>
  )
}

export default DialogNewStore
