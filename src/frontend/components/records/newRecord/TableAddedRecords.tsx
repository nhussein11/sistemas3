import React from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import NumberFormat from 'react-number-format'
import { Product } from '@prisma/client'
import { resolveRecordCustomerName } from '../../../services/records/resolveRecordCustomerName'
import { resolveRecordSupplierName } from '../../../services/records/resolveRecordSupplierName'
import getRecordTotal from '../../../services/records/getRecordTotal'

const TableAddedRecords = ({
  records,
  customerQuery,
  supplierQuery,
  detailsQuery
}: {
  records: Object[]
  customerQuery: any
  supplierQuery: any
  detailsQuery: any
}) => {
  const actionBodyTemplateListProducts = (rowData: Product) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-trash"
          className="p-button p-button-danger "
          onClick={() => {}}
        />
      </React.Fragment>
    )
  }
  return (
    <DataTable
      value={records}
      paginator
      className="p-datatable-customers"
      showGridlines
      rows={3}
      dataKey="id"
      responsiveLayout="scroll"
      emptyMessage="No se agregó ningun producto"
    >
      {/* <Column field="RecordNumber" header="Numero" body={(rowData) => rowData.recordNumber} style={{ minWidth: '2rem' }}></Column> */}
      <Column
        field="RecordNumber"
        header="Numero"
        body={(rowData) => rowData.recordNumber}
        style={{ minWidth: '2rem' }}
      ></Column>
      <Column
        field="Observation"
        header="Observación"
        body={(rowData) => rowData.observation}
        style={{ minWidth: '2rem' }}
      ></Column>
      <Column
        field="letter"
        header="Tipo"
        body={(rowData) => rowData.observation}
        style={{ minWidth: '2rem' }}
      ></Column>
      <Column
        field="SupplierClient"
        header="Cliente/Prov"
        body={(rowData) =>
          rowData.supplierId != null
            ? resolveRecordSupplierName(rowData.supplierId, supplierQuery)
            : resolveRecordCustomerName(rowData.customerId, customerQuery)
        }
        style={{ minWidth: '2rem' }}
      ></Column>
      <Column
        field="Ammount"
        header="Monto"
        alignHeader={'center'}
        body={(rowData) => {
          return (
            <NumberFormat
              value={
                getRecordTotal(rowData.recordId, detailsQuery).totalAmmount
              }
              displayType={'text'}
              thousandSeparator={'.'}
              decimalSeparator={','}
              prefix={'$'}
            ></NumberFormat>
          )
        }}
      />
      <Column
        body={actionBodyTemplateListProducts}
        exportable={false}
        style={{ minWidth: '8rem' }}
      ></Column>
    </DataTable>
  )
}

export default TableAddedRecords
