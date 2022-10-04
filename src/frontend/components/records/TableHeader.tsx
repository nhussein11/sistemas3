import React from 'react'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { useRecoilState } from 'recoil'
import { RecordsTableHeaderProps } from '../../@types/frontend.types'
import { globalFilterValueState } from '../../atoms/globalFilterValueAtom'

const TableHeader = ({ setDisplayBasic, setDisplayRecordDetailsTable }: RecordsTableHeaderProps) => {
  const [globalFilterValue, setGlobalFilterValue] = useRecoilState(globalFilterValueState)

  return (
    <div className="header-table">
      <div className="flex justify-content-between">
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText value={globalFilterValue} onChange={(e) => setGlobalFilterValue(e.target.value)} placeholder="Buscar"/>
        </span>
      </div>
      <div className="actionsButtonsTable">
        <Button label="Nuevo" className="p-button-raised p-button-success" onClick={() => setDisplayBasic(true)}/>
      </div>
    </div>
  )
}

export default TableHeader
