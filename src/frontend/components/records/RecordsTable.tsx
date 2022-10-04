import React, { useState } from 'react'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import DialogNewRecord from './DialogNewRecord'
import DialogError from './DialogError'
import { RecordsTableProps } from '../../@types/frontend.types'
import TableHeader from './TableHeader'
import { parseDate } from '../../services/records/parseDate'
import { resolveRecordName } from '../../services/records/resolveRecordName'
import useRecordTypesQuery from '../../hooks/records/useRecordTypesQuery'
import { resolveRecordType } from '../../services/records/resolveRecordType'
import RecordDetailsTable from './RecordDetailsTable'
import { Button } from 'primereact/button'
import { useRecoilState } from 'recoil'
import { selectedRecordState } from '../../atoms/records/selectedRecordAtom'
import useDeleteRecordMutation from '../../hooks/records/useDeleteRecordMutation'

const RecordsTable = ({ records }: RecordsTableProps) => {
  const [displayBasic, setDisplayBasic] = useState(false)
  const [displayRecordDetailsTable, setDisplayRecordDetailsTable] =
    useState(false)
  const [, setSelectedRecord] = useRecoilState(selectedRecordState)
  const { handleDeleteRecord } = useDeleteRecordMutation('records')
  const recordTypesQuery = useRecordTypesQuery('record-types')
  return (
    <div className="datatable-filter">
      <div className="card">
        <DataTable value={records} paginator className="p-datatable-customers" showGridlines rows={10} dataKey="id" responsiveLayout="scroll"
          emptyMessage="No se encontraron Comprobantes"
          header={<TableHeader setDisplayRecordDetailsTable={setDisplayRecordDetailsTable} setDisplayBasic={setDisplayBasic}/>}>
          <Column field="Fecha" header="Fecha" body={(rowData) => parseDate(rowData?.datetime)} alignHeader={'center'} />
          <Column field="Observación" header="Observación" body={(rowData) => rowData.observation} alignHeader={'center'}/>
          <Column field="NombreComprobante" header="Comprobante" body={(rowData) => resolveRecordName(rowData.recordTypeId, recordTypesQuery)} alignHeader={'center'}/>
           <Column field="recordSenderName" header="Nombre Emisor" body={(rowData) => rowData.senderName} alignHeader={'center'} />
          <Column field="recordAdress" header="Dirección" body={(rowData) => rowData.address} alignHeader={'center'} />
          <Column field="TipoComprobante" header="Tipo Comprobante" alignHeader={'center'}
            body={(rowData) =>
              resolveRecordType(rowData.recordTypeId, recordTypesQuery) === 'POSITIVE'
                ? (<h2 style={{ color: 'green' }}>ENTRADA</h2>)
                : (<h2 style={{ color: 'red' }}>SALIDA</h2>)
            }/>
          <Column field="options" header="Opciones" alignHeader={'center'}
            body={(rowData) => {
              return (
                <div>
                  <Button
                  icon="pi pi-eye"
                  iconPos="right"
                  label="Ver Detalle"
                  className="p-button-p-button-raised p-button-warning"
                  onClick={() => {
                    setSelectedRecord(rowData)
                    setDisplayRecordDetailsTable((prev: boolean) => !prev)
                  }}
                  />
                  <Button
                  icon="pi pi-trash"
                  iconPos="right"
                  label="Borrar"
                  className="p-button-p-button-raised p-button-danger"
                  onClick={() => {
                    setSelectedRecord(rowData)
                    handleDeleteRecord()
                    setDisplayBasic(false)
                  }}
                  />
                </div>
              )
            }}
          />
        </DataTable>
      </div>
      <DialogNewRecord displayBasic={displayBasic} closeDialog={() => setDisplayBasic(false)}/>
      <RecordDetailsTable setDisplayRecordDetailsTable={setDisplayRecordDetailsTable} displayRecordDetailsTable={displayRecordDetailsTable}/>
      <DialogError></DialogError>
    </div>
  )
}
export default RecordsTable
