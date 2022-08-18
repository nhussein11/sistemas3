import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import React, { useState } from 'react'
import { useRecoilState } from 'recoil'
import { Product } from '../@types/frontend.types'
import { selectedProductState } from '../atoms/selectedProductAtom'
import { updateProduct } from '../services/updateProduct'

const DialogUpdateProduct = ({ showUpdateDialog, setShowUpdateDialog }) => {
  const [selectedProduct, setSelectedProduct] =
    useRecoilState(selectedProductState)
  const [productName, setProductName] = useState('')
  const [productPrice, setProductPrice] = useState(0)
  const queryClient = useQueryClient()
  const updateQuery = ({ id, name, price }: Product) =>
    updateProduct({ id, name, price })
  const { mutate } = useMutation(updateQuery, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(['products'])
      setShowUpdateDialog(false)
      setSelectedProduct({
        id: '',
        name: '',
        price: 0
      })
    }
  })
  const handleUpdateProduct = () => {
    mutate({ id: selectedProduct.id, name: productName, price: productPrice })
  }
  return (
    <Dialog
      visible={showUpdateDialog}
      header="Nuevo Producto"
      style={{ width: '50vw' }}
      onHide={() => setShowUpdateDialog(false)}
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
            onChange={(e) => setProductPrice(Number(e.target.value).valueOf())}
          />
          <label htmlFor="in">Descripcion</label>
        </span>
      </div>
      <button onClick={handleUpdateProduct}>Update</button>
    </Dialog>
  )
}

export default DialogUpdateProduct
