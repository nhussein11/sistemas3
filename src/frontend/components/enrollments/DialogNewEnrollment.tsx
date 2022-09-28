import React from 'react'
import { Dialog } from 'primereact/dialog'
import { Dropdown } from 'primereact/dropdown'
import { DialogNewStockProps } from '../../@types/frontend.types'
import { InputText } from 'primereact/inputtext'
import useDialogNewStockMutation from '../../hooks/stock/useDialogNewStockMutation'
import { Store } from '@prisma/client'
import EnrollmentDialogFooter from './EnrollmentDialogFooter'

const DialogNewEnrollment = ({ displayBasic, closeDialog }:DialogNewStockProps) => {
  const {
    handleCreateNewStock,
    quantity,
    minQuantity,
    storesQuery,
    changeStore,
    selectedStore,
    productsQuery,
    changeProduct,
    selectedProduct
  } = useDialogNewStockMutation('stocks')
  return (
    <Dialog
      visible={displayBasic}
      header="Nuevo Stock"
      style={{ width: '50vw' }}
      footer={() => EnrollmentDialogFooter({ closeDialog, handleCreateNewStock })}
      onHide={() => closeDialog()}
    >
      <div className="form-container">
        <div className="field-form-container">
          <div>
            <label htmlFor="id">Cantidad en Stock</label>
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
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gridTemplateColumns: 'auto auto', columnGap: '2rem', alignSelf: 'center', marginTop: '1rem' }}>
          <div className="field-drop">
            <label htmlFor="id">Depositos Disponibles</label>
            <Dropdown
              value={selectedStore.name}
              options={storesQuery?.data?.stores.map(
                (store: Store) => store.name
              )}
              onChange={(e) => changeStore(e.target.value)}
              placeholder="seleccionar Depósito"
            />
          </div>
          <div className="field-drop">
            <label htmlFor="id">Productos Disponibles</label>
            <Dropdown
              value={selectedProduct.name}
              options={productsQuery?.data?.products.map(
                (store: Store) => store.name
              )}
              onChange={(e) => changeProduct(e.target.value)}
              placeholder={'Seleccionar Producto'}
            />
          </div>
        </div>
      </div>
    </Dialog>
  )
}

export default DialogNewEnrollment
