import React from 'react'
import { Dialog } from 'primereact/dialog'
import DialogFooter from './DialogFooter'
import { Dropdown } from 'primereact/dropdown'
import { DialogNewMovementProps } from '../../@types/frontend.types'
import { InputText } from 'primereact/inputtext'
import useDialogNewMovementMutation from '../../hooks/movements/useDialogNewMovementMutation'

const DialogNewMovement = ({
  displayBasic,
  closeDialog
}: DialogNewMovementProps) => {
  const {
    handleCreateNewProduct,
    productName,
    setCategory,
    CATEGORIES
  } = useDialogNewMovementMutation('products')
  return (
    <Dialog
      visible={displayBasic}
      header="Nuevo Movimiento"
      style={{ width: '50vw' }}
      footer={() => DialogFooter({ closeDialog, handleCreateNewProduct })}
      onHide={() => closeDialog()}
    >
      <div className="form-container">
          <div className="field-drop">
            <label htmlFor="id">Seleccionar Tipo de Movimiento</label>
            <Dropdown
              options={CATEGORIES}
              onChange={(e) => setCategory(e.value)}
              placeholder={'Seleccionar'}
            />
          </div>
        <div className='field-form-container' style={{ display: 'grid', alignSelf: 'center' }}>
          <div style={{ width: '500px' }}>
            <label htmlFor="observation">Observación</label>
            <InputText
              {...productName}
              name="movementObservation"
              placeholder="ingresar Observación"
            />
          </div>
        </div>
      </div>
    </Dialog>
  )
}

export default DialogNewMovement
