import React from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import NumberFormat from 'react-number-format'
import { findProductName } from '../../../services/products/findProductName'
import { useRecoilState } from 'recoil'
import { selectedRecordDetailsState } from '../../../atoms/records/selectedRecordDetails'
import { ammountRecordAtomState } from '../../../atoms/records/ammountRecordAtom'

const TableAddedProducts = ({ products, productsQuery, storesQuery }: {products: Object[]; productsQuery: any; storesQuery: any }) => {
  const [, setSelectedRecordDetails] = useRecoilState(selectedRecordDetailsState)
  const [, setAmmount] = useRecoilState(ammountRecordAtomState)
  const actionBodyTemplateListProducts = (rowData: any) => {
    return (
    <React.Fragment>
        <Button icon="pi pi-trash" className="p-button p-button-danger "
        onClick={() => {
          setSelectedRecordDetails((details) => details.filter((d) => d.productId !== rowData.productId))
          setAmmount((prev) => ({ ammount: prev.ammount - (rowData.historicalPrice * parseFloat(rowData.quantity.toString() ? rowData.quantity.toString() : '0')) }))
        }} />
    </React.Fragment>
    )
  }
  return (
    <DataTable value={products} paginator className="p-datatable-customers" showGridlines rows={5} dataKey="id" responsiveLayout="scroll" emptyMessage="No se agregó ningun producto">
            <Column field="ProductName" header="Nombre" body={(rowData) => findProductName(rowData.productId, productsQuery)} style={{ minWidth: '2rem' }}></Column>
            <Column field="Quantity" header="Cantidad" body={(rowData) => rowData.quantity} style={{ minWidth: '4rem' }}></Column>
            <Column field="Precio" header="Precio" alignHeader={'center'} body={(rowData) => {
              return (
                  <NumberFormat value={rowData.historicalPrice} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} prefix={'$'}></NumberFormat>
              )
            }}/>
            <Column field="Subtotal" header="Subtotal" style={{ minWidth: '1rem' }}
            body={(rowData) => {
              return (
                  <NumberFormat value={rowData.historicalPrice * rowData.quantity } displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} prefix={'$'}></NumberFormat>
              )
            }}/>
            <Column body={actionBodyTemplateListProducts} exportable={false} style={{ minWidth: '8rem' }}></Column>
    </DataTable>
  )
}

export default TableAddedProducts
