import React, { useState } from 'react'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import DialogNewMovement from './DialogNewMovement'
import DialogError from './DialogError'
import { MovementsTableProps } from '../../@types/frontend.types'
import TableHeader from './TableHeader'
import SelectBodyTemplate from './SelectBodyTemplate'
import { parseDate } from '../../services/movements/parseDate'
import { resolveMovementName } from '../../services/movements/resolveMovementName'
import useMovementTypesQuery from '../../hooks/movements/useMovementTypesQuery'
import { resolveMovementType } from '../../services/movements/resolveMovementType'
import MovementDetailsTable from './MovementDetailsTable'
import { Button } from 'primereact/button'
import { useRecoilState } from 'recoil'
import {
  selectedMovementState
} from '../../atoms/selectedMovementAtom'

const MovementsTable = ({ movements }: MovementsTableProps) => {
  const [displayBasic, setDisplayBasic] = useState(false)
  const [displayMovementDetailsTable, setDisplayMovementDetailsTable] =
    useState(false)
  const [, setSelectedMovement] = useRecoilState(selectedMovementState)

  const movementTypesQuery = useMovementTypesQuery('movement-types')
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
          header={
            <TableHeader
              setDisplayMovementDetailsTable={setDisplayMovementDetailsTable}
              setDisplayBasic={setDisplayBasic}
            />
          }
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
            field="Fecha"
            header="Fecha"
            body={(rowData) => parseDate(rowData?.datetime)}
            alignHeader={'center'}
          />
          <Column
            field="Observación"
            header="Observación"
            body={(rowData) => rowData.observation}
            alignHeader={'center'}
          />
          <Column
            field="NombreMovimiento"
            header="Nombre Movimiento"
            body={(rowData) =>
              resolveMovementName(rowData.movementTypeId, movementTypesQuery)
            }
            alignHeader={'center'}
          />
          <Column
            field="TipoMovimiento"
            header="Tipo Movimiento"
            body={(rowData) =>
              resolveMovementType(rowData.movementTypeId, movementTypesQuery)
            }
            alignHeader={'center'}
          />
          <Column
            field="detail"
            header="Detalle"
            body={(rowData) => {
              return (<Button
                label="Ver Detalle"
                className="p-button-p-button-raised p-button-warning"
                onClick={() => {
                  setDisplayMovementDetailsTable((prev:boolean) => !prev)
                  setSelectedMovement(rowData)
                }}/>)
            }
            }
            alignHeader={'center'}
          />
        </DataTable>
      </div>
      <DialogNewMovement
        displayBasic={displayBasic}
        closeDialog={() => setDisplayBasic(false)}
      />
      <MovementDetailsTable
        setDisplayMovementDetailsTable={setDisplayMovementDetailsTable}
        displayMovementDetailsTable={displayMovementDetailsTable}
      />

      <DialogError></DialogError>
    </div>
  )
}
export default MovementsTable
