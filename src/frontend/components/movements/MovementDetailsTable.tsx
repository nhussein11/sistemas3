import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Dialog } from 'primereact/dialog'
import React from 'react'
import { DialogMovementDetailsProps } from '../../@types/frontend.types'
import useMovementDetailsTable from '../../hooks/movements/useMovementDetailsTable'
import useProductsQuery from '../../hooks/products/useProductsQuery'
import { findProductName } from '../../services/products/findProductName'

const MovementDetailsTable = ({
  setDisplayMovementDetailsTable,
  displayMovementDetailsTable
}: DialogMovementDetailsProps) => {
  const { filteredDetails } = useMovementDetailsTable()
  const ProductsQuery = useProductsQuery('products')
  if (displayMovementDetailsTable) {
    return (
      <Dialog
        header="Detalles del Movimiento"
        visible={displayMovementDetailsTable}
        style={{ width: '50vw' }}
        onHide={() => setDisplayMovementDetailsTable(false)}
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
            field="Producto"
            header="Product"
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

export default MovementDetailsTable
