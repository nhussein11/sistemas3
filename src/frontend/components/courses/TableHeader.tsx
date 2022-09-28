import React from 'react'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { useRecoilState } from 'recoil'
import { TableHeaderProps } from '../../@types/frontend.types'
import { CoursesFilterValueState } from '../../atoms/courses/filterValueAtom'

const TableHeader = ({ setDisplayBasic }: TableHeaderProps) => {
  const [coursesFilterValue, setCoursesFilterValue] = useRecoilState(
    CoursesFilterValueState
  )

  return (
    <div className="header-table">
      <div className="flex justify-content-between">
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            value={coursesFilterValue}
            onChange={(e) => setCoursesFilterValue(e.target.value)}
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
