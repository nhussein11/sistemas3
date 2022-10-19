import React, { useState } from 'react'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { DataTable } from 'primereact/datatable'
import DialogError from '../products/DialogError'
import DialogNewStore from './DialogNewStore'
import { showUpdateDialogState, UPDATE_MODES_ENUM } from '../../atoms/showUpdateDialogAtom'
import DialogUpdateStore from './DialogUpdateStore'
import { StoresTableProps } from '../../@types/frontend.types'
import StoreTableHeader from './StoreTableHeader'
import { useRecoilState } from 'recoil'
import { selectedStoreState } from '../../atoms/stores/selectedStoreAtom'
import useDeleteStoreMutation from '../../hooks/stores/useDeleteStoreMutation'
import { isLoadState } from '../../atoms/isLoadState'

const StoresTable = ({ stores }:StoresTableProps) => {
  const [displayBasic, setDisplayBasic] = useState(false)
  const [, setShowUpdateDialog] = useRecoilState(showUpdateDialogState)
  const [, setSelectedStore] = useRecoilState(selectedStoreState)
  const { handleDeleteStore } = useDeleteStoreMutation('stores')
  const [loading] = useRecoilState(isLoadState)

  return (
    <div className="datatable-filter">
      <div className="card">
        <DataTable
          value={stores}
          paginator
          loading={loading}
          className="p-datatable-customers"
          showGridlines
          rows={5}
          dataKey="id"
          responsiveLayout="scroll"
          header={<StoreTableHeader setDisplayBasic={setDisplayBasic} />}
          emptyMessage="No se encontraron stores"
        >
          <Column
            field="Nombre"
            header="Nombre"
            body={(rowData) => rowData.name}
            alignHeader={'center'}
          />
          <Column
            field="Direccion"
            header="Direccion"
            body={(rowData) => rowData.address}
            alignHeader={'center'}
          />
          <Column
            field="options"
            header="Opciones"
            body={(rowData) => {
              return (
                <div>
                  <Button
                  icon="pi pi-pencil"
                  iconPos="right"
                  className="p-button-p-button-raised p-button-warning"
                  onClick={() => {
                    setSelectedStore(rowData)
                    setShowUpdateDialog({
                      showUpdateDialog: true,
                      updateMode: UPDATE_MODES_ENUM.STORE_UPDATE
                    })
                  }}
                  />
                  <Button
                  icon="pi pi-trash"
                  iconPos="right"
                  className="p-button-p-button-raised p-button-danger"
                  onClick={() => {
                    setSelectedStore(rowData)
                    handleDeleteStore()
                    setDisplayBasic(false)
                  }}
                  />
                </div>
              )
            }}
            alignHeader={'center'}
          />
        </DataTable>
      </div>
      <DialogNewStore
        displayBasic={displayBasic}
        closeDialog={() => setDisplayBasic(false)}
      />

      <DialogUpdateStore />
      <DialogError></DialogError>
    </div>
  )
}

export default StoresTable
