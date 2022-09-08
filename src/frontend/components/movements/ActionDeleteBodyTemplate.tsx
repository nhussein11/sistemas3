import React from 'react'
import { Button } from 'primereact/button'

const ActionDeleteBodyTemplate = () => {
  return (
    <React.Fragment>
        <Button icon="pi pi-trash" className="p-button-rounded p-button-success mr-2" onClick={() => console.log('eliminar Producto| tiene que saltar dialog')} />
    </React.Fragment>
  )
}

export default ActionDeleteBodyTemplate
