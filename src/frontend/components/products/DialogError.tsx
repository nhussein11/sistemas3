import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import React from 'react'
import useDialogUpdateProductMutation from '../../hooks/products/useDialogUpdateProductMutation'

const DialogError = () => {
  const {
    showErrorDialog,
    setShowErrorDialog
  } = useDialogUpdateProductMutation('products')

  return (
    <Dialog
      visible={showErrorDialog}
      header="Error"
      style={{ width: '50vw' }}
      onHide={() => setShowErrorDialog(false)}
    >
      <div className="field-form-container">
        <span className="p-float-label" >
            Id not provided!
        </span>
      </div>
    </Dialog>
  )
}

export default DialogError
