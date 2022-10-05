import React from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import TableHeader from './TableHeader'
import NumberFormat from 'react-number-format'
import { showQuantitySelectorDialogState } from '../../../atoms/records/showQuantitySelectorDialog'
import { useRecoilState } from 'recoil'
import { resolveRecordSupplierName } from '../../../services/records/resolveRecordSupplierName'
import { resolveRecordCustomerName } from '../../../services/records/resolveRecordCustomerName'

export default function DialogTableRecords ({ records, displayBasic, closeDialog, setVisibleSelectorQuantity, customerQuery, supplierQuery }:
    { records: Object[]; displayBasic: boolean; closeDialog: () => void; setVisibleSelectorQuantity: any; customerQuery: any; supplierQuery: any }) {
  const [, setShowQuantitySelectorDialog] = useRecoilState(showQuantitySelectorDialogState)
  const actionBodyTemplateListProducts = (rowData: any) => {
    const stockId = rowData.stockId
    const productId = rowData.productId
    const storeId = rowData.storeId
    return (
    <React.Fragment>
        <Button icon="pi pi-plus" className="p-button p-button-success "
        onClick={() => { setShowQuantitySelectorDialog({ show: true, stockId, productId, storeId }) }} />
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
              rowData.supplierId != null ? resolveRecordSupplierName(rowData.supplierId, customerQuery) : resolveRecordCustomerName(rowData.customerId, supplierQuery)
            )} style={{ minWidth: '2rem' }}></Column>
            <Column field="Ammount" header="Monto" alignHeader={'center'} body={(rowData) => {
              return (
                  <NumberFormat value={'123'} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} prefix={'$'}></NumberFormat>
              )
            }}/>
            <Column body={actionBodyTemplateListProducts} exportable={false} style={{ minWidth: '8rem' }}></Column>
        </DataTable>
    </Dialog>
  )
}
