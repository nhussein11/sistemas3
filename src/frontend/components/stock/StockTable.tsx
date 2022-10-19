import React, { useState } from 'react'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { DataTable } from 'primereact/datatable'
import DialogError from '../products/DialogError'
import DialogNewStock from './DialogNewStock'
import DialogUpdateStock from './DialogUpdateStock'
import { findProductName } from '../../services/products/findProductName'
import { findStoreName } from '../../services/stores/findStoreName'
import { StockTableProps } from '../../@types/frontend.types'
import StockTableHeader from './StockTableHeader'
import useProductsQuery from '../../hooks/products/useProductsQuery'
import useStoresQuery from '../../hooks/stores/useStoresQuery'
import {
  showUpdateDialogState,
  UPDATE_MODES_ENUM
} from '../../atoms/showUpdateDialogAtom'
import { useRecoilState } from 'recoil'
import { selectedStockState } from '../../atoms/stock/selectedStockAtom'
const StockTable = ({ stocks }: StockTableProps) => {
  const [displayBasic, setDisplayBasic] = useState(false)
  const productsQuery = useProductsQuery('products')
  const storesQuery = useStoresQuery('stores')
  const [, setSelectedStock] = useRecoilState(selectedStockState)
  const [, setShowUpdateDialog] = useRecoilState(showUpdateDialogState)
  return (
    <div className="datatable-filter">
      <div className="card">
        <DataTable
          value={stocks}
          paginator
          className="p-datatable-customers"
          showGridlines
          rows={5}
          dataKey="id"
          responsiveLayout="scroll"
          header={<StockTableHeader setDisplayBasic={setDisplayBasic} />}
          emptyMessage="No se encontraron Productos"
        >
          <Column
            field="ProductName"
            header="Nombre Producto"
            body={(rowData) =>
              findProductName(rowData.productId, productsQuery)
            }
            alignHeader={'center'}
          />
          <Column
            field="StoreName"
            header="Nombre Depósito"
            body={(rowData) => findStoreName(rowData.storeId, storesQuery)}
            alignHeader={'center'}
          />
          <Column
            field="quantity"
            header="Cantidad"
            body={(rowData) => rowData.quantity}
            alignHeader={'center'}
          />
          <Column
            field="minQuantity"
            header="Cantidad Mínima"
            body={(rowData) => rowData.minQuantity}
            alignHeader={'center'}
          />
          <Column
            field="options"
            header="Opciones"
            body={(rowData) => {
              return (
                <div>
                  <Button
                    icon="pi pi-truck"
                    iconPos="right"
                    className="p-button-p-button-raised p-button-warning"
                    onClick={() => {
                      setSelectedStock(rowData)
                      setShowUpdateDialog({
                        showUpdateDialog: true,
                        updateMode: UPDATE_MODES_ENUM.STOCK_MOVEMENT
                      })
                    }}
                  />
                  <Button
                    icon="pi pi-pencil"
                    iconPos="right"
                    className="p-button-p-button-raised p-button-danger"
                    onClick={() => {
                      setSelectedStock(rowData)
                      setShowUpdateDialog({
                        showUpdateDialog: true,
                        updateMode: UPDATE_MODES_ENUM.STOCK_UPDATE
                      })
                    }}
                  />
                </div>
              )
            }}
            alignHeader={'center'}
          />
        </DataTable>
      </div>
      <DialogNewStock
        displayBasic={displayBasic}
        closeDialog={() => setDisplayBasic(false)}
      />
      <DialogUpdateStock />
      <DialogError></DialogError>
    </div>
  )
}

export default StockTable
