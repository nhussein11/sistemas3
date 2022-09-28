import React from 'react'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { useRecoilState } from 'recoil'
import { TableHeaderProps } from '../../@types/frontend.types'
import { StudentsFilterValueState } from '../../atoms/students/filterValueAtom'

const TableHeader = ({ setDisplayBasic }: TableHeaderProps) => {
  const [studentsFilterValue, setStudentsFilterValue] = useRecoilState(
    StudentsFilterValueState
  )

  return (
    <div className="header-table">
      <div className="flex justify-content-between">
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            value={studentsFilterValue}
            onChange={(e) => setStudentsFilterValue(e.target.value)}
            placeholder="Buscar"
          />
        </span>
      </div>
      <div className="actionsButtonsTable">
        <Button
          label="Nuevo"
          className="p-button-raised p-button-success"
          onClick={() => setDisplayBasic(true)}
        />
      </div>
    </div>
  )
}

export default TableHeader
