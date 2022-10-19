/* eslint-disable react/prop-types */
import React from 'react'
import { Dropdown } from 'primereact/dropdown'
import { InputText } from 'primereact/inputtext'
import { Customer, Supplier, Store, RecordNameEnum } from '@prisma/client'

const SaleDataBar = ({
  customers, suppliers, recordTypes, stores, selectedCustomer, selectedSupplier, selectedStore, selectedRecordType, changeCustomer, changeSupplier, changeStore, changeRecordType,
  recordLetter, recordNumber
}:
  {customers: Object[]; suppliers: Object[]; recordTypes: Object[]; stores: Object[]; selectedCustomer: Customer; selectedSupplier: Supplier; selectedStore: Store; selectedRecordType: any;
    changeCustomer: any; changeSupplier: any; changeStore: any; changeRecordType: any; recordLetter: any; recordNumber: any;}) => {
  function dropPerson () {
    switch (selectedRecordType.recordName) {
      case RecordNameEnum.FACTURA_ORIGINAL:
      case RecordNameEnum.ORDEN_DE_PAGO:
        return (<Dropdown options={suppliers} value={selectedSupplier?.name} onChange={(e) => changeSupplier(e.target.value)} placeholder="Selec. Proveedor"/>)
      case RecordNameEnum.FACTURA_DUPLICADO:
      case RecordNameEnum.ORDEN_DE_COMPRA:
        return (<Dropdown options={customers} value={selectedCustomer?.name} onChange={(e) => changeCustomer(e.target.value)} placeholder="Selec. Cliente"/>)
      default:
    }
  }
  function dropStore () {
    switch (selectedRecordType.recordName) {
      case 'xd':
        return (<Dropdown options={stores} value={selectedStore?.name} onChange={(e) => changeStore(e.target.value)} placeholder="Selec. Depósito"/>)
      default:
    }
  }
  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'auto auto auto auto auto auto auto', justifyContent: 'left', columnGap: '10px' }}>
          <div className="field">
            <Dropdown options={recordTypes} value={selectedRecordType?.recordName} onChange={(e) => changeRecordType(e.target.value)} placeholder="Seleccionar Tipo Comp"/>
          </div>
          <span className="p-float-label">
              <InputText {...recordNumber} id="recordNumber" />
              <label htmlFor="recordNumber">Número</label>
          </span>
          <div className="p-float-label">
              <InputText {...recordLetter} id="recordLetter" />
              <label htmlFor="recordLetter">Tipo Factura</label>
          </div>
          <div className="field">
              {dropStore()}
          </div>
          <div className="field">
            {dropPerson()}
          </div>
      </div>
    </div>
  )
}

export default SaleDataBar
