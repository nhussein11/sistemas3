import React, { useState } from 'react'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import DialogNewRecord from './DialogNewRecord'
import DialogError from './DialogError'
import { RecordsTableProps } from '../../@types/frontend.types'
import TableHeader from './TableHeader'
import SelectBodyTemplate from './SelectBodyTemplate'
import { parseDate } from '../../services/records/parseDate'
import { resolveRecordName } from '../../services/records/resolveRecordName'
import useRecordTypesQuery from '../../hooks/records/useRecordTypesQuery'
import { resolveRecordType } from '../../services/records/resolveRecordType'
import RecordDetailsTable from './RecordDetailsTable'
import { Button } from 'primereact/button'
import { useRecoilState } from 'recoil'
import { selectedRecordState } from '../../atoms/records/selectedRecordAtom'

const RecordsTable = ({ records }: RecordsTableProps) => {
  const [displayBasic, setDisplayBasic] = useState(false)
  const [displayRecordDetailsTable, setDisplayRecordDetailsTable] =
    useState(false)
  const [, setSelectedRecord] = useRecoilState(selectedRecordState)

  const recordTypesQuery = useRecordTypesQuery('record-types')
  return (
    <div className="datatable-filter">
      <div className="card">
        <DataTable
          value={records}
          paginator
          className="p-datatable-customers"
          showGridlines
          rows={10}
          dataKey="id"
          responsiveLayout="scroll"
          header={
            <TableHeader
              setDisplayRecordDetailsTable={setDisplayRecordDetailsTable}
              setDisplayBasic={setDisplayBasic}
            />
          }
          emptyMessage="No se encontraron Comprobantes"
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
            field="NombreComprobante"
            header="Comprobante"
            body={(rowData) =>
              resolveRecordName(rowData.recordTypeId, recordTypesQuery)
            }
            alignHeader={'center'}
          />
          <Column
            field="TipoComprobante"
            header="Tipo Comprobante"
            body={(rowData) =>
              resolveRecordType(
                rowData.recordTypeId,
                recordTypesQuery
              ) === 'POSITIVE'
                ? (
                <h2 style={{ color: 'green' }}>ENTRADA</h2>
                  )
                : (
                <h2 style={{ color: 'red' }}>SALIDA</h2>
                  )
            }
            alignHeader={'center'}
          />
          {/* !esto es una posible fuente de bugs!! */}
          <Column
            field="detail"
            header="Detalle"
            body={(rowData) => {
              return (
                <Button
                  icon="pi pi-eye"
                  iconPos="right"
                  label="Ver Detalle"
                  className="p-button-p-button-raised p-button-warning"
                  onClick={() => {
                    setDisplayRecordDetailsTable((prev: boolean) => !prev)
                    setSelectedRecord(rowData)
                  }}
                />
              )
            }}
            alignHeader={'center'}
          />
        </DataTable>
      </div>
      <DialogNewRecord
        displayBasic={displayBasic}
        closeDialog={() => setDisplayBasic(false)}
      />
      <RecordDetailsTable
        setDisplayRecordDetailsTable={setDisplayRecordDetailsTable}
        displayRecordDetailsTable={displayRecordDetailsTable}
      />

      <DialogError></DialogError>
    </div>
  )
}
export default RecordsTable
