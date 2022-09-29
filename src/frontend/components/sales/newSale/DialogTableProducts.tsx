import React from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import TableHeader from './TableHeader'
import NumberFormat from 'react-number-format'
import { newSaleTableProductProps } from '../../../@types/frontend.types'
import { Product } from '@prisma/client'

export default function DialogTableProducts ({ products, displayBasic, closeDialog, setProduct, setVisibleSelectorQuantity }: newSaleTableProductProps) {
  const actionBodyTemplateListProducts = (rowData: Product) => {
    return (
    <React.Fragment>
        <Button icon="pi pi-plus" className="p-button-rounded p-button-success "
        onClick={() => {
          setProduct(rowData)
          setVisibleSelectorQuantity(true)
        }} />
    </React.Fragment>
    )
  }
  return (
    <Dialog header={'Tabla de Productos'} visible={displayBasic} onHide={() => closeDialog()}>
           <DataTable value={products} paginator className="p-datatable-customers" showGridlines rows={10} dataKey="id" responsiveLayout="scroll"
           header={<TableHeader/>} emptyMessage="No se encontraron Productos">
          <Column field="Nombre" header="Nombre" body={(rowData) => rowData.name} alignHeader={'center'}/>
          <Column field="Descripcion" header="Descripcion" body={(rowData) => rowData.description} alignHeader={'center'}/>
          <Column field="Category" header="Categoría" body={(rowData) => rowData.category} alignHeader={'center'}/>
          <Column field="Precio" header="Precio" body={(rowData) => {
            return (
                <NumberFormat
                  value={rowData.price}
                  displayType={'text'}
                  thousandSeparator={'.'}
                  decimalSeparator={','}
                  prefix={'$'}
                ></NumberFormat>
            )
          }}
            alignHeader={'center'}
          />
           <Column body={actionBodyTemplateListProducts} exportable={false} style={{ minWidth: '8rem' }}></Column>
        </DataTable>
    </Dialog>
  )
}
