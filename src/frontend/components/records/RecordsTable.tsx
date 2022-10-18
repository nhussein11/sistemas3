import React, { useState } from 'react'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
// import DialogNewRecord from './DialogNewRecord'
import DialogError from './DialogError'
import { RecordsTableProps } from '../../@types/frontend.types'
import TableHeader from './TableHeader'
import { parseDate } from '../../services/records/parseDate'
import { resolveRecordName } from '../../services/records/resolveRecordName'
import { resolveRecordSupplierName } from '../../services/records/resolveRecordSupplierName'
import useRecordTypesQuery from '../../hooks/records/useRecordTypesQuery'
import useRecordsSupplierQuery from '../../hooks/records/useRecordsSupplierQuery'
import useRecordsCustomerQuery from '../../hooks/records/useRecordsCustomerQuery'
import RecordDetailsTable from './RecordDetailsTable'
import { Button } from 'primereact/button'
import { useRecoilState } from 'recoil'
import { selectedRecordState } from '../../atoms/records/selectedRecordAtom'
import useDeleteRecordMutation from '../../hooks/records/useDeleteRecordMutation'
import useDetailsQuery from '../../hooks/details/useDetailsQuery'
import { resolveRecordCustomerName } from '../../services/records/resolveRecordCustomerName'
import getRecordTotal from '../../services/records/getRecordTotal'
import NumberFormat from 'react-number-format'
import usePreviousRecordsQuery from '../../hooks/previous-records/usePreviousRecordQuery'
import RecordDetailsFacturaTable from './RecordDetailsFacturaTable'
import useRecordsQuery from '../../hooks/records/useRecordsQuery'
import { RecordNameEnum } from '@prisma/client'
const RecordsTable = ({ records, type }: RecordsTableProps) => {
  const [, setDisplayBasic] = useState(false)
  const [displayRecordDetailsTable, setDisplayRecordDetailsTable] = useState(false)
  const [displayRecordFacturasDetailsTable, setDisplayRecordFacturasDetailsTable] = useState(false)
  const [, setSelectedRecord] = useRecoilState(selectedRecordState)
  const { handleDeleteRecord } = useDeleteRecordMutation('records')
  const recordTypesQuery = useRecordTypesQuery('record-types')
  const recordSupplierQuery = useRecordsSupplierQuery('suppliers')
  const recordCustomerQuery = useRecordsCustomerQuery('customers')
  const detailsQuery = useDetailsQuery('details')
  const recordsQuery = useRecordsQuery('records')
  const previousRecordQuery = usePreviousRecordsQuery('previous-record')

  return (
    <div className="datatable-filter">
      <div className="card">
        <DataTable value={records} paginator className="p-datatable-customers" showGridlines rows={5} dataKey="id" responsiveLayout="scroll"
          emptyMessage="No se encontraron Comprobantes"
          header={<TableHeader type={type} setDisplayRecordDetailsTable={setDisplayRecordDetailsTable} setDisplayBasic={setDisplayBasic}/>}>
          <Column field="ID" header="Codigo" body={(rowData) => (rowData.recordNumber)} alignHeader={'center'} />
          <Column field="Fecha" header="Fecha" body={(rowData) => parseDate(rowData?.datetime)} alignHeader={'center'} />
          <Column field="Observación" header="Observación" body={(rowData) => rowData.observation} alignHeader={'center'}/>
          <Column field="NombreComprobante" header="Comprobante" body={(rowData) => resolveRecordName(rowData.recordTypeId, recordTypesQuery)} alignHeader={'center'}/>
          <Column field="pagado" header="Pagado" body={(rowData) => (rowData.paidFor ? 'PAGADO' : '-')} alignHeader={'center'} />
          <Column field="Ammount" header="Monto" alignHeader={'center'} body={(rowData) => {
            return (<NumberFormat value={getRecordTotal(rowData.id, detailsQuery).totalAmmount} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} prefix={'$'}></NumberFormat>)
          }}/>
          {type === 'ing'
            ? <Column field="Nombre Cliente" header="Cliente" body={(rowData) => resolveRecordCustomerName(rowData.customerId, recordCustomerQuery)} alignHeader={'center'}/>
            : <Column field="Nombre Proveedor" header="Proveedor" body={(rowData) => resolveRecordSupplierName(rowData.supplierId, recordSupplierQuery)} alignHeader={'center'}/>
          }
          {/* <Column field="recordAdress" header="Dirección" body={(rowData) => rowData.address} alignHeader={'center'} /> */}
          <Column field="tipo" header="Tipo" body={(rowData) => rowData.letter} alignHeader={'center'} />
          <Column field="options" header="Opciones" alignHeader={'center'}
            body={(rowData) => {
              return (
                <div>
                  <Button icon="pi pi-eye" iconPos="right" className="p-button-p-button-raised p-button-warning"
                  onClick={() => {
                    setSelectedRecord(rowData)
                    switch (resolveRecordName(rowData.recordTypeId, recordTypesQuery)) {
                      case RecordNameEnum.FACTURA_DUPLICADO:
                      case RecordNameEnum.FACTURA_ORIGINAL:
                        setDisplayRecordDetailsTable((prev: boolean) => !prev)
                        break
                      case RecordNameEnum.ORDEN_DE_COMPRA:
                      case RecordNameEnum.ORDEN_DE_PAGO:
                        setDisplayRecordFacturasDetailsTable((prev: boolean) => !prev)
                        break
                    }
                  }}
                  />
                  <Button icon="pi pi-trash" iconPos="right" className="p-button-p-button-raised p-button-danger"
                  onClick={() => {
                    setSelectedRecord(rowData)
                    handleDeleteRecord()
                    // setDisplayBasic(false)
                  }}
                  />
                </div>
              )
            }}
          />
        </DataTable>
      </div>
      <RecordDetailsTable setDisplayRecordDetailsTable={setDisplayRecordDetailsTable} displayRecordDetailsTable={displayRecordDetailsTable}/>
      <RecordDetailsFacturaTable previousRecordQuery={previousRecordQuery} recordsQuery={recordsQuery} setDisplayRecordFacturasDetailsTable={setDisplayRecordFacturasDetailsTable}
      displayRecordFacturasDetailsTable={displayRecordFacturasDetailsTable}/>
      <DialogError></DialogError>
    </div>
  )
}
export default RecordsTable
