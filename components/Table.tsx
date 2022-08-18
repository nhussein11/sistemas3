import React, { useState, useEffect } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { Checkbox } from 'primereact/checkbox'
const Table = () => {
  const [nombreProducto, setNombreProducto] = useState('')
  const [checked, setChecked] = useState(true)
  const [globalFilterValue, setGlobalFilterValue] = useState('')
  const [displayBasic, setDisplayBasic] = useState(false)
  const dialogFuncMap = {
    displayBasic: setDisplayBasic
  }
  const openDialog = () => {
    dialogFuncMap.displayBasic(true)
  }
  const closeDialog = () => {
    dialogFuncMap.displayBasic(false)
  }

  const clearFilter = () => {
    initFilters()
  }
  useEffect(() => {
    initFilters()
  }, [])
  const onGlobalFilterChange = (e: { target: { value: any } }) => {
    const value = e.target.value
    setGlobalFilterValue(value)
  }

  const initFilters = () => {
    setGlobalFilterValue('')
  }
  const renderHeader = () => {
    return (
        <div className='header-table'>
            <div className="flex justify-content-between">
                <Button type="button" icon="pi pi-filter-slash" label="Limpiar" className="p-button-outlined" onClick={clearFilter} />
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Buscar" />
                </span>
            </div>
            <div className='actionsButtonsTable'>
                <Button label="Nuevo" className="p-button-raised p-button-success" onClick={() => openDialog()}/>
                <Button label="Borrar" className="p-button-raised p-button-danger" onClick={() => openDialog()}/>
                <Button label="Modificar" className="p-button-raised p-button-secondary" onClick={() => openDialog()}/>
            </div>
        </div>
    )
  }
  const renderFooter = (name: string) => {
    return (
        <div>
            <Button label="Cancelar" icon="pi pi-times" onClick={() => closeDialog()} className="p-button-text" />
            <Button label="Guardar" icon="pi pi-check" onClick={() => closeDialog()} autoFocus />
        </div>
    )
  }
  const selectBodyTemplate = () => {
    return <Checkbox onChange={e => setChecked(e.checked)} checked={checked}></Checkbox>
  }

  const header = renderHeader()
  return (<div className="datatable-filter">
  <div className="card">
      {/* ACA EN EL DATATABLE NI IDEA COMO PONER LOS DATOS DEE LA TABLA SIN VALUE{} Y FILTERS{} */}
      <DataTable paginator className="p-datatable-customers" showGridlines rows={10} dataKey="id" responsiveLayout="scroll" header={header} emptyMessage="No se encontraron Productos">
          <Column field="select" header="Select" body={selectBodyTemplate} style={{ minWidth: '5rem' }} />
          <Column field="name" header="Nombre" style={{ minWidth: '5rem' }} />
          <Column field='detail' header="Descripcion" filterField="country.name" style={{ minWidth: '5rem' }}/>
          <Column field='deposit' header="Deposito" filterField="date" dataType="date" style={{ minWidth: '5rem' }} />
          <Column field='total' header="Bruto" filterField="balance" dataType="numeric" style={{ minWidth: '5rem' }} />
          <Column field="status" header="Estado" filterMenuStyle={{ width: '14rem' }} style={{ minWidth: '5rem' }} />
          <Column field='siteA' header="Sucursal A" filterField="date" dataType="date" style={{ minWidth: '10rem' }} />
      </DataTable>
  </div>
  <Dialog visible={displayBasic} header="Nuevo Producto" style={{ width: '50vw' }} footer={renderFooter('displayBasic')} onHide={() => closeDialog()}>
      <div className='field-form-container'>
          <span className="p-float-label">
              <InputText value={nombreProducto} onChange={(e) => setNombreProducto(e.target.value)} />
              <label htmlFor="in">Nombre</label>
          </span>
          <span className="p-float-label">
              <InputText value={nombreProducto} onChange={(e) => setNombreProducto(e.target.value)} />
              <label htmlFor="in">Descripcion</label>
          </span>
          <span className="p-float-label">
              <InputText value={nombreProducto} onChange={(e) => setNombreProducto(e.target.value)} />
              <label htmlFor="in">Precio</label>
          </span>
      </div>
  </Dialog>
</div>)
}
export default Table
