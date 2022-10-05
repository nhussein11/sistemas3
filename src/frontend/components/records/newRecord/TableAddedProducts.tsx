import React from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import NumberFormat from 'react-number-format'
import { Product } from '@prisma/client'
import { findProductName } from '../../../services/products/findProductName'
import { findStoreName } from '../../../services/stores/findStoreName'
import { findProductPrice } from '../../../services/products/findProductPrice'

const TableAddedProducts = ({ products, productsQuery, storesQuery }: {products: Object[]; productsQuery: any; storesQuery: any }) => {
  const actionBodyTemplateListProducts = (rowData: Product) => {
    return (
    <React.Fragment>
        <Button icon="pi pi-trash" className="p-button p-button-danger "
        onClick={() => {
          // setProduct(rowData)
          // setVisibleSelectorQuantity(true)
        }} />
    </React.Fragment>
    )
  }
  return (
    <DataTable value={products} paginator className="p-datatable-customers" showGridlines rows={5} dataKey="id" responsiveLayout="scroll" emptyMessage="No se agregó ningun producto">
            <Column field="ProductName" header="Nombre" body={(rowData) => findProductName(rowData.productId, productsQuery)} style={{ minWidth: '2rem' }}></Column>
            <Column field="StoreName" header="Depósito" body={(rowData) => findStoreName(rowData.storeId, storesQuery)} style={{ minWidth: '1rem' }}></Column>
            <Column field="Quantity" header="Cantidad en Stock" body={(rowData) => rowData.quantity} style={{ minWidth: '1rem' }}></Column>
            <Column field="Precio" header="Precio" alignHeader={'center'} body={(rowData) => {
              return (
                  <NumberFormat value={findProductPrice(rowData.productId, productsQuery)} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} prefix={'$'}></NumberFormat>
              )
            }}/>
            <Column body={actionBodyTemplateListProducts} exportable={false} style={{ minWidth: '8rem' }}></Column>
    </DataTable>
  )
}

export default TableAddedProducts
