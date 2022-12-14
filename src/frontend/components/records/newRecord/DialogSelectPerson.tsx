import React from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import TableHeader from './TableHeader'
import NumberFormat from 'react-number-format'
import { RecordNameEnum } from '@prisma/client'
import { useRecoilState } from 'recoil'
import { selectedRecordTypeState } from '../../../atoms/records/selectedRecordType'

export default function DialogSelectPerson ({ supplierQuery, customerQuery, displayBasic, closeDialog, changeSupplier, changeCustomer }: { supplierQuery: any; customerQuery:any; displayBasic: boolean; closeDialog: any; changeSupplier: any; changeCustomer: any }) {
  const [selectedRecordType] = useRecoilState(selectedRecordTypeState)
  const actionBodyTemplateListProducts = (rowData: any) => {
    return (
    <React.Fragment>
        <Button icon="pi pi-check" className="p-button p-button-success "
        onClick={() => {
          changeSupplier(rowData.name)
          changeCustomer(rowData.name)
          closeDialog()
        }} />
    </React.Fragment>
    )
  }
  let persons
  let title
  switch (selectedRecordType.recordName) {
    case RecordNameEnum.FACTURA_ORIGINAL:
      persons = supplierQuery?.data?.suppliers
      title = 'Proveedores'
      break
    case RecordNameEnum.FACTURA_DUPLICADO:
      persons = customerQuery?.data?.customers
      title = 'Clientes'
      break
    case RecordNameEnum.ORDEN_DE_PAGO:
      persons = supplierQuery?.data?.suppliers
      break
  }

  return (
    <Dialog header={title} visible={displayBasic} onHide={() => { closeDialog() }}>
          <DataTable value={persons} paginator className="p-datatable-customers" showGridlines rows={4} dataKey="id" responsiveLayout="scroll"
           header={<TableHeader/>} emptyMessage="No se encontraron Facturas">
            <Column field="Nombre" header="Nombre" body={(rowData) => rowData.name} style={{ minWidth: '2rem' }}></Column>
            <Column field="Saldo" header="Saldo" alignHeader={'center'} body={(rowData) => {
              return (
                  <NumberFormat value={rowData.debt} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} prefix={'$'}></NumberFormat>
              )
            }}/>
            <Column body={actionBodyTemplateListProducts} exportable={false} style={{ minWidth: '8rem' }}></Column>
        </DataTable>
    </Dialog>
  )
}
