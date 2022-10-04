import React from 'react'
import { InputText } from 'primereact/inputtext'
import { useRecoilState } from 'recoil'
import { globalFilterValueState } from '../../../atoms/globalFilterValueAtom'

const TableHeader = () => {
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
    </div>
  )
}

export default TableHeader
