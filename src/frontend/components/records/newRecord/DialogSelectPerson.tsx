import React from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import TableHeader from './TableHeader'
import NumberFormat from 'react-number-format'
import { resolveRecordSupplierName } from '../../../services/records/resolveRecordSupplierName'
import { resolveRecordCustomerName } from '../../../services/records/resolveRecordCustomerName'
import getRecordTotal from '../../../services/records/getRecordTotal'

export default function DialogTableRecords ({ person, displayBasic }: { person: Object[]; displayBasic: boolean }) {
  const actionBodyTemplateListProducts = (rowData: any) => {
    return (
    <React.Fragment>
        <Button icon="pi pi-plus" className="p-button p-button-success "
        onClick={() => { console.log('asd') }} />
    </React.Fragment>
    )
  }
  return (
    <Dialog header={'Tabla de Facturas'} visible={displayBasic} onHide={() => closeDialog()}>
          <DataTable value={records} paginator className="p-datatable-customers" showGridlines rows={10} dataKey="id" responsiveLayout="scroll"
           header={<TableHeader/>} emptyMessage="No se encontraron Facturas">
            <Column field="RecordNumber" header="Numero" body={(rowData) => rowData.recordNumber} style={{ minWidth: '2rem' }}></Column>
            <Column field="Observation" header="Observación" body={(rowData) => rowData.observation} style={{ minWidth: '2rem' }}></Column>
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
