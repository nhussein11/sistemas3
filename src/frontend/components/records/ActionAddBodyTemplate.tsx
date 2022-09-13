import React from 'react'
import { Button } from 'primereact/button'
import { showQuantitySelectorDialogState } from '../../atoms/records/showQuantitySelectorDialog'
import { useRecoilState } from 'recoil'

const ActionAddBodyTemplate = ({
  stockId,
  productId,
  storeId
}: {
  stockId: string,
  productId: string,
  storeId: string
}) => {
  const [, setShowQuantitySelectorDialog] = useRecoilState(
    showQuantitySelectorDialogState
  )
  return (
    <React.Fragment>
      <Button
        icon="pi pi-check"
        className="p-button-rounded p-button-success mr-2"
        onClick={() =>
          setShowQuantitySelectorDialog({
            show: true,
            stockId,
            productId,
            storeId
          })
        }
      />
    </React.Fragment>
  )
}

export default ActionAddBodyTemplate
