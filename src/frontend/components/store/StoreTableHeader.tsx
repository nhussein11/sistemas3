import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import React from 'react'
import { useRecoilState } from 'recoil'
import { globalFilterValueState } from '../../atoms/globalFilterValueAtom'
import useDeleteStoreMutation from '../../hooks/stores/useDeleteStoreMutation'

const StoreTableHeader = ({ setDisplayBasic }) => {
  const [globalFilterValue, setGlobalFilterValue] = useRecoilState(
    globalFilterValueState
  )
  const { handleDeleteStore } = useDeleteStoreMutation('stores')
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
          onClick={handleDeleteStore}
        />
        <Button
          label="Modificar"
          className="p-button-raised p-button-secondary"
          onClick={() => console.log('update store')}
        />
      </div>
    </div>
  )
}

export default StoreTableHeader
