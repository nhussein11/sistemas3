import React from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import ActionAddBodyTemplate from './ActionAddBodyTemplate'

const MovementsProductsTable = ({
  products,
  detailsTable
}: {
  products: Object[]
  detailsTable: boolean
}) => {
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

        {!detailsTable
          ? (
            <Column
              body={(rowData) => (
                <ActionAddBodyTemplate
                  productId={rowData.id}
                  name={rowData.name}
                  price={rowData.price}
                />
              )}
              exportable={false}
              style={{ minWidth: '2rem' }}
            ></Column>
            )
          : (
          <Column
            field="priceTotal"
            header="Precio Total"
            body={(rowData) => rowData.price * rowData.quantity}
            style={{ minWidth: '1rem' }}
          ></Column>
            )}
      </DataTable>
    </div>
  )
}

export default MovementsProductsTable
