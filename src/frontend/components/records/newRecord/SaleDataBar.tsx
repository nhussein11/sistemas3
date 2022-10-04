/* eslint-disable react/prop-types */
import React from 'react'
import { Dropdown } from 'primereact/dropdown'
import { InputText } from 'primereact/inputtext'
import { Customer, Supplier } from '@prisma/client'

const SaleDataBar = ({ customers, suppliers, selectedCustomer, selectedSupplier, changeCustomer, changeSupplier }:
  {customers: Object[]; suppliers: Object[]; selectedCustomer: Customer; selectedSupplier: Supplier; changeCustomer: any; changeSupplier: any }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <span className="p-float-label">
            <InputText id="obeservation" />
            <label htmlFor="obeservation">Observación</label>
        </span>
        <span className="p-float-label">
            <InputText id="adress" />
            <label htmlFor="adress">Adress</label>
        </span>
        <span className="p-float-label">
            <InputText id="recordNumber" />
            <label htmlFor="recordNumber">Número Comprobante</label>
        </span>
        <div className="field">
          <Dropdown options={['A', 'B', 'C']} placeholder="Tipo Factura"/>
        </div>
        <div className="field">
          <Dropdown options={customers} value={selectedCustomer?.name} onChange={(e) => changeCustomer(e.target.value)} placeholder="Seleccionar Cliente"/>
        </div>
        <div className="field">
            <Dropdown options={suppliers} value={selectedSupplier?.name} onChange={(e) => changeSupplier(e.target.value)} placeholder="Seleccionar Proveedor"/>
        </div>
    </div>
  )
}

export default SaleDataBar
