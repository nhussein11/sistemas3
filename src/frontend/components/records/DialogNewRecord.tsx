import React from 'react'
import { Dialog } from 'primereact/dialog'
import DialogFooter from './DialogFooter'
import { Dropdown } from 'primereact/dropdown'
import { DialogNewRecordProps } from '../../@types/frontend.types'
import { InputText } from 'primereact/inputtext'
import useDialogNewRecordMutation from '../../hooks/records/useDialogNewRecordMutation'
import RecordsProductsTable from './RecordsProductsTable'
import { useRecoilState } from 'recoil'
import QuantitySelectorDialog from './QuantitySelectorDialog'
import { selectedRecordDetailsState } from '../../atoms/records/selectedRecordDetails'

const DialogNewRecord = ({
  displayBasic,
  closeDialog
}: DialogNewRecordProps) => {
  const {
    handleCreateNewRecord,
    selectedRecordType,
    changeRecordType,
    recordObservation,
    selectedStore,
    changeStore,
    recordTypesOptions,
    storesOptions,
    productsOptions
  } = useDialogNewRecordMutation('records')
  const [selectedRecordDetails] = useRecoilState(selectedRecordDetailsState)
  return (
    <Dialog
      visible={displayBasic}
      header="Nuevo Movimiento"
      style={{ width: '50vw' }}
      footer={() => DialogFooter({ closeDialog, handleCreateNewRecord })}
      onHide={() => closeDialog()}
      className={'p-dialog dialog-records'}
    >
      <div
        className="form-container"
        style={{ display: 'flex', flexDirection: 'row' }}
      >
        <div className="field-drop">
          <label htmlFor="id">Seleccionar Tipo de Movimiento</label>
          <Dropdown
            value={selectedRecordType?.recordName}
            options={recordTypesOptions}
            onChange={(e) => changeRecordType(e.target.value)}
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
              {...recordObservation}
              name="recordObservation"
              placeholder="ingresar Observación"
            />
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', margin: '0.2rem' }}>
        <RecordsProductsTable
          detailsTable={false}
          products={productsOptions}
        />
        <i
          className="pi pi-arrow-right"
          style={{ fontSize: '2rem', alignSelf: 'center' }}
        ></i>
        <RecordsProductsTable
          detailsTable
          products={selectedRecordDetails}
        />
      </div>
      <QuantitySelectorDialog />
    </Dialog>
  )
}

export default DialogNewRecord
