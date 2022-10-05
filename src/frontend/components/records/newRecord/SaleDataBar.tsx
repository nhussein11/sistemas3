/* eslint-disable react/prop-types */
import React from 'react'
import { Dropdown } from 'primereact/dropdown'
import { InputText } from 'primereact/inputtext'
import { Customer, Supplier, Store } from '@prisma/client'

const SaleDataBar = ({
  customers, suppliers, recordTypes, stores, selectedCustomer, selectedSupplier, selectedStore, selectedRecordType, changeCustomer, changeSupplier, changeStore, changeRecordType,
  recordObservation, recordAdress, recordLetter, recordNumber, recordPaidFor
}:
  {customers: Object[]; suppliers: Object[]; recordTypes: Object[]; stores: Object[]; selectedCustomer: Customer; selectedSupplier: Supplier; selectedStore: Store; selectedRecordType: any;
    changeCustomer: any; changeSupplier: any; changeStore: any; changeRecordType: any; recordObservation: any; recordAdress: any; recordLetter: any; recordNumber: any; recordPaidFor: any }) => {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <span className="p-float-label">
              <InputText {...recordObservation} id="obeservation" />
              <label htmlFor="obeservation">Observación</label>
          </span>
          <span className="p-float-label">
              <InputText {...recordAdress} id="adress" />
              <label htmlFor="adress">Dirección</label>
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
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
      <div className="field">
            <Dropdown options={recordTypes} value={selectedRecordType?.recordName} onChange={(e) => changeRecordType(e.target.value)} placeholder="Seleccionar Tipo Comp"/>
          </div>
          <div className="field">
              <Dropdown options={stores} value={selectedStore?.name} onChange={(e) => changeStore(e.target.value)} placeholder="Seleccionar Depósito"/>
          </div>
      </div>
    </div>
  )
}

export default SaleDataBar
