import React from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import ActionAddBodyTemplate from './ActionAddBodyTemplate'
import ActionDeleteBodyTemplate from './ActionDeleteBodyTemplate'
import useStoresQuery from '../../hooks/stores/useStoresQuery'
import useProductsQuery from '../../hooks/products/useProductsQuery'
import { findProductName } from '../../services/products/findProductName'
import { findStoreName } from '../../services/stores/findStoreName'
const RecordsStocksTable = ({
  stocks,
  detailsTable
}: {
  stocks: Object[]
  detailsTable: boolean
}) => {
  const storesQuery = useStoresQuery('stores')
  const productsQuery = useProductsQuery('products')
  return (
    <div style={{ margin: '1rem' }}>
      <DataTable
        value={stocks}
        dataKey="id"
        paginator
        rows={5}
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
        responsiveLayout="scroll"
      >
        <Column
          field="ProductName"
          header="Product Name"
          body={(rowData) => findProductName(rowData.productId, productsQuery)}
          style={{ minWidth: '2rem' }}
        ></Column>
        <Column
          field="StoreName"
          header="Store Name"
          body={(rowData) => findStoreName(rowData.storeId, storesQuery)}
          style={{ minWidth: '1rem' }}
        ></Column>
        <Column
          field="Quantity"
          header="Stock Quantity"
          body={(rowData) => rowData.quantity}
          style={{ minWidth: '1rem' }}
        ></Column>
        {!detailsTable
          ? (
            <Column
              body={(rowData) => <ActionAddBodyTemplate storeId={rowData.storeId} productId={rowData.productId} stockId={rowData.id} />}
              exportable={false}
              style={{ minWidth: '2rem' }}
            ></Column>
            )
          : (
          <Column
            body={(rowData) => (
              <ActionDeleteBodyTemplate stockId={rowData.stockId} />
            )}
            exportable={false}
            style={{ minWidth: '2rem' }}
          ></Column>
            )}
      </DataTable>
    </div>
  )
}

export default RecordsStocksTable
