import { MovementDetails } from '@prisma/client'
import { Dialog } from 'primereact/dialog'
import React from 'react'
import { DialogMovementDetailsProps } from '../../@types/frontend.types'
import useMovementDetailsTable from '../../hooks/movements/useMovementDetailsTable'

const MovementDetailsTable = ({
  setDisplayMovementDetailsTable,
  displayMovementDetailsTable
}: DialogMovementDetailsProps) => {
  const { filteredDetails } = useMovementDetailsTable()
  if (displayMovementDetailsTable) {
    return (
      <Dialog
        header="Detalles del Movimiento"
        visible={displayMovementDetailsTable}
        style={{ width: '50vw' }}
        onHide={() => setDisplayMovementDetailsTable(false)}
      >
        {filteredDetails?.map((d: MovementDetails) => d.productId)}
      </Dialog>
    )
  } else return <></>
}

export default MovementDetailsTable
