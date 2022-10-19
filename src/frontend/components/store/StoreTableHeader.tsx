import React from 'react'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { globalFilterValueState } from '../../atoms/globalFilterValueAtom'
import { TableHeaderProps } from '../../@types/frontend.types'
import { useRecoilState } from 'recoil'

const StoreTableHeader = ({ setDisplayBasic }:TableHeaderProps) => {
  const [globalFilterValue, setGlobalFilterValue] = useRecoilState(
    globalFilterValueState
  )
  return (
    <div className="header-table">
      <div className="flex justify-content-between">
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            value={globalFilterValue}
            onChange={(e) => setGlobalFilterValue(e.target.value)}
            placeholder="Buscar"
          />
        </span>
      </div>
      <div className="actionsButtonsTable">
        <Button
          label="Nuevo Depósito"
          className="p-button-raised p-button-success"
          onClick={() => setDisplayBasic(true)}
        />
      </div>
    </div>
  )
}

export default StoreTableHeader
