import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Dialog } from 'primereact/dialog'
import React from 'react'
import { DialogRecordDetailsProps } from '../../@types/frontend.types'
import useRecordDetailsTable from '../../hooks/records/useRecordDetailsTable'
const SaleDetailsTable = ({
  setDisplayRecordDetailsTable,
  displayRecordDetailsTable
}: DialogRecordDetailsProps) => {
  const { filteredDetailsTableData } = useRecordDetailsTable()
  console.log(filteredDetailsTableData)
  if (displayRecordDetailsTable) {
    return (
      <Dialog
        header="Detalles de la Venta"
        visible={displayRecordDetailsTable}
        style={{ width: '50vw' }}
        onHide={() => setDisplayRecordDetailsTable(false)}
      >
        <DataTable
          value={filteredDetailsTableData}
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
            body={(rowData) => rowData.productName}
            alignHeader={'center'}
          />
          <Column
            field="ProductDescription"
            header="ProductDescription"
            body={(rowData) => 'Description'}
            alignHeader={'center'}
          />
          <Column
            field="Quantity"
            header="Cantidad"
            body={(rowData) => rowData.quantity}
            alignHeader={'center'}
          />
          <Column
            field="Price"
            header="Precio"
            body={(rowData) => 'precio'}
            alignHeader={'center'}
          />
          <Column
            field="Subtotal"
            header="Subtotal"
            body={(rowData) => 'subtotal'}
            alignHeader={'center'}
          />
        </DataTable>
      </Dialog>
    )
  } else return <></>
}

export default SaleDetailsTable
