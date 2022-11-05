import React from 'react'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { useRecoilState } from 'recoil'
import { RecordsTableHeaderProps } from '../../@types/frontend.types'
import { globalFilterValueState } from '../../atoms/globalFilterValueAtom'
import { useRouter } from 'next/router'
import { Dropdown } from 'primereact/dropdown'
import useSuppliersFilter from '../../hooks/records/useSuppliersFilter'
// import { RecordNameEnum } from '@prisma/client'
import useCustomerFilter from '../../hooks/records/useCustomersFilter'
import { ToggleButton } from 'primereact/togglebutton'
const TableHeader = ({
  setDisplayBasic,
  setDisplayRecordDetailsTable,
  type
}: RecordsTableHeaderProps) => {
  // eslint-disable-next-line no-unused-vars
  const [globalFilterValue, setGlobalFilterValue] = useRecoilState(
    globalFilterValueState
  )
  const { parsedSuppliers, changeSupplier, selectedFilterSupplier } = useSuppliersFilter()
  const { parsedCustomers, changeCustomer, selectedFilterCustomer } = useCustomerFilter()
  const router = useRouter()
  function selectTitle () {
    switch (type) {
      case 'ven':
        return 'VENTAS'
      case 'com':
        return 'COMPRAS'
      case 'op':
        return 'ORDEN PAGO'
      case 'mov':
        return 'MOVIMIENTOS'
    }
  }
  return (
    <div className="header-table">
      <div className="flex justify-content-between">
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            value={globalFilterValue}
            onChange={(e) => changeSupplier(e.target.value)}
            placeholder="Buscar"
          />
        </span>
        {type === 'ven'
          ? <Dropdown
        value={selectedFilterCustomer.name}
        options={parsedCustomers}
        onChange={(e) => changeCustomer(e.target.value)}
        placeholder="Selec Cliente"
      />
          : <Dropdown
        value={selectedFilterSupplier.name}
        options={parsedSuppliers}
        onChange={(e) => changeSupplier(e.target.value)}
        placeholder="Selec Proveedor"
      />
        }
      </div>
      <div className="actionsButtonsTable" style={{ display: 'contents' }}>
      <ToggleButton offLabel={selectTitle()}/>
        <Button
          label="Nuevo Comprobante"
          className="p-button-raised p-button-success"
          onClick={() => router.push('/newRecord')}
        />
      </div>
    </div>
  )
}

export default TableHeader
