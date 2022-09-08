import React, { useState } from 'react'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import DialogNewMovement from './DialogNewMovement'
import DialogError from './DialogError'
import NumberFormat from 'react-number-format'
import { MovementsTableProps } from '../../@types/frontend.types'
import TableHeader from './TableHeader'
import SelectBodyTemplate from './SelectBodyTemplate'

const MovementsTable = ({ movements }: MovementsTableProps) => {
  const [displayBasic, setDisplayBasic] = useState(false)
  return (
    <div className="datatable-filter">
      <div className="card">
        <DataTable
          value={movements}
          paginator
          className="p-datatable-customers"
          showGridlines
          rows={10}
          dataKey="id"
          responsiveLayout="scroll"
          header={<TableHeader setDisplayBasic={setDisplayBasic} />}
          emptyMessage="No se encontraron Movimientos"
        >
          <Column
            field="select"
            header="Select"
            body={(rowData) =>
              SelectBodyTemplate({
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
            field="Fecha"
            header="Fecha"
            body={(rowData) => rowData.date}// creo que este atributo no tiene movimiento
            alignHeader={'center'}
          />
          <Column
            field="Observación"
            header="Observación"
            body={(rowData) => rowData.observation}
            alignHeader={'center'}
          />
          <Column
            field="Cantidad"
            header="Cantidad Productos"
            body={(rowData) => rowData.quantity}
            alignHeader={'center'}
          />
           <Column
            field="TipoMovimiento"
            header="Tipo Movimiento"
            body={(rowData) => rowData.movementTypeId}
            alignHeader={'center'}
          />
           <Column
            field="Deposito"
            header="Deposito"
            body={(rowData) => rowData.storeId}
            alignHeader={'center'}
          />
          <Column
            field="Monto"
            header="Monto"
            body={(rowData) => {
              return (
                <NumberFormat
                  value={12000}// creo que este campo sería calculado
                  displayType={'text'}
                  thousandSeparator={'.'}
                  decimalSeparator={','}
                  prefix={'$'}
                ></NumberFormat>
              )
            }}
            alignHeader={'center'}
          />
           <Column
            field="Usuario"
            header="Usuario"
            body={(rowData) => 'nom usuario'}// este campo creo que falta como atributo
            alignHeader={'center'}
          />
        </DataTable>
      </div>
      <DialogNewMovement
        displayBasic={displayBasic}
        closeDialog={() => setDisplayBasic(false)}
      />
      <DialogError></DialogError>
    </div>
  )
}
export default MovementsTable
