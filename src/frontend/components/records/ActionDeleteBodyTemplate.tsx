import React from 'react'
import { Button } from 'primereact/button'
import useActionDeleteButton from '../../hooks/records/useActionDeleteButton'

const ActionDeleteBodyTemplate = ({
  stockId

}: {
  stockId: string
}) => {
  const { deleteSelectedDetail } = useActionDeleteButton(stockId)
  return (
    <React.Fragment>
      <Button
        icon="pi pi-trash"
        className="p-button-rounded p-button-warning mr-2"
        onClick={() => deleteSelectedDetail()}
      />
    </React.Fragment>
  )
}

export default ActionDeleteBodyTemplate
