import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Dialog } from 'primereact/dialog'
import React from 'react'
import { DialogRecordDetailsProps } from '../../@types/frontend.types'
import useRecordDetailsTable from '../../hooks/records/useRecordDetailsTable'
import useProductsQuery from '../../hooks/products/useProductsQuery'
import { findProductName } from '../../services/products/findProductName'

const RecordDetailsTable = ({
  setDisplayRecordDetailsTable,
  displayRecordDetailsTable
}: DialogRecordDetailsProps) => {
  const { filteredDetails } = useRecordDetailsTable()
  const ProductsQuery = useProductsQuery('products')
  if (displayRecordDetailsTable) {
    return (
      <Dialog
        header="Detalles del Movimiento"
        visible={displayRecordDetailsTable}
        style={{ width: '50vw' }}
        onHide={() => setDisplayRecordDetailsTable(false)}
      >
        <DataTable
          value={filteredDetails}
          paginator
          className="p-datatable-customers"
          showGridlines
          rows={10}
          dataKey="id"
          responsiveLayout="scroll"
          emptyMessage="No se encontraron Detalles"
        >
          <Column
            field="Product"
            header="Producto"
            body={(rowData) =>
              findProductName(rowData.productId, ProductsQuery)
            }
            alignHeader={'center'}
          />
          <Column
            field="Quantity"
            header="Cantidad"
            body={(rowData) => rowData.quantity}
            alignHeader={'center'}
          />
        </DataTable>
      </Dialog>
    )
  } else return <></>
}

export default RecordDetailsTable
