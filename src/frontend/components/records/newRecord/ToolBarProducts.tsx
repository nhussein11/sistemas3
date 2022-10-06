import React from 'react'
import { Toolbar } from 'primereact/toolbar'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { RecordNameEnum } from '@prisma/client'

// eslint-disable-next-line react/prop-types
export default function ToolBarProducts ({ setVisibleTableProducts, setVisibleTableRecords, recordName }: { setVisibleTableRecords:any; setVisibleTableProducts: any; recordName: string }) {
  const leftToolbarTemplate = () => {
    return (
    <React.Fragment>
        {recordName.includes('FACTURA')
          ? (<Button label={getSearchName()} icon="pi pi-search" className="p-button-success mr-2" onClick={() => setVisibleTableProducts()} />)
          : (<Button label={getSearchName()} icon="pi pi-search" className="p-button-success mr-2" onClick={() => setVisibleTableRecords()} />)}
    </React.Fragment>
    )
  }
  function getSearchName () {
    switch (recordName) {
      case RecordNameEnum.FACTURA_DUPLICADO:
      case RecordNameEnum.FACTURA_ORIGINAL:
        return 'Productos'
      case RecordNameEnum.ORDEN_DE_COMPRA:
      case RecordNameEnum.ORDEN_DE_PAGO:
        return 'Facturas'
      default:
        return 'Buscar'
    }
  }

  const rightToolbarTemplate = () => {
    return (
    <span className="p-input-icon-left">
        <i className="pi pi-plus" />
        <InputText type="search" placeholder="Codigo" autoFocus/>
    </span>
    )
  }

  return (
    <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>
  )
}
