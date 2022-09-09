import React, { useState } from 'react'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import DialogError from '../products/DialogError'
import DialogNewStock from './DialogNewStock'
import DialogUpdateStock from './DialogUpdateStock'
import { findProductName } from '../../services/products/findProductName'
import { findStoreName } from '../../services/stores/findStoreName'
import { StockTableProps } from '../../@types/frontend.types'
import StockCheckedBodyTemplate from './StockCheckedBodyTemplate'
import StockTableHeader from './StockTableHeader'
import useProductsQuery from '../../hooks/products/useProductsQuery'
import useStoresQuery from '../../hooks/stores/useStoresQuery'

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
            field="ProductName"
            header="Nombre Producto"
            body={(rowData) =>
              findProductName(rowData.productId, productsQuery)
            }
            alignHeader={'center'}
          />
          <Column
            field="StoreName"
            header="Nombre Depósito"
            body={(rowData) => findStoreName(rowData.storeId, storesQuery)}
            alignHeader={'center'}
          />
          <Column
            field="quantity"
            header="Cantidad"
            body={(rowData) => rowData.quantity}
            alignHeader={'center'}
          />
          <Column
            field="minQuantity"
            header="Cantidad Mínima"
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
