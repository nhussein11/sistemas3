import React from 'react'
import { Dialog } from 'primereact/dialog'
import DialogFooter from './DialogFooter'
import { Dropdown } from 'primereact/dropdown'
import { DialogNewMovementProps } from '../../@types/frontend.types'
import { InputText } from 'primereact/inputtext'
import useDialogNewMovementMutation from '../../hooks/movements/useDialogNewMovementMutation'
import MovementsProductsTable from './MovementsProductsTable'
import { useRecoilState } from 'recoil'
import QuantitySelectorDialog from './QuantitySelectorDialog'
import { selectedMovementDetailsState } from '../../atoms/movements/selectedMovementDetails'

const DialogNewMovement = ({
  displayBasic,
  closeDialog
}: DialogNewMovementProps) => {
  const {
    handleCreateNewMovement,
    selectedMovementType,
    changeMovementType,
    movementObservation,
    selectedStore,
    changeStore,
    movementTypesOptions,
    storesOptions,
    productsOptions
  } = useDialogNewMovementMutation('movements')
  const [selectedMovementDetails] = useRecoilState(selectedMovementDetailsState)
  return (
    <Dialog
      visible={displayBasic}
      header="Nuevo Movimiento"
      style={{ width: '50vw' }}
      footer={() => DialogFooter({ closeDialog, handleCreateNewMovement })}
      onHide={() => closeDialog()}
      className={'p-dialog dialog-movements'}
    >
      <div
        className="form-container"
        style={{ display: 'flex', flexDirection: 'row' }}
      >
        <div className="field-drop">
          <label htmlFor="id">Seleccionar Tipo de Movimiento</label>
          <Dropdown
            value={selectedMovementType?.movementName}
            options={movementTypesOptions}
            onChange={(e) => changeMovementType(e.target.value)}
            placeholder="seleccionar Depósito"
          />
        </div>
          <div className="field-drop">
          <label htmlFor="id">Seleccionar Deposito</label>
           <Dropdown
            value={selectedStore?.name}
            options={storesOptions}
            onChange={(e) => changeStore(e.target.value)}
            placeholder="seleccionar Depósito"
          />
          </div>
        <div
          className="field-form-container"
          style={{ display: 'grid', alignSelf: 'center' }}
        >
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
        <MovementsProductsTable
          detailsTable={false}
          products={productsOptions}
        />
        <i
          className="pi pi-arrow-right"
          style={{ fontSize: '2rem', alignSelf: 'center' }}
        ></i>
        <MovementsProductsTable
          detailsTable
          products={selectedMovementDetails}
        />
      </div>
      <QuantitySelectorDialog />
    </Dialog>
  )
}

export default DialogNewMovement
