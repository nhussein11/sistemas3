import React from 'react'
import { Toolbar } from 'primereact/toolbar'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'

// eslint-disable-next-line react/prop-types
export default function ToolBarProducts ({ idRef, addProductBarCode, setVisibleTableProducts }) {
  const leftToolbarTemplate = () => {
    return (
    <React.Fragment>
        <Button label="Productos" icon="pi pi-search" className="p-button-success mr-2" onClick={() => setVisibleTableProducts()} />
    </React.Fragment>
    )
  }

  const rightToolbarTemplate = () => {
    return (
    <span className="p-input-icon-left">
        <i className="pi pi-plus" />
        <InputText ref={idRef} type="search" placeholder="Codigo Barras" onKeyDown={addProductBarCode} autoFocus/>
    </span>
    )
  }

  return (
    <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>
  )
}
