import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Dialog } from 'primereact/dialog'
import React from 'react'
import { DialogRecordDetailsProps } from '../../@types/frontend.types'
import useRecordDetailsTable from '../../hooks/records/useRecordDetailsTable'
const RecordDetailsTable = ({ setDisplayRecordDetailsTable, displayRecordDetailsTable, type }: DialogRecordDetailsProps) => {
  const { filteredDetailsTableData } = useRecordDetailsTable()
  if (displayRecordDetailsTable) {
    return (
      <Dialog header="Detalles de Comprobante" visible={displayRecordDetailsTable} style={{ width: '50vw' }} onHide={() => setDisplayRecordDetailsTable(false)}>
        <DataTable value={filteredDetailsTableData} paginator className="p-datatable-customers" showGridlines rows={5} dataKey="id" responsiveLayout="scroll" emptyMessage="No se encontraron Detalles">
          <Column field="Product" header="Producto" body={(rowData) => rowData.productName} alignHeader={'center'} />
          <Column field="Deposito" header="Deposito" body={(rowData) => rowData.storeName} alignHeader={'center'} />
          <Column field="Quantity" header="Cantidad" body={(rowData) => rowData.quantity} alignHeader={'center'} />
          {type === 'mov' ? null : <Column field="Price" header="Precio" body={(rowData) => rowData.price} alignHeader={'center'} />}
          {type === 'mov' ? null : <Column field="Subtotal" header="Subtotal" body={(rowData) => rowData.subtotal} alignHeader={'center'} />}
        </DataTable>
      </Dialog>
    )
  } else return <></>
}

export default RecordDetailsTable
