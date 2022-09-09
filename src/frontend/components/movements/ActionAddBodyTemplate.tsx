import React from 'react'
import { Button } from 'primereact/button'
import { showQuantitySelectorDialogState } from '../../atoms/showQuantitySelectorDialog'
import { useRecoilState } from 'recoil'

const ActionAddBodyTemplate = ({
  productId,
  name,
  price
}: {
  productId: string
  name: string
  price: number
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
            productId,
            name,
            price
          })
        }
      />
    </React.Fragment>
  )
}

export default ActionAddBodyTemplate
