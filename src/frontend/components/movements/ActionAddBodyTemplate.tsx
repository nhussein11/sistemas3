import React from 'react'
import { Button } from 'primereact/button'

const ActionAddBodyTemplate = () => {
  return (
    <React.Fragment>
        <Button icon="pi pi-check" className="p-button-rounded p-button-success mr-2" onClick={() => console.log('muestra dialog de cantidad')} />
    </React.Fragment>
  )
}

export default ActionAddBodyTemplate