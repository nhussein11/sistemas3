import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import React, { useState } from 'react'
import DialogNewStore from './DialogNewStore'
import StoreCheckedBodyTemplate from './StoreCheckedBodyTemplate'
import StoreTableHeader from './StoreTableHeader'

const StoresTable = ({ stores }) => {
  const [displayBasic, setDisplayBasic] = useState(false)
  return (
    <div className="datatable-filter">
      <div className="card">
        <DataTable
          value={stores}
          paginator
          className="p-datatable-customers"
          showGridlines
          rows={10}
          dataKey="id"
          responsiveLayout="scroll"
          header={<StoreTableHeader setDisplayBasic={setDisplayBasic} />}
          emptyMessage="No se encontraron stores"
        >
          <Column
            field="select"
            header="Select"
            body={(rowData) =>
              StoreCheckedBodyTemplate({
                rowData
              })
            }
            alignHeader={'center'}
          />
          <Column
            field="Id"
            header="Id"
            body={(rowData) => rowData.id}
            alignHeader={'center'}
          />
          <Column
            field="Nombre"
            header="Nombre"
            body={(rowData) => rowData.name}
            alignHeader={'center'}
          />
          <Column
            field="Descripcion"
            header="Descripcion"
            body={(rowData) => rowData.address}
            alignHeader={'center'}
          />
        </DataTable>
      </div>
      <DialogNewStore
        displayBasic={displayBasic}
        closeDialog={() => setDisplayBasic(false)}
      />

      {/*
      <DialogUpdateProduct />
      <DialogError></DialogError> */}
    </div>
  )
}

export default StoresTable
