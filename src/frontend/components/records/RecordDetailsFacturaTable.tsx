import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Dialog } from 'primereact/dialog'
import React from 'react'
import { useRecoilState } from 'recoil'
import { DialogRecordFacturaDetailsProps } from '../../@types/frontend.types'
import { selectedRecordState } from '../../atoms/records/selectedRecordAtom'
import { PreviousRecord, Record } from '@prisma/client'
const RecordDetailsFacturaTable = ({ previousRecordQuery, recordsQuery, setDisplayRecordFacturasDetailsTable, displayRecordFacturasDetailsTable }: DialogRecordFacturaDetailsProps) => {
  const [selectedRecord] = useRecoilState(selectedRecordState)
  const filteredDetails: PreviousRecord[] =
    previousRecordQuery.data?.previousRecords?.filter(
      (d: PreviousRecord) => d.higherRecordId === selectedRecord.id
    )
  console.log(filteredDetails)
  const filteredRecords: Record[] =
  recordsQuery.data?.records?.filter(
    (r: Record) => filteredDetails.map((fr: PreviousRecord) => r.id === fr.paidForRecordId)
  )

  console.log(filteredRecords)
  if (displayRecordFacturasDetailsTable) {
    return (
      <Dialog header="Detalles de Comprobante Fact" visible={displayRecordFacturasDetailsTable} style={{ width: '50vw' }} onHide={() => setDisplayRecordFacturasDetailsTable(false)}>
        <DataTable value={filteredRecords} paginator className="p-datatable-customers" showGridlines rows={5} dataKey="id" responsiveLayout="scroll" emptyMessage="No se encontraron Detalles">
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
        </DataTable>
      </Dialog>
    )
  } else return <></>
}

export default RecordDetailsFacturaTable
