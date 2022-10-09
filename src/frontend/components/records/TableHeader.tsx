import React from 'react'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { useRecoilState } from 'recoil'
import { RecordsTableHeaderProps } from '../../@types/frontend.types'
import { globalFilterValueState } from '../../atoms/globalFilterValueAtom'
import { selectedFilterSupplierState } from '../../atoms/records/selectedFilterSupplier'
import { useRouter } from 'next/router'
import useSuppliersQuery from '../../hooks/suppliers/useSuppliersQuery'
import { Dropdown } from 'primereact/dropdown'
import { Supplier } from '@prisma/client'
const TableHeader = ({
  setDisplayBasic,
  setDisplayRecordDetailsTable
}: RecordsTableHeaderProps) => {
  // eslint-disable-next-line no-unused-vars
  const [globalFilterValue, setGlobalFilterValue] = useRecoilState(
    globalFilterValueState
  )
  const SuppliersQuery = useSuppliersQuery('suppliers')
  const parsedSuppliers = SuppliersQuery?.data?.suppliers.map(
    (supplier: Supplier) => supplier.name
  )
  const [selectedFilterSupplier, setSelectedFilterSupplier] = useRecoilState(
    selectedFilterSupplierState
  )
  const changeSupplier = (supplierName:string) => {
    const supplier = SuppliersQuery?.data?.suppliers.find(
      (supplier: Supplier) => supplier.name === supplierName
    )
    setSelectedFilterSupplier(supplier)
  }
  console.log(selectedFilterSupplier)
  const router = useRouter()
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
        <Dropdown
          value={selectedFilterSupplier.name}
          options={parsedSuppliers}
          onChange={(e) => changeSupplier(e.target.value)}
          placeholder="Buscar"
        />
      </div>
      <div className="actionsButtonsTable">
        <Button
          label="Nuevo"
          className="p-button-raised p-button-success"
          onClick={() => router.push('/newRecord')}
        />
      </div>
    </div>
  )
}

export default TableHeader
