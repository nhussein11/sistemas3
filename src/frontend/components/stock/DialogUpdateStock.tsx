import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { Dropdown } from 'primereact/dropdown'
import { InputText } from 'primereact/inputtext'
import React from 'react'
import { Store } from '../../../shared/schemas/store.type'
import useDialogUpdateStockMutation from '../../hooks/stock/useDialogUpdateStockMutation'

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
    visible={showUpdateDialog}
    header="Actualizar Deposito"
    style={{ width: '50vw' }}
    onHide={() => setShowUpdateDialog(false)}
  >
     <div className="form-container">
        <div className="field-form-container">
          <div>
          <div>
            <label htmlFor="id">Cantidad</label>
            <InputText {...quantity} name="quantity" placeholder="quantity" />
          </div>
          <div>
            <label htmlFor="id">Cantidad minima</label>
            <InputText
              {...minQuantity}
              name="minQuantity"
              placeholder="minQuantity"
            />
          </div>
          <div className="field-drop">
          <label htmlFor="id">Depositos</label>
          <Dropdown
            value={selectedStore.name}
            options={storesQuery?.data?.stores.map(
              (store: Store) => store.name
            )}
            onChange={(e) => changeStore(e.target.value)}
            placeholder="select a Store"
          />
        </div>
          </div>
        </div>
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
