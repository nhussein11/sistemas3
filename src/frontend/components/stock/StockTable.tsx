import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import React, { useState } from 'react'
import DialogNewStock from './DialogNewStock'
import StockCheckedBodyTemplate from './StockCheckedBodyTemplate'
import StockTableHeader from './StockTableHeader'

const StockTable = ({ stocks }) => {
  const [displayBasic, setDisplayBasic] = useState(false)

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
            field="ProductId"
            header="ProductId"
            body={(rowData) => rowData.productId}
            alignHeader={'center'}
          />
          <Column
            field="StoreId"
            header="StoreId"
            body={(rowData) => rowData.storeId}
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
      {/* <DialogNewProduct
      displayBasic={displayBasic}
      closeDialog={() => setDisplayBasic(false)}
    />
    <DialogUpdateProduct />
    <DialogError></DialogError> */}
    </div>
  )
}

export default StockTable
