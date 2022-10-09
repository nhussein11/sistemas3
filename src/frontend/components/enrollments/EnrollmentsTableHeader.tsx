import React from 'react'
import { InputText } from 'primereact/inputtext'
import { globalFilterValueState } from '../../atoms/globalFilterValueAtom'
import { StockTableHeaderProps } from '../../@types/frontend.types'
import { useRecoilState } from 'recoil'
import { Button } from 'primereact/button'
const EnrollmentsTableHeader = ({
  setDisplayBasic,
  isDialog
}: StockTableHeaderProps) => {
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
      {!isDialog && (
        <div className="actionsButtonsTable">
          <Button
            label="Nuevo"
            className="p-button-raised p-button-success"
            onClick={() => setDisplayBasic(true)}
          />
        </div>
      )}
    </div>
  )
}

export default EnrollmentsTableHeader
