import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import React, { useState } from 'react'
import { createNewProduct } from '../services/createNewProduct'
import DialogFooter from './DialogFooter'

const DialogNewProduct = ({ displayBasic, closeDialog }) => {
  const queryClient = useQueryClient()
  const { mutate, isError, isSuccess } = useMutation(createNewProduct, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(['products'])
    }
  })
  const [productName, setProductName] = useState('')
  const [productPrice, setProductPrice] = useState(0)
  // description and other when backend is ready
  const handleCreateNewProduct = () => {
    mutate({
      name: productName,
      price: productPrice
    })
  }
  return (
    <Dialog
      visible={displayBasic}
      header="Nuevo Producto"
      style={{ width: '50vw' }}
      footer={() => DialogFooter({ closeDialog })}
      onHide={() => closeDialog()}
    >
      <div className="field-form-container">
        <span className="p-float-label">
          <InputText
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
          <label htmlFor="in">Nombre</label>
        </span>
        <span className="p-float-label">
          <InputText
            value={productPrice}
            type="number"
            onChange={(e) =>
              setProductPrice(Number(e.target.value).valueOf())
            }
          />
          <label htmlFor="in">Descripcion</label>
        </span>
      </div>
    </Dialog>
  )
}

export default DialogNewProduct
