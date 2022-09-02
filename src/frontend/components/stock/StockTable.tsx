import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import React, { useState } from 'react'
import { StockTableProps } from '../../@types/frontend.types'
import useProductsQuery from '../../hooks/products/useProductsQuery'
import useStoresQuery from '../../hooks/stores/useStoresQuery'
import { findProduct } from '../../services/products/findProduct'
import { findStore } from '../../services/stores/findStore'
import DialogError from '../products/DialogError'
import DialogNewStock from './DialogNewStock'
import DialogUpdateStock from './DialogUpdateStock'
import StockCheckedBodyTemplate from './StockCheckedBodyTemplate'
import StockTableHeader from './StockTableHeader'

const StockTable = ({ stocks }: StockTableProps) => {
  const [displayBasic, setDisplayBasic] = useState(false)
  const productsQuery = useProductsQuery('products')
  const storesQuery = useStoresQuery('stores')
  return (
    <div className="datatable-filter">
      <div className="card">
        <DataTable
          value={stocks}
          paginator
          className="p-datatable-customers"
          showGridlines
          rows={10}
          dataKey="id"
          responsiveLayout="scroll"
          header={<StockTableHeader setDisplayBasic={setDisplayBasic} />}
          emptyMessage="No se encontraron Productos"
        >
          <Column
            field="select"
            header="Select"
            body={(rowData) =>
              StockCheckedBodyTemplate({
                rowData
              })
            }
            alignHeader={'center'}
          />
          <Column
            field="Id"
            header="Id"
            body={(rowData) => rowData.id}
            alignHeader={'center'}
          />
          <Column
            field="ProductName"
            header="ProductName"
            body={(rowData) => findProduct(rowData.productId, productsQuery)}
            alignHeader={'center'}
          />
          <Column
            field="StoreName"
            header="StoreName"
            body={(rowData) => findStore(rowData.storeId, storesQuery)}
            alignHeader={'center'}
          />
          <Column
            field="quantity"
            header="quantity"
            body={(rowData) => rowData.quantity}
            alignHeader={'center'}
          />
          <Column
            field="minQuantity"
            header="minQuantity"
            body={(rowData) => rowData.minQuantity}
            alignHeader={'center'}
          />
        </DataTable>
      </div>
      <DialogNewStock
        displayBasic={displayBasic}
        closeDialog={() => setDisplayBasic(false)}
      />
      <DialogUpdateStock />
      <DialogError></DialogError>
    </div>
  )
}

export default StockTable
