import React from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import TableHeader from './TableHeader'
import NumberFormat from 'react-number-format'
import { newSaleTableProductProps } from '../../../@types/frontend.types'
import { findProductName } from '../../../services/products/findProductName'
import { findProductPrice } from '../../../services/products/findProductPrice'
import { showQuantitySelectorDialogState } from '../../../atoms/records/showQuantitySelectorDialog'
import { useRecoilState } from 'recoil'
import { selectedRecordTypeState } from '../../../atoms/records/selectedRecordType'

export default function DialogTableProducts ({ products, displayBasic, closeDialog, setVisibleSelectorQuantity, productsQuery, storesQuery }: newSaleTableProductProps) {
  const [, setShowQuantitySelectorDialog] = useRecoilState(showQuantitySelectorDialogState)
  const [selectedRecordType] = useRecoilState(selectedRecordTypeState)
  const actionBodyTemplateListProducts = (rowData: any) => {
    const stockId = rowData.id
    const productId = rowData.productId
    const storeId = rowData.storeId
    return (
    <React.Fragment>
        <Button icon="pi pi-plus" className="p-button-rounded p-button-success "
        onClick={() => { setShowQuantitySelectorDialog({ show: true, stockId, productId, storeId }) }} />
    </React.Fragment>
    )
  }
  return (
    <Dialog header={'Tabla de Productos'} visible={displayBasic} onHide={() => closeDialog()}>
          <DataTable value={products} paginator className="p-datatable-customers" showGridlines rows={10} dataKey="id" responsiveLayout="scroll"
           header={<TableHeader/>} emptyMessage="No se encontraron Productos">
            <Column field="ProductName" header="Nombre" body={(rowData) => findProductName(rowData.productId, productsQuery)} style={{ minWidth: '2rem' }}></Column>
            <Column field="Quantity" header="Cantidad en Stock" body={(rowData) => rowData.quantity} style={{ minWidth: '1rem' }}></Column>
            {selectedRecordType.recordName.includes('MOV')
              ? null
              : <Column field="Precio" header="Precio" alignHeader={'center'} body={(rowData) => {
                return (
                  <NumberFormat value={findProductPrice(rowData.productId, productsQuery)} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} prefix={'$'}></NumberFormat>
                )
              }}/>}
            <Column body={actionBodyTemplateListProducts} exportable={false} style={{ minWidth: '8rem' }}></Column>
        </DataTable>
    </Dialog>
  )
}
