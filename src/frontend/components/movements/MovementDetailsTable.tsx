import { Dialog } from 'primereact/dialog'
import React from 'react'
import { DialogMovementDetailsProps } from '../../@types/frontend.types'

const MovementDetailsTable = ({
  setDisplayMovementDetailsTable,
  displayMovementDetailsTable
}: DialogMovementDetailsProps) => {
  if (displayMovementDetailsTable) {
    return (
      <Dialog
        header="Detalles del Movimiento"
        visible={displayMovementDetailsTable}
        style={{ width: '50vw' }}
        onHide={() => setDisplayMovementDetailsTable(false)}
      >
        <div>MovementDetailsTable</div>
      </Dialog>
    )
  } else return <></>
}

export default MovementDetailsTable
