import React from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import TableHeader from './TableHeader'
import NumberFormat from 'react-number-format'
import { resolveRecordSupplierName } from '../../../services/records/resolveRecordSupplierName'
import { resolveRecordCustomerName } from '../../../services/records/resolveRecordCustomerName'
import { useRecoilState } from 'recoil'
import { selectedRecordsState } from '../../../atoms/records/selectedRecords'
import { ammountRecordAtomState } from '../../../atoms/records/ammountRecordAtom'
import getRecordTotal from '../../../services/records/getRecordTotal'

export default function DialogTableRecords ({ records, displayBasic, closeDialog, setVisibleSelectorQuantity, customerQuery, supplierQuery, detailsQuery }:
    { records: Object[]; displayBasic: boolean; closeDialog: () => void; setVisibleSelectorQuantity: any; customerQuery: any; supplierQuery: any, detailsQuery: any }) {
  const [, setSelectedRecords] = useRecoilState(selectedRecordsState)
  const [, setAmmount] = useRecoilState(ammountRecordAtomState)
  const actionBodyTemplateListProducts = (rowData: any) => {
    return (
    <React.Fragment>
        <Button icon="pi pi-plus" className="p-button p-button-success "
        onClick={() => {
          setSelectedRecords((prev) => [...prev,
            {
              recordId: rowData.id,
              recordNumber: rowData.recordNumber,
              observation: rowData.observation,
              letter: rowData.letter,
              supplierId: rowData.supplierId,
              customerId: rowData.customerId
            }
          ])
          setAmmount((prev) => ({ ammount: prev.ammount + getRecordTotal(rowData.id, detailsQuery).totalAmmount }))
        }} />
    </React.Fragment>
    )
  }
  return (
    <Dialog header={'Tabla de Facturas'} visible={displayBasic} onHide={() => closeDialog()}>
          <DataTable value={records} paginator className="p-datatable-customers" showGridlines rows={10} dataKey="id" responsiveLayout="scroll"
           header={<TableHeader/>} emptyMessage="No se encontraron Facturas">
            <Column field="RecordNumber" header="Numero" body={(rowData) => rowData.recordNumber} style={{ minWidth: '2rem' }}></Column>
            <Column field="Observation" header="Observaci??n" body={(rowData) => rowData.observation} style={{ minWidth: '2rem' }}></Column>
            <Column field="letter" header="Tipo" body={(rowData) => rowData.letter} style={{ minWidth: '2rem' }}></Column>
            <Column field="SupplierClient" header="Cliente/Prov" body={(rowData) => (
              rowData.supplierId != null ? resolveRecordSupplierName(rowData.supplierId, supplierQuery) : resolveRecordCustomerName(rowData.customerId, customerQuery)
            )} style={{ minWidth: '2rem' }}></Column>
            <Column field="Ammount" header="Monto" alignHeader={'center'} body={(rowData) => {
              return (
                  <NumberFormat value={getRecordTotal(rowData.id, detailsQuery).totalAmmount} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} prefix={'$'}></NumberFormat>
              )
            }}/>
            <Column body={actionBodyTemplateListProducts} exportable={false} style={{ minWidth: '8rem' }}></Column>
        </DataTable>
    </Dialog>
  )
}
