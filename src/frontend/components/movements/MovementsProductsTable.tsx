import React from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import ActionAddBodyTemplate from './ActionAddBodyTemplate'

const MovementsProductsTable = ({ products }: { products: [] }) => {
  return (
    <div style={{ margin: '1rem' }}>
      <DataTable
        value={products}
        dataKey="id"
        paginator
        rows={5}
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
        responsiveLayout="scroll"
      >
        <Column
          field="name"
          header="Nombre"
          style={{ minWidth: '2rem' }}
        ></Column>
        <Column field="quantity" header="Cantidad"></Column>
        <Column
          field="price"
          header="Precio Unidad"
          style={{ minWidth: '1rem' }}
        ></Column>
        <Column
          field="priceTotal"
          header="Precio Total"
          style={{ minWidth: '1rem' }}
        ></Column>
        <Column
          body={<ActionAddBodyTemplate />}
          exportable={false}
          style={{ minWidth: '2rem' }}
        ></Column>
      </DataTable>
    </div>
  )
}

export default MovementsProductsTable
