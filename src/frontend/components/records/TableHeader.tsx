import React from 'react'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { useRecoilState } from 'recoil'
import { RecordsTableHeaderProps } from '../../@types/frontend.types'
import { globalFilterValueState } from '../../atoms/globalFilterValueAtom'
import useDeleteRecordMutation from '../../hooks/records/useDeleteRecordMutation'

const TableHeader = ({
  setDisplayBasic,
  setDisplayRecordDetailsTable
}: RecordsTableHeaderProps) => {
  const { handleDeleteRecord } = useDeleteRecordMutation('records')
  const [globalFilterValue, setGlobalFilterValue] = useRecoilState(
    globalFilterValueState
  )
  const deleteRecord = () => {
    handleDeleteRecord()
    setDisplayBasic(false)
  }
  return (
    <div className="header-table">
      <div className="flex justify-content-between">
        <Button
          type="button"
          icon="pi pi-filter-slash"
          label="Limpiar"
          className="p-button-outlined"
          onClick={() => setGlobalFilterValue('')}
        />
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
          label="Nuevo"
          className="p-button-raised p-button-success"
          onClick={() => setDisplayBasic(true)}
        />
        <Button
          label="Borrar"
          className="p-button-raised p-button-danger"
          onClick={deleteRecord}
        />
      </div>
    </div>
  )
}

export default TableHeader
