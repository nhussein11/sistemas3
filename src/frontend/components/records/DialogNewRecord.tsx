import React from 'react'
import { Dialog } from 'primereact/dialog'
import { Dropdown } from 'primereact/dropdown'
import { InputText } from 'primereact/inputtext'
import { DialogNewRecordProps } from '../../@types/frontend.types'
import DialogFooter from './DialogFooter'
import RecordsStocksTable from './RecordsStocksTable'
import useDialogNewRecordMutation from '../../hooks/records/useDialogNewRecordMutation'
import QuantitySelectorDialog from './QuantitySelectorDialog'
import { useRecoilState } from 'recoil'
import { selectedRecordDetailsState } from '../../atoms/records/selectedRecordDetails'

const DialogNewRecord = ({ displayBasic, closeDialog }: DialogNewRecordProps) => {
  const {
    handleCreateNewRecord,
    selectedRecordType,
    changeRecordType,
    recordObservation,
    selectedStore,
    recordSenderName,
    recordAdress,
    changeStore,
    recordTypesOptions,
    storesOptions,
    stockOptions
  } = useDialogNewRecordMutation('records')
  const [selectedRecordDetails] = useRecoilState(selectedRecordDetailsState)
  return (
    <Dialog visible={displayBasic} header="Cargar Nuevo Comprobante" style={{ width: 'auto' }} footer={() => DialogFooter({ closeDialog, handleCreateNewRecord })}
      onHide={() => closeDialog()} className={'p-dialog dialog-records'}>
      <div style={{ display: 'grid', gridTemplateColumns: 'auto auto auto', columnGap: '1rem' }}>
        <div style={{ display: 'grid' }}>
          <label htmlFor="id">Tipo de Comprobante</label>
          <Dropdown value={selectedRecordType?.recordName} options={recordTypesOptions} onChange={(e) => changeRecordType(e.target.value)} placeholder="seleccionar"/>
        </div>
        <div style={{ display: 'grid' }}>
          <label htmlFor="id">Deposito</label>
          <Dropdown value={selectedStore?.name} options={storesOptions} onChange={(e) => changeStore(e.target.value)} placeholder="seleccionar"/>
        </div>
        <div style={{ display: 'grid' }}>
            <label htmlFor="observation">Observación</label>
            <InputText {...recordObservation} name="recordObservation" placeholder="ingresar Observación"/>
          </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'auto auto', columnGap: '1rem' }}>
          <div style={{ display: 'grid' }}>
            <label htmlFor="recordSenderName">Nombre Emisor</label>
            <InputText {...recordSenderName} name="senderName" placeholder="ingresar Nombre Emisor"/>
          </div>
          <div style={{ display: 'grid' }}>
            <label htmlFor="address">Dirección</label>
            <InputText {...recordAdress} value={selectedStore?.address} name="recordAdress" placeholder="ingresar Dirección" readOnly />
          </div>
      </div>
      <div style={{ display: 'flex', margin: '0.2rem' }}>
        <RecordsStocksTable detailsTable={false} stocks={stockOptions} />
        <i className="pi pi-arrow-right" style={{ fontSize: '2rem', alignSelf: 'center' }}></i>
        <RecordsStocksTable detailsTable stocks={selectedRecordDetails} />
      </div>
      <QuantitySelectorDialog />
    </Dialog>
  )
}

export default DialogNewRecord
