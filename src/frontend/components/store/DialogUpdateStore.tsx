import React from 'react'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import useDialogUpdateStoreMutation from '../../hooks/stores/useDialogUpdateStoreMutation'

const DialogUpdateStore = () => {
  const {
    handleUpdateStore,
    storeName,
    storeAddress,
    showUpdateDialog,
    setShowUpdateDialog
  } = useDialogUpdateStoreMutation('stores')
  return (
    <Dialog
    visible={showUpdateDialog}
    header="Actualizar Deposito"
    style={{ width: 'auto' }}
    onHide={() => setShowUpdateDialog(false)}
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
    <div className="footer-button-updateDialog">
      <Button
        label="Confirmar"
        className="p-button-raised p-button-success"
        icon="pi pi-check"
        onClick={handleUpdateStore}
        autoFocus
      />
    </div>
  </Dialog>
  )
}

export default DialogUpdateStore
