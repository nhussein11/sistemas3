import React from 'react'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { Dropdown } from 'primereact/dropdown'
import { InputText } from 'primereact/inputtext'
import { Store } from '@prisma/client'
import useDialogUpdateStockMutation from '../../hooks/stock/useDialogUpdateStockMutation'
import { showUpdateDialogDefaultState } from '../../atoms/showUpdateDialogAtom'

const DialogUpdateStock = () => {
  const {
    handleUpdateStock,
    quantity,
    minQuantity,
    storesQuery,
    changeStore,
    showUpdateDialog,
    setShowUpdateDialog,
    selectedStore
  } = useDialogUpdateStockMutation('stocks')
  return (
    <Dialog
      visible={showUpdateDialog.showUpdateDialog}
      header="Actualizar Deposito"
      style={{ width: 'auto' }}
      onHide={() => setShowUpdateDialog(showUpdateDialogDefaultState)}
    >
      <div style={{ display: 'grid' }}>
        {showUpdateDialog.updateMode === 'stockMovement'
          ? (
            <>
              <div style={{ display: 'grid' }}>
                <label htmlFor="id">Cantidad en Stock</label>
                <InputText {...quantity} name="quantity" placeholder="quantity" />
              </div>
              <div className="field-drop">
                <label htmlFor="id">Depositos Disponibles</label>
                <Dropdown
                  value={selectedStore?.name}
                  options={storesQuery?.data?.stores
                    .filter((store: Store) => store.name !== selectedStore?.name)
                    .map((store: Store) => store.name)}
                  onChange={(e) => changeStore(e.target.value)}
                  placeholder="seleccionar Depósito"
                />
              </div>
            </>
            )
          : (
          <div style={{ display: 'grid' }}>
            <label htmlFor="id">Cantidad minima</label>
            <InputText
              {...minQuantity}
              name="minQuantity"
              placeholder="minQuantity"
            />
          </div>
            )}
      </div>
      <div className="footer-button-updateDialog">
        <Button
          label="Confirmar"
          icon="pi pi-check"
          onClick={handleUpdateStock}
          autoFocus
        />
      </div>
    </Dialog>
  )
}

export default DialogUpdateStock
