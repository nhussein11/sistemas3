import React, { useState } from 'react'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { RecordsTableProps } from '../../@types/frontend.types'
import TableHeader from './TableHeader'
import { parseDate } from '../../services/records/parseDate'
import { resolveRecordName } from '../../services/records/resolveRecordName'
import useRecordTypesQuery from '../../hooks/records/useRecordTypesQuery'
import RecordDetailsTable from './SaleDetailsTable'
import { Button } from 'primereact/button'
import { useRecoilState } from 'recoil'
import { selectedRecordState } from '../../atoms/records/selectedRecordAtom'

const SalesTable = ({ records }: RecordsTableProps) => {
  const [displayRecordDetailsTable, setDisplayRecordDetailsTable] = useState(false)
  const [, setSelectedRecord] = useRecoilState(selectedRecordState)
  const recordTypesQuery = useRecordTypesQuery('record-types')

  return (
    <div className="datatable-filter">
      <div className="card">
        <DataTable value={records} paginator className="p-datatable-customers" showGridlines rows={10} dataKey="id" responsiveLayout="scroll"
          emptyMessage="No se encontraron Ventas"
          header={
            <TableHeader/>
          }>
          <Column field="Fecha" header="Fecha" body={(rowData) => parseDate(rowData?.datetime)} alignHeader={'center'}/>
          <Column field="Observación" header="Observación" body={(rowData) => rowData.observation} alignHeader={'center'}/>
          <Column field="Cliente" header="Cliente" alignHeader={'center'} body={(rowData) => resolveRecordName(rowData.recordTypeId, recordTypesQuery)}/>
          <Column field="FormaPago" header="FormaPago" body={(rowData) => rowData.senderName} alignHeader={'center'}/>
          <Column field="Total" header="Total" body={(rowData) => rowData.address} alignHeader={'center'}/>
          <Column field="Usuario" header="Usuario" body={(rowData) => rowData.address} alignHeader={'center'}/>
          <Column field="Estado" header="Estado" alignHeader={'center'} body={(rowData) => rowData.address}/>
          <Column field="options" header="Opciones" alignHeader={'center'}
            body={(rowData) => {
              return (
                    <div>
                    <Button icon="pi pi-eye" iconPos="right" label="Ver Detalle" className="p-button-p-button-raised p-button-warning"
                    onClick={() => {
                      setSelectedRecord(rowData)
                      setDisplayRecordDetailsTable((prev: boolean) => !prev)
                    }}/>
                    </div>
              )
            }}/>
        </DataTable>
      </div>
      <RecordDetailsTable setDisplayRecordDetailsTable={setDisplayRecordDetailsTable} displayRecordDetailsTable={displayRecordDetailsTable}/>
    </div>
  )
}
export default SalesTable
