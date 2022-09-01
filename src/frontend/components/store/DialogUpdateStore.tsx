import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import React from 'react'
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
    style={{ width: '50vw' }}
    onHide={() => setShowUpdateDialog(false)}
  >
    <div className='form-container'>
      <div className="field-form-container">
        <span className="p-float-label">
          <InputText {...storeName} name="productName" />
          <label htmlFor="in">Nombre</label>
        </span>
      </div>
      <div className='field-form-container'>
        <span className="p-float-label">
          <InputText {...storeAddress} name="productDescription" />
          <label htmlFor="in">direccion</label>
        </span>
      </div>
    </div>
    <div className="footer-button-updateDialog">
      <Button
        label="Confirmar"
        icon="pi pi-check"
        onClick={handleUpdateStore}
        autoFocus
      />
    </div>
  </Dialog>
  )
}

export default DialogUpdateStore
