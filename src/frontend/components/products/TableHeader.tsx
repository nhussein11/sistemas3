import React from 'react'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { useRecoilState } from 'recoil'
import { TableHeaderProps } from '../../@types/frontend.types'
import { globalFilterValueState } from '../../atoms/globalFilterValueAtom'
import { showUpdateDialogState } from '../../atoms/showUpdateDialogAtom'
import { isProductCheckedState } from '../../atoms/products/isProductCheckedAtom'
import { showErrorDialogState } from '../../atoms/error/showErrorDialog'
import useDeleteProductMutation from '../../hooks/products/useDeleteProductMutation'

const TableHeader = ({ setDisplayBasic }: TableHeaderProps) => {
  const { handleDeleteProduct } = useDeleteProductMutation('products')
  const [, setShowUpdateDialog] = useRecoilState(showUpdateDialogState)
  const [, setShowErrorDialog] = useRecoilState(showErrorDialogState)
  const [globalFilterValue, setGlobalFilterValue] = useRecoilState(
    globalFilterValueState
  )
  const [isProductChecked] = useRecoilState(isProductCheckedState)
  const deleteProduct = () => {
    handleDeleteProduct()
    setDisplayBasic(false)
  }
  const updateProduct = () => {
    isProductChecked.checked
      ? setShowUpdateDialog(true)
      : setShowErrorDialog(true)
  }

  return (
    <div className="header-table">
      <div className="flex justify-content-between">
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
          onClick={deleteProduct}
        />
        <Button
          label="Modificar"
          className="p-button-raised p-button-secondary"
          onClick={updateProduct}
        />
      </div>
    </div>
  )
}

export default TableHeader
