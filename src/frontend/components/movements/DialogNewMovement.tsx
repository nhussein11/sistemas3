import React from 'react'
import { Dialog } from 'primereact/dialog'
import DialogFooter from './DialogFooter'
import { Dropdown } from 'primereact/dropdown'
import { DialogNewMovementProps } from '../../@types/frontend.types'
import { InputText } from 'primereact/inputtext'
import useDialogNewMovementMutation from '../../hooks/movements/useDialogNewMovementMutation'
import MovementsProductsTable from './MovementsProductsTable'
import { MovementType } from '@prisma/client'
import useMovementTypesQuery from '../../hooks/movements/useMovementTypesQuery'

const DialogNewMovement = ({
  displayBasic,
  closeDialog
}: DialogNewMovementProps) => {
  const {
    handleCreateNewProduct,
    selectedMovementType,
    changeMovementType,
    movementObservation
  } = useDialogNewMovementMutation('products')
  const movementTypesQuery = useMovementTypesQuery('movement-types')
  return (
    <Dialog
      visible={displayBasic}
      header="Nuevo Movimiento"
      style={{ width: '50vw' }}
      footer={() => DialogFooter({ closeDialog, handleCreateNewProduct })}
      onHide={() => closeDialog()}
      className={'p-dialog dialog-movements'}
    >
      <div className="form-container" style={{ display: 'flex', flexDirection: 'row' }}>
          <div className="field-drop">
            <label htmlFor="id">Seleccionar Tipo de Movimiento</label>
            <Dropdown
              value={selectedMovementType?.movementName}
              options={movementTypesQuery?.data?.movementsTypes.map(
                (movementTypes: MovementType) => movementTypes.movementName
              )}
              onChange={(e) => changeMovementType(e.target.value)}
              placeholder="seleccionar Depósito"
            />
          </div>
        <div className='field-form-container' style={{ display: 'grid', alignSelf: 'center' }}>
          <div style={{ width: '500px' }}>
            <label htmlFor="observation">Observación</label>
            <InputText
              {...movementObservation}
              name="movementObservation"
              placeholder="ingresar Observación"
            />
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', margin: '0.2rem' }}>
        <MovementsProductsTable/>
        <i className='pi pi-arrow-right' style={{ fontSize: '2rem', alignSelf: 'center' }}></i>
        <MovementsProductsTable/>
      </div>
    </Dialog>
  )
}

export default DialogNewMovement
